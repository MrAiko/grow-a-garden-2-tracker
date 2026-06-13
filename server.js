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
app.use(express.json({ limit: '500kb' })); // Limit payload size to prevent RAM exhaust crashes
app.use(express.static(path.join(__dirname, 'public')));

// Cache in-memory
let currentStock = null;

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
  res.json(currentStock);
});

app.post('/api/update-stock', rateLimiter(20, 60000), (req, res) => {
  const reqPassword = req.headers['x-api-password'] || req.body.password;
  if (reqPassword !== API_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newStock = req.body;
  if (!newStock || !newStock.shops) {
    return res.status(400).json({ error: 'Invalid stock data structure' });
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
