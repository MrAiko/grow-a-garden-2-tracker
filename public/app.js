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
    phasemegamoon: 'Мега луна 🌕',
    phasesunset: 'Закат 🌇',
    phaseday: 'День ☀️',
    phasemoon: 'Ночь 🌙',
    timeStarted: 'Начало в {}',
    timeEnded: 'Конец в {}',
    weatherEndsIn: 'Закончится через: {}',
    usersOnline: (count) => `${count}`,
    predictionsHeader: '<i class="fa-solid fa-hourglass-half"></i> Будущие завозы и погода',
    predictionTabSeeds: '<i class="fa-solid fa-leaf"></i> Семена',
    predictionTabGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Снаряжение',
    predictionTabCrates: '<i class="fa-solid fa-box-open"></i> Ящики',
    predictionTabWeather: '<i class="fa-solid fa-cloud-moon"></i> Погода и Луны',
    predictionStatusUpcoming: 'Будущие',
    predictionStatusPast: 'Прошедшие',
    predictionTimeIn: 'через {}',
    predictionTimeAgo: '{} назад',
    predictionTimeSoon: 'Скоро',
    predictionTimeJustNow: 'Только что',
    predictionInHour: 'час',
    predictionMin: 'мин',
    predictionHour: 'ч',
    sidebarMultipliers: 'Множители продажи',
    predictionsWarning: '⚠️ Будущие завозы могут быть неточными из-за изменений на стороне игры.',
    bellTrackMultiplier: 'Оповестить при высоком множителе',
    bellUntrackMultiplier: 'Отключить уведомление о множителе',
    multiplierPushTitle: (name) => `📈 Высокий множитель: ${name}!`,
    multiplierPushBody: (rate, threshold) => `Текущий множитель x${rate} (порог уведомления: >= x${threshold})`,
    enterMultiplierPrompt: 'Введите минимальный множитель для оповещения (например, 2.0 или 1.5):',
    invalidMultiplierAlert: 'Пожалуйста, введите корректное число больше 0.'
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
    phasemegamoon: 'Mega Moon 🌕',
    phasesunset: 'Sunset 🌇',
    phaseday: 'Day ☀️',
    phasemoon: 'Night 🌙',
    timeStarted: 'Started at {}',
    timeEnded: 'Ended at {}',
    weatherEndsIn: 'Ends in: {}',
    usersOnline: (count) => `${count}`,
    predictionsHeader: '<i class="fa-solid fa-hourglass-half"></i> Future Predictions',
    predictionTabSeeds: '<i class="fa-solid fa-leaf"></i> Seeds',
    predictionTabGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Gears',
    predictionTabCrates: '<i class="fa-solid fa-box-open"></i> Crates',
    predictionTabWeather: '<i class="fa-solid fa-cloud-moon"></i> Weather & Moons',
    predictionStatusUpcoming: 'Upcoming',
    predictionStatusPast: 'Past',
    predictionTimeIn: 'in {}',
    predictionTimeAgo: '{} ago',
    predictionTimeSoon: 'Soon',
    predictionTimeJustNow: 'Just now',
    predictionInHour: 'hour',
    predictionMin: 'm',
    predictionHour: 'h',
    sidebarMultipliers: 'Sell Multipliers',
    predictionsWarning: '⚠️ Future stocks may be inaccurate due to in-game changes.',
    bellTrackMultiplier: 'Notify when high multiplier',
    bellUntrackMultiplier: 'Mute multiplier notifications',
    multiplierPushTitle: (name) => `📈 High Multiplier: ${name}!`,
    multiplierPushBody: (rate, threshold) => `Current rate is x${rate} (alert threshold: >= x${threshold})`,
    enterMultiplierPrompt: 'Enter minimum multiplier for alert (e.g., 2.0 or 1.5):',
    invalidMultiplierAlert: 'Please enter a valid number greater than 0.'
  }
};

// English to Russian item name translation mapping
const itemTranslations = {
  "acorn": "Желудь",
  "carrot": "Морковь",
  "strawberry": "Клубника",
  "watermelon": "Арбуз",
  "pumpkin": "Тыква",
  "sunflower": "Подсолнух",
  "wheat": "Пшеница",
  "tomato": "Помидор",
  "potato": "Картогель",
  "onion": "Лук",
  "corn": "Кукуруза",
  "pineapple": "Ананас",
  "cabbage": "Капуста",
  "dragonfruit": "Драконий фрукт",
  "starfruit": "Старфрут",
  "chili": "Перец чили",
  "blueberry": "Черника",
  "blackberry": "Ежевика",
  "raspberry": "Малина",
  "apple": "Яблоко",
  "grape": "Виноград",
  "orange": "Апельсин",
  "lemon": "Лимон",
  "banana": "Банан",
  "cherry": "Вишня",
  "berry": "Ягода",
  "coconut": "Кокос",
  "cactus": "Кактус",
  "bonsai": "Бонсай",
  "bamboo": "Бамбук",
  "rose": "Роза",
  "tulip": "Тюльпан",
  "lily": "Лилия",
  "orchid": "Орхидея",
  "lavender": "Лаванда",
  "golden apple": "Золотое яблоко",
  "golden carrot": "Золотая морковь",
  "magic seed": "Волшебные семена",
  "ancient seed": "Древние семена",
  "mushroom spore": "Споры грибов",
  "mushroom spores": "Споры грибов",
  "dragon fruit": "Драконий фрукт",
  "dragon's breath": "Дыхание дракона",
  "green bean": "Зеленая фасоль",
  "mango": "Манго",
  "moon bloom": "Лунное цветение",
  "mushroom": "Гриб",
  "poison apple": "Ядовитое яблоко",
  "pomegranate": "Гранат",
  "venus fly trap": "Венерина мухоловка",
  "horned melon": "Рогатая дыня",
  "baby cactus": "Маленький кактус",
  "glow mushroom": "Светящийся гриб",
  "poison ivy": "Ядовитый плющ",
  "ghost pepper": "Призрачный перец",
  "venom spitter": "Плюющийся ядом",
  "venom spitter seed": "Семена плюющегося ядом",
  "venom spitter seeds": "Семена плюющегося ядом",
  "megaphone": "Мегафон",
  "player magnet": "Магнит игроков",
  "pet teleporter": "Телепорт питомцев",
  "pet teleporters": "Телепорты питомцев",
  "bear": "Медведь",
  "gnome": "Гном",
  "ladder crate": "Ящик с лестницей",
  "bench crate": "Ящик со скамейкой",
  "light crate": "Световой ящик",
  "sign crate": "Ящик с вывесками",
  "arch crate": "Ящик с арками",
  "roleplay crate": "Ролевой ящик",
  "owner door crate": "Ящик с дверью владельца",
  "wood crate": "Деревянный ящик",
  "stone crate": "Каменный ящик",
  "iron crate": "Железный ящик",
  "gold crate": "Золотой ящик",
  "diamond crate": "Алмазный ящик",
  "toy crate": "Ящик с игрушками",
  "decoration crate": "Декоративный ящик",
  "furniture crate": "Ящик с мебелью",
  "garden crate": "Садовый ящик",
  "tool crate": "Ящик с инструментами",
  "basic crate": "Обычный ящик",
  "rare crate": "Редкий ящик",
  "epic crate": "Эпический ящик",
  "legendary crate": "Легендарный ящик",
  "tropical crate": "Тропический ящик",
  "medieval crate": "Средневековый ящик",
  "sci-fi crate": "Научно-фантастический ящик",
  "cyberpunk crate": "Ящик в стиле киберпанк",
  "halloween crate": "Хэллоуинский ящик",
  "christmas crate": "Новогодний ящик",
  "bridge crate": "Ящик с мостами",
  "spring crate": "Ящик с пружинами",
  "seesaw crate": "Ящик с качелями",
  "conveyor crate": "Конвейерный ящик",
  "common watering can": "Обычная лейка",
  "trowel": "Садовая лопатка",
  "rare sprinkler": "Редкий спринклер",
  "basic pot": "Обычный горшок",
  "watering can": "Лейка",
  "super watering can": "Супер-лейка",
  "golden watering can": "Золотая лейка",
  "diamond watering can": "Алмазная лейка",
  "sprinkler": "Спринклер",
  "rusty shovel": "Ржавая лопата",
  "shovel": "Лопата",
  "golden shovel": "Золотая лопата",
  "diamond shovel": "Алмазная лопата",
  "axe": "Топор",
  "golden axe": "Золотой топор",
  "diamond axe": "Алмазный топор",
  "pickaxe": "Кирка",
  "golden pickaxe": "Золотая кирка",
  "diamond pickaxe": "Алмазная кирка",
  "scissor": "Ножницы",
  "shears": "Секатор",
  "fertilizer": "Удобрение",
  "super fertilizer": "Суперудобрение",
  "speed grow": "Ускоритель роста",
  "pest spray": "Спрей от вредителей",
  "scythe": "Коса",
  "golden scythe": "Золотая коса",
  "diamond scythe": "Алмазная коса",
  "gloves": "Садовые перчатки",
  "gardening gloves": "Садовые перчатки",
  "hose": "Шланг",
  "water hose": "Водяной шланг",
  "auto-planter": "Авто-сажалка",
  "harvester": "Харвестер",
  "sign": "Вывеска",
  "lantern": "Фонарь",
  "wheelbarrow": "Тачка",
  "vine wrapper": "Виноградный обмотчик",
  "freeze ray": "Замораживающий луч",
  "rainbow carpet": "Радужный ковер",
  "jump mushroom": "Гриб прыгучести",
  "speed mushroom": "Гриб скорости",
  "invisibility mushroom": "Гриб невидимости"
};

// State Management
let currentLang = localStorage.getItem('siteLang') || 'ru';
let stockData = null;
let statusData = null;
let activeRarityFilter = 'all'; // 'all', 'rare+', 'epic+'
let activeStockFilter = false; // true/false
let searchQuery = '';
let lastWeatherKey = '';
let lastPhaseKey = '';
let predictionData = null;
let activePredictionTab = 'seeds';

const weatherImages = {
  day: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f31e/512.webp',
  sunset: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f307/512.webp',
  moon: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f319/512.webp',
  night: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f319/512.webp',
  bloodmoon: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f315/512.webp',
  goldmoon: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f315/512.webp',
  chainedmoon: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f315/512.webp',
  pizzamoon: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f355/512.webp',
  rainbowmoon: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f315/512.webp',
  solareclipse: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f311/512.webp',
  starfall: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f320/512.webp',
  rainbow: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f308/512.webp',
  snowfall: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f328/512.webp',
  rain: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f327/512.webp',
  thunderstorm: 'https://fonts.gstatic.com/s/e/notoemoji/latest/26c8/512.webp',
  lightning: 'https://fonts.gstatic.com/s/e/notoemoji/latest/26c8/512.webp',
  aurora: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f309/512.webp'
};

const weatherAssetIds = {
  day: '100486757307207',
  sunset: '86217612022586',
  moon: '91446334780160',
  night: '91446334780160',
  bloodmoon: '140465339393451',
  goldmoon: '84902063004871',
  rainbowmoon: '93602895495056',
  megamoon: '107925838920918'
};

const weatherOptions = {
  day: { emoji: '☀️', ru: 'День', en: 'Day' },
  sunset: { emoji: '🌇', ru: 'Закат', en: 'Sunset' },
  moon: { emoji: '🌙', ru: 'Ночь', en: 'Night' },
  bloodmoon: { emoji: '🔴', ru: 'Кровавая луна', en: 'Blood Moon' },
  goldmoon: { emoji: '🟡', ru: 'Золотая луна', en: 'Gold Moon' },
  chainedmoon: { emoji: '⛓️', ru: 'Цепная луна', en: 'Chained Moon' },
  pizzamoon: { emoji: '🍕', ru: 'Пицца-луна', en: 'Pizza Moon' },
  rainbowmoon: { emoji: '🌈', ru: 'Радужная луна', en: 'Rainbow Moon' },
  solareclipse: { emoji: '🌑', ru: 'Солнечное затмение', en: 'Solar Eclipse' },
  starfall: { emoji: '🌠', ru: 'Звездопад', en: 'Starfall' },
  rainbow: { emoji: '🌈', ru: 'Радуга', en: 'Rainbow' },
  snowfall: { emoji: '❄️', ru: 'Снегопад', en: 'Snowfall' },
  rain: { emoji: '🌧️', ru: 'Дождь', en: 'Rain' },
  thunderstorm: { emoji: '⛈️', ru: 'Гроза', en: 'Thunderstorm' },
  aurora: { emoji: '🌌', ru: 'Аврора', en: 'Aurora' },
  megamoon: { emoji: '🌕', ru: 'Мега луна', en: 'Mega Moon' }
};

function applyWeatherImageFilters(imgEl, key) {
  if (!imgEl) return;
  const k = key.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  imgEl.style.filter = '';
  if (k === 'bloodmoon') {
    imgEl.style.filter = 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.9)) hue-rotate(320deg) saturate(4) brightness(0.8)';
  } else if (k === 'goldmoon') {
    imgEl.style.filter = 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.9)) saturate(1.8) sepia(0.5)';
  } else if (k === 'rainbowmoon') {
    imgEl.style.filter = 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.9)) hue-rotate(90deg) saturate(2)';
  } else if (k === 'chainedmoon') {
    imgEl.style.filter = 'drop-shadow(0 0 8px rgba(148, 163, 184, 0.9)) grayscale(1) contrast(0.6)';
  }
}

const itemImageCache = new Map();

function weatherImageUrl(imageRef) {
  if (!imageRef) return '';
  const ref = String(imageRef);
  if (ref.startsWith('/')) return ref;
  if (ref.startsWith('http')) return `/api/proxy-image?url=${encodeURIComponent(ref)}`;
  return `/api/fruit-image?asset=${encodeURIComponent(ref)}`;
}

function normalizeEnvKey(name) {
  return String(name || '').toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
}

function isEmojiFallbackImage(imageRef) {
  if (!imageRef) return false;
  const ref = String(imageRef).toLowerCase();
  return ref.includes('notoemoji') || ref.includes('fonts.gstatic.com');
}

const weatherIconCache = new Map(JSON.parse(localStorage.getItem('weatherIconCache') || '[]'));

function rememberWeatherIcon(key, imageRef) {
  const normKey = normalizeEnvKey(key);
  if (!normKey || !imageRef || isEmojiFallbackImage(imageRef)) return;
  const ref = String(imageRef);
  if (weatherIconCache.get(normKey) === ref) return;
  weatherIconCache.set(normKey, ref);
  localStorage.setItem('weatherIconCache', JSON.stringify(Array.from(weatherIconCache.entries())));
}

function updateWeatherIconCache(stock) {
  if (!stock) return;

  if (stock.weatherCatalog) {
    Object.entries(stock.weatherCatalog).forEach(([key, item]) => {
      if (item && item.image) rememberWeatherIcon(key, item.image);
    });
  }

  const w = stock.weather;
  if (!w) return;

  if (w.phase && w.phaseImage) {
    rememberWeatherIcon(w.phase, w.phaseImage);
    const phaseKey = normalizeEnvKey(w.phase);
    if (phaseKey === 'night') rememberWeatherIcon('moon', w.phaseImage);
  }

  if (w.weathers) {
    Object.entries(w.weathers).forEach(([name, info]) => {
      if (info && info.image) rememberWeatherIcon(name, info.image);
    });
  }
}

function getWeatherCatalogImageRef(key) {
  const normKey = normalizeEnvKey(key);
  const item = stockData && stockData.weatherCatalog && stockData.weatherCatalog[normKey];
  return item && item.image ? item.image : '';
}

function getWeatherSettingsIconHtml(key, opt) {
  const normKey = normalizeEnvKey(key);
  const imageRef = weatherIconCache.get(normKey) || weatherAssetIds[normKey] || getWeatherCatalogImageRef(normKey) || weatherImages[normKey];
  const srcUrl = weatherImageUrl(imageRef);
  const emoji = opt && opt.emoji ? opt.emoji : 'рџЊ¦пёЏ';

  if (!srcUrl) {
    return `<span class="weather-settings-icon-wrapper"><span class="weather-settings-emoji-fallback">${emoji}</span></span>`;
  }

  return `
    <span class="weather-settings-icon-wrapper">
      <img src="${srcUrl}" alt="" class="weather-settings-icon" loading="lazy" onload="applyWeatherImageFilters(this, '${normKey}')" onerror="this.onerror=null; this.style.display='none'; const fb=this.parentNode.querySelector('.weather-settings-emoji-fallback'); if(fb)fb.style.display='inline-flex';">
      <span class="weather-settings-emoji-fallback" style="display: none;">${emoji}</span>
    </span>
  `;
}

function updateItemImageCache(stock) {
  if (!stock) return;
  if (stock.shops) {
    for (const shopKey of Object.keys(stock.shops)) {
      const items = stock.shops[shopKey] || [];
      items.forEach(item => {
        if (item.name && item.image) {
          itemImageCache.set(item.name.toLowerCase().trim(), item.image);
        }
      });
    }
  }
  if (stock.fruitMultipliers && Array.isArray(stock.fruitMultipliers)) {
    stock.fruitMultipliers.forEach(item => {
      if (item.name && item.image) {
        itemImageCache.set(item.name.toLowerCase().trim(), item.image);
      }
    });
  }
}

function getWeatherImageHtml(name, imageId) {
  const optKey = name.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  const discovered = JSON.parse(localStorage.getItem('discoveredEnvs') || '{}');
  const allOptions = { ...weatherOptions, ...discovered };
  const opt = allOptions[optKey];
  const emoji = opt ? opt.emoji : '🌦️';
  
  const srcUrl = weatherImageUrl(imageId || weatherAssetIds[optKey]);
  
  if (!srcUrl) {
    return `<span class="weather-icon-img-wrapper"><span class="weather-emoji-fallback" style="display: inline-flex;">${emoji}</span></span>`;
  }
  
  return `
    <span class="weather-icon-img-wrapper">
      <img src="${srcUrl}" alt="${name}" class="weather-icon-img" onload="applyWeatherImageFilters(this, '${optKey}')" onerror="this.onerror=null; this.style.display='none'; const fb=this.parentNode.querySelector('.weather-emoji-fallback'); if(fb)fb.style.display='inline-flex';">
      <span class="weather-emoji-fallback" style="display: none; align-items: center; justify-content: center;">${emoji}</span>
    </span>
  `;
}

function getPhaseColor(phaseLower) {
  if (phaseLower === 'day' || phaseLower === 'sunset' || phaseLower === 'goldmoon') {
    return 'var(--rarity-legendary)';
  } else if (phaseLower === 'bloodmoon') {
    return 'var(--color-danger)';
  } else if (phaseLower === 'chainedmoon') {
    return 'var(--text-secondary)';
  } else if (phaseLower === 'pizzamoon') {
    return 'var(--color-grass)';
  } else if (phaseLower === 'rainbowmoon') {
    return 'var(--rarity-rare)';
  } else {
    return 'var(--rarity-epic)';
  }
}

let trackedItems = new Set(JSON.parse(localStorage.getItem('trackedItems') || '[]'));
let trackedPredictions = new Set(JSON.parse(localStorage.getItem('trackedPredictions') || '[]'));
let multiplierAlerts = JSON.parse(localStorage.getItem('multiplierAlerts') || '{}');

// Auto-migrate legacy/incorrect keys from trackedItems to keep settings consistent across devices
(function() {
  let hasLegacy = false;
  if (trackedItems.has('env:lightning')) {
    trackedItems.delete('env:lightning');
    trackedItems.add('env:thunderstorm');
    hasLegacy = true;
  }
  if (trackedItems.has('env:night')) {
    trackedItems.delete('env:night');
    trackedItems.add('env:moon');
    hasLegacy = true;
  }
  // Remove any invalid legacy weather keys that might have been saved in early versions
  // to prevent hidden/ghost notifications that the user cannot see or toggle off
  const validKeys = [
    'day', 'sunset', 'moon', 'bloodmoon', 'goldmoon', 'chainedmoon', 'pizzamoon', 
    'rainbowmoon', 'solareclipse', 'starfall', 'rainbow', 'snowfall', 'rain', 
    'thunderstorm', 'aurora'
  ];
  for (const item of Array.from(trackedItems)) {
    if (item.startsWith('env:')) {
      const key = item.substring(4);
      if (!validKeys.includes(key)) {
        trackedItems.delete(item);
        hasLegacy = true;
      }
    }
  }
  if (hasLegacy) {
    localStorage.setItem('trackedItems', JSON.stringify(Array.from(trackedItems)));
  }
})();

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
  renderWeatherSettings();
  if (stockData) {
    renderDashboard();
  }
  if (predictionData) {
    renderPredictions();
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

  // Telegram promo banner: swap RU/EN text from data attributes
  document.querySelectorAll('.tg-promo-banner [data-ru]').forEach(el => {
    const val = el.getAttribute('data-' + currentLang);
    if (val) el.textContent = val;
  });
  
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
  
  // Multipliers Sidebar Title
  const multSidebarTitle = document.querySelector('#multipliers-sidebar .sidebar-title');
  if (multSidebarTitle) {
    multSidebarTitle.innerHTML = `<i class="fa-solid fa-chart-line"></i> ${t.sidebarMultipliers}`;
  }

  const multList = document.getElementById('multipliers-list');
  if (multList && (!stockData || !stockData.fruitMultipliers || Object.keys(stockData.fruitMultipliers).length === 0)) {
    multList.innerHTML = `<div class="loading-placeholder">${t.loadingPlaceholder}</div>`;
  }

  // Predictions Warning
  const predWarning = document.getElementById('predictions-warning');
  if (predWarning) {
    predWarning.textContent = t.predictionsWarning;
  }
  
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
    let newStockData = null;
    
    // 1. Fetch Stock Data
    try {
      const stockRes = await fetch('/api/stock?client=web');
      if (stockRes.ok) {
        newStockData = await stockRes.json();
      } else if (stockRes.status === 429) {
        console.warn('Stock API rate limited (429)');
      }
    } catch (err) {
      console.error('Error fetching stock:', err);
    }

    // 2. Fetch API Status
    try {
      const statusRes = await fetch('/api/status');
      if (statusRes.ok) {
        statusData = await statusRes.json();
        updateStatusUI(statusData);
      } else if (statusRes.status === 429) {
        console.warn('Status API rate limited (429)');
      }
    } catch (err) {
      console.error('Error fetching status:', err);
    }
    
    // 3. Process new data if successfully fetched
    if (newStockData) {
      checkForNotifications(newStockData);
      checkForMultiplierNotifications(newStockData);
      checkForWeatherNotifications(newStockData);
      discoverEnvironments(newStockData.weather);
      stockData = newStockData;
      updateItemImageCache(stockData);
      updateWeatherIconCache(stockData);
      
      // Update online users count
      updateUsersOnlineUI(newStockData.visitorCount);
      renderDashboard();
    } else if (!stockData) {
      // Only set offline if we don't have any cached data at all
      updateOfflineStatus();
    }
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    if (!stockData) {
      updateOfflineStatus();
    }
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

function updateUsersOnlineUI(visitorCount) {
  const badge = document.getElementById('users-online-badge');
  const text = document.getElementById('users-online-text');
  if (!badge || !text) return;
  
  if (visitorCount !== undefined && visitorCount !== null) {
    text.textContent = translations[currentLang].usersOnline(visitorCount);
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function updateOfflineStatus() {
  const dot = apiStatusBadge.querySelector('.status-dot');
  const text = apiStatusBadge.querySelector('.status-text');
  dot.className = 'status-dot';
  text.textContent = translations[currentLang].statusOffline;
  
  const usersBadge = document.getElementById('users-online-badge');
  if (usersBadge) usersBadge.style.display = 'none';
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
        <div class="weather-box-details" style="display: flex; flex-direction: column; gap: 4px; flex: 1; text-align: inherit;">
          <span class="weather-label">${t.weatherLabelActive}</span>
          <span class="weather-val" style="color: var(--text-secondary)">--</span>
          <span class="weather-detail weather-timer-countdown">--:--:--</span>
        </div>
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
  let phaseLower = phase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  if (phaseLower === 'night') {
    phaseLower = 'moon';
  }
  
  const phaseKey = `${phase}:${w.phaseImage || ''}:${currentLang}`;
  if (timeBox) {
    if (phaseKey !== lastPhaseKey) {
      lastPhaseKey = phaseKey;
      
      const phaseTranslationKey = 'phase' + phaseLower;
      let phaseText = t[phaseTranslationKey];
      
      // Fallback if phase translation is missing (dynamically format the name)
      if (!phaseText) {
        const formattedPhase = phase.charAt(0).toUpperCase() + phase.slice(1);
        phaseText = w.night ? `🌙 ${formattedPhase}` : `☀️ ${formattedPhase}`;
      }
      
      const imgHtml = getWeatherImageHtml(phase, w.phaseImage);
      
      timeBox.innerHTML = `
        ${imgHtml}
        <div class="weather-box-details" style="display: flex; flex-direction: column; gap: 4px; flex: 1; text-align: inherit;">
          <span class="weather-label">${t.weatherLabelTime}</span>
          <span class="weather-val" id="time-val" style="color: ${getPhaseColor(phaseLower)}">${phaseText}</span>
          <span class="weather-detail" id="time-detail">--:--:--</span>
        </div>
      `;
    }
    
    const timeDetailEl = document.getElementById('time-detail');
    if (timeDetailEl) {
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
  }
  
  // 2. Collect active weathers
  const activeWeathers = [];
  if (w.weathers) {
    for (const [name, info] of Object.entries(w.weathers)) {
      if (info.playing) {
        activeWeathers.push({ name, endTime: info.endTime, image: info.image || null });
      }
    }
  }
  
  // Create a unique key for the current active weathers to check if structure changed
  const currentKey = activeWeathers.map(aw => `${aw.name}:${aw.image || ''}`).sort().join(',') || 'none';
  
  if (weatherContainer && timeBox) {
    if (currentKey !== lastWeatherKey) {
      // Rebuild the weather items list
      const childrenToRemove = Array.from(weatherContainer.children).filter(child => child !== timeBox);
      childrenToRemove.forEach(child => child.remove());
      
      if (activeWeathers.length > 0) {
        activeWeathers.forEach(({ name, endTime, image }) => {
          const weatherBox = document.createElement('div');
          weatherBox.className = 'weather-box active-weather-item';
          weatherBox.setAttribute('data-name', name);
          weatherBox.setAttribute('data-endtime', endTime);
          
          let colorStyle = 'var(--text-secondary)';
          if (name.toLowerCase().includes('star')) {
            colorStyle = 'var(--rarity-legendary)';
          } else if (name.toLowerCase().includes('rain')) {
            colorStyle = 'var(--rarity-exotic)';
          } else if (name.toLowerCase().includes('storm') || name.toLowerCase().includes('lightning')) {
            colorStyle = 'var(--color-danger)';
          } else {
            colorStyle = 'var(--rarity-rare)';
          }
          
          let optKey = name.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
          if (optKey === 'lightning') optKey = 'thunderstorm';
          const discovered = JSON.parse(localStorage.getItem('discoveredEnvs') || '{}');
          const allOptions = { ...weatherOptions, ...discovered };
          const opt = allOptions[optKey];
          const displayName = opt ? (currentLang === 'ru' ? opt.ru : opt.en) : name;
          const emoji = opt ? opt.emoji : '🌦️';
          
          const imgHtml = getWeatherImageHtml(name, image);
          
          weatherBox.innerHTML = `
            ${imgHtml}
            <div class="weather-box-details" style="display: flex; flex-direction: column; gap: 4px; flex: 1; text-align: inherit;">
              <span class="weather-label">${t.weatherLabelActive}</span>
              <span class="weather-val" style="color: ${colorStyle}">${emoji} ${displayName}</span>
              <span class="weather-detail weather-timer-countdown">--:--:--</span>
            </div>
          `;
          weatherContainer.appendChild(weatherBox);
        });
      } else {
        // Rebuild fallback "None" box
        const weatherBox = document.createElement('div');
        weatherBox.className = 'weather-box active-weather-item';
        weatherBox.id = 'weather-active-box';
        weatherBox.innerHTML = `
          <div class="weather-box-details" style="display: flex; flex-direction: column; gap: 4px; flex: 1; text-align: inherit;">
            <span class="weather-label">${t.weatherLabelActive}</span>
            <span class="weather-val" style="color: var(--text-secondary)">${t.weatherNone}</span>
            <span class="weather-detail weather-timer-countdown">--:--:--</span>
          </div>
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
  renderMultipliers();
  renderFruitRefresh();
  renderWeatherSettings();
}

function renderFruitRefresh() {
  // Safe empty fallback
}

function getFruitEmoji(name) {
  const n = name.toLowerCase().trim();
  if (n.includes('carrot')) return '🥕';
  if (n.includes('strawberry')) return '🍓';
  if (n.includes('watermelon')) return '🍉';
  if (n.includes('pumpkin')) return '🎃';
  if (n.includes('sunflower')) return '🌻';
  if (n.includes('wheat')) return '🌾';
  if (n.includes('tomato')) return '🍅';
  if (n.includes('potato')) return '🥔';
  if (n.includes('onion')) return '🧅';
  if (n.includes('corn')) return '🌽';
  if (n.includes('pineapple')) return '🍍';
  if (n.includes('cabbage')) return '🥬';
  if (n.includes('dragonfruit') || n.includes('dragon fruit')) return '🐉';
  if (n.includes('starfruit')) return '⭐';
  if (n.includes('chili')) return '🌶️';
  if (n.includes('blueberry')) return '🫐';
  if (n.includes('blackberry')) return '🍇';
  if (n.includes('raspberry')) return '🍓';
  if (n.includes('apple')) return '🍎';
  if (n.includes('grape')) return '🍇';
  if (n.includes('orange')) return '🍊';
  if (n.includes('lemon')) return '🍋';
  if (n.includes('banana')) return '🍌';
  if (n.includes('cherry')) return '🍒';
  if (n.includes('berry')) return '🍒';
  if (n.includes('coconut')) return '🥥';
  if (n.includes('cactus')) return '🌵';
  if (n.includes('bonsai')) return '🪴';
  if (n.includes('bamboo')) return '🎋';
  if (n.includes('rose')) return '🌹';
  if (n.includes('tulip')) return '🌷';
  if (n.includes('lily')) return '🌸';
  if (n.includes('orchid')) return '🌺';
  if (n.includes('lavender')) return '🪻';
  if (n.includes('acorn')) return '🌰';
  if (n.includes('mango')) return '🥭';
  if (n.includes('pomegranate')) return '🍎';
  if (n.includes('moon bloom') || n.includes('moonbloom')) return '🌙';
  if (n.includes('spitter') || n.includes('venom')) return '🧪';
  if (n.includes('mushroom')) return '🍄';
  if (n.includes('melon')) return '🍈';
  if (n.includes('pot')) return '🏺';
  if (n.includes('can')) return '🪣';
  if (n.includes('spore')) return '🍄';
  if (n.includes('seed')) return '🌱';
  return '🌱';
}

// Normalizes the fruitMultipliers payload into a list of {name, image, rate}.
// Supports BOTH the new list format [{name,image,key,multiplier}] and the legacy
// dict format {name: rate}, so the website keeps working regardless of scraper version.
function normalizeFruitMultipliers(raw) {
  if (!raw) return [];
  const out = [];
  if (Array.isArray(raw)) {
    raw.forEach(entry => {
      if (!entry || typeof entry !== 'object') return;
      const key = entry.key || entry.name;
      const rate = parseFloat(entry.multiplier ?? entry.rate);
      if (key == null || isNaN(rate)) return;
      out.push({
        name: entry.name || String(key),
        image: entry.image || null,
        key: String(key),
        rate
      });
    });
  } else if (typeof raw === 'object') {
    Object.entries(raw).forEach(([key, val]) => {
      const rate = parseFloat(val);
      if (isNaN(rate)) return;
      // Legacy dict: a key like "Asset_123" carries the image asset id.
      const m = /^Asset_(\d+)$/.exec(key);
      out.push({
        name: key,
        image: m ? m[1] : null,
        key,
        rate
      });
    });
  }
  return out;
}

// Resolve a Roblox asset thumbnail via the dedicated /api/fruit-image endpoint
// (two-step: thumbnails API -> CDN image, both server-side to bypass ISP throttling).
// Returns '' if no asset id is available.
function fruitThumbUrl(assetId) {
  if (!assetId) return '';
  if (assetId.startsWith('/') || assetId.startsWith('http')) {
    return assetId;
  }
  return `/api/fruit-image?asset=${encodeURIComponent(assetId)}`;
}

let multipliersPage = 0;
const MULTIPLIERS_PER_PAGE = 10;

function renderMultipliers() {
  const listContainer = document.getElementById('multipliers-list');
  if (!listContainer) return;

  const items = normalizeFruitMultipliers(stockData && stockData.fruitMultipliers)
    .sort((a, b) => b.rate - a.rate);

  if (items.length === 0) {
    listContainer.innerHTML = `<div class="loading-placeholder">${translations[currentLang].loadingPlaceholder}</div>`;
    return;
  }

  const totalPages = Math.max(1, Math.ceil(items.length / MULTIPLIERS_PER_PAGE));
  if (multipliersPage > totalPages - 1) multipliersPage = totalPages - 1;
  if (multipliersPage < 0) multipliersPage = 0;
  const start = multipliersPage * MULTIPLIERS_PER_PAGE;
  const pageItems = items.slice(start, start + MULTIPLIERS_PER_PAGE);

  listContainer.innerHTML = '';

  pageItems.forEach(({ name, image, rate }) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'multiplier-item';

    let displayName = name;
    if (currentLang === 'ru') {
      const translated = itemTranslations[name.toLowerCase().trim()];
      if (translated) displayName = translated;
    }

    const emoji = getFruitEmoji(name);
    // Prefer a real thumbnail image; fall back to emoji; for Asset_ names show the image
    // even when there's no readable name.
    const imgUrl = fruitThumbUrl(image);
    const iconHtml = imgUrl
      ? `<span class="fruit-icon-wrapper"><img src="${imgUrl}" alt="${displayName}" class="fruit-thumb" loading="lazy" onerror="this.onerror=null; this.style.display='none'; const fb=this.parentNode.querySelector('.fruit-emoji-fallback'); if(fb)fb.style.display='inline-flex';"><span class="fruit-emoji-fallback" style="display: none;">${emoji}</span></span>`
      : `<span class="fruit-icon-wrapper">${emoji}</span>`;

    let rateClass = '';
    if (rate >= 3.0) {
      rateClass = ' rate-exotic';
    } else if (rate >= 2.0) {
      rateClass = ' rate-high';
    }

    const hasAlert = multiplierAlerts[name] !== undefined;
    const bellClass = hasAlert ? 'bell-active' : '';
    const bellIcon = hasAlert ? 'fa-solid fa-bell' : 'fa-regular fa-bell';
    const thresholdText = hasAlert ? ` (>= x${multiplierAlerts[name]})` : '';
    const bellTitle = hasAlert 
      ? `${translations[currentLang].bellUntrackMultiplier}${thresholdText}` 
      : translations[currentLang].bellTrackMultiplier;

    itemEl.innerHTML = `
      <div class="multiplier-info">
        ${iconHtml}
        <span title="${name}">${displayName}</span>
      </div>
      <div class="multiplier-actions">
        <span class="multiplier-val${rateClass}">x${rate.toFixed(1)}</span>
        <button class="multiplier-bell-btn ${bellClass}" data-fruit="${name}" title="${bellTitle}">
          <i class="${bellIcon}"></i>
        </button>
      </div>
    `;
    listContainer.appendChild(itemEl);
  });

  // Pagination controls (only when more than one page).
  if (totalPages > 1) {
    const nav = document.createElement('div');
    nav.className = 'mult-pagination';
    
    const prevDisabled = multipliersPage <= 0 ? ' disabled' : '';
    const nextDisabled = multipliersPage >= totalPages - 1 ? ' disabled' : '';
    
    const prevBtn = `<button class="mult-nav-btn${prevDisabled}" data-mult-page="${multipliersPage - 1}"${prevDisabled ? ' disabled' : ''}><i class="fa-solid fa-chevron-left"></i></button>`;
    const nextBtn = `<button class="mult-nav-btn${nextDisabled}" data-mult-page="${multipliersPage + 1}"${nextDisabled ? ' disabled' : ''}><i class="fa-solid fa-chevron-right"></i></button>`;
    
    nav.innerHTML = `${prevBtn}<span class="mult-page-info">${multipliersPage + 1}/${totalPages}</span>${nextBtn}`;
    listContainer.appendChild(nav);
  }
}

// Event delegation for multiplier pagination buttons.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-mult-page]');
  if (!btn) return;
  multipliersPage = parseInt(btn.getAttribute('data-mult-page'), 10) || 0;
  renderMultipliers();
});

// Fruit refresh countdown removed since it's not working in-game currently.

// Event delegation for multiplier notification buttons.
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.multiplier-bell-btn');
  if (!btn) return;

  const fruitName = btn.getAttribute('data-fruit');
  if (!fruitName) return;

  // Request browser permission if default
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

  const hasAlert = multiplierAlerts[fruitName] !== undefined;

  if (hasAlert) {
    // Untrack
    delete multiplierAlerts[fruitName];
  } else {
    // Track - prompt user for threshold multiplier
    const promptText = translations[currentLang].enterMultiplierPrompt;
    const input = prompt(promptText, "2.0");
    if (input === null) return; // User cancelled

    const threshold = parseFloat(input.replace(',', '.'));
    if (isNaN(threshold) || threshold <= 0) {
      alert(translations[currentLang].invalidMultiplierAlert);
      return;
    }

    multiplierAlerts[fruitName] = threshold;

    // Send a test notification to verify it works
    const t = translations[currentLang];
    let displayName = fruitName;
    if (currentLang === 'ru') {
      const translated = itemTranslations[fruitName.toLowerCase().trim()];
      if (translated) displayName = translated;
    }

    const testTitle = t.notifTrackedTitle;
    const testOptions = {
      body: currentLang === 'ru' 
        ? `Вы получите звуковое оповещение, когда множитель на "${displayName}" станет >= x${threshold.toFixed(1)}.`
        : `We will notify you when "${displayName}" multiplier becomes >= x${threshold.toFixed(1)}.`,
      icon: '/logo.png',
      tag: 'multiplier-tracked-alert-' + fruitName
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(testTitle, testOptions);
      });
    } else {
      new Notification(testTitle, testOptions);
    }
    playAlertSound();
  }

  localStorage.setItem('multiplierAlerts', JSON.stringify(multiplierAlerts));
  renderMultipliers();
});

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
      ? `<div class="item-image-wrapper"><img src="${item.image}" alt="${item.name}" class="item-card-image" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.parentNode.classList.add('img-failed');this.remove();"></div>`
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

function checkForMultiplierNotifications(newData) {
  if (!stockData || !stockData.fruitMultipliers || !newData.fruitMultipliers) {
    return; // Do not notify on initial load
  }

  const oldMultipliers = normalizeFruitMultipliers(stockData.fruitMultipliers);
  const newMultipliers = normalizeFruitMultipliers(newData.fruitMultipliers);

  const oldMultMap = {};
  oldMultipliers.forEach(item => {
    oldMultMap[item.name] = item.rate;
  });

  newMultipliers.forEach(item => {
    const oldRate = oldMultMap[item.name] !== undefined ? oldMultMap[item.name] : 0;
    const newRate = item.rate;

    // Check if there is an active alert threshold for this fruit name (e.g. "Banana")
    const threshold = multiplierAlerts[item.name];
    if (threshold !== undefined) {
      // Trigger notification if the new rate is above or equal to threshold
      // and it EITHER was below the threshold OR it just changed to a new rate.
      const isEligible = newRate >= threshold && (oldRate < threshold || oldRate !== newRate);
      if (isEligible) {
        triggerMultiplierNotification(item.name, newRate, threshold);
      }
    }
  });
}

function triggerMultiplierNotification(itemName, currentRate, threshold) {
  // Deduplicate notification triggers (prevent multi-tab notifications or rapid fire)
  if (!canShowNotification('multiplier_' + itemName + '_' + currentRate)) {
    return;
  }
  const t = translations[currentLang];
  
  let displayName = itemName;
  if (currentLang === 'ru') {
    const translated = itemTranslations[itemName.toLowerCase().trim()];
    if (translated) displayName = translated;
  }

  const title = t.multiplierPushTitle(displayName);
  const options = {
    body: t.multiplierPushBody(currentRate, threshold),
    icon: '/logo.png',
    badge: '/logo.png',
    tag: 'multiplier-alert-' + itemName,
    requireInteraction: true
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(title, options);
    });
  } else {
    new Notification(title, options);
  }
  playAlertSound();
}

// Cross-tab notification deduplication check (prevents duplicate sounds/flashes across open tabs)
function canShowNotification(key) {
  const now = Date.now();
  const lastTime = parseInt(localStorage.getItem('last_notif_time_' + key) || '0', 10);
  if (now - lastTime < 10000) { // 10 seconds threshold
    return false;
  }
  localStorage.setItem('last_notif_time_' + key, now.toString());
  return true;
}

function triggerNotification(item) {
  if (!canShowNotification('item_' + item.name)) {
    return;
  }
  const t = translations[currentLang];
  const title = t.pushTitle(item.name);
  const options = {
    body: t.pushBody(item.stock, item.price, item.rarity),
    icon: '/logo.png',
    badge: '/logo.png',
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
      icon: '/logo.png',
      badge: '/logo.png'
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

// Event Delegation for Prediction Bell Buttons
document.addEventListener('click', (e) => {
  const bell = e.target.closest('.prediction-bell-btn');
  if (bell) {
    const name = bell.getAttribute('data-name');
    const timestamp = parseInt(bell.getAttribute('data-timestamp'), 10);
    const isWeather = bell.getAttribute('data-isweather') === 'true';
    togglePredictionTracking(name, timestamp, isWeather, bell);
  }
});

async function togglePredictionTracking(name, timestamp, isWeather, btn) {
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

  const predKey = `${name}:${timestamp}`;
  const icon = btn.querySelector('i');
  const t = translations[currentLang];

  if (trackedPredictions.has(predKey)) {
    trackedPredictions.delete(predKey);
    btn.classList.remove('bell-active');
    icon.className = 'fa-regular fa-bell';
    btn.setAttribute('title', t.bellTrack);
  } else {
    trackedPredictions.add(predKey);
    btn.classList.add('bell-active');
    icon.className = 'fa-solid fa-bell';
    btn.setAttribute('title', t.bellUntrack);
    
    // Test notification for subscription feedback
    let displayName = name;
    if (isWeather) {
      let optKey = name.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
      if (optKey === 'lightning') optKey = 'thunderstorm';
      const opt = weatherOptions[optKey];
      if (opt) {
        displayName = currentLang === 'ru' ? opt.ru : opt.en;
      }
    } else {
      if (currentLang === 'ru') {
        const translatedName = itemTranslations[name.toLowerCase().trim()];
        if (translatedName) {
          displayName = translatedName;
        }
      }
    }

    const testTitle = t.notifTrackedTitle;
    const testOptions = {
      body: t.notifTrackedBody(displayName),
      icon: '/logo.png',
      badge: '/logo.png'
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

  localStorage.setItem('trackedPredictions', JSON.stringify(Array.from(trackedPredictions)));
}

// Render weather subscription toggles inside settings panel
function renderWeatherSettings() {
  const panel = document.getElementById('weather-settings-panel');
  if (!panel) return;
  panel.innerHTML = '';
  
  const t = translations[currentLang];
  
  // Merge static options and discovered options
  const discovered = JSON.parse(localStorage.getItem('discoveredEnvs') || '{}');
  const allOptions = { ...weatherOptions, ...discovered };
  
  Object.keys(allOptions).forEach(key => {
    const opt = allOptions[key];
    const name = currentLang === 'ru' ? opt.ru : opt.en;
    const isTracked = trackedItems.has('env:' + key);
    const iconHtml = getWeatherSettingsIconHtml(key, opt);
    
    const row = document.createElement('div');
    row.className = 'weather-settings-item';
    
    const bellClass = isTracked ? 'bell-active' : '';
    const bellIcon = isTracked ? 'fa-solid fa-bell' : 'fa-regular fa-bell';
    const title = isTracked ? t.bellUntrack : t.bellTrack;
    
    row.innerHTML = `
      <div class="weather-settings-info">
        ${iconHtml}
        <span class="weather-settings-name">${name}</span>
      </div>
      <button class="weather-bell-btn ${bellClass}" data-env="${key}" title="${title}">
        <i class="${bellIcon}"></i>
      </button>
    `;
    panel.appendChild(row);
  });
}

// Toggle tracking for custom weather/moon events
async function toggleWeatherTracking(envKey, btn) {
  const itemName = 'env:' + envKey;
  
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
  const t = translations[currentLang];
  
  if (trackedItems.has(itemName)) {
    trackedItems.delete(itemName);
    btn.classList.remove('bell-active');
    icon.className = 'fa-regular fa-bell';
    btn.setAttribute('title', t.bellTrack);
  } else {
    trackedItems.add(itemName);
    btn.classList.add('bell-active');
    icon.className = 'fa-solid fa-bell';
    btn.setAttribute('title', t.bellUntrack);
    
    const discovered = JSON.parse(localStorage.getItem('discoveredEnvs') || '{}');
    const allOptions = { ...weatherOptions, ...discovered };
    const opt = allOptions[envKey] || { emoji: '🌍', ru: envKey, en: envKey };
    const envName = currentLang === 'ru' ? opt.ru : opt.en;
    
    const testTitle = t.notifTrackedTitle;
    const testOptions = {
      body: t.notifTrackedBody(envName),
      icon: '/logo.png',
      badge: '/logo.png'
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
  renderWeatherSettings();
}

// Discover and save newly encountered environment phases/weathers dynamically
function discoverEnvironments(w) {
  if (!w) return;
  
  let discovered = JSON.parse(localStorage.getItem('discoveredEnvs') || '{}');
  let changed = false;
  
  // 1. Discover Phase
  let phase = w.phase || '';
  if (phase) {
    let phaseLower = phase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
    if (phaseLower === 'night') {
      phase = 'Moon';
    }
  }
  if (phase && phase !== 'Day' && phase !== 'Moon' && phase !== 'Sunset' && phase !== 'day' && phase !== 'moon' && phase !== 'sunset') {
    let phaseLower = phase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
    if (!weatherOptions[phaseLower] && !discovered[phaseLower]) {
      discovered[phaseLower] = {
        emoji: w.night ? '🌙' : '☀️',
        ru: phase,
        en: phase
      };
      changed = true;
    }
  }
  
  // 2. Discover Weathers
  if (w.weathers) {
    for (let name of Object.keys(w.weathers)) {
      let lowerName = name.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
      if (lowerName === 'lightning') lowerName = 'thunderstorm';
      if (!weatherOptions[lowerName] && !discovered[lowerName]) {
        discovered[lowerName] = {
          emoji: '🌦️',
          ru: name,
          en: name
        };
        changed = true;
      }
    }
  }
  
  if (changed) {
    localStorage.setItem('discoveredEnvs', JSON.stringify(discovered));
    renderWeatherSettings();
  }
}

// Compare current weather state with last fetched and notify on transition
function checkForWeatherNotifications(newData) {
  if (!stockData || !stockData.weather || !newData.weather) {
    return;
  }
  
  const oldW = stockData.weather;
  const newW = newData.weather;
  
  // 1. Detect Phase Change
  let oldPhase = oldW.phase || '';
  if (!oldPhase) oldPhase = oldW.night ? 'moon' : 'day';
  
  let newPhase = newW.phase || '';
  if (!newPhase) newPhase = newW.night ? 'moon' : 'day';
  
  oldPhase = oldPhase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  newPhase = newPhase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  
  if (oldPhase === 'night') oldPhase = 'moon';
  if (newPhase === 'night') newPhase = 'moon';
  
  if (oldPhase !== newPhase) {
    const trackedKey = 'env:' + newPhase;
    if (trackedItems.has(trackedKey)) {
      triggerWeatherNotification(newPhase, null);
    }
  }
  
  // 2. Detect New Active Weathers
  const oldWeathers = new Set();
  if (oldW.weathers) {
    for (const [name, info] of Object.entries(oldW.weathers)) {
      if (info.playing) {
        let lowerName = name.toLowerCase();
        if (lowerName === 'lightning') lowerName = 'thunderstorm';
        oldWeathers.add(lowerName);
      }
    }
  }
  
  if (newW.weathers) {
    for (const [name, info] of Object.entries(newW.weathers)) {
      if (info.playing) {
        let lowerName = name.toLowerCase();
        if (lowerName === 'lightning') lowerName = 'thunderstorm';
        if (!oldWeathers.has(lowerName)) {
          const trackedKey = 'env:' + lowerName;
          if (trackedItems.has(trackedKey)) {
            triggerWeatherNotification(null, lowerName === 'thunderstorm' ? 'Thunderstorm' : name);
          }
        }
      }
    }
  }
}

// Display push notification for weather changes
function triggerWeatherNotification(phaseKey, weatherName) {
  const notifKey = 'weather_' + (phaseKey || weatherName).toLowerCase();
  if (!canShowNotification(notifKey)) {
    return;
  }
  const t = translations[currentLang];
  let title = '';
  let body = '';
  
  if (phaseKey) {
    const phaseTranslationKey = 'phase' + phaseKey;
    const phaseText = t[phaseTranslationKey] || phaseKey;
    title = currentLang === 'ru' ? '🌍 Изменение времени/луны' : '🌍 Time/Moon Phase Change';
    body = currentLang === 'ru' ? `Началась фаза: ${phaseText}` : `New phase started: ${phaseText}`;
  } else if (weatherName) {
    const optKey = weatherName.toLowerCase();
    const opt = weatherOptions[optKey];
    const localizedName = opt ? (currentLang === 'ru' ? opt.ru : opt.en) : weatherName;
    title = currentLang === 'ru' ? '🌧️ Изменение погоды' : '🌧️ Weather Change';
    body = currentLang === 'ru' ? `Началась погода: ${localizedName}` : `New weather active: ${localizedName}`;
  }
  
  const options = {
    body: body,
    icon: '/logo.png',
    badge: '/logo.png',
    tag: 'weather-alert-' + (phaseKey || weatherName),
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

// Settings Cog Toggle Click Event
const settingsToggle = document.getElementById('weather-settings-toggle');
const settingsPanel = document.getElementById('weather-settings-panel');

if (settingsToggle && settingsPanel) {
  settingsToggle.addEventListener('click', () => {
    const isHidden = settingsPanel.style.display === 'none';
    settingsPanel.style.display = isHidden ? 'grid' : 'none';
    settingsToggle.classList.toggle('active', isHidden);
  });
}

// Weather Bell Click Event delegation
document.addEventListener('click', async (e) => {
  const weatherBell = e.target.closest('.weather-bell-btn');
  if (weatherBell) {
    const envKey = weatherBell.getAttribute('data-env');
    await toggleWeatherTracking(envKey, weatherBell);
  }
});

// Prediction rendering and fetching logic
async function fetchPredictions() {
  try {
    const res = await fetch('/api/predictions');
    if (res.ok) {
      predictionData = await res.json();
      renderPredictions();
    }
  } catch (err) {
    console.error('Error fetching predictions:', err);
  }
}

function renderPredictions() {
  if (!predictionData) return;
  
  const t = translations[currentLang];
  
  // Update section title
  const secTitle = document.querySelector('#predictions-section .section-title');
  if (secTitle) {
    secTitle.innerHTML = t.predictionsHeader;
  }
  
  // Update tab buttons text
  const tabBtns = document.querySelectorAll('.prediction-tab-btn');
  tabBtns.forEach(btn => {
    const tabType = btn.getAttribute('data-tab');
    if (tabType === 'seeds') btn.innerHTML = t.predictionTabSeeds;
    else if (tabType === 'gears') btn.innerHTML = t.predictionTabGears;
    else if (tabType === 'props') btn.innerHTML = t.predictionTabCrates;
    else if (tabType === 'weathers') btn.innerHTML = t.predictionTabWeather;
  });
  
  // Render grids
  renderPredictionGrid('prediction-seeds-grid', predictionData.seeds || []);
  renderPredictionGrid('prediction-gears-grid', predictionData.gears || []);
  renderPredictionGrid('prediction-props-grid', predictionData.props || []);
  renderPredictionGrid('prediction-weathers-grid', predictionData.weathers || [], true);
}

function renderPredictionGrid(gridId, items, isWeather = false) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  
  if (items.length === 0) {
    grid.innerHTML = `<div class="loading-placeholder">${translations[currentLang].loadingPlaceholder}</div>`;
    return;
  }
  
  const now = Math.floor(Date.now() / 1000);
  const t = translations[currentLang];
  
  // Separate currently in stock items from future and past predictions
  const inStock = items.filter(i => i.relativeText && (i.relativeText.toLowerCase().includes('stock') || i.relativeText.toLowerCase().includes('наличии')));
  const rest = items.filter(i => !inStock.includes(i));
  
  const upcoming = rest.filter(i => i.timestamp > now).sort((a, b) => a.timestamp - b.timestamp);
  const past = rest.filter(i => i.timestamp <= now).sort((a, b) => b.timestamp - a.timestamp);
  
  const sortedItems = [...inStock, ...upcoming, ...past];
  
  grid.innerHTML = '';
  
  sortedItems.forEach(item => {
    const card = document.createElement('div');
    const isCurrentlyOnStock = inStock.includes(item);
    const isPast = !isCurrentlyOnStock && item.timestamp <= now;
    let extraClass = '';
    if (!isPast) {
      if (gridId === 'prediction-seeds-grid') extraClass = ' pred-card-seeds';
      else if (gridId === 'prediction-gears-grid') extraClass = ' pred-card-gears';
      else if (gridId === 'prediction-props-grid') extraClass = ' pred-card-props';
      else if (gridId === 'prediction-weathers-grid') {
        extraClass = ' pred-card-weathers';
        const phaseName = item.name.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
        extraClass += ` pred-phase-${phaseName}`;
      }
    }
    card.className = isPast ? 'prediction-card past-item' : `prediction-card${extraClass}`;
    if (isCurrentlyOnStock) {
      card.className += ' currently-in-stock-card';
    }
    card.setAttribute('data-timestamp', item.timestamp);
    card.setAttribute('data-instock', isCurrentlyOnStock ? 'true' : 'false');
    
    // Determine translation and emoji
    let displayName = item.name;
    let emoji = '';
    
    if (isWeather) {
      let optKey = item.name.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
      if (optKey === 'lightning') optKey = 'thunderstorm';
      const opt = weatherOptions[optKey];
      if (opt) {
        emoji = opt.emoji + ' ';
        displayName = currentLang === 'ru' ? opt.ru : opt.en;
      }
    } else {
      if (currentLang === 'ru') {
        const translatedName = itemTranslations[item.name.toLowerCase().trim()];
        if (translatedName) {
          displayName = translatedName;
        }
      }
      if (item.multiplier) {
        displayName = `${item.multiplier} ${displayName}`;
      }
    }
    
    let subText = item.name;
    if (currentLang === 'en' || displayName === item.name) {
      subText = isWeather ? 'Weather / Moon' : 'Item';
    }
    
    let timerText = '';
    let statusText = '';
    let badgeClass = '';
    
    if (isCurrentlyOnStock) {
      timerText = currentLang === 'ru' ? 'В наличии' : 'In Stock';
      statusText = currentLang === 'ru' ? 'В наличии' : 'In Stock';
      badgeClass = 'prediction-badge upcoming';
    } else if (isPast) {
      statusText = t.predictionStatusPast;
      badgeClass = 'prediction-badge past';
      const diff = item.timestamp - now;
      const absDiff = Math.abs(diff);
      if (absDiff < 60) {
        timerText = t.predictionTimeJustNow;
      } else {
        const mins = Math.floor(absDiff / 60);
        if (mins < 60) {
          timerText = t.predictionTimeAgo.replace('{}', `${mins}${t.predictionMin}`);
        } else {
          const hours = Math.floor(mins / 60);
          timerText = t.predictionTimeAgo.replace('{}', `${hours}${t.predictionHour}`);
        }
      }
    } else {
      statusText = t.predictionStatusUpcoming;
      badgeClass = 'prediction-badge upcoming';
      const diff = item.timestamp - now;
      if (diff < 60) {
        timerText = t.predictionTimeSoon;
      } else {
        const mins = Math.floor(diff / 60);
        if (mins < 60) {
          timerText = t.predictionTimeIn.replace('{}', `${mins}${t.predictionMin}`);
        } else {
          const hours = Math.floor(mins / 60);
          timerText = t.predictionTimeIn.replace('{}', `${hours}${t.predictionHour}`);
        }
      }
    }
    
    const predKey = `${item.name}:${item.timestamp}`;
    const isTracked = trackedPredictions.has(predKey);
    const bellClass = isTracked ? 'bell-active' : '';
    const bellIcon = isTracked ? 'fa-solid fa-bell' : 'fa-regular fa-bell';
    const bellTitle = isTracked ? translations[currentLang].bellUntrack : translations[currentLang].bellTrack;
    
    const showBell = !isPast && !isCurrentlyOnStock;
    const bellHtml = !showBell ? '' : `
      <button class="prediction-bell-btn ${bellClass}" data-name="${item.name}" data-timestamp="${item.timestamp}" data-isweather="${isWeather}" title="${bellTitle}">
        <i class="${bellIcon}"></i>
      </button>
    `;
    
    let imgHtml = '';
    if (isWeather) {
      let optKey = item.name.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
      if (optKey === 'lightning') optKey = 'thunderstorm';
      
      // Look up live Roblox asset ID if currently active
      let liveAssetId = null;
      if (stockData && stockData.weather) {
        const w = stockData.weather;
        if (w.phase && w.phase.toLowerCase().replace(/\s+/g, '').replace(/_/g, '') === optKey) {
          liveAssetId = w.phaseImage;
        } else if (w.weathers) {
          for (const [wName, wInfo] of Object.entries(w.weathers)) {
            if (wName.toLowerCase().replace(/\s+/g, '').replace(/_/g, '') === optKey && wInfo.playing) {
              liveAssetId = wInfo.image;
              break;
            }
          }
        }
      }
      
      const srcUrl = weatherImageUrl(liveAssetId || weatherAssetIds[optKey]);
      
      const cleanEmoji = emoji ? emoji.trim() : '🌦️';
      
      if (srcUrl) {
        imgHtml = `
          <span class="pred-item-image-wrapper">
            <img src="${srcUrl}" alt="${displayName}" class="pred-item-image" onload="applyWeatherImageFilters(this, '${optKey}')" onerror="this.onerror=null; this.style.display='none'; const fb=this.parentNode.querySelector('.pred-emoji-fallback'); if(fb)fb.style.display='inline-flex';">
            <span class="pred-emoji-fallback" style="display: none; align-items: center; justify-content: center;">${cleanEmoji}</span>
          </span>
        `;
      } else {
        imgHtml = `
          <span class="pred-item-image-wrapper">
            <span class="pred-emoji-fallback" style="display: inline-flex; align-items: center; justify-content: center;">${cleanEmoji}</span>
          </span>
        `;
      }
    } else {
      const cachedImg = item.image || itemImageCache.get(item.name.toLowerCase().trim());
      if (cachedImg) {
        imgHtml = `
          <span class="pred-item-image-wrapper">
            <img src="${cachedImg}" alt="${displayName}" class="pred-item-image">
          </span>
        `;
      } else {
        imgHtml = `
          <span class="pred-item-image-wrapper">
            <span class="pred-emoji-fallback" style="display: inline-flex; align-items: center; justify-content: center;">📦</span>
          </span>
        `;
      }
    }
    
    card.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1;">
        ${imgHtml}
        <div class="prediction-info">
          <div style="display: flex; align-items: center; gap: 8px;">
            ${bellHtml}
            <span class="prediction-name">${emoji}${displayName}</span>
          </div>
          <span class="prediction-sub">${subText}</span>
        </div>
      </div>
      <div class="prediction-time-container">
        <span class="prediction-timer">${timerText}</span>
        <span class="${badgeClass}">${statusText}</span>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Prediction Tab Event Listeners
document.addEventListener('click', (e) => {
  const tabBtn = e.target.closest('.prediction-tab-btn');
  if (tabBtn) {
    const tabType = tabBtn.getAttribute('data-tab');
    activePredictionTab = tabType;
    
    // Toggle active tab button
    document.querySelectorAll('.prediction-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn === tabBtn);
    });
    
    // Toggle active grid
    document.querySelectorAll('.prediction-grid').forEach(grid => {
      const isTarget = grid.id === `prediction-${tabType}-grid`;
      grid.classList.toggle('active', isTarget);
    });
  }
});

// Init and Loops
setLanguage(currentLang); // Setup initial translation language
fetchData();
fetchPredictions();

// WebSocket Connection Setup
let ws = null;
let reconnectDelay = 1000;
const maxReconnectDelay = 16000;

function connectWebSocket() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}`;
  
  console.log(`Connecting to WebSocket: ${wsUrl}`);
  ws = new WebSocket(wsUrl);
  
  ws.onopen = () => {
    console.log('WebSocket connection established.');
    reconnectDelay = 1000; // Reset reconnect delay on successful connection
    
    // Update API status UI to show online
    if (statusData) {
      statusData.status = 'online';
      updateStatusUI(statusData);
    } else {
      updateStatusUI({ status: 'online', lastUpdated: stockData ? stockData.updatedAt : null });
    }
  };
  
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (!data) return;
      
      console.log('Received WebSocket message of type:', data.type);
      
      if (data.type === 'init') {
        if (data.stock) {
          checkForNotifications(data.stock);
          checkForMultiplierNotifications(data.stock);
          checkForWeatherNotifications(data.stock);
          discoverEnvironments(data.stock.weather);
          stockData = data.stock;
          updateItemImageCache(stockData);
          updateWeatherIconCache(stockData);
          
          updateUsersOnlineUI(data.stock.visitorCount);
          renderDashboard();
        }
        if (data.predictions) {
          predictionData = data.predictions;
          renderPredictions();
        }
        
        // Update status indicators
        statusData = {
          status: 'online',
          lastUpdated: stockData ? stockData.updatedAt : null
        };
        updateStatusUI(statusData);
      } else if (data.type === 'stock') {
        if (data.stock) {
          checkForNotifications(data.stock);
          checkForMultiplierNotifications(data.stock);
          checkForWeatherNotifications(data.stock);
          discoverEnvironments(data.stock.weather);
          stockData = data.stock;
          updateItemImageCache(stockData);
          updateWeatherIconCache(stockData);
          
          updateUsersOnlineUI(data.stock.visitorCount);
          renderDashboard();
          
          statusData = {
            status: 'online',
            lastUpdated: stockData ? stockData.updatedAt : null
          };
          updateStatusUI(statusData);
        }
      } else if (data.type === 'predictions') {
        if (data.predictions) {
          predictionData = data.predictions;
          renderPredictions();
        }
      } else if (data.type === 'users') {
        if (data.count !== undefined) {
          updateUsersOnlineUI(data.count);
        }
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  };
  
  ws.onclose = (event) => {
    console.warn(`WebSocket connection closed (code: ${event.code}). Reconnecting...`);
    updateOfflineStatus();
    scheduleReconnect();
  };
  
  ws.onerror = (err) => {
    console.error('WebSocket encountered error:', err);
    ws.close(); // Ensure close handler triggers reconnection
  };
}

function scheduleReconnect() {
  const jitter = Math.random() * 1000;
  const delay = Math.min(reconnectDelay, maxReconnectDelay) + jitter;
  console.log(`Scheduling WebSocket reconnect in ${Math.round(delay)}ms`);
  reconnectDelay *= 2;
  setTimeout(connectWebSocket, delay);
}

connectWebSocket();


function triggerPredictionStartNotification(name, timestamp) {
  const notifKey = `pred_${name}_${timestamp}`;
  if (!canShowNotification(notifKey)) {
    return;
  }

  // Find if this prediction is a weather/moon event or an item
  let isWeather = false;
  if (predictionData && predictionData.weathers) {
    isWeather = predictionData.weathers.some(w => w.name === name && w.timestamp === timestamp);
  }

  const t = translations[currentLang];
  let displayName = name;
  let title = '';
  let body = '';

  if (isWeather) {
    let optKey = name.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
    if (optKey === 'lightning') optKey = 'thunderstorm';
    const opt = weatherOptions[optKey];
    if (opt) {
      displayName = currentLang === 'ru' ? opt.ru : opt.en;
    }
    title = currentLang === 'ru' ? '🔔 Событие началось!' : '🔔 Event Started!';
    body = currentLang === 'ru' ? `Событие "${displayName}" началось прямо сейчас!` : `Event "${displayName}" has started right now!`;
  } else {
    if (currentLang === 'ru') {
      const translatedName = itemTranslations[name.toLowerCase().trim()];
      if (translatedName) {
        displayName = translatedName;
      }
    }
    title = currentLang === 'ru' ? '🔔 Предсказание началось!' : '🔔 Prediction Started!';
    body = currentLang === 'ru' ? `Предмет "${displayName}" должен появиться в продаже прямо сейчас!` : `Item "${displayName}" is expected to be in stock right now!`;
  }

  const options = {
    body: body,
    icon: '/logo.png',
    badge: '/logo.png',
    tag: 'pred-alert-' + name + '-' + timestamp,
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

function updatePredictionTimers() {
  const now = Math.floor(Date.now() / 1000);
  const t = translations[currentLang];
  
  const cards = document.querySelectorAll('.prediction-card');
  cards.forEach(card => {
    const timestamp = parseInt(card.getAttribute('data-timestamp') || '0', 10);
    const isCurrentlyOnStock = card.getAttribute('data-instock') === 'true';
    
    if (!timestamp) return;
    
    const timerEl = card.querySelector('.prediction-timer');
    const badgeEl = card.querySelector('.prediction-badge') || card.querySelector('.prediction-badge.upcoming') || card.querySelector('.prediction-badge.past') || card.querySelector('[class^="prediction-badge"]');
    
    if (!timerEl || !badgeEl) return;
    
    let timerText = '';
    let statusText = '';
    let badgeClass = '';
    let isPast = false;
    
    if (isCurrentlyOnStock) {
      timerText = currentLang === 'ru' ? 'В наличии' : 'In Stock';
      statusText = currentLang === 'ru' ? 'В наличии' : 'In Stock';
      badgeClass = 'prediction-badge upcoming';
    } else if (timestamp <= now) {
      isPast = true;
      statusText = t.predictionStatusPast;
      badgeClass = 'prediction-badge past';
      const diff = timestamp - now;
      const absDiff = Math.abs(diff);
      if (absDiff < 60) {
        timerText = t.predictionTimeJustNow;
      } else {
        const mins = Math.floor(absDiff / 60);
        if (mins < 60) {
          timerText = t.predictionTimeAgo.replace('{}', `${mins}${t.predictionMin}`);
        } else {
          const hours = Math.floor(mins / 60);
          timerText = t.predictionTimeAgo.replace('{}', `${hours}${t.predictionHour}`);
        }
      }
    } else {
      statusText = t.predictionStatusUpcoming;
      badgeClass = 'prediction-badge upcoming';
      const diff = timestamp - now;
      if (diff < 60) {
        timerText = t.predictionTimeSoon;
      } else {
        const mins = Math.floor(diff / 60);
        if (mins < 60) {
          timerText = t.predictionTimeIn.replace('{}', `${mins}${t.predictionMin}`);
        } else {
          const hours = Math.floor(mins / 60);
          timerText = t.predictionTimeIn.replace('{}', `${hours}${t.predictionHour}`);
        }
      }
    }
    
    if (timerEl.textContent !== timerText) {
      timerEl.textContent = timerText;
    }
    if (badgeEl.textContent !== statusText) {
      badgeEl.textContent = statusText;
    }
    if (badgeEl.className !== badgeClass) {
      badgeEl.className = badgeClass;
    }
    
    if (isPast) {
      if (!card.classList.contains('past-item')) {
        card.classList.add('past-item');
      }
    } else {
      card.classList.remove('past-item');
    }
  });
}

// Tick timers and update weather UI every second
setInterval(() => {
  updateTimers();
  updateWeatherUI();
  if (predictionData) {
    updatePredictionTimers();
  }

  // Check prediction alerts
  const nowSec = Math.floor(Date.now() / 1000);
  let predictionsChanged = false;

  for (const predKey of Array.from(trackedPredictions)) {
    const parts = predKey.split(':');
    if (parts.length < 2) continue;
    const timestamp = parseInt(parts[parts.length - 1], 10);
    const name = parts.slice(0, parts.length - 1).join(':');

    if (nowSec >= timestamp) {
      triggerPredictionStartNotification(name, timestamp);
      trackedPredictions.delete(predKey);
      predictionsChanged = true;
    }
  }

  if (predictionsChanged) {
    localStorage.setItem('trackedPredictions', JSON.stringify(Array.from(trackedPredictions)));
    if (predictionData) {
      renderPredictions();
    }
  }
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
