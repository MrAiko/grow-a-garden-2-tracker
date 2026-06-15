require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_PASSWORD = process.env.API_PASSWORD || 'test_password';
const STOCK_DATA_FILE = path.join(__dirname, process.env.STOCK_DATA_FILE || 'stock_data.json');

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

// Save Stock Data
function saveStockData() {
  try {
    fs.writeFileSync(STOCK_DATA_FILE, JSON.stringify(currentStock, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving stock data:', err);
  }
}

// API Routes
app.get('/api/stock', rateLimiter(60, 60000), (req, res) => {
  if (!currentStock) {
    return res.status(404).json({ error: 'No stock data available yet' });
  }
  
  // Clone currentStock and rewrite image URLs to proxy URLs
  const responseData = JSON.parse(JSON.stringify(currentStock));
  if (responseData.shops) {
    for (const shopKey of Object.keys(responseData.shops)) {
      const items = responseData.shops[shopKey] || [];
      items.forEach(item => {
        if (item.image && item.image.startsWith('http')) {
          item.image = `/api/proxy-image?url=${encodeURIComponent(item.image)}`;
        }
      });
    }
  }
  
  res.json(responseData);
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
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch image');
    }
    
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
          if (!mergedWeathers[name]) {
            mergedWeathers[name] = { playing: true, endTime: info.endTime };
          } else {
            mergedWeathers[name].endTime = Math.max(mergedWeathers[name].endTime, info.endTime);
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
  
  if (!primarySession.weather) {
    return {
      night: isNight,
      phase: selectedPhase,
      weathers: mergedWeathers
    };
  }
  
  return {
    night: isNight,
    phase: selectedPhase,
    weathers: mergedWeathers,
    nightStartedAt: primarySession.weather.nightStartedAt,
    nightEndedAt: primarySession.weather.nightEndedAt,
    charAttributes: primarySession.weather.charAttributes,
    controllerAttributes: primarySession.weather.controllerAttributes,
    lightingAttributes: primarySession.weather.lightingAttributes,
    weatherControllerAttributes: primarySession.weather.weatherControllerAttributes
  };
}

app.post('/api/update-stock', rateLimiter(20, 60000), async (req, res) => {
  const reqPassword = req.headers['x-api-password'] || req.body.password;
  if (reqPassword !== API_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newStock = req.body;
  if (!newStock || !newStock.shops) {
    return res.status(400).json({ error: 'Invalid stock data structure' });
  }

  const jobId = newStock.jobId || 'default';
  const now = Date.now();
  
  if (newStock.weather) {
    // Normalize weatherControllerAttributes into newStock.weather.weathers immediately
    if (newStock.weather.weatherControllerAttributes) {
      if (!newStock.weather.weathers) {
        newStock.weather.weathers = {};
      }
      for (const [key, value] of Object.entries(newStock.weather.weatherControllerAttributes)) {
        const lowerKey = key.toLowerCase();
        if (["rain", "lightning", "thunderstorm", "rainbow", "snowfall", "starfall"].includes(lowerKey)) {
          const isActive = (value === true || value === "true");
          const targetName = lowerKey === "lightning" ? "Thunderstorm" : (key.charAt(0).toUpperCase() + key.slice(1));
          
          if (newStock.weather.weathers[targetName]) {
            newStock.weather.weathers[targetName].playing = isActive;
          } else {
            newStock.weather.weathers[targetName] = {
              playing: isActive,
              endTime: 0
            };
          }
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

  // Resolve all asset images asynchronously
  if (newStock.shops) {
    const promises = [];
    for (const shopKey of Object.keys(newStock.shops)) {
      const items = newStock.shops[shopKey] || [];
      items.forEach(item => {
        if (item.image && !item.image.startsWith('http')) {
          const assetId = item.image;
          const promise = resolveAssetThumbnail(assetId).then(resolvedUrl => {
            if (resolvedUrl) {
              item.image = resolvedUrl;
            } else {
              item.image = null;
            }
          });
          promises.push(promise);
        }
      });
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
  }

  currentStock = {
    restockTimes: newStock.restockTimes,
    shops: newStock.shops,
    weather: newStock.weather,
    updatedAt: Date.now()
  };

  saveStockData();

  res.json({ success: true, isRestockTimeUpdated });
});

// Serve web app status endpoint
app.get('/api/status', rateLimiter(60, 60000), (req, res) => {
  res.json({
    status: 'online',
    lastUpdated: currentStock ? currentStock.updatedAt : null
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
