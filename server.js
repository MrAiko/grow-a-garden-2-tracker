require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_PASSWORD = process.env.API_PASSWORD || 'test_password';
const STOCK_DATA_FILE = path.join(__dirname, process.env.STOCK_DATA_FILE || 'stock_data.json');
const PREDICTIONS_DATA_FILE = path.join(__dirname, process.env.PREDICTIONS_DATA_FILE || 'predictions_data.json');

// WebSocket clients pool
const wsClients = new Set();


// Security Headers Middleware (standard anti-exploit & clickjacking headers)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// In-memory Rate Limiting to prevent bot spam/DDoS
const ipRequestCounts = new Map();

// Periodic cleanup of rate limiter map every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestCounts.entries()) {
    if (now - data.resetTime > 60000) {
      ipRequestCounts.delete(ip);
    }
  }
}, 10 * 60 * 1000);

function rateLimiter(limit, windowMs) {
  return (req, res, next) => {
    // Try to get real IP behind reverse proxy (Render uses X-Forwarded-For)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();
    
    if (!ipRequestCounts.has(ip)) {
      ipRequestCounts.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const record = ipRequestCounts.get(ip);
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
      return next();
    }
    
    record.count++;
    if (record.count > limit) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later. / Слишком много запросов. Попробуйте позже.' 
      });
    }
    
    next();
  };
}

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Limit payload size to prevent RAM exhaust crashes
app.use(express.static(path.join(__dirname, 'public')));

// Cache in-memory
let currentStock = null;
const activeSessions = {};
const SPECIAL_PHASES = ["bloodmoon", "goldmoon", "chainedmoon", "pizzamoon", "rainbowmoon", "solareclipse"];

// Load Stock Data
try {
  if (fs.existsSync(STOCK_DATA_FILE)) {
    currentStock = JSON.parse(fs.readFileSync(STOCK_DATA_FILE, 'utf8'));
  }
} catch (err) {
  console.error('Error loading stock data:', err);
}

// Load Predictions Data
let currentPredictions = null;
try {
  if (fs.existsSync(PREDICTIONS_DATA_FILE)) {
    currentPredictions = JSON.parse(fs.readFileSync(PREDICTIONS_DATA_FILE, 'utf8'));
  }
} catch (err) {
  console.error('Error loading predictions data:', err);
}

// Save Stock Data
function saveStockData() {
  try {
    fs.writeFileSync(STOCK_DATA_FILE, JSON.stringify(currentStock, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving stock data:', err);
  }
}

// Save Predictions Data
function savePredictionsData() {
  try {
    fs.writeFileSync(PREDICTIONS_DATA_FILE, JSON.stringify(currentPredictions, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving predictions data:', err);
  }
}


function prepareStockResponse(stock) {
  if (!stock) return null;
  const data = JSON.parse(JSON.stringify(stock));
  
  if (data.shops) {
    for (const shopKey of Object.keys(data.shops)) {
      const items = data.shops[shopKey] || [];
      items.forEach(item => {
        if (item.image && item.image.startsWith('http')) {
          item.image = `/api/proxy-image?url=${encodeURIComponent(item.image)}`;
        }
      });
    }
  }
  
  if (data.fruitMultipliers && Array.isArray(data.fruitMultipliers)) {
    data.fruitMultipliers.forEach(item => {
      if (item.image && item.image.startsWith('http')) {
        item.image = `/api/proxy-image?url=${encodeURIComponent(item.image)}`;
      }
    });
  }
  
  data.visitorCount = Math.max(wsClients.size, 1);
  return data;
}

// API Routes
app.get('/api/stock', rateLimiter(300, 60000), (req, res) => {
  if (!currentStock) {
    return res.status(404).json({ error: 'No stock data available yet' });
  }
  
  res.json(prepareStockResponse(currentStock));
});

// Cache for proxied image buffers to bypass Russian IP throttling on Roblox CDNs
const proxiedImageCache = new Map();

app.get('/api/proxy-image', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl || (!imageUrl.startsWith('https://') && !imageUrl.startsWith('http://'))) {
    return res.status(400).send('Invalid image URL');
  }
  
  if (proxiedImageCache.has(imageUrl)) {
    const cached = proxiedImageCache.get(imageUrl);
    res.setHeader('Content-Type', cached.contentType);
    res.setHeader('Cache-Control', 'public, max-age=604800'); // Cache for 7 days
    return res.send(cached.buffer);
  }
  
  try {
    const response = await fetchWithRetry(imageUrl);
    
    const contentType = response.headers.get('content-type') || 'image/png';
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    proxiedImageCache.set(imageUrl, { contentType, buffer });
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=604800'); // Cache for 7 days
    res.send(buffer);
  } catch (err) {
    console.error('Error proxying image:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Fruit image resolver: given a Roblox asset id, resolve its thumbnail via the
// thumbnails API (two-step), then proxy the resulting CDN image. This bypasses
// Russian ISP throttling of tr.rbxcdn.com and lets the website show fruit icons
// even when only an asset id (no readable name) is available.
app.get('/api/fruit-image', rateLimiter(300, 60000), async (req, res) => {
  const assetId = req.query.asset;
  if (!assetId || !/^\d+$/.test(assetId)) {
    return res.status(400).send('Invalid asset id');
  }

  try {
    const imageUrl = await resolveAssetThumbnail(assetId);
    if (!imageUrl) {
      return res.status(404).send('Asset image not found');
    }

    // Serve from the proxied image cache if present.
    if (proxiedImageCache.has(imageUrl)) {
      const cached = proxiedImageCache.get(imageUrl);
      res.setHeader('Content-Type', cached.contentType);
      res.setHeader('Cache-Control', 'public, max-age=604800');
      return res.send(cached.buffer);
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch asset image');
    }
    const contentType = response.headers.get('content-type') || 'image/png';
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    proxiedImageCache.set(imageUrl, { contentType, buffer });

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=604800');
    res.send(buffer);
  } catch (err) {
    console.error(`Error serving fruit image for asset ${assetId}:`, err);
    res.status(500).send('Internal Server Error');
  }
});

// Cache for resolved asset images to avoid making redundant API calls
const resolvedImageCache = new Map();

async function resolveAssetThumbnail(assetId) {
  if (!assetId) return null;
  if (resolvedImageCache.has(assetId)) {
    return resolvedImageCache.get(assetId);
  }
  
  try {
    const url = `https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&size=150x150&format=Png&isCircular=false`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data && data.data && data.data[0] && data.data[0].imageUrl) {
        const imageUrl = data.data[0].imageUrl;
        resolvedImageCache.set(assetId, imageUrl);
        return imageUrl;
      }
    }
  } catch (err) {
    console.error(`Error resolving asset image for ID ${assetId}:`, err);
  }
  return null;
}

// Helper for fetching image with retries
async function fetchWithRetry(url, attempts = 3) {
  let lastError = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (err) {
      lastError = err;
    }
    if (i < attempts - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }
  throw lastError;
}

// Batch resolve asset thumbnails from Roblox API (resolves up to 100 IDs per request)
async function resolveAssetThumbnailsBatch(assetIds) {
  const uniqueIds = [...new Set(assetIds.filter(id => id && /^\d+$/.test(id)))];
  if (uniqueIds.length === 0) return {};
  
  const results = {};
  const uncachedIds = [];
  
  uniqueIds.forEach(id => {
    if (resolvedImageCache.has(id)) {
      results[id] = resolvedImageCache.get(id);
    } else {
      uncachedIds.push(id);
    }
  });
  
  if (uncachedIds.length === 0) return results;
  
  const batchSize = 100;
  for (let i = 0; i < uncachedIds.length; i += batchSize) {
    const chunk = uncachedIds.slice(i, i + batchSize);
    try {
      const url = `https://thumbnails.roblox.com/v1/assets?assetIds=${chunk.join(',')}&size=150x150&format=Png&isCircular=false`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data && data.data) {
          data.data.forEach(item => {
            if (item.targetId && item.imageUrl) {
              const id = String(item.targetId);
              resolvedImageCache.set(id, item.imageUrl);
              results[id] = item.imageUrl;
            }
          });
        }
      }
    } catch (err) {
      console.error('Error resolving batch thumbnails:', err);
    }
  }
  
  return results;
}

function getMergedWeather() {
  const now = Date.now();
  const activeSessionsList = [];
  
  for (const [jobId, session] of Object.entries(activeSessions)) {
    if (now - session.lastUpdate < 120000) {
      activeSessionsList.push(session);
    } else {
      delete activeSessions[jobId];
    }
  }
  
  if (activeSessionsList.length === 0) {
    return null;
  }
  
  // Sort sessions by lastUpdate desc (newest first)
  activeSessionsList.sort((a, b) => b.lastUpdate - a.lastUpdate);
  
  // Find phase
  let selectedPhase = activeSessionsList[0].weather.phase || 'Day';
  const STANDARD_PHASES = ["day", "sunset", "moon", "night"];
  for (const session of activeSessionsList) {
    if (session.weather && session.weather.phase) {
      const phase = session.weather.phase;
      const phaseLower = phase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
      if (phaseLower && !STANDARD_PHASES.includes(phaseLower)) {
        selectedPhase = phase; // Prioritize special phase
        break;
      }
    }
  }
  
  // Merge weathers
  const mergedWeathers = {};
  for (const session of activeSessionsList) {
    if (session.weather && session.weather.weathers) {
      const weathers = session.weather.weathers;
      for (const [name, info] of Object.entries(weathers)) {
        if (info.playing) {
          const endTime = normalizeEndTime(info.endTime);
          if (!mergedWeathers[name]) {
            mergedWeathers[name] = { playing: true, endTime, image: info.image };
          } else {
            mergedWeathers[name].endTime = Math.max(normalizeEndTime(mergedWeathers[name].endTime), endTime);
            if (info.image && !mergedWeathers[name].image) {
              mergedWeathers[name].image = info.image;
            }
          }
        }
      }
    }
  }
  
  // Determine if it is night
  const phaseLower = selectedPhase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  const isNight = STANDARD_PHASES.slice(2).includes(phaseLower) || phaseLower.includes("moon") || phaseLower.includes("night") || phaseLower.includes("eclipse");
  
  // Get timestamps from the session that provided the selected phase or the most recent one
  const primarySession = activeSessionsList.find(s => s.weather && s.weather.phase === selectedPhase) || activeSessionsList[0];
  
  const phaseImage = primarySession.weather ? primarySession.weather.phaseImage : null;

  if (!primarySession.weather) {
    return {
      night: isNight,
      phase: selectedPhase,
      phaseImage: phaseImage,
      weathers: mergedWeathers,
      endTime: 0
    };
  }
  
  return {
    night: isNight,
    phase: selectedPhase,
    phaseImage: phaseImage,
    weathers: mergedWeathers,
    endTime: getMaxWeatherEndTime(activeSessionsList, mergedWeathers),
    nightStartedAt: primarySession.weather.nightStartedAt,
    nightEndedAt: primarySession.weather.nightEndedAt,
    charAttributes: primarySession.weather.charAttributes,
    controllerAttributes: primarySession.weather.controllerAttributes,
    lightingAttributes: primarySession.weather.lightingAttributes,
    weatherControllerAttributes: primarySession.weather.weatherControllerAttributes
  };
}

function normalizeEndTime(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return 0;
  if (n > 1_000_000_000_000) return Math.floor(n / 1000);
  if (n < 86_400) return Math.floor(Date.now() / 1000 + n);
  return Math.floor(n);
}

function getMaxWeatherEndTime(sessions, mergedWeathers = {}) {
  let maxEndTime = 0;
  for (const session of sessions) {
    maxEndTime = Math.max(maxEndTime, normalizeEndTime(session.weather && session.weather.endTime));
  }
  for (const info of Object.values(mergedWeathers)) {
    maxEndTime = Math.max(maxEndTime, normalizeEndTime(info && info.endTime));
  }
  return maxEndTime;
}

async function handleUpdateStock(newStock) {
  if (!newStock || !newStock.shops) {
    throw new Error('Invalid stock data structure');
  }

  const jobId = newStock.jobId || 'default';
  const now = Date.now();
  
  if (newStock.weather) {
    // 1. Normalize any existing weather names in newStock.weather.weathers (e.g. Raining -> Rain)
    if (newStock.weather.weathers) {
      const normalizedWeathers = {};
      for (const [name, info] of Object.entries(newStock.weather.weathers)) {
        const lowerName = name.toLowerCase();
        let targetName = name;
        if (lowerName === "rain" || lowerName === "raining" || lowerName === "rainy") {
          targetName = "Rain";
        } else if (lowerName === "lightning" || lowerName === "thunderstorm") {
          targetName = "Thunderstorm";
        } else if (name.length > 0) {
          targetName = name.charAt(0).toUpperCase() + name.slice(1);
        }
        
        if (!normalizedWeathers[targetName]) {
          normalizedWeathers[targetName] = info;
          normalizedWeathers[targetName].endTime = normalizeEndTime(info.endTime);
        } else {
          normalizedWeathers[targetName].playing = normalizedWeathers[targetName].playing || info.playing;
          if (info.endTime) {
            normalizedWeathers[targetName].endTime = Math.max(normalizeEndTime(normalizedWeathers[targetName].endTime), normalizeEndTime(info.endTime));
          }
        }
      }
      newStock.weather.weathers = normalizedWeathers;
    }

    // 2. Normalize weatherControllerAttributes into newStock.weather.weathers immediately
    if (newStock.weather.weatherControllerAttributes) {
      if (!newStock.weather.weathers) {
        newStock.weather.weathers = {};
      }
      for (const [key, value] of Object.entries(newStock.weather.weatherControllerAttributes)) {
        const lowerKey = key.toLowerCase();
        
        // Skip moon phases/eclipses (they are phases, not weather)
        if (lowerKey.includes("moon") || lowerKey.includes("eclipse") || ["gold", "blood", "chained", "pizza"].includes(lowerKey)) {
          continue;
        }
        
        // Parse active weather states (value is true or "true")
        const isActive = (value === true || value === "true");
        
        // Normalize name
        let targetName;
        if (lowerKey === "rain" || lowerKey === "raining" || lowerKey === "rainy") {
          targetName = "Rain";
        } else if (lowerKey === "lightning" || lowerKey === "thunderstorm") {
          targetName = "Thunderstorm";
        } else if (key.length > 0) {
          targetName = key.charAt(0).toUpperCase() + key.slice(1);
        } else {
          continue;
        }
        
        if (newStock.weather.weathers[targetName]) {
          newStock.weather.weathers[targetName].playing = isActive;
          if (isActive && !normalizeEndTime(newStock.weather.weathers[targetName].endTime)) {
            newStock.weather.weathers[targetName].endTime = normalizeEndTime(newStock.weather.endTime);
          }
        } else {
          newStock.weather.weathers[targetName] = {
            playing: isActive,
            endTime: isActive ? normalizeEndTime(newStock.weather.endTime) : 0
          };
        }
      }
    }
  }

  // Track/update last seen weather data and timestamps for this session
  activeSessions[jobId] = {
    weather: newStock.weather,
    lastUpdate: now
  };

  // Compute merged weather across all active sessions to prevent oscillations
  const mergedWeather = getMergedWeather();
  if (mergedWeather) {
    newStock.weather = mergedWeather;
  }

  // Detect restock changes
  let isRestockTimeUpdated = false;
  if (currentStock && currentStock.restockTimes) {
    for (const shopKey of Object.keys(newStock.restockTimes || {})) {
      const oldNext = currentStock.restockTimes[shopKey] ? currentStock.restockTimes[shopKey].next : 0;
      const newNext = newStock.restockTimes[shopKey] ? newStock.restockTimes[shopKey].next : 0;
      if (newNext !== oldNext && newNext > 0) {
        isRestockTimeUpdated = true;
        break;
      }
    }
  } else {
    isRestockTimeUpdated = true;
  }

  // Merge price data from previous cache if new price is Unknown or invalid (overwritten by out-of-stock text)
  if (currentStock && currentStock.shops) {
    for (const shopKey of Object.keys(newStock.shops || {})) {
      const oldItems = currentStock.shops[shopKey] || [];
      const newItems = newStock.shops[shopKey] || [];

      const oldPriceMap = {};
      oldItems.forEach(item => {
        if (item.price && item.price !== 'Unknown' && !item.price.toLowerCase().includes('stock')) {
          oldPriceMap[item.name] = item.price;
        }
      });

      newItems.forEach(item => {
        const isUnknown = !item.price || item.price === 'Unknown' || item.price.toLowerCase().includes('stock');
        if (isUnknown && oldPriceMap[item.name]) {
          item.price = oldPriceMap[item.name];
        }
      });
    }
  }

  let nightStartedAt = currentStock && currentStock.weather ? currentStock.weather.nightStartedAt : null;
  let nightEndedAt = currentStock && currentStock.weather ? currentStock.weather.nightEndedAt : null;
  
  if (newStock.weather) {
    const wasNight = currentStock && currentStock.weather ? currentStock.weather.night : false;
    const isNight = newStock.weather.night;
    const nowSec = Math.floor(Date.now() / 1000);
    
    if (isNight && !wasNight) {
      nightStartedAt = nowSec;
    } else if (!isNight && wasNight) {
      nightEndedAt = nowSec;
    }
    
    newStock.weather.nightStartedAt = nightStartedAt;
    newStock.weather.nightEndedAt = nightEndedAt;
  }

  // Resolve all asset images asynchronously in a single batch request to avoid rate limits
  const assetIdsToResolve = [];

  if (newStock.shops) {
    for (const shopKey of Object.keys(newStock.shops)) {
      const items = newStock.shops[shopKey] || [];
      items.forEach(item => {
        if (item.image && !item.image.startsWith('http')) {
          assetIdsToResolve.push(item.image);
        }
      });
    }
  }

  if (newStock.fruitMultipliers && Array.isArray(newStock.fruitMultipliers)) {
    newStock.fruitMultipliers.forEach(item => {
      if (item.image && !item.image.startsWith('http')) {
        assetIdsToResolve.push(item.image);
      }
    });
  }

  if (newStock.weather) {
    if (newStock.weather.phaseImage && !newStock.weather.phaseImage.startsWith('http')) {
      assetIdsToResolve.push(newStock.weather.phaseImage);
    }
    if (newStock.weather.weathers) {
      for (const info of Object.values(newStock.weather.weathers)) {
        if (info.image && !info.image.startsWith('http')) {
          assetIdsToResolve.push(info.image);
        }
      }
    }
  }

  if (assetIdsToResolve.length > 0) {
    const resolvedMap = await resolveAssetThumbnailsBatch(assetIdsToResolve);
    
    // Assign resolved URLs back to items
    if (newStock.shops) {
      for (const shopKey of Object.keys(newStock.shops)) {
        const items = newStock.shops[shopKey] || [];
        items.forEach(item => {
          if (item.image && !item.image.startsWith('http')) {
            item.image = resolvedMap[item.image] || item.image;
          }
        });
      }
    }
    
    if (newStock.fruitMultipliers && Array.isArray(newStock.fruitMultipliers)) {
      newStock.fruitMultipliers.forEach(item => {
        if (item.image && !item.image.startsWith('http')) {
          item.image = resolvedMap[item.image] || item.image;
        }
      });
    }

    if (newStock.weather) {
      if (newStock.weather.phaseImage && !newStock.weather.phaseImage.startsWith('http')) {
        newStock.weather.phaseImage = resolvedMap[newStock.weather.phaseImage] || newStock.weather.phaseImage;
      }
      if (newStock.weather.weathers) {
        for (const info of Object.values(newStock.weather.weathers)) {
          if (info.image && !info.image.startsWith('http')) {
            info.image = resolvedMap[info.image] || info.image;
          }
        }
      }
    }
  }

  let fruitMultipliers = {};
  const hasIncomingMultipliers = newStock.fruitMultipliers &&
    (Array.isArray(newStock.fruitMultipliers) ? newStock.fruitMultipliers.length > 0 : Object.keys(newStock.fruitMultipliers).length > 0);

  if (hasIncomingMultipliers) {
    fruitMultipliers = newStock.fruitMultipliers;
  } else if (currentStock && currentStock.fruitMultipliers) {
    fruitMultipliers = currentStock.fruitMultipliers;
  }

  // Fruit refresh countdown: the scraper sends the remaining seconds until the next
  // in-game multiplier refresh. We convert it to an ABSOLUTE unix timestamp so the
  // website can run a live countdown without depending on scrape timing. Keep the last
  // known value if the scraper didn't send one this tick.
  let fruitRefreshAt = currentStock && currentStock.fruitRefreshAt ? currentStock.fruitRefreshAt : 0;
  if (typeof newStock.fruitRefreshTimer === 'number' && newStock.fruitRefreshTimer > 0) {
    fruitRefreshAt = Math.floor(Date.now() / 1000) + newStock.fruitRefreshTimer;
  }

  currentStock = {
    restockTimes: newStock.restockTimes,
    shops: newStock.shops,
    weather: newStock.weather,
    fruitMultipliers: fruitMultipliers,
    // Absolute unix timestamp (seconds) when the next fruit refresh happens.
    fruitRefreshAt: fruitRefreshAt,
    updatedAt: Date.now()
  };

  saveStockData();
  broadcast({
    type: 'stock',
    stock: prepareStockResponse(currentStock)
  });

  return { success: true, isRestockTimeUpdated };
}

app.post('/api/update-stock', rateLimiter(120, 60000), async (req, res) => {
  const reqPassword = req.headers['x-api-password'] || req.body.password;
  if (reqPassword !== API_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await handleUpdateStock(req.body);
    res.json(result);
  } catch (err) {
    console.error('Error in POST /api/update-stock:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

// Serve predictions API
app.get('/api/predictions', rateLimiter(300, 60000), (req, res) => {
  if (!currentPredictions) {
    return res.status(404).json({ error: 'No prediction data available yet' });
  }
  res.json(currentPredictions);
});

// Serve web app status endpoint
app.get('/api/status', rateLimiter(300, 60000), (req, res) => {
  res.json({
    status: 'online',
    lastUpdated: currentStock ? currentStock.updatedAt : null
  });
});


function parseRelativeTime(str) {
  str = str.trim().toLowerCase();
  
  let multiplier = 1;
  let val = str;
  
  if (str.startsWith('через') || str.startsWith('in')) {
    multiplier = 1;
    val = str.replace('через', '').replace('in', '').trim();
  } else if (str.endsWith('назад') || str.endsWith('ago')) {
    multiplier = -1;
    val = str.replace('назад', '').replace('ago', '').trim();
  }
  
  if (val === 'час' || val === 'an hour' || val === 'hour') return multiplier * 3600;
  if (val === 'минуту' || val === 'a minute' || val === 'minute') return multiplier * 60;
  if (val === 'день' || val === 'a day' || val === 'day') return multiplier * 86400;
  if (val === 'секунду' || val === 'a second' || val === 'second') return multiplier * 1;
  
  const secMatch = val.match(/^(\d+)\s*(?:секунд|сек|sec)/);
  if (secMatch) return multiplier * parseInt(secMatch[1], 10);
  
  const minMatch = val.match(/^(\d+)\s*(?:мину|мин|min)/);
  if (minMatch) return multiplier * parseInt(minMatch[1], 10) * 60;
  
  const hourMatch = val.match(/^(\d+)\s*(?:час|hour)/);
  if (hourMatch) return multiplier * parseInt(hourMatch[1], 10) * 3600;
  
  const dayMatch = val.match(/^(\d+)\s*(?:ден|дне|дня|day)/);
  if (dayMatch) return multiplier * parseInt(dayMatch[1], 10) * 86400;
  
  if (str === 'час назад' || str === 'an hour ago') return -3600;
  if (str === 'через час' || str === 'in an hour') return 3600;
  if (str === 'день назад' || str === 'a day ago') return -86400;
  if (str === 'через день' || str === 'in a day') return 86400;

  return 0;
}

function cleanItemName(name) {
  if (!name) return '';
  // 1. Remove Discord custom emojis of format <:name:id> or <a:name:id>
  let clean = name.replace(/<a?:\w+:\d+>/g, '');
  // 2. Remove standard Unicode emojis and symbols
  clean = clean.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{1F1E6}-\u{1F1FF}]/gu, '');
  // 3. Remove variation selectors and non-breaking spaces
  clean = clean.replace(/[\uFE00-\uFE0F\u200B-\u200D\uFEFF]/g, '');
  // 4. Remove asterisks, dashes, bullet points
  clean = clean.replace(/[*•\-–—]/g, '');
  // 5. Replace multiple spaces with a single space and trim
  return clean.replace(/\s+/g, ' ').trim();
}

function parseDiscordMessage(text, msgTimestampSec) {
  // Strip Discord custom emojis from the entire message text
  text = text.replace(/<a?:\w+:\d+>/g, '');

  const lines = text.split('\n');
  const result = {
    updatedAt: msgTimestampSec * 1000,
    seeds: [],
    gears: [],
    props: [],
    weathers: []
  };
  
  const parseItemName = (rawName) => {
    const cleaned = cleanItemName(rawName);
    // Match multiplier prefix like 2x, 11x, etc.
    const multMatch = cleaned.match(/^(\d+x)\s+(.+)$/i);
    if (multMatch) {
      return {
        name: multMatch[2].trim(),
        multiplier: multMatch[1]
      };
    }
    return {
      name: cleaned,
      multiplier: ''
    };
  };

  let currentSection = null;
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    const lineLower = line.toLowerCase();
    
    // 1. Try to match as an item line first
    const tsRegex = /^[\-*•\s]*([^—–:➔<>\-]+?)\s*(?:—|–|-|:|➔|->)\s*<t:(\d+)(?::\w+)?>/;
    const relRegex = /^[\-*•\s]*([^—–:➔<>\-]+?)\s*(?:—|–|-|:|➔|->)\s*(.+)$/;
    
    const tsMatch = line.match(tsRegex);
    const relMatch = line.match(relRegex);
    
    let isItemLine = false;
    let parsedItem = null;
    let timestamp = 0;
    let relativeText = '';
    
    if (tsMatch) {
      isItemLine = true;
      parsedItem = parseItemName(tsMatch[1]);
      timestamp = parseInt(tsMatch[2], 10);
    } else if (relMatch) {
      relativeText = relMatch[2].trim();
      const relativeLower = relativeText.toLowerCase();
      // Ensure the relative text actually represents a relative timestamp offset
      const hasTimeKeywords = (
        relativeLower.includes('секунд') || relativeLower.includes('сек') || relativeLower.includes('sec') ||
        relativeLower.includes('мину') || relativeLower.includes('мин') || relativeLower.includes('min') ||
        relativeLower.includes('час') || relativeLower.includes('hour') ||
        relativeLower.includes('ден') || relativeLower.includes('дня') || relativeLower.includes('дне') || relativeLower.includes('day') ||
        relativeLower.includes('назад') || relativeLower.includes('ago') ||
        relativeLower.includes('через') || relativeLower.includes('in')
      );
      if (hasTimeKeywords) {
        isItemLine = true;
        parsedItem = parseItemName(relMatch[1]);
        const offsetSeconds = parseRelativeTime(relativeText);
        timestamp = msgTimestampSec + offsetSeconds;
      }
    }
    
    if (isItemLine && currentSection) {
      result[currentSection].push({
        name: parsedItem.name,
        multiplier: parsedItem.multiplier,
        relativeText,
        timestamp
      });
      continue;
    }
    
    // 2. If it's not a valid item line, check if it's a section header with synonym support
    if (lineLower.includes('seeds') || lineLower.includes('семена')) {
      currentSection = 'seeds';
    } else if (lineLower.includes('gears') || lineLower.includes('gear') || lineLower.includes('снаряжение') || lineLower.includes('инструменты')) {
      currentSection = 'gears';
    } else if (lineLower.includes('props') || lineLower.includes('crates') || lineLower.includes('crate') || lineLower.includes('prop') || lineLower.includes('ящики') || lineLower.includes('декор')) {
      currentSection = 'props';
    } else if (lineLower.includes('weather') || lineLower.includes('moons') || lineLower.includes('moon') || lineLower.includes('погода') || lineLower.includes('луны')) {
      currentSection = 'weathers';
    }
  }
  
  return result;
}

function extractTextFromComponents(components) {
  let texts = [];
  if (!components) return texts;
  
  for (const component of components) {
    if (component.content) {
      texts.push(component.content);
    }
    if (component.components) {
      texts = texts.concat(extractTextFromComponents(component.components));
    }
  }
  return texts;
}

function extractTextFromEmbeds(embeds) {
  let texts = [];
  if (!embeds) return texts;
  for (const embed of embeds) {
    if (embed.title) texts.push(embed.title);
    if (embed.description) texts.push(embed.description);
    if (embed.fields) {
      for (const field of embed.fields) {
        if (field.name) texts.push(field.name);
        if (field.value) texts.push(field.value);
      }
    }
    if (embed.footer && embed.footer.text) texts.push(embed.footer.text);
  }
  return texts;
}

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PREDICTIONS_CHANNEL_ID = '1516238240779075725';

async function fetchDiscordPredictions() {
  if (!DISCORD_TOKEN || DISCORD_TOKEN === 'your_discord_token_here') {
    console.warn('DISCORD_TOKEN is not set or is still a placeholder in .env. Discord predictions scraper is disabled.');
    return;
  }
  
  try {
    // Fetch last 10 messages to avoid welcome/role messages at index 0
    const url = `https://discord.com/api/v9/channels/${PREDICTIONS_CHANNEL_ID}/messages?limit=10`;
    const headers = {
      'Authorization': DISCORD_TOKEN,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    let response = await fetch(url, { headers });
    
    // Auto-fallback: if raw token fails with 401, retry with "Bot " prefix
    if (response.status === 401 && !DISCORD_TOKEN.startsWith('Bot ')) {
      response = await fetch(url, { headers: { ...headers, 'Authorization': `Bot ${DISCORD_TOKEN}` } });
    }
    
    if (!response.ok) {
      let bodyText = '';
      try {
        bodyText = await response.text();
      } catch (err) {
        bodyText = `<failed to read body: ${err.message}>`;
      }
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        console.error(`Failed to fetch Discord messages: 429 Too Many Requests (retry-after: ${retryAfter || 'unknown'}s). Response: ${bodyText}`);
      } else {
        console.error(`Failed to fetch Discord messages: ${response.status} ${response.statusText}. Response: ${bodyText}`);
      }
      return;
    }
    
    const messages = await response.json();
    if (!messages || messages.length === 0) {
      console.warn('No messages found in the Discord prediction channel.');
      return;
    }
    
    // Search the last 10 messages for predictions message (using case-insensitive regex for synonyms)
    const searchRegex = /seeds|next seen|gears|props|crates|weather|сток|завоз/i;
    let msg = messages.find(m => {
      const hasContent = m.content && searchRegex.test(m.content);
      const hasComponents = m.components && m.components.length > 0;
      const hasEmbeds = m.embeds && m.embeds.some(e => {
        const titleMatch = e.title && searchRegex.test(e.title);
        const descMatch = e.description && searchRegex.test(e.description);
        const fieldsMatch = e.fields && e.fields.some(f => searchRegex.test(f.name) || searchRegex.test(f.value));
        return titleMatch || descMatch || fieldsMatch;
      });
      return hasContent || hasComponents || hasEmbeds;
    });
    
    // Fallback to the latest message in the predictions channel if no strict match was found
    if (!msg && messages.length > 0) {
      console.warn('No predictions message matched strict criteria. Falling back to the latest message in predictions channel.');
      msg = messages[0];
    }
    
    if (!msg) {
      console.warn('No predictions message found in the last 10 messages.');
      return;
    }
    
    // Extract text from components and embeds recursively
    const componentTexts = extractTextFromComponents(msg.components);
    const embedTexts = extractTextFromEmbeds(msg.embeds);
    const fullText = (msg.content || '') + '\n' + componentTexts.join('\n') + '\n' + embedTexts.join('\n');
    
    const baseTime = msg.edited_timestamp || msg.timestamp;
    const baseTimeSec = Math.floor(new Date(baseTime).getTime() / 1000);
    
    const parsed = parseDiscordMessage(fullText, baseTimeSec);
    if (parsed) {
      currentPredictions = parsed;
      savePredictionsData();
      broadcast({
        type: 'predictions',
        predictions: currentPredictions
      });
      console.log('Successfully fetched and updated predictions from Discord.');
    }
  } catch (err) {
    console.error('Error in Discord predictions scraper:', err);
  }
}

// Start background scraper if token is configured (every 3 minutes to avoid Discord rate limiting)
if (DISCORD_TOKEN) {
  fetchDiscordPredictions();
  setInterval(fetchDiscordPredictions, 180 * 1000);
}

const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

function broadcastUserCount() {
  broadcast({
    type: 'users',
    count: Math.max(wsClients.size, 1)
  });
}

wss.on('connection', (ws) => {
  wsClients.add(ws);
  broadcastUserCount();
  
  // Immediately push the current data to the connecting client
  ws.send(JSON.stringify({
    type: 'init',
    stock: prepareStockResponse(currentStock),
    predictions: currentPredictions
  }));
  
  ws.on('message', async (message) => {
    try {
      const payload = JSON.parse(message.toString());
      if (payload && payload.type === 'update-stock') {
        const reqPassword = payload.password;
        if (reqPassword !== API_PASSWORD) {
          ws.send(JSON.stringify({ type: 'error', error: 'Unauthorized' }));
          return;
        }
        
        console.log('Received stock update from Roblox via WebSocket.');
        const result = await handleUpdateStock(payload.data || payload);
        ws.send(JSON.stringify({ type: 'update-stock-response', success: result.success }));
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  });
  
  ws.on('close', () => {
    wsClients.delete(ws);
    broadcastUserCount();
  });
  
  ws.on('error', () => {
    wsClients.delete(ws);
    broadcastUserCount();
  });
});

// Heartbeat to keep connection alive and prune dead ones
const interval = setInterval(() => {
  for (const client of wsClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.ping();
    }
  }
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});

function broadcast(data) {
  const payload = JSON.stringify(data);
  for (const client of wsClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
