// Translation Dictionary
const translations = {
  ru: {
    title: 'Grow a Garden 2',
    subtitle: 'Мониторинг стоков и оповещения',
    statusOnline: 'В сети',
    statusOffline: 'Офлайн',
    lastUpdatedNever: 'Последнее обновление: Никогда',
    lastUpdatedPrefix: 'Обновлено: ',
    lastUpdatedWaiting: 'Ожидание данных...',
    restockHeader: '<i class="fa-solid fa-clock"></i> Таймеры Завоза (Restock)',
    timerLabelCrates: 'Crates',
    timerLabelGears: 'Gears',
    timerLabelSeeds: 'Normal Seeds',
    restockAlertText: 'Завоз!',
    notificationBanner: '<strong>Уведомления на экран:</strong> Кликните на колокольчик 🔔 на карточке любого предмета. Браузер пришлет вам звуковое push-уведомление на экран, как только этот предмет появится в наличии!',
    searchPlaceholder: 'Поиск предметов...',
    filterAll: 'Все',
    filterInStock: 'В наличии',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Магазин Ящиков (Crates)',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Снаряжение (Gears)',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Обычные семена (Seeds)',
    sectionApi: '<i class="fa-solid fa-code"></i> Открытый API для разработчиков',
    apiDescription: 'Используйте наш открытый API для интеграции с вашими Telegram-ботами, Discord-ботами или другими сайтами.',
    apiShowSample: 'Показать пример ответа (JSON) и код интеграции',
    apiJsonSample: 'Пример JSON ответа:',
    apiPythonSample: 'Пример на Python:',
    apiJsSample: 'Пример на JavaScript (Node.js):',
    loadingPlaceholder: 'Ожидание данных от Roblox бота...',
    noItemsPlaceholder: 'Нет предметов по заданным фильтрам',
    inStockText: ' шт.',
    outOfStockText: 'Нет стока',
    bellTrack: 'Оповестить при завозе',
    bellUntrack: 'Отключить уведомление о завозе',
    notificationGrantedAlert: 'Пожалуйста, разрешите отправку уведомлений в браузере для этой функции!',
    notificationBlockedAlert: 'Уведомления заблокированы. Включите доступ к уведомлениям для этого сайта в настройках браузера.',
    notifInStockTitle: '🔔 Предмет уже в наличии!',
    notifTrackedTitle: '🔔 Уведомление настроено!',
    notifInStockBody: (name, stock, price) => `"${name}" прямо сейчас в наличии: ${stock} шт. | Цена: ${price}`,
    notifTrackedBody: (name) => `Мы оповестим вас, когда "${name}" появится в наличии.`,
    pushTitle: (name) => `🔔 ${name} в наличии!`,
    pushBody: (stock, price, rarity) => `Сток: ${stock} шт. | Цена: ${price} | Редкость: ${rarity}\nСпеши купить в Grow a Garden 2!`,
    
    // Weather Card Localizations
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Погода и Время Суток',
    weatherLabelTime: 'Время суток',
    weatherLabelActive: 'Активная погода',
    timeDay: 'День ☀️',
    timeNight: 'Ночь 🌙',
    weatherNone: 'Нет ☀️',
    phasechainedmoon: 'Цепная луна ⛓️',
    phasegoldmoon: 'Золотая луна 🟡',
    phasebloodmoon: 'Кровавая луна 🔴',
    phasepizzamoon: 'Пицца-луна 🍕',
    phaserainbowmoon: 'Радужная луна 🌈',
    phasesunset: 'Закат 🌇',
    phaseday: 'День ☀️',
    phasemoon: 'Ночь 🌙',
    timeStarted: 'Начало в {}',
    timeEnded: 'Конец в {}',
    weatherEndsIn: 'Закончится через: {}'
  },
  en: {
    title: 'Grow a Garden 2',
    subtitle: 'Live Stock Tracker & Alerts',
    statusOnline: 'Online',
    statusOffline: 'Offline',
    lastUpdatedNever: 'Last updated: Never',
    lastUpdatedPrefix: 'Updated: ',
    lastUpdatedWaiting: 'Waiting for data...',
    restockHeader: '<i class="fa-solid fa-clock"></i> Restock Timers',
    timerLabelCrates: 'Crates',
    timerLabelGears: 'Gears',
    timerLabelSeeds: 'Normal Seeds',
    restockAlertText: 'Restocked!',
    notificationBanner: '<strong>Screen Notifications:</strong> Click the bell icon 🔔 on any item card. The browser will play a sound and show a push notification as soon as that item is back in stock!',
    searchPlaceholder: 'Search items...',
    filterAll: 'All',
    filterInStock: 'In Stock',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Crate Shop',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Gear Shop',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Normal Seeds',
    sectionApi: '<i class="fa-solid fa-code"></i> Developer Open API',
    apiDescription: 'Use our open API to integrate with your Telegram bots, Discord bots, or other websites.',
    apiShowSample: 'Show JSON response example and integration code',
    apiJsonSample: 'JSON response example:',
    apiPythonSample: 'Python example:',
    apiJsSample: 'JavaScript (Node.js) example:',
    loadingPlaceholder: 'Waiting for Roblox bot data...',
    noItemsPlaceholder: 'No items match your filters',
    inStockText: ' pcs.',
    outOfStockText: 'Out of stock',
    bellTrack: 'Notify when in stock',
    bellUntrack: 'Mute stock notifications',
    notificationGrantedAlert: 'Please allow browser notification permissions for this feature!',
    notificationBlockedAlert: 'Notifications are blocked. Please enable notifications for this site in your browser settings.',
    notifInStockTitle: '🔔 Item is in stock!',
    notifTrackedTitle: '🔔 Notification configured!',
    notifInStockBody: (name, stock, price) => `"${name}" is in stock right now: ${stock} pcs. | Price: ${price}`,
    notifTrackedBody: (name) => `We will notify you as soon as "${name}" is back in stock.`,
    pushTitle: (name) => `🔔 ${name} in stock!`,
    pushBody: (stock, price, rarity) => `Stock: ${stock} pcs. | Price: ${price} | Rarity: ${rarity}\nHurry up to buy in Grow a Garden 2!`,
    
    // Weather Card Localizations
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Weather & Time',
    weatherLabelTime: 'Time of Day',
    weatherLabelActive: 'Active Weather',
    timeDay: 'Day ☀️',
    timeNight: 'Night 🌙',
    weatherNone: 'None ☀️',
    phasechainedmoon: 'Chained Moon ⛓️',
    phasegoldmoon: 'Goldmoon 🟡',
    phasebloodmoon: 'Blood Moon 🔴',
    phasepizzamoon: 'Pizza Moon 🍕',
    phaserainbowmoon: 'Rainbow Moon 🌈',
    phasesunset: 'Sunset 🌇',
    phaseday: 'Day ☀️',
    phasemoon: 'Night 🌙',
    timeStarted: 'Started at {}',
    timeEnded: 'Ended at {}',
    weatherEndsIn: 'Ends in: {}'
  }
};

// State Management
let currentLang = localStorage.getItem('siteLang') || 'ru';
let stockData = null;
let statusData = null;
let activeRarityFilter = 'all'; // 'all', 'rare+', 'epic+'
let activeStockFilter = false; // true/false
let searchQuery = '';
let lastWeatherKey = '';

// Notification Subscriptions
let trackedItems = new Set(JSON.parse(localStorage.getItem('trackedItems') || '[]'));

// DOM Elements
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const lastUpdatedText = document.getElementById('last-updated-text');
const apiStatusBadge = document.getElementById('api-status-badge');
const langRuBtn = document.getElementById('lang-ru-btn');
const langEnBtn = document.getElementById('lang-en-btn');

const crateGrid = document.getElementById('crate-shop-grid');
const gearGrid = document.getElementById('gear-shop-grid');
const seedGrid = document.getElementById('seed-shop-grid');

// Translation Functions
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('siteLang', lang);
  
  // Update switcher buttons UI
  if (currentLang === 'ru') {
    langRuBtn.classList.add('active');
    langEnBtn.classList.remove('active');
  } else {
    langEnBtn.classList.add('active');
    langRuBtn.classList.remove('active');
  }
  
  lastWeatherKey = '';
  updateStaticTranslations();
  if (stockData) {
    renderDashboard();
  }
}

function updateStaticTranslations() {
  const t = translations[currentLang];
  
  // Header
  document.querySelector('.dashboard-header .subtitle').textContent = t.subtitle;
  
  // Status Bar
  if (statusData) {
    updateStatusUI(statusData);
  } else {
    updateOfflineStatus();
  }
  
  // Restock Headers & Labels
  document.querySelector('.restock-card h3').innerHTML = t.restockHeader;
  const timerLabels = document.querySelectorAll('.timer-box .timer-label');
  if (timerLabels.length >= 3) {
    timerLabels[0].textContent = t.timerLabelCrates;
    timerLabels[1].textContent = t.timerLabelGears;
    timerLabels[2].textContent = t.timerLabelSeeds;
  }
  
  // Weather Card Header & Labels
  const weatherCardHeader = document.querySelector('.weather-card h3');
  if (weatherCardHeader) {
    weatherCardHeader.innerHTML = t.weatherHeader;
  }
  const weatherLabels = document.querySelectorAll('.weather-box .weather-label');
  if (weatherLabels.length >= 2) {
    weatherLabels[0].textContent = t.weatherLabelTime;
    weatherLabels[1].textContent = t.weatherLabelActive;
  }
  
  // Notification Banner
  document.querySelector('.notification-banner p').innerHTML = t.notificationBanner;
  
  // Filters
  searchInput.placeholder = t.searchPlaceholder;
  filterBtns.forEach(btn => {
    const rarity = btn.getAttribute('data-rarity');
    const stock = btn.getAttribute('data-stock');
    if (rarity === 'all') {
      btn.textContent = t.filterAll;
    } else if (stock === 'in-stock') {
      btn.textContent = t.filterInStock;
    }
  });
  
  // Section Titles
  document.querySelector('#crates-section .section-title').innerHTML = t.sectionCrates;
  document.querySelector('#gears-section .section-title').innerHTML = t.sectionGears;
  document.querySelector('#seeds-section .section-title').innerHTML = t.sectionSeeds;
  
  // API Section
  document.querySelector('.api-docs-section .section-title').innerHTML = t.sectionApi;
  document.querySelector('.api-docs-section p').textContent = t.apiDescription;
  document.querySelector('.api-details summary').textContent = t.apiShowSample;
  
  const apiHeaders = document.querySelectorAll('.details-body h5');
  if (apiHeaders.length >= 3) {
    apiHeaders[0].textContent = t.apiJsonSample;
    apiHeaders[1].textContent = t.apiPythonSample;
    apiHeaders[2].textContent = t.apiJsSample;
  }

  // If no data loaded yet, show translated placeholder
  if (!stockData) {
    const loaderHTML = `<div class="loading-placeholder">${t.loadingPlaceholder}</div>`;
    crateGrid.innerHTML = loaderHTML;
    gearGrid.innerHTML = loaderHTML;
    seedGrid.innerHTML = loaderHTML;
  }
}

// Add Switcher Event Listeners
langRuBtn.addEventListener('click', () => setLanguage('ru'));
langEnBtn.addEventListener('click', () => setLanguage('en'));

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

// Update Status Bar
function updateStatusUI(status) {
  const dot = apiStatusBadge.querySelector('.status-dot');
  const text = apiStatusBadge.querySelector('.status-text');
  
  if (status.status === 'online') {
    dot.className = 'status-dot online pulsing';
    text.textContent = translations[currentLang].statusOnline;
  } else {
    updateOfflineStatus();
  }

  // Last Updated
  if (status.lastUpdated) {
    const date = new Date(status.lastUpdated);
    lastUpdatedText.textContent = `${translations[currentLang].lastUpdatedPrefix}${date.toLocaleTimeString()}`;
  } else {
    lastUpdatedText.textContent = translations[currentLang].lastUpdatedWaiting;
  }
}

function updateOfflineStatus() {
  const dot = apiStatusBadge.querySelector('.status-dot');
  const text = apiStatusBadge.querySelector('.status-text');
  dot.className = 'status-dot';
  text.textContent = translations[currentLang].statusOffline;
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
    el.textContent = translations[currentLang].restockAlertText;
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

// Weather Update Engine
function updateWeatherUI() {
  const weatherContainer = document.querySelector('.weather-container');
  const timeBox = document.getElementById('weather-time-box');
  const t = translations[currentLang];

  if (!stockData || !stockData.weather) {
    document.getElementById('time-val').textContent = '--';
    document.getElementById('time-detail').textContent = '--:--:--';
    
    // Clear dynamic weather items and restore default "None" box
    if (weatherContainer && timeBox) {
      const childrenToRemove = Array.from(weatherContainer.children).filter(child => child !== timeBox);
      childrenToRemove.forEach(child => child.remove());
      
      const weatherBox = document.createElement('div');
      weatherBox.className = 'weather-box active-weather-item';
      weatherBox.id = 'weather-active-box';
      weatherBox.innerHTML = `
        <span class="weather-label">${t.weatherLabelActive}</span>
        <span class="weather-val" style="color: var(--text-secondary)">--</span>
        <span class="weather-detail weather-timer-countdown">--:--:--</span>
      `;
      weatherContainer.appendChild(weatherBox);
    }
    lastWeatherKey = 'none';
    return;
  }
  
  const w = stockData.weather;
  
  // 1. Time cycle phase / day phase
  let phase = w.phase || '';
  if (!phase) {
    phase = w.night ? 'moon' : 'day';
  }
  const phaseLower = phase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  const timeValEl = document.getElementById('time-val');
  const timeDetailEl = document.getElementById('time-detail');
  
  if (timeValEl && timeDetailEl) {
    const phaseTranslationKey = 'phase' + phaseLower;
    let phaseText = t[phaseTranslationKey];
    
    // Fallback if phase translation is missing
    if (!phaseText) {
      phaseText = w.night ? t.timeNight : t.timeDay;
    }
    
    timeValEl.textContent = phaseText;
    
    // Stylize phase color based on category
    if (phaseLower === 'day' || phaseLower === 'sunset' || phaseLower === 'goldmoon') {
      timeValEl.style.color = 'var(--rarity-legendary)'; // Gold / Orange
    } else if (phaseLower === 'bloodmoon') {
      timeValEl.style.color = 'var(--color-danger)'; // Red
    } else if (phaseLower === 'chainedmoon') {
      timeValEl.style.color = 'var(--text-secondary)'; // Gray
    } else if (phaseLower === 'pizzamoon') {
      timeValEl.style.color = 'var(--color-grass)'; // Green
    } else if (phaseLower === 'rainbowmoon') {
      timeValEl.style.color = 'var(--rarity-rare)'; // Blue
    } else {
      timeValEl.style.color = 'var(--rarity-epic)'; // Purple/Epic default night moon
    }
    
    if (w.night && w.nightStartedAt) {
      const date = new Date(w.nightStartedAt * 1000);
      timeDetailEl.textContent = t.timeStarted.replace('{}', date.toLocaleTimeString());
    } else if (!w.night && w.nightEndedAt) {
      const date = new Date(w.nightEndedAt * 1000);
      timeDetailEl.textContent = t.timeStarted.replace('{}', date.toLocaleTimeString());
    } else {
      timeDetailEl.textContent = '--:--:--';
    }
  }
  
  // 2. Collect active weathers
  const activeWeathers = [];
  if (w.weathers) {
    for (const [name, info] of Object.entries(w.weathers)) {
      if (info.playing) {
        activeWeathers.push({ name, endTime: info.endTime });
      }
    }
  }
  
  // Create a unique key for the current active weathers to check if structure changed
  const currentKey = activeWeathers.map(aw => aw.name).sort().join(',') || 'none';
  
  if (weatherContainer && timeBox) {
    if (currentKey !== lastWeatherKey) {
      // Rebuild the weather items list
      const childrenToRemove = Array.from(weatherContainer.children).filter(child => child !== timeBox);
      childrenToRemove.forEach(child => child.remove());
      
      if (activeWeathers.length > 0) {
        activeWeathers.forEach(({ name, endTime }) => {
          const weatherBox = document.createElement('div');
          weatherBox.className = 'weather-box active-weather-item';
          weatherBox.setAttribute('data-name', name);
          weatherBox.setAttribute('data-endtime', endTime);
          
          let colorStyle = 'var(--text-secondary)';
          if (name.toLowerCase().includes('star')) {
            colorStyle = 'var(--rarity-legendary)';
          } else if (name.toLowerCase().includes('rain')) {
            colorStyle = 'var(--rarity-exotic)';
          } else {
            colorStyle = 'var(--rarity-rare)';
          }
          
          weatherBox.innerHTML = `
            <span class="weather-label">${t.weatherLabelActive}</span>
            <span class="weather-val" style="color: ${colorStyle}">${name}</span>
            <span class="weather-detail weather-timer-countdown">--:--:--</span>
          `;
          weatherContainer.appendChild(weatherBox);
        });
      } else {
        // Rebuild fallback "None" box
        const weatherBox = document.createElement('div');
        weatherBox.className = 'weather-box active-weather-item';
        weatherBox.id = 'weather-active-box';
        weatherBox.innerHTML = `
          <span class="weather-label">${t.weatherLabelActive}</span>
          <span class="weather-val" style="color: var(--text-secondary)">${t.weatherNone}</span>
          <span class="weather-detail weather-timer-countdown">--:--:--</span>
        `;
        weatherContainer.appendChild(weatherBox);
      }
      lastWeatherKey = currentKey;
    }
    
    // 3. Update countdown timers for all active weather items currently in DOM
    const now = Math.floor(Date.now() / 1000);
    const activeItems = weatherContainer.querySelectorAll('.active-weather-item');
    activeItems.forEach(box => {
      const endTimeAttr = box.getAttribute('data-endtime');
      const timerEl = box.querySelector('.weather-timer-countdown');
      if (!timerEl) return;
      
      if (!endTimeAttr || endTimeAttr === '0') {
        timerEl.textContent = '--:--:--';
        return;
      }
      
      const endTime = parseInt(endTimeAttr, 10);
      const diff = endTime - now;
      
      if (diff <= 0) {
        timerEl.textContent = '--:--:--';
      } else {
        const mins = Math.floor(diff / 60);
        const secs = diff % 60;
        timerEl.textContent = t.weatherEndsIn.replace('{}', `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }
    });
  }
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
    gridElement.innerHTML = `<div class="loading-placeholder">${translations[currentLang].noItemsPlaceholder}</div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    const rarityClass = `rarity-${item.rarity.toLowerCase()}`;
    const badgeClass = `badge-${item.rarity.toLowerCase()}`;
    
    const inStock = item.stock > 0;
    const cardClass = inStock ? `item-card ${rarityClass}` : `item-card ${rarityClass} stock-out-card`;

    const stockHtml = inStock 
      ? `<span class="item-stock stock-in"><i class="fa-solid fa-circle-check"></i> ${item.stock}${translations[currentLang].inStockText}</span>`
      : `<span class="item-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> ${translations[currentLang].outOfStockText}</span>`;

    // Notification bell button state
    const isTracked = trackedItems.has(item.name);
    const bellClass = isTracked ? 'bell-active' : '';
    const bellIcon = isTracked ? 'fa-solid fa-bell' : 'fa-regular fa-bell';
    const bellTitle = isTracked ? translations[currentLang].bellUntrack : translations[currentLang].bellTrack;

    const imageHtml = item.image 
      ? `<div class="item-image-wrapper"><img src="${item.image}" alt="${item.name}" class="item-card-image" loading="lazy"></div>`
      : '';

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
      <div class="item-main-content">
        ${imageHtml}
        <div class="item-body">
          ${stockHtml}
          <span class="item-price"><i class="fa-solid fa-coins price-icon"></i> ${item.price}</span>
        </div>
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
  const t = translations[currentLang];
  const title = t.pushTitle(item.name);
  const options = {
    body: t.pushBody(item.stock, item.price, item.rarity),
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
      alert(translations[currentLang].notificationGrantedAlert);
      return;
    }
  } else if (Notification.permission === 'denied') {
    alert(translations[currentLang].notificationBlockedAlert);
    return;
  }

  const icon = btn.querySelector('i');
  if (trackedItems.has(itemName)) {
    trackedItems.delete(itemName);
    btn.classList.remove('bell-active');
    icon.className = 'fa-regular fa-bell';
    btn.setAttribute('title', translations[currentLang].bellTrack);
  } else {
    trackedItems.add(itemName);
    btn.classList.add('bell-active');
    icon.className = 'fa-solid fa-bell';
    btn.setAttribute('title', translations[currentLang].bellUntrack);
    
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
      ? translations[currentLang].notifInStockTitle 
      : translations[currentLang].notifTrackedTitle;
      
    const testOptions = {
      body: currentItem && currentItem.stock > 0 
        ? translations[currentLang].notifInStockBody(itemName, currentItem.stock, currentItem.price)
        : translations[currentLang].notifTrackedBody(itemName),
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
setLanguage(currentLang); // Setup initial translation language
fetchData();
setInterval(fetchData, 5000); // Poll API data every 5 seconds

// Tick timers and update weather UI every second
setInterval(() => {
  updateTimers();
  updateWeatherUI();
}, 1000);

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
