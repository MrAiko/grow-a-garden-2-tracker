// State Management
let stockData = null;
let statusData = null;
let activeRarityFilter = 'all'; // 'all', 'rare+', 'epic+'
let activeStockFilter = false; // true/false
let searchQuery = '';

// Notification Subscriptions
let trackedItems = new Set(JSON.parse(localStorage.getItem('trackedItems') || '[]'));

// DOM Elements
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const lastUpdatedText = document.getElementById('last-updated-text');
const apiStatusBadge = document.getElementById('api-status-badge');

const crateGrid = document.getElementById('crate-shop-grid');
const gearGrid = document.getElementById('gear-shop-grid');
const seedGrid = document.getElementById('seed-shop-grid');

// API Poll Functions
async function fetchData() {
  try {
    const [stockRes, statusRes] = await Promise.all([
      fetch('/api/stock'),
      fetch('/api/status')
    ]);

    if (stockRes.ok) {
      const newStockData = await stockRes.json();
      checkForNotifications(newStockData);
      stockData = newStockData;
      updateWeatherUI(stockData);
    }
    
    if (statusRes.ok) {
      statusData = await statusRes.json();
      updateStatusUI(statusData);
    }
    
    if (stockData) {
      renderDashboard();
    }
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    updateOfflineStatus();
  }
}

// Update Weather Display
function updateWeatherUI(data) {
  const weatherLabel = document.getElementById('weather-label-text');
  const weatherValue = document.getElementById('weather-value-text');
  const weatherEffect = document.getElementById('weather-effect-text');
  
  if (!weatherLabel || !weatherValue || !weatherEffect) return;
  
  let weather = data.weather || 'Sunny';
  // Remove Roblox asset IDs, links, query parameters, and clean up spaces
  weather = weather.replace(/rbxassetid:\/\/\d+/gi, '')
                   .replace(/https?:\/\/\S+/gi, '')
                   .replace(/AssetId=\d+/gi, '');
                   
  // Remove emojis from the text string to prevent duplicates
  const weatherText = weather.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu, '').trim();
  const weatherClean = weatherText.replace(/\s+/g, ' ') || 'Sunny';
  const weatherLower = weatherClean.toLowerCase();
  
  let emoji = '☀️';
  let effect = 'Эффект: Нормальная скорость роста / Default growth speed';
  
  if (weatherLower.includes('rain') && !weatherLower.includes('acid')) {
    emoji = '🌧️';
    effect = '🌧️ Эффект: Ускоренный рост в 2 раза! / 2x growth speed!';
  } else if (weatherLower.includes('lightning') || weatherLower.includes('thunder')) {
    emoji = '⚡';
    effect = '⚡ Эффект: Шанс мутации «Заряженный» (80x)! / Mutation chance «Electric» (80x)!';
  } else if (weatherLower.includes('rainbow')) {
    emoji = '🌈';
    effect = '🌈 Эффект: Повышенный шанс на семена Rainbow! / Higher Rainbow seed chance!';
  } else if (weatherLower.includes('snow')) {
    emoji = '❄️';
    effect = '❄️ Эффект: Шанс мутации «Замороженный» (40x)! / Mutation chance «Frozen» (40x)!';
  } else if (weatherLower.includes('star')) {
    emoji = '✨';
    effect = '✨ Эффект: Шанс мутации «Космический» (25x)! / Mutation chance «Starstruck» (25x)!';
  } else if (weatherLower.includes('midas') || weatherLower.includes('gold')) {
    emoji = '👑';
    effect = '👑 Эффект: Мутация Midas (10x) & золотые семена! / Midas mutation (10x) & Golden seeds!';
  } else if (weatherLower.includes('acid')) {
    emoji = '🧪';
    effect = '🧪 Эффект: Опасность для посевов! / Acid Rain risk!';
  }
  
  weatherValue.innerHTML = `<span class="weather-emoji">${emoji}</span> ${weatherClean}`;
  weatherEffect.textContent = effect;
}

// Update Status Bar
function updateStatusUI(status) {
  const dot = apiStatusBadge.querySelector('.status-dot');
  const text = apiStatusBadge.querySelector('.status-text');
  
  if (status.status === 'online') {
    dot.className = 'status-dot online pulsing';
    text.textContent = 'В сети';
  } else {
    updateOfflineStatus();
  }

  // Last Updated
  if (status.lastUpdated) {
    const date = new Date(status.lastUpdated);
    lastUpdatedText.textContent = `Обновлено: ${date.toLocaleTimeString()}`;
  } else {
    lastUpdatedText.textContent = 'Ожидание данных...';
  }
}

function updateOfflineStatus() {
  const dot = apiStatusBadge.querySelector('.status-dot');
  const text = apiStatusBadge.querySelector('.status-text');
  dot.className = 'status-dot';
  text.textContent = 'Офлайн';
}

// Countdown Timers Engine
function updateTimers() {
  if (!stockData || !stockData.restockTimes) return;

  const times = stockData.restockTimes;
  
  updateTimerBox('timer-crates', times.CrateShop ? times.CrateShop.next : 0);
  updateTimerBox('timer-gears', times.GearShop ? times.GearShop.next : 0);
  updateTimerBox('timer-seeds', times.SeedShop ? times.SeedShop.next : 0);
}

function updateTimerBox(elementId, nextTimestamp) {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (!nextTimestamp || nextTimestamp === 0) {
    el.textContent = '--:--:--';
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  const diff = nextTimestamp - now;

  if (diff <= 0) {
    el.textContent = 'Завоз!';
    el.style.color = 'var(--color-success)';
    el.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.4)';
    return;
  }

  el.style.color = 'var(--color-primary)';
  el.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.3)';

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  el.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Cards Rendering Engine
function renderDashboard() {
  if (!stockData || !stockData.shops) return;

  renderShopGrid(crateGrid, stockData.shops.CrateShop || []);
  renderShopGrid(gearGrid, stockData.shops.GearShop || []);
  renderShopGrid(seedGrid, stockData.shops.SeedShop_Normal || []);
}

function renderShopGrid(gridElement, items) {
  gridElement.innerHTML = '';
  
  // Filter logic
  const filtered = items.filter(item => {
    // client-side safety filter for layout/technical artifacts
    const ln = item.name.toLowerCase();
    if (ln === 'itemtemplate' || ln === 'template' || ln === 'padding' || ln === 'uipadding' || ln === 'uipadting' || ln === 'robux_shelf' || ln === 'sheckles_shelf' || ln === 'shackles_shelf' || ln === 'buttons' || ln.includes('padding') || ln.includes('template') || ln.includes('shelf') || ln.includes('layout')) {
      return false;
    }

    // Search query match
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Stock state match
    if (activeStockFilter && item.stock <= 0) {
      return false;
    }

    // Rarity match
    const rarity = item.rarity.toLowerCase();
    const rareRarities = ['rare', 'epic', 'legendary', 'secret', 'exotic', 'super', 'mythic', 'divine'];
    const epicRarities = ['epic', 'legendary', 'secret', 'exotic', 'super', 'mythic', 'divine'];

    if (activeRarityFilter === 'rare+' && !rareRarities.includes(rarity)) {
      return false;
    }
    if (activeRarityFilter === 'epic+' && !epicRarities.includes(rarity)) {
      return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    gridElement.innerHTML = '<div class="loading-placeholder">Нет предметов по заданным фильтрам</div>';
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    const rarityClass = `rarity-${item.rarity.toLowerCase()}`;
    const badgeClass = `badge-${item.rarity.toLowerCase()}`;
    
    const inStock = item.stock > 0;
    const cardClass = inStock ? `item-card ${rarityClass}` : `item-card ${rarityClass} stock-out-card`;

    const stockHtml = inStock 
      ? `<span class="item-stock stock-in"><i class="fa-solid fa-circle-check"></i> ${item.stock} шт.</span>`
      : `<span class="item-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> Нет стока</span>`;

    // Notification bell button state
    const isTracked = trackedItems.has(item.name);
    const bellClass = isTracked ? 'bell-active' : '';
    const bellIcon = isTracked ? 'fa-solid fa-bell' : 'fa-regular fa-bell';
    const bellTitle = isTracked ? 'Отключить уведомление о завозе' : 'Оповестить при завозе';

    card.className = cardClass;
    card.innerHTML = `
      <div class="item-header">
        <div class="name-container">
          <button class="bell-btn ${bellClass}" data-name="${item.name}" title="${bellTitle}">
            <i class="${bellIcon}"></i>
          </button>
          <h4 class="item-name" title="${item.name}">${item.name}</h4>
        </div>
        <span class="item-badge ${badgeClass}">${item.rarity}</span>
      </div>
      <div class="item-body">
        ${stockHtml}
        <span class="item-price"><i class="fa-solid fa-coins price-icon"></i> ${item.price}</span>
      </div>
    `;
    
    gridElement.appendChild(card);
  });
}

// Push Notifications Engine
function checkForNotifications(newData) {
  if (!stockData || !stockData.shops) {
    return; // Do not notify on initial load
  }

  for (const shopKey of Object.keys(newData.shops)) {
    const oldItems = stockData.shops[shopKey] || [];
    const newItems = newData.shops[shopKey] || [];

    const oldStockMap = {};
    oldItems.forEach(item => {
      oldStockMap[item.name] = item.stock;
    });

    // Determine if this shop just restocked (compare next timestamp)
    const restockKey = shopKey === 'SeedShop_Normal' ? 'SeedShop' : shopKey;
    const oldNext = stockData.restockTimes[restockKey] ? stockData.restockTimes[restockKey].next : 0;
    const newNext = newData.restockTimes[restockKey] ? newData.restockTimes[restockKey].next : 0;
    const shopRestocked = oldNext !== newNext && newNext > 0;

    newItems.forEach(item => {
      const oldStock = oldStockMap[item.name] !== undefined ? oldStockMap[item.name] : 0;
      const newStock = item.stock;

      // Trigger notification if:
      // - user is tracking this item, AND
      // - (item stock went from 0 to >0 OR shop restocked and item is still in stock >0)
      const isRestocked = (oldStock === 0 && newStock > 0) || (shopRestocked && newStock > 0);

      if (trackedItems.has(item.name) && isRestocked) {
        triggerNotification(item);
      }
    });
  }
}

function triggerNotification(item) {
  const title = `🔔 ${item.name} в наличии!`;
  const options = {
    body: `Сток: ${item.stock} шт. | Цена: ${item.price} | Редкость: ${item.rarity}\nСпеши купить в Grow a Garden 2!`,
    icon: 'https://raw.githubusercontent.com/MrAiko/icon/main/2026-06-13_01-19-10.png',
    badge: 'https://raw.githubusercontent.com/MrAiko/icon/main/2026-06-13_01-19-10.png',
    tag: 'stock-alert-' + item.name,
    requireInteraction: true
  };

  if (Notification.permission === 'granted') {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, options);
      });
    } else {
      new Notification(title, options);
    }
    playAlertSound();
  }
}

async function toggleTracking(itemName, btn) {
  if (Notification.permission === 'default') {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') {
      alert('Пожалуйста, разрешите отправку уведомлений в браузере для этой функции!');
      return;
    }
  } else if (Notification.permission === 'denied') {
    alert('Уведомления заблокированы. Включите доступ к уведомлениям для этого сайта в настройках браузера.');
    return;
  }

  const icon = btn.querySelector('i');
  if (trackedItems.has(itemName)) {
    trackedItems.delete(itemName);
    btn.classList.remove('bell-active');
    icon.className = 'fa-regular fa-bell';
    btn.setAttribute('title', 'Оповестить при завозе');
  } else {
    trackedItems.add(itemName);
    btn.classList.add('bell-active');
    icon.className = 'fa-solid fa-bell';
    btn.setAttribute('title', 'Отключить уведомление о завозе');
    
    // Check if the item is currently in stock in stockData
    let currentItem = null;
    if (stockData && stockData.shops) {
      for (const shopKey of Object.keys(stockData.shops)) {
        const item = stockData.shops[shopKey].find(i => i.name === itemName);
        if (item) {
          currentItem = item;
          break;
        }
      }
    }

    const testTitle = currentItem && currentItem.stock > 0 
      ? `🔔 Предмет уже в наличии!` 
      : `🔔 Уведомление настроено!`;
      
    const testOptions = {
      body: currentItem && currentItem.stock > 0 
        ? `"${itemName}" прямо сейчас в наличии: ${currentItem.stock} шт. | Цена: ${currentItem.price}`
        : `Мы оповестим вас, когда "${itemName}" появится в наличии.`,
      icon: 'https://raw.githubusercontent.com/MrAiko/icon/main/2026-06-13_01-19-10.png',
      badge: 'https://raw.githubusercontent.com/MrAiko/icon/main/2026-06-13_01-19-10.png'
    };

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(testTitle, testOptions);
      });
    } else {
      new Notification(testTitle, testOptions);
    }
    playAlertSound();
  }

  localStorage.setItem('trackedItems', JSON.stringify(Array.from(trackedItems)));
}

// Event Listeners for Filters
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderDashboard();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const rarity = btn.getAttribute('data-rarity');
    const stock = btn.getAttribute('data-stock');

    if (rarity) {
      filterBtns.forEach(b => {
        if (b.hasAttribute('data-rarity')) b.classList.remove('active');
      });
      activeRarityFilter = rarity;
      btn.classList.add('active');
    }

    if (stock) {
      activeStockFilter = !activeStockFilter;
      btn.classList.toggle('active', activeStockFilter);
    }

    renderDashboard();
  });
});

// Event Delegation for Bell Buttons
document.addEventListener('click', (e) => {
  const bell = e.target.closest('.bell-btn');
  if (bell) {
    const name = bell.getAttribute('data-name');
    toggleTracking(name, bell);
  }
});

// Init and Loops
fetchData();
setInterval(fetchData, 5000); // Poll API data every 5 seconds
setInterval(updateTimers, 1000); // Tick timers every second

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered with scope:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

// Synthesise audio alert chime using Web Audio API
function playAlertSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playNote = (freq, startTime, duration) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gainNode.gain.setValueAtTime(0.12, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    const now = audioCtx.currentTime;
    playNote(523.25, now, 0.15); // Note C5
    playNote(659.25, now + 0.12, 0.25); // Note E5
  } catch (e) {
    console.warn('AudioContext chime audio failed to play:', e);
  }
}
