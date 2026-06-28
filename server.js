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
const ITEM_TRANSLATIONS_FILE = path.join(__dirname, process.env.ITEM_TRANSLATIONS_FILE || 'item_translations.json');
const WEATHER_CATALOG_IMAGES_FILE = path.join(__dirname, process.env.WEATHER_CATALOG_IMAGES_FILE || 'weather_catalog_images.json');

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

const DEFAULT_WEATHER_CATALOG = {
  day: { name: "Day", image: "100486757307207" },
  sunset: { name: "Sunset", image: "86217612022586" },
  moon: { name: "Night", image: "91446334780160" },
  night: { name: "Night", image: "91446334780160" },
  bloodmoon: { name: "Blood Moon", image: "140465339393451" },
  goldmoon: { name: "Gold Moon", image: "84902063004871" },
  chainedmoon: { name: "Chained Moon", image: null },
  pizzamoon: { name: "Pizza Moon", image: null },
  rainbowmoon: { name: "Rainbow Moon", image: "93602895495056" },
  solareclipse: { name: "Solar Eclipse", image: null },
  starfall: { name: "Starfall", image: null },
  rainbow: { name: "Rainbow", image: null },
  snowfall: { name: "Snowfall", image: null },
  rain: { name: "Rain", image: null },
  thunderstorm: { name: "Thunderstorm", image: null },
  lightning: { name: "Thunderstorm", image: null },
  aurora: { name: "Aurora", image: null },
  megamoon: { name: "Mega Moon", image: "107925838920918" }
};

const LOCKED_DEFAULT_WEATHER_IMAGES = new Set(
  Object.entries(DEFAULT_WEATHER_CATALOG)
    .filter(([, item]) => item && isValidWeatherImage(item.image))
    .map(([key]) => key)
);

function normalizeEnvKey(name) {
  return String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function canonicalWeatherKey(name) {
  const key = normalizeEnvKey(name);
  if (!key) return '';
  if (key === 'night') return 'moon';
  if (key === 'raining' || key === 'rainy') return 'rain';
  if (key === 'lightning') return 'thunderstorm';
  if (key === 'bloodmoon' || key === 'blood') return 'bloodmoon';
  if (key === 'goldmoon' || key === 'gold') return 'goldmoon';
  if (key === 'chainedmoon' || key === 'chained') return 'chainedmoon';
  if (key === 'pizzamoon' || key === 'pizza') return 'pizzamoon';
  if (key === 'rainbowmoon') return 'rainbowmoon';
  if (key === 'solareclipse' || key === 'solar') return 'solareclipse';
  if (key === 'megamoon' || key === 'mega') return 'megamoon';
  return key;
}

function isTechnicalWeatherName(name) {
  const key = normalizeEnvKey(name);
  return !key || key.includes('websocket') || key.includes('remote') ||
    key.includes('controller') || key.includes('module') ||
    key.includes('request') || key.includes('response') ||
    key.includes('snapshot') || key.includes('event');
}

function isEmojiFallbackImage(image) {
  const ref = String(image || '').toLowerCase();
  return ref.includes('notoemoji') || ref.includes('fonts.gstatic.com');
}

function isValidWeatherImage(image) {
  return !!image && !isEmojiFallbackImage(image);
}

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

// Load Persistent Catalog Images
const CATALOG_IMAGES_FILE = path.join(__dirname, 'catalog_images.json');
let catalogImages = {};
try {
  if (fs.existsSync(CATALOG_IMAGES_FILE)) {
    catalogImages = JSON.parse(fs.readFileSync(CATALOG_IMAGES_FILE, 'utf8'));
  }
} catch (err) {
  console.error('Error loading catalog images:', err);
}

// Load Persistent Weather Catalog Images
let weatherCatalogImages = {};
try {
  if (fs.existsSync(WEATHER_CATALOG_IMAGES_FILE)) {
    weatherCatalogImages = JSON.parse(fs.readFileSync(WEATHER_CATALOG_IMAGES_FILE, 'utf8'));
  }
} catch (err) {
  console.error('Error loading weather catalog images:', err);
}

let itemTranslationsCache = {};
let itemTranslationsMtime = 0;

function loadItemTranslations() {
  try {
    const stat = fs.statSync(ITEM_TRANSLATIONS_FILE);
    if (stat.mtimeMs !== itemTranslationsMtime) {
      itemTranslationsCache = JSON.parse(fs.readFileSync(ITEM_TRANSLATIONS_FILE, 'utf8'));
      itemTranslationsMtime = stat.mtimeMs;
    }
  } catch (err) {
    console.error('Error loading item translations:', err);
    itemTranslationsCache = {};
    itemTranslationsMtime = 0;
  }
  return itemTranslationsCache;
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

// Save Catalog Images Data
function saveCatalogImages() {
  try {
    fs.writeFileSync(CATALOG_IMAGES_FILE, JSON.stringify(catalogImages, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving catalog images:', err);
  }
}

function saveWeatherCatalogImages() {
  try {
    fs.writeFileSync(WEATHER_CATALOG_IMAGES_FILE, JSON.stringify(weatherCatalogImages, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving weather catalog images:', err);
  }
}

function rememberWeatherCatalogImage(name, image, displayName) {
  const key = canonicalWeatherKey(name);
  if (!key || !isValidWeatherImage(image)) return false;
  if (LOCKED_DEFAULT_WEATHER_IMAGES.has(key)) return false;
  const value = String(image);
  const prev = weatherCatalogImages[key];
  const prevImage = typeof prev === 'string' ? prev : prev && prev.image;
  if (prevImage === value) return false;
  weatherCatalogImages[key] = {
    name: displayName || (prev && prev.name) || (DEFAULT_WEATHER_CATALOG[key] && DEFAULT_WEATHER_CATALOG[key].name) || String(name),
    image: value
  };
  return true;
}

function formatImageForClient(image) {
  if (!image) return null;
  const ref = String(image);
  if (ref.startsWith('/')) return ref;
  if (ref.startsWith('http')) return `/api/proxy-image?url=${encodeURIComponent(ref)}`;
  return `/api/fruit-image?asset=${encodeURIComponent(ref)}`;
}

function buildWeatherCatalog(stock) {
  const catalog = JSON.parse(JSON.stringify(DEFAULT_WEATHER_CATALOG));

  const merge = (key, item) => {
    const normKey = canonicalWeatherKey(key);
    if (!normKey || !item) return;
    if (!catalog[normKey]) catalog[normKey] = { name: item.name || String(key), image: null };
    if (item.name) catalog[normKey].name = item.name;
    const image = typeof item === 'string' ? item : item.image;
    if (LOCKED_DEFAULT_WEATHER_IMAGES.has(normKey)) return;
    if (isValidWeatherImage(image)) catalog[normKey].image = image;
  };

  for (const [key, item] of Object.entries(weatherCatalogImages)) {
    merge(key, item);
  }

  if (stock && stock.weatherCatalog) {
    for (const [key, item] of Object.entries(stock.weatherCatalog)) {
      merge(key, item);
    }
  }

  const weather = stock && stock.weather;
  if (weather) {
    if (weather.phase && weather.phaseImage) {
      merge(weather.phase, { name: weather.phase, image: weather.phaseImage });
      if (canonicalWeatherKey(weather.phase) === 'moon') {
        merge('night', { name: 'Night', image: weather.phaseImage });
      }
    }
    if (weather.weathers) {
      for (const [name, info] of Object.entries(weather.weathers)) {
        if (info && info.image) {
          merge(name, { name, image: info.image });
        }
      }
    }
  }

  for (const item of Object.values(catalog)) {
    item.image = formatImageForClient(item.image);
  }
  return catalog;
}


function prepareStockResponse(stock) {
  if (!stock) return null;
  const data = JSON.parse(JSON.stringify(stock));

  if (data.weather && isTechnicalWeatherName(data.weather.phase)) {
    data.weather.phase = data.weather.night ? 'Moon' : 'Day';
    data.weather.phaseImage = null;
  }
  
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

  data.weatherCatalog = buildWeatherCatalog(data);
  
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

app.get('/api/item-translations', rateLimiter(300, 60000), (req, res) => {
  res.json(loadItemTranslations());
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
    if (err.message && err.message.includes('HTTP 404')) {
      return res.status(404).send('Image not found');
    }
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
async function fetchWithRetry(url, attempts = 2) {
  let lastError = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) return response;
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (err) {
      lastError = err;
    }
    if (i < attempts - 1) {
      await new Promise(r => setTimeout(r, 200));
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
  let selectedPhase = isTechnicalWeatherName(activeSessionsList[0].weather.phase)
    ? (activeSessionsList[0].weather.night ? 'Moon' : 'Day')
    : (activeSessionsList[0].weather.phase || 'Day');
  const STANDARD_PHASES = ["day", "sunset", "moon", "night"];
  for (const session of activeSessionsList) {
    if (session.weather && session.weather.phase) {
      const phase = session.weather.phase;
      if (isTechnicalWeatherName(phase)) continue;
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
            mergedWeathers[name] = { playing: true, endTime, image: info.image || null };
          } else {
            if (info.image) {
              mergedWeathers[name].image = info.image;
            }
            mergedWeathers[name].endTime = Math.max(normalizeEndTime(mergedWeathers[name].endTime), endTime);
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
      phaseImage: null,
      weathers: mergedWeathers,
      endTime: 0
    };
  }
  
  return {
    night: isNight,
    phase: selectedPhase,
    phaseImage: primarySession.weather.phaseImage || null,
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
    if (isTechnicalWeatherName(newStock.weather.phase)) {
      newStock.weather.phase = newStock.weather.night ? 'Moon' : 'Day';
      newStock.weather.phaseImage = null;
    }

    // 1. Normalize any existing weather names in newStock.weather.weathers (e.g. Raining -> Rain)
    if (newStock.weather.weathers) {
      const normalizedWeathers = {};
      for (const [name, info] of Object.entries(newStock.weather.weathers)) {
        const lowerName = name.toLowerCase();
        const weatherKey = normalizeEnvKey(name);
        if (weatherKey.includes("moon") || weatherKey.includes("eclipse") || 
            ["gold", "blood", "chained", "pizza", "solar", "mega"].includes(weatherKey)) {
          continue;
        }
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
          if (info.image) {
            normalizedWeathers[targetName].image = info.image;
          }
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

  if (newStock.weatherCatalog) {
    for (const item of Object.values(newStock.weatherCatalog)) {
      const image = item && (typeof item === 'string' ? item : item.image);
      if (image && !String(image).startsWith('http') && !String(image).startsWith('/')) {
        assetIdsToResolve.push(String(image));
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

    if (newStock.weatherCatalog) {
      for (const item of Object.values(newStock.weatherCatalog)) {
        if (item && item.image && !String(item.image).startsWith('http') && !String(item.image).startsWith('/')) {
          item.image = resolvedMap[item.image] || item.image;
        }
      }
    }
  }

  // Harvest resolved image URLs to the persistent catalog
  let catalogUpdated = false;
  if (newStock.shops) {
    for (const shopKey of Object.keys(newStock.shops)) {
      const items = newStock.shops[shopKey] || [];
      items.forEach(item => {
        if (item.name && item.image) {
          const cleanName = item.name.toLowerCase().trim();
          if (catalogImages[cleanName] !== item.image) {
            catalogImages[cleanName] = item.image;
            catalogUpdated = true;
          }
        }
      });
    }
  }
  
  if (newStock.fruitMultipliers && Array.isArray(newStock.fruitMultipliers)) {
    newStock.fruitMultipliers.forEach(item => {
      if (item.name && item.image) {
        const cleanName = item.name.toLowerCase().trim();
        if (catalogImages[cleanName] !== item.image) {
          catalogImages[cleanName] = item.image;
          catalogUpdated = true;
        }
      }
    });
  }
  
  if (catalogUpdated) {
    saveCatalogImages();
  }

  let weatherCatalogUpdated = false;
  if (newStock.weatherCatalog) {
    for (const [key, item] of Object.entries(newStock.weatherCatalog)) {
      const image = item && (typeof item === 'string' ? item : item.image);
      const name = item && typeof item === 'object' ? item.name : key;
      if (rememberWeatherCatalogImage(key, image, name)) {
        weatherCatalogUpdated = true;
      }
    }
  }
  if (newStock.weather) {
    if (newStock.weather.phase && newStock.weather.phaseImage) {
      if (rememberWeatherCatalogImage(newStock.weather.phase, newStock.weather.phaseImage, newStock.weather.phase)) {
        weatherCatalogUpdated = true;
      }
    }
    if (newStock.weather.weathers) {
      for (const [name, info] of Object.entries(newStock.weather.weathers)) {
        if (info && rememberWeatherCatalogImage(name, info.image, name)) {
          weatherCatalogUpdated = true;
        }
      }
    }
  }
  if (weatherCatalogUpdated) {
    saveWeatherCatalogImages();
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
    weatherCatalog: newStock.weatherCatalog || (currentStock && currentStock.weatherCatalog) || {},
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

function preparePredictionsResponse(predictions) {
  if (!predictions) return null;
  const data = JSON.parse(JSON.stringify(predictions));
  const sections = ['seeds', 'gears', 'props'];
  sections.forEach(sec => {
    if (data[sec]) {
      data[sec].forEach(item => {
        const cleanName = item.name.toLowerCase().trim();
        const rawImg = catalogImages[cleanName];
        if (rawImg) {
          if (rawImg.startsWith('http')) {
            item.image = `/api/proxy-image?url=${encodeURIComponent(rawImg)}`;
          } else if (/^\d+$/.test(rawImg)) {
            item.image = `/api/fruit-image?asset=${encodeURIComponent(rawImg)}`;
          } else {
            item.image = rawImg;
          }
        }
      });
    }
  });
  if (data.weathers) {
    const weatherCatalog = buildWeatherCatalog(currentStock);
    data.weathers.forEach(item => {
      const key = canonicalWeatherKey(item.name);
      const catalogItem = weatherCatalog[key] || weatherCatalog[normalizeEnvKey(item.name)];
      if (catalogItem && catalogItem.image) {
        item.image = catalogItem.image;
      }
    });
  }
  return data;
}

// Serve predictions API
app.get('/api/predictions', rateLimiter(300, 60000), (req, res) => {
  if (!currentPredictions) {
    return res.status(404).json({ error: 'No prediction data available yet' });
  }
  res.json(preparePredictionsResponse(currentPredictions));
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
  if (str.startsWith('через') || str.startsWith('in')) {
    multiplier = 1;
  } else if (str.endsWith('назад') || str.endsWith('ago')) {
    multiplier = -1;
  } else {
    multiplier = 1; // Default to positive offset
  }
  
  let val = str.replace('через', '').replace('in', '').replace('назад', '').replace('ago', '').trim();
  
  if (val === 'час' || val === 'an hour' || val === 'hour') return 3600 * multiplier;
  if (val === 'минуту' || val === 'a minute' || val === 'minute') return 60 * multiplier;
  if (val === 'секунду' || val === 'a second' || val === 'second') return 1 * multiplier;
  if (val === 'день' || val === 'a day' || val === 'day') return 86400 * multiplier;
  
  const secMatch = val.match(/^(\d+)\s*(?:секу|sec)/);
  if (secMatch) return parseInt(secMatch[1], 10) * multiplier;
  
  const minMatch = val.match(/^(\d+)\s*(?:мину|min)/);
  if (minMatch) return parseInt(minMatch[1], 10) * 60 * multiplier;
  
  const hourMatch = val.match(/^(\d+)\s*(?:час|hour)/);
  if (hourMatch) return parseInt(hourMatch[1], 10) * 3600 * multiplier;
  
  const dayMatch = val.match(/^(\d+)\s*(?:ден|дня|дне|day)/);
  if (dayMatch) return parseInt(dayMatch[1], 10) * 86400 * multiplier;
  
  if (str === 'час назад' || str === 'an hour ago') return -3600;
  if (str === 'через час' || str === 'in an hour') return 3600;
  
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
    
    // Check if it's an item line first by checking for duration markers or <t:
    const isItemLine = line.includes('<t:') || 
                       lineLower.includes('через') || 
                       lineLower.includes('назад') || 
                       lineLower.includes('ago') || 
                       lineLower.includes('in ') || 
                       lineLower.includes('секунд') || 
                       lineLower.includes('минут') || 
                       lineLower.includes('час') || 
                       lineLower.includes('ден') || 
                       lineLower.includes('дня') || 
                       lineLower.includes('днями') ||
                       lineLower.includes('day') ||
                       lineLower.includes('hour') ||
                       lineLower.includes('minute') ||
                       lineLower.includes('second');
                       
    if (!isItemLine) {
      // Check section header
      if (lineLower.includes('seeds') || lineLower.includes('семена')) {
        currentSection = 'seeds';
        continue;
      } else if (lineLower.includes('gears') || lineLower.includes('gear') || lineLower.includes('снаряжение') || lineLower.includes('инструменты')) {
        currentSection = 'gears';
        continue;
      } else if (lineLower.includes('props') || lineLower.includes('crates') || lineLower.includes('crate') || lineLower.includes('prop') || lineLower.includes('ящики') || lineLower.includes('декор')) {
        currentSection = 'props';
        continue;
      } else if (lineLower.includes('weather') || lineLower.includes('moons') || lineLower.includes('moon') || lineLower.includes('погода') || lineLower.includes('луны')) {
        currentSection = 'weathers';
        continue;
      }
    }
    
    const tsRegex = /^[\-*•\s]*([^—–:➔<>\-]+?)\s*(?:—|–|-|:|➔|->)\s*<t:(\d+)(?::\w+)?>/;
    const relRegex = /^[\-*•\s]*([^—–:➔<>\-]+?)\s*(?:—|–|-|:|➔|->)\s*(.+)$/;
    
    const tsMatch = line.match(tsRegex);
    const relMatch = line.match(relRegex);
    
    if (tsMatch && currentSection) {
      const parsedItem = parseItemName(tsMatch[1]);
      const timestamp = parseInt(tsMatch[2], 10);
      result[currentSection].push({
        name: parsedItem.name,
        multiplier: parsedItem.multiplier,
        relativeText: '', // Will be rendered relative to client time
        timestamp: timestamp
      });
      continue;
    } else if (relMatch && currentSection) {
      const parsedItem = parseItemName(relMatch[1]);
      const relativeText = relMatch[2].trim();
      const offsetSeconds = parseRelativeTime(relativeText);
      const absoluteTimestamp = msgTimestampSec + offsetSeconds;
      
      result[currentSection].push({
        name: parsedItem.name,
        multiplier: parsedItem.multiplier,
        relativeText,
        timestamp: absoluteTimestamp
      });
      continue;
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

function isPredictionsMessage(fullText) {
  if (!fullText) return false;
  const textLower = fullText.toLowerCase();
  
  let score = 0;
  if (textLower.includes('seeds') || textLower.includes('семена')) score++;
  if (textLower.includes('gears') || textLower.includes('gear') || textLower.includes('снаряжение') || textLower.includes('инструменты')) score++;
  if (textLower.includes('props') || textLower.includes('crates') || textLower.includes('ящики') || textLower.includes('декор')) score++;
  if (textLower.includes('weather') || textLower.includes('moon') || textLower.includes('погода') || textLower.includes('лун')) score++;
  
  return score >= 2;
}

async function fetchDiscordPredictions() {
  if (!DISCORD_TOKEN) {
    console.warn('DISCORD_TOKEN is not set in .env. Discord predictions scraper is disabled.');
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
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        console.error(`Failed to fetch Discord messages: 429 Too Many Requests (retry-after: ${retryAfter || 'unknown'}s)`);
      } else {
        console.error(`Failed to fetch Discord messages: ${response.status} ${response.statusText}`);
      }
      return;
    }
    
    const messages = await response.json();
    if (!messages || messages.length === 0) {
      console.warn('No messages found in the Discord prediction channel.');
      return;
    }
    
    // Search the last 10 messages for a predictions message
    let msg = null;
    for (const m of messages) {
      const componentTexts = extractTextFromComponents(m.components);
      const embedTexts = extractTextFromEmbeds(m.embeds);
      const fullText = (m.content || '') + '\n' + componentTexts.join('\n') + '\n' + embedTexts.join('\n');
      
      if (isPredictionsMessage(fullText)) {
        msg = m;
        break;
      }
    }
    
    // Fallback to the latest message only if it contains at least some prediction keywords
    if (!msg && messages.length > 0) {
      const firstMsgText = (messages[0].content || '') + '\n' + 
                           extractTextFromComponents(messages[0].components).join('\n') + '\n' + 
                           extractTextFromEmbeds(messages[0].embeds).join('\n');
      if (firstMsgText.toLowerCase().includes('seeds') || firstMsgText.toLowerCase().includes('gears')) {
        console.warn('No predictions message matched strict criteria. Falling back to the latest message.');
        msg = messages[0];
      }
    }
    
    if (!msg) {
      console.warn('No valid predictions message (containing seeds/gears/props/weather sections) was found in the last 10 messages.');
      return;
    }
    
    // Extract text from components and embeds recursively
    const componentTexts = extractTextFromComponents(msg.components);
    const embedTexts = extractTextFromEmbeds(msg.embeds);
    const fullText = (msg.content || '') + '\n' + componentTexts.join('\n') + '\n' + embedTexts.join('\n');
    
    const baseTime = msg.edited_timestamp || msg.timestamp;
    let baseTimeSec = Math.floor(new Date(baseTime).getTime() / 1000);
    if (isNaN(baseTimeSec)) {
      baseTimeSec = Math.floor(Date.now() / 1000);
    }
    
    const parsed = parseDiscordMessage(fullText, baseTimeSec);
    if (parsed) {
      const totalItems = (parsed.seeds?.length || 0) + 
                         (parsed.gears?.length || 0) + 
                         (parsed.props?.length || 0) + 
                         (parsed.weathers?.length || 0);
                         
      if (totalItems > 0) {
        currentPredictions = parsed;
        savePredictionsData();
        broadcast({
          type: 'predictions',
          predictions: preparePredictionsResponse(currentPredictions)
        });
        console.log(`Successfully fetched and updated predictions from Discord (${totalItems} items).`);
      } else {
        console.warn('Fetched Discord message contained 0 prediction items. Skipping update to prevent wiping out data.');
      }
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
    predictions: preparePredictionsResponse(currentPredictions)
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
