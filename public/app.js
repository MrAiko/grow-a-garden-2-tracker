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
    loadingPlaceholder: 'Ожидание актуальных данных...',
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
    timeDay: 'День',
    timeNight: 'Ночь',
    weatherNone: 'Нет',
    phasechainedmoon: 'Цепная луна',
    phasegoldmoon: 'Золотая луна',
    phasebloodmoon: 'Кровавая луна',
    phasepizzamoon: 'Пицца-луна',
    phaserainbowmoon: 'Радужная луна',
    phasemegamoon: 'Мега луна',
    phasesunset: 'Закат',
    phaseday: 'День',
    phasemoon: 'Ночь',
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
    invalidMultiplierAlert: 'Пожалуйста, введите корректное число больше 0.',
    auctionTitle: 'Аукцион',
    auctionRefreshIn: 'Обновление через',
    auctionAvailable: 'В продаже',
    auctionSoldOut: 'Продано',
    auctionExpired: 'Истекло',
    auctionStockUnlimited: 'Без лимита',
    auctionStockLeft: (count) => `Осталось: ${count}`,
    auctionPrice: 'Цена',
    auctionEmpty: 'Данные аукциона ещё не получены',
    tgPromoTitle: '🔔 Получай уведомления в Telegram!',
    tgPromoSub: 'Переходи в нашего бота - оповещения о завозах прямо в ЛС',
    navCalculator: 'Калькулятор',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Калькулятор цены фрукта',
    calculatorFruitLabel: 'Фрукт',
    calculatorFruitPlaceholder: 'Начните писать название фрукта',
    calculatorWeightLabel: 'Вес',
    calculatorMutationLabel: 'Мутация',
    calculatorFriendsLabel: 'Друзья рядом',
    calculatorBaseValue: (value) => `База: ${value}`,
    calculatorResultLabel: 'Цена продажи',
    calculatorFormulaHint: 'Расчёт обновляется автоматически по актуальным данным.',
    calculatorNoData: 'Ожидание данных калькулятора...',
    calculatorSelectFruit: 'Выберите фрукт для расчета',
    calculatorUpdatedAt: (value) => `Обновлено: ${value}`,
    navSeeds: 'Семена',
    navGears: 'Снаряжение',
    navCrates: 'Ящики',
    navAuction: 'Аукцион',
    navWeather: 'Погода',
    navFuture: 'Будущее'
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
    loadingPlaceholder: 'Waiting for live data...',
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
    timeDay: 'Day',
    timeNight: 'Night',
    weatherNone: 'None',
    phasechainedmoon: 'Chained Moon',
    phasegoldmoon: 'Goldmoon',
    phasebloodmoon: 'Blood Moon',
    phasepizzamoon: 'Pizza Moon',
    phaserainbowmoon: 'Rainbow Moon',
    phasemegamoon: 'Mega Moon',
    phasesunset: 'Sunset',
    phaseday: 'Day',
    phasemoon: 'Night',
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
    invalidMultiplierAlert: 'Please enter a valid number greater than 0.',
    auctionTitle: 'Auction',
    auctionRefreshIn: 'Refresh in',
    auctionAvailable: 'For sale',
    auctionSoldOut: 'Sold out',
    auctionExpired: 'Expired',
    auctionStockUnlimited: 'Unlimited',
    auctionStockLeft: (count) => `Left: ${count}`,
    auctionPrice: 'Price',
    auctionEmpty: 'Auction data has not arrived yet',
    tgPromoTitle: '🔔 Get alerts in Telegram!',
    tgPromoSub: 'Try our bot - restock alerts right to your PM',
    navCalculator: 'Calculator',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Fruit Value Calculator',
    calculatorFruitLabel: 'Fruit',
    calculatorFruitPlaceholder: 'Start typing a fruit name',
    calculatorWeightLabel: 'Weight',
    calculatorMutationLabel: 'Mutation',
    calculatorFriendsLabel: 'Friends nearby',
    calculatorBaseValue: (value) => `Base: ${value}`,
    calculatorResultLabel: 'Sell value',
    calculatorFormulaHint: 'Calculation updates automatically from live data.',
    calculatorNoData: 'Waiting for calculator data...',
    calculatorSelectFruit: 'Select a fruit to calculate',
    calculatorUpdatedAt: (value) => `Updated: ${value}`,
    navSeeds: 'Seeds',
    navGears: 'Gears',
    navCrates: 'Crates',
    navAuction: 'Auction',
    navWeather: 'Weather',
    navFuture: 'Future'
  }
};

function extendEnglish(overrides) {
  return { ...translations.en, ...overrides };
}

Object.assign(translations, {
  es: extendEnglish({
    subtitle: 'Stock en vivo y alertas',
    statusOnline: 'En línea',
    statusOffline: 'Sin conexión',
    lastUpdatedNever: 'Última actualización: Nunca',
    lastUpdatedPrefix: 'Actualizado: ',
    lastUpdatedWaiting: 'Esperando datos...',
    restockHeader: '<i class="fa-solid fa-clock"></i> Temporizadores de restock',
    notificationBanner: '<strong>Notificaciones:</strong> pulsa la campana 🔔 en cualquier objeto. El navegador avisará cuando vuelva al stock.',
    searchPlaceholder: 'Buscar objetos...',
    filterAll: 'Todo',
    filterInStock: 'En stock',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Cajas',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Herramientas',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Semillas',
    loadingPlaceholder: 'Esperando datos en vivo...',
    noItemsPlaceholder: 'No hay objetos para estos filtros',
    inStockText: ' uds.',
    outOfStockText: 'Sin stock',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Clima y hora',
    weatherLabelTime: 'Hora del día',
    weatherLabelActive: 'Clima activo',
    weatherNone: 'Ninguno',
    weatherEndsIn: 'Termina en: {}',
    predictionsHeader: '<i class="fa-solid fa-hourglass-half"></i> Próximos restocks',
    predictionTabSeeds: '<i class="fa-solid fa-leaf"></i> Semillas',
    predictionTabGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Herramientas',
    predictionTabCrates: '<i class="fa-solid fa-box-open"></i> Cajas',
    predictionTabWeather: '<i class="fa-solid fa-cloud-moon"></i> Clima y lunas',
    predictionStatusUpcoming: 'Próximo',
    predictionStatusPast: 'Pasado',
    predictionTimeIn: 'en {}',
    predictionTimeAgo: 'hace {}',
    predictionTimeSoon: 'Pronto',
    predictionTimeJustNow: 'Ahora',
    sidebarMultipliers: 'Multiplicadores de venta',
    predictionsWarning: '⚠️ Los restocks futuros pueden ser inexactos por cambios del juego.',
    auctionTitle: 'Subasta',
    auctionRefreshIn: 'Actualiza en',
    auctionAvailable: 'En venta',
    auctionSoldOut: 'Vendido',
    auctionExpired: 'Expirado',
    auctionStockUnlimited: 'Ilimitado',
    auctionStockLeft: (count) => `Quedan: ${count}`,
    auctionPrice: 'Precio',
    auctionEmpty: 'Aún no hay datos de subasta',
    navSeeds: 'Semillas',
    navGears: 'Herramientas',
    navCrates: 'Cajas',
    navAuction: 'Subasta',
    navWeather: 'Clima',
    navFuture: 'Futuro'
  }),
  pt: extendEnglish({
    subtitle: 'Stock ao vivo e alertas',
    statusOnline: 'Online',
    statusOffline: 'Offline',
    lastUpdatedNever: 'Última atualização: Nunca',
    lastUpdatedPrefix: 'Atualizado: ',
    lastUpdatedWaiting: 'Aguardando dados...',
    restockHeader: '<i class="fa-solid fa-clock"></i> Temporizadores de restock',
    notificationBanner: '<strong>Notificações:</strong> clique no sino 🔔 de qualquer item. O navegador avisará quando voltar ao stock.',
    searchPlaceholder: 'Buscar itens...',
    filterAll: 'Todos',
    filterInStock: 'Em stock',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Caixas',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Equipamentos',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Sementes',
    loadingPlaceholder: 'Aguardando dados ao vivo...',
    noItemsPlaceholder: 'Nenhum item para estes filtros',
    inStockText: ' un.',
    outOfStockText: 'Sem stock',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Clima e hora',
    weatherLabelTime: 'Hora do dia',
    weatherLabelActive: 'Clima ativo',
    weatherNone: 'Nenhum',
    weatherEndsIn: 'Termina em: {}',
    predictionsHeader: '<i class="fa-solid fa-hourglass-half"></i> Próximos restocks',
    predictionTabSeeds: '<i class="fa-solid fa-leaf"></i> Sementes',
    predictionTabGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Equipamentos',
    predictionTabCrates: '<i class="fa-solid fa-box-open"></i> Caixas',
    predictionTabWeather: '<i class="fa-solid fa-cloud-moon"></i> Clima e luas',
    predictionStatusUpcoming: 'Futuro',
    predictionStatusPast: 'Passado',
    predictionTimeIn: 'em {}',
    predictionTimeAgo: 'há {}',
    sidebarMultipliers: 'Multiplicadores de venda',
    predictionsWarning: '⚠️ Restocks futuros podem ser imprecisos por mudanças no jogo.',
    auctionTitle: 'Leilão',
    auctionRefreshIn: 'Atualiza em',
    auctionAvailable: 'À venda',
    auctionSoldOut: 'Vendido',
    auctionExpired: 'Expirado',
    auctionStockUnlimited: 'Ilimitado',
    auctionStockLeft: (count) => `Restam: ${count}`,
    auctionPrice: 'Preço',
    auctionEmpty: 'Dados do leilão ainda não chegaram',
    navSeeds: 'Sementes',
    navGears: 'Equip.',
    navCrates: 'Caixas',
    navAuction: 'Leilão',
    navWeather: 'Clima',
    navFuture: 'Futuro'
  }),
  fr: extendEnglish({
    subtitle: 'Stock en direct et alertes',
    statusOnline: 'En ligne',
    statusOffline: 'Hors ligne',
    lastUpdatedNever: 'Dernière mise à jour : jamais',
    lastUpdatedPrefix: 'Mis à jour : ',
    restockHeader: '<i class="fa-solid fa-clock"></i> Minuteurs de restock',
    searchPlaceholder: 'Rechercher...',
    filterAll: 'Tout',
    filterInStock: 'En stock',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Caisses',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Équipement',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Graines',
    loadingPlaceholder: 'En attente des données Roblox...',
    noItemsPlaceholder: 'Aucun objet pour ces filtres',
    inStockText: ' pcs.',
    outOfStockText: 'Rupture',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Météo et temps',
    weatherLabelTime: 'Moment',
    weatherLabelActive: 'Météo active',
    weatherNone: 'Aucune',
    weatherEndsIn: 'Finit dans : {}',
    predictionsHeader: '<i class="fa-solid fa-hourglass-half"></i> Restocks futurs',
    sidebarMultipliers: 'Multiplicateurs de vente',
    auctionTitle: 'Enchères',
    auctionRefreshIn: 'Actualise dans',
    auctionAvailable: 'En vente',
    auctionSoldOut: 'Vendu',
    auctionExpired: 'Expiré',
    auctionStockUnlimited: 'Illimité',
    auctionStockLeft: (count) => `Restant : ${count}`,
    auctionPrice: 'Prix',
    auctionEmpty: 'Aucune donnée d’enchère pour le moment',
    navSeeds: 'Graines',
    navGears: 'Équip.',
    navCrates: 'Caisses',
    navAuction: 'Enchères',
    navWeather: 'Météo',
    navFuture: 'Futur'
  }),
  de: extendEnglish({
    subtitle: 'Live-Stock und Benachrichtigungen',
    statusOnline: 'Online',
    statusOffline: 'Offline',
    lastUpdatedNever: 'Zuletzt aktualisiert: nie',
    lastUpdatedPrefix: 'Aktualisiert: ',
    restockHeader: '<i class="fa-solid fa-clock"></i> Restock-Timer',
    searchPlaceholder: 'Items suchen...',
    filterAll: 'Alle',
    filterInStock: 'Auf Lager',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Kisten',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Ausrüstung',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Samen',
    loadingPlaceholder: 'Warte auf Live-Daten...',
    noItemsPlaceholder: 'Keine Items für diese Filter',
    inStockText: ' Stk.',
    outOfStockText: 'Nicht auf Lager',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Wetter und Zeit',
    weatherLabelTime: 'Tageszeit',
    weatherLabelActive: 'Aktives Wetter',
    weatherNone: 'Keins',
    weatherEndsIn: 'Endet in: {}',
    predictionsHeader: '<i class="fa-solid fa-hourglass-half"></i> Zukünftige Restocks',
    sidebarMultipliers: 'Verkaufs-Multiplikatoren',
    auctionTitle: 'Auktion',
    auctionRefreshIn: 'Aktualisiert in',
    auctionAvailable: 'Im Angebot',
    auctionSoldOut: 'Ausverkauft',
    auctionExpired: 'Abgelaufen',
    auctionStockLeft: (count) => `Übrig: ${count}`,
    auctionPrice: 'Preis',
    auctionEmpty: 'Noch keine Auktionsdaten',
    navSeeds: 'Samen',
    navGears: 'Ausrüstung',
    navCrates: 'Kisten',
    navAuction: 'Auktion',
    navWeather: 'Wetter',
    navFuture: 'Zukunft'
  }),
  tr: extendEnglish({
    subtitle: 'Canlı stok ve bildirimler',
    statusOnline: 'Çevrimiçi',
    statusOffline: 'Çevrimdışı',
    lastUpdatedPrefix: 'Güncellendi: ',
    restockHeader: '<i class="fa-solid fa-clock"></i> Restock sayaçları',
    searchPlaceholder: 'Eşya ara...',
    filterAll: 'Tümü',
    filterInStock: 'Stokta',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Kasalar',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Ekipman',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Tohumlar',
    loadingPlaceholder: 'Canlı veriler bekleniyor...',
    noItemsPlaceholder: 'Bu filtrelerde eşya yok',
    inStockText: ' adet',
    outOfStockText: 'Stok yok',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Hava ve zaman',
    weatherLabelTime: 'Günün zamanı',
    weatherLabelActive: 'Aktif hava',
    weatherNone: 'Yok',
    weatherEndsIn: 'Biter: {}',
    sidebarMultipliers: 'Satış çarpanları',
    auctionTitle: 'Açık artırma',
    auctionRefreshIn: 'Yenilenme',
    auctionAvailable: 'Satışta',
    auctionSoldOut: 'Tükendi',
    auctionExpired: 'Süresi doldu',
    auctionStockLeft: (count) => `Kalan: ${count}`,
    auctionPrice: 'Fiyat',
    auctionEmpty: 'Açık artırma verisi henüz yok',
    navSeeds: 'Tohum',
    navGears: 'Ekipman',
    navCrates: 'Kasa',
    navAuction: 'Açık artırma',
    navWeather: 'Hava',
    navFuture: 'Gelecek'
  }),
  id: extendEnglish({
    subtitle: 'Stok live dan notifikasi',
    statusOnline: 'Online',
    statusOffline: 'Offline',
    lastUpdatedPrefix: 'Diperbarui: ',
    restockHeader: '<i class="fa-solid fa-clock"></i> Timer restock',
    searchPlaceholder: 'Cari item...',
    filterAll: 'Semua',
    filterInStock: 'Ada stok',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Peti',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Peralatan',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Benih',
    loadingPlaceholder: 'Menunggu data live...',
    noItemsPlaceholder: 'Tidak ada item untuk filter ini',
    inStockText: ' pcs',
    outOfStockText: 'Stok habis',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Cuaca dan waktu',
    weatherLabelTime: 'Waktu',
    weatherLabelActive: 'Cuaca aktif',
    weatherNone: 'Tidak ada',
    weatherEndsIn: 'Berakhir dalam: {}',
    sidebarMultipliers: 'Multiplier jual',
    auctionTitle: 'Lelang',
    auctionRefreshIn: 'Refresh dalam',
    auctionAvailable: 'Dijual',
    auctionSoldOut: 'Habis',
    auctionExpired: 'Kedaluwarsa',
    auctionStockLeft: (count) => `Sisa: ${count}`,
    auctionPrice: 'Harga',
    auctionEmpty: 'Data lelang belum masuk',
    navSeeds: 'Benih',
    navGears: 'Peralatan',
    navCrates: 'Peti',
    navAuction: 'Lelang',
    navWeather: 'Cuaca',
    navFuture: 'Masa depan'
  }),
  uk: extendEnglish({
    subtitle: 'Живий сток і сповіщення',
    statusOnline: 'Онлайн',
    statusOffline: 'Офлайн',
    lastUpdatedNever: 'Останнє оновлення: ніколи',
    lastUpdatedPrefix: 'Оновлено: ',
    lastUpdatedWaiting: 'Очікування даних...',
    restockHeader: '<i class="fa-solid fa-clock"></i> Таймери завозу',
    notificationBanner: '<strong>Сповіщення:</strong> натисніть дзвіночок 🔔 на картці предмета, щоб отримати повідомлення, коли він з’явиться.',
    searchPlaceholder: 'Пошук предметів...',
    filterAll: 'Усі',
    filterInStock: 'В наявності',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Ящики',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Спорядження',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Насіння',
    loadingPlaceholder: 'Очікування актуальних даних...',
    noItemsPlaceholder: 'Немає предметів за фільтрами',
    inStockText: ' шт.',
    outOfStockText: 'Немає стоку',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Погода і час доби',
    weatherLabelTime: 'Час доби',
    weatherLabelActive: 'Активна погода',
    weatherNone: 'Немає',
    weatherEndsIn: 'Закінчиться через: {}',
    sidebarMultipliers: 'Множники продажу',
    auctionTitle: 'Аукціон',
    auctionRefreshIn: 'Оновлення через',
    auctionAvailable: 'У продажу',
    auctionSoldOut: 'Продано',
    auctionExpired: 'Минуло',
    auctionStockUnlimited: 'Без ліміту',
    auctionStockLeft: (count) => `Залишилось: ${count}`,
    auctionPrice: 'Ціна',
    auctionEmpty: 'Дані аукціону ще не отримані',
    navSeeds: 'Насіння',
    navGears: 'Спорядження',
    navCrates: 'Ящики',
    navAuction: 'Аукціон',
    navWeather: 'Погода',
    navFuture: 'Майбутнє'
  }),
  pl: extendEnglish({
    subtitle: 'Live stock i powiadomienia',
    statusOnline: 'Online',
    statusOffline: 'Offline',
    lastUpdatedPrefix: 'Zaktualizowano: ',
    restockHeader: '<i class="fa-solid fa-clock"></i> Timery restocku',
    searchPlaceholder: 'Szukaj przedmiotów...',
    filterAll: 'Wszystko',
    filterInStock: 'W stocku',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> Skrzynki',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> Ekwipunek',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> Nasiona',
    loadingPlaceholder: 'Oczekiwanie na dane na żywo...',
    noItemsPlaceholder: 'Brak przedmiotów dla filtrów',
    inStockText: ' szt.',
    outOfStockText: 'Brak stocku',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> Pogoda i czas',
    weatherLabelTime: 'Pora dnia',
    weatherLabelActive: 'Aktywna pogoda',
    weatherNone: 'Brak',
    weatherEndsIn: 'Koniec za: {}',
    sidebarMultipliers: 'Mnożniki sprzedaży',
    auctionTitle: 'Aukcja',
    auctionRefreshIn: 'Odświeżenie za',
    auctionAvailable: 'W sprzedaży',
    auctionSoldOut: 'Wyprzedane',
    auctionExpired: 'Wygasło',
    auctionStockLeft: (count) => `Zostało: ${count}`,
    auctionPrice: 'Cena',
    auctionEmpty: 'Brak danych aukcji',
    navSeeds: 'Nasiona',
    navGears: 'Sprzęt',
    navCrates: 'Skrzynki',
    navAuction: 'Aukcja',
    navWeather: 'Pogoda',
    navFuture: 'Przyszłość'
  }),
  zh: extendEnglish({
    subtitle: '实时库存与提醒',
    statusOnline: '在线',
    statusOffline: '离线',
    lastUpdatedNever: '最后更新：从未',
    lastUpdatedPrefix: '已更新：',
    lastUpdatedWaiting: '等待数据...',
    restockHeader: '<i class="fa-solid fa-clock"></i> 补货计时器',
    notificationBanner: '<strong>通知：</strong>点击物品卡片上的铃铛 🔔，物品回到库存时浏览器会提醒你。',
    searchPlaceholder: '搜索物品...',
    filterAll: '全部',
    filterInStock: '有库存',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> 箱子',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> 装备',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> 种子',
    loadingPlaceholder: '等待实时数据...',
    noItemsPlaceholder: '没有符合筛选的物品',
    inStockText: ' 个',
    outOfStockText: '缺货',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> 天气与时间',
    weatherLabelTime: '时间',
    weatherLabelActive: '当前天气',
    weatherNone: '无',
    weatherEndsIn: '结束于：{}',
    sidebarMultipliers: '出售倍率',
    auctionTitle: '拍卖',
    auctionRefreshIn: '刷新倒计时',
    auctionAvailable: '出售中',
    auctionSoldOut: '已售罄',
    auctionExpired: '已过期',
    auctionStockUnlimited: '无限',
    auctionStockLeft: (count) => `剩余：${count}`,
    auctionPrice: '价格',
    auctionEmpty: '暂无拍卖数据',
    navSeeds: '种子',
    navGears: '装备',
    navCrates: '箱子',
    navAuction: '拍卖',
    navWeather: '天气',
    navFuture: '未来'
  }),
  ja: extendEnglish({
    subtitle: 'ライブ在庫と通知',
    statusOnline: 'オンライン',
    statusOffline: 'オフライン',
    lastUpdatedNever: '最終更新：なし',
    lastUpdatedPrefix: '更新：',
    lastUpdatedWaiting: 'データ待機中...',
    restockHeader: '<i class="fa-solid fa-clock"></i> 入荷タイマー',
    notificationBanner: '<strong>通知：</strong>アイテムカードのベル 🔔 を押すと、再入荷時にブラウザ通知を受け取れます。',
    searchPlaceholder: 'アイテム検索...',
    filterAll: 'すべて',
    filterInStock: '在庫あり',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> クレート',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> ギア',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> 種',
    loadingPlaceholder: 'ライブデータを待機中...',
    noItemsPlaceholder: '条件に合うアイテムがありません',
    inStockText: ' 個',
    outOfStockText: '在庫切れ',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> 天気と時間',
    weatherLabelTime: '時間帯',
    weatherLabelActive: '現在の天気',
    weatherNone: 'なし',
    weatherEndsIn: '終了まで：{}',
    sidebarMultipliers: '売却倍率',
    auctionTitle: 'オークション',
    auctionRefreshIn: '更新まで',
    auctionAvailable: '販売中',
    auctionSoldOut: '売り切れ',
    auctionExpired: '期限切れ',
    auctionStockUnlimited: '無制限',
    auctionStockLeft: (count) => `残り：${count}`,
    auctionPrice: '価格',
    auctionEmpty: 'オークションデータはまだありません',
    navSeeds: '種',
    navGears: 'ギア',
    navCrates: 'クレート',
    navAuction: 'オークション',
    navWeather: '天気',
    navFuture: '未来'
  }),
  ko: extendEnglish({
    subtitle: '실시간 재고와 알림',
    statusOnline: '온라인',
    statusOffline: '오프라인',
    lastUpdatedNever: '마지막 업데이트: 없음',
    lastUpdatedPrefix: '업데이트: ',
    lastUpdatedWaiting: '데이터 대기 중...',
    restockHeader: '<i class="fa-solid fa-clock"></i> 재입고 타이머',
    notificationBanner: '<strong>알림:</strong> 아이템 카드의 종 🔔 을 누르면 재입고 시 브라우저 알림을 받을 수 있습니다.',
    searchPlaceholder: '아이템 검색...',
    filterAll: '전체',
    filterInStock: '재고 있음',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> 상자',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> 장비',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> 씨앗',
    loadingPlaceholder: '실시간 데이터 대기 중...',
    noItemsPlaceholder: '필터에 맞는 아이템이 없습니다',
    inStockText: '개',
    outOfStockText: '품절',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> 날씨와 시간',
    weatherLabelTime: '시간대',
    weatherLabelActive: '활성 날씨',
    weatherNone: '없음',
    weatherEndsIn: '종료까지: {}',
    sidebarMultipliers: '판매 배율',
    auctionTitle: '경매',
    auctionRefreshIn: '새로고침까지',
    auctionAvailable: '판매 중',
    auctionSoldOut: '매진',
    auctionExpired: '만료됨',
    auctionStockUnlimited: '무제한',
    auctionStockLeft: (count) => `남음: ${count}`,
    auctionPrice: '가격',
    auctionEmpty: '아직 경매 데이터가 없습니다',
    navSeeds: '씨앗',
    navGears: '장비',
    navCrates: '상자',
    navAuction: '경매',
    navWeather: '날씨',
    navFuture: '예정'
  }),
  ar: extendEnglish({
    subtitle: 'المخزون المباشر والتنبيهات',
    statusOnline: 'متصل',
    statusOffline: 'غير متصل',
    lastUpdatedNever: 'آخر تحديث: أبداً',
    lastUpdatedPrefix: 'تم التحديث: ',
    lastUpdatedWaiting: 'بانتظار البيانات...',
    restockHeader: '<i class="fa-solid fa-clock"></i> مؤقتات إعادة التزويد',
    notificationBanner: '<strong>الإشعارات:</strong> اضغط الجرس 🔔 على بطاقة العنصر ليصلك تنبيه عند عودته للمخزون.',
    searchPlaceholder: 'ابحث عن عنصر...',
    filterAll: 'الكل',
    filterInStock: 'متوفر',
    sectionCrates: '<i class="fa-solid fa-box-open"></i> الصناديق',
    sectionGears: '<i class="fa-solid fa-screwdriver-wrench"></i> المعدات',
    sectionSeeds: '<i class="fa-solid fa-leaf"></i> البذور',
    loadingPlaceholder: 'بانتظار بيانات بوت Roblox...',
    noItemsPlaceholder: 'لا توجد عناصر لهذه الفلاتر',
    inStockText: ' قطعة',
    outOfStockText: 'غير متوفر',
    weatherHeader: '<i class="fa-solid fa-cloud-sun"></i> الطقس والوقت',
    weatherLabelTime: 'وقت اليوم',
    weatherLabelActive: 'الطقس النشط',
    weatherNone: 'لا يوجد',
    weatherEndsIn: 'ينتهي خلال: {}',
    sidebarMultipliers: 'مضاعفات البيع',
    auctionTitle: 'المزاد',
    auctionRefreshIn: 'التحديث خلال',
    auctionAvailable: 'معروض',
    auctionSoldOut: 'نفد',
    auctionExpired: 'انتهى',
    auctionStockUnlimited: 'غير محدود',
    auctionStockLeft: (count) => `المتبقي: ${count}`,
    auctionPrice: 'السعر',
    auctionEmpty: 'لا توجد بيانات مزاد بعد',
    navSeeds: 'البذور',
    navGears: 'المعدات',
    navCrates: 'الصناديق',
    navAuction: 'المزاد',
    navWeather: 'الطقس',
    navFuture: 'القادم'
  })
});

const calculatorTranslationOverrides = {
  es: {
    tgPromoTitle: '🔔 Recibe alertas en Telegram!',
    tgPromoSub: 'Prueba nuestro bot - alertas de restock por mensaje privado',
    navCalculator: 'Calculadora',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Calculadora de valor',
    calculatorFruitLabel: 'Fruta',
    calculatorFruitPlaceholder: 'Empieza a escribir una fruta',
    calculatorWeightLabel: 'Peso',
    calculatorMutationLabel: 'Mutación',
    calculatorFriendsLabel: 'Amigos cerca',
    calculatorBaseValue: (value) => `Base: ${value}`,
    calculatorNoData: 'Esperando datos de la calculadora...',
    calculatorSelectFruit: 'Selecciona una fruta',
    calculatorUpdatedAt: (value) => `Actualizado: ${value}`
  },
  pt: {
    tgPromoTitle: '🔔 Receba alertas no Telegram!',
    tgPromoSub: 'Use nosso bot - alertas de restock direto no privado',
    navCalculator: 'Calculadora',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Calculadora de valor',
    calculatorFruitLabel: 'Fruta',
    calculatorFruitPlaceholder: 'Comece a digitar uma fruta',
    calculatorWeightLabel: 'Peso',
    calculatorMutationLabel: 'Mutação',
    calculatorFriendsLabel: 'Amigos perto',
    calculatorBaseValue: (value) => `Base: ${value}`,
    calculatorNoData: 'Aguardando dados da calculadora...',
    calculatorSelectFruit: 'Selecione uma fruta',
    calculatorUpdatedAt: (value) => `Atualizado: ${value}`
  },
  fr: {
    tgPromoTitle: '🔔 Recevez les alertes sur Telegram!',
    tgPromoSub: 'Essayez notre bot - alertes de restock en MP',
    navCalculator: 'Calculateur',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Calculateur de valeur',
    calculatorFruitLabel: 'Fruit',
    calculatorFruitPlaceholder: 'Tapez le nom du fruit',
    calculatorWeightLabel: 'Poids',
    calculatorMutationLabel: 'Mutation',
    calculatorFriendsLabel: 'Amis proches',
    calculatorBaseValue: (value) => `Base : ${value}`,
    calculatorNoData: 'En attente des données du calculateur...',
    calculatorSelectFruit: 'Choisissez un fruit',
    calculatorUpdatedAt: (value) => `Mis à jour : ${value}`
  },
  de: {
    tgPromoTitle: '🔔 Erhalte Alerts in Telegram!',
    tgPromoSub: 'Nutze unseren Bot - Restock-Alerts direkt per DM',
    navCalculator: 'Rechner',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Fruchtwert-Rechner',
    calculatorFruitLabel: 'Frucht',
    calculatorFruitPlaceholder: 'Fruchtnamen eingeben',
    calculatorWeightLabel: 'Gewicht',
    calculatorMutationLabel: 'Mutation',
    calculatorFriendsLabel: 'Freunde nah',
    calculatorBaseValue: (value) => `Basis: ${value}`,
    calculatorNoData: 'Warte auf Rechnerdaten...',
    calculatorSelectFruit: 'Wähle eine Frucht',
    calculatorUpdatedAt: (value) => `Aktualisiert: ${value}`
  },
  tr: {
    tgPromoTitle: '🔔 Telegram uyarıları al!',
    tgPromoSub: 'Botumuzu kullan - restock uyarıları DM’ye gelsin',
    navCalculator: 'Hesaplayıcı',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Meyve değer hesaplayıcı',
    calculatorFruitLabel: 'Meyve',
    calculatorFruitPlaceholder: 'Meyve adı yaz',
    calculatorWeightLabel: 'Ağırlık',
    calculatorMutationLabel: 'Mutasyon',
    calculatorFriendsLabel: 'Yakındaki arkadaş',
    calculatorBaseValue: (value) => `Taban: ${value}`,
    calculatorNoData: 'Hesaplayıcı verileri bekleniyor...',
    calculatorSelectFruit: 'Bir meyve seç',
    calculatorUpdatedAt: (value) => `Güncellendi: ${value}`
  },
  id: {
    tgPromoTitle: '🔔 Dapatkan alert di Telegram!',
    tgPromoSub: 'Coba bot kami - alert restock langsung ke DM',
    navCalculator: 'Kalkulator',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Kalkulator nilai buah',
    calculatorFruitLabel: 'Buah',
    calculatorFruitPlaceholder: 'Ketik nama buah',
    calculatorWeightLabel: 'Berat',
    calculatorMutationLabel: 'Mutasi',
    calculatorFriendsLabel: 'Teman dekat',
    calculatorBaseValue: (value) => `Dasar: ${value}`,
    calculatorNoData: 'Menunggu data kalkulator...',
    calculatorSelectFruit: 'Pilih buah',
    calculatorUpdatedAt: (value) => `Diperbarui: ${value}`
  },
  uk: {
    tgPromoTitle: '🔔 Отримуй сповіщення в Telegram!',
    tgPromoSub: 'Переходь у нашого бота - сповіщення про завози в ЛС',
    navCalculator: 'Калькулятор',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Калькулятор ціни фрукта',
    calculatorFruitLabel: 'Фрукт',
    calculatorFruitPlaceholder: 'Почніть писати назву фрукта',
    calculatorWeightLabel: 'Вага',
    calculatorMutationLabel: 'Мутація',
    calculatorFriendsLabel: 'Друзі поруч',
    calculatorBaseValue: (value) => `База: ${value}`,
    calculatorNoData: 'Очікування даних калькулятора...',
    calculatorSelectFruit: 'Виберіть фрукт',
    calculatorUpdatedAt: (value) => `Оновлено: ${value}`
  },
  pl: {
    tgPromoTitle: '🔔 Odbieraj alerty w Telegramie!',
    tgPromoSub: 'Użyj naszego bota - alerty restocku prosto na priv',
    navCalculator: 'Kalkulator',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> Kalkulator wartości',
    calculatorFruitLabel: 'Owoc',
    calculatorFruitPlaceholder: 'Zacznij wpisywać owoc',
    calculatorWeightLabel: 'Waga',
    calculatorMutationLabel: 'Mutacja',
    calculatorFriendsLabel: 'Znajomi blisko',
    calculatorBaseValue: (value) => `Baza: ${value}`,
    calculatorNoData: 'Oczekiwanie na dane kalkulatora...',
    calculatorSelectFruit: 'Wybierz owoc',
    calculatorUpdatedAt: (value) => `Zaktualizowano: ${value}`
  },
  zh: {
    tgPromoTitle: '🔔 在 Telegram 接收提醒!',
    tgPromoSub: '使用我们的机器人 - 补货提醒直接发到私聊',
    navCalculator: '计算器',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> 水果价值计算器',
    calculatorFruitLabel: '水果',
    calculatorFruitPlaceholder: '输入水果名称',
    calculatorWeightLabel: '重量',
    calculatorMutationLabel: '突变',
    calculatorFriendsLabel: '附近好友',
    calculatorBaseValue: (value) => `基础: ${value}`,
    calculatorNoData: '等待计算器数据...',
    calculatorSelectFruit: '选择水果',
    calculatorUpdatedAt: (value) => `已更新: ${value}`
  },
  ja: {
    tgPromoTitle: '🔔 Telegramで通知を受け取る!',
    tgPromoSub: 'ボットで再入荷通知をDMに送信',
    navCalculator: '計算機',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> フルーツ価値計算機',
    calculatorFruitLabel: 'フルーツ',
    calculatorFruitPlaceholder: 'フルーツ名を入力',
    calculatorWeightLabel: '重さ',
    calculatorMutationLabel: '変異',
    calculatorFriendsLabel: '近くの友達',
    calculatorBaseValue: (value) => `基本: ${value}`,
    calculatorNoData: '計算データを待機中...',
    calculatorSelectFruit: 'フルーツを選択',
    calculatorUpdatedAt: (value) => `更新: ${value}`
  },
  ko: {
    tgPromoTitle: '🔔 Telegram에서 알림 받기!',
    tgPromoSub: '봇으로 재입고 알림을 DM으로 받으세요',
    navCalculator: '계산기',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> 과일 가치 계산기',
    calculatorFruitLabel: '과일',
    calculatorFruitPlaceholder: '과일 이름 입력',
    calculatorWeightLabel: '무게',
    calculatorMutationLabel: '변이',
    calculatorFriendsLabel: '근처 친구',
    calculatorBaseValue: (value) => `기본: ${value}`,
    calculatorNoData: '계산기 데이터 대기 중...',
    calculatorSelectFruit: '과일 선택',
    calculatorUpdatedAt: (value) => `업데이트: ${value}`
  },
  ar: {
    tgPromoTitle: '🔔 احصل على التنبيهات في Telegram!',
    tgPromoSub: 'استخدم بوتنا - تنبيهات المخزون تصلك في الخاص',
    navCalculator: 'الحاسبة',
    calculatorTitle: '<i class="fa-solid fa-calculator"></i> حاسبة قيمة الفاكهة',
    calculatorFruitLabel: 'الفاكهة',
    calculatorFruitPlaceholder: 'اكتب اسم الفاكهة',
    calculatorWeightLabel: 'الوزن',
    calculatorMutationLabel: 'الطفرة',
    calculatorFriendsLabel: 'الأصدقاء قربك',
    calculatorBaseValue: (value) => `الأساس: ${value}`,
    calculatorNoData: 'بانتظار بيانات الحاسبة...',
    calculatorSelectFruit: 'اختر فاكهة',
    calculatorUpdatedAt: (value) => `تم التحديث: ${value}`
  }
};

Object.entries(calculatorTranslationOverrides).forEach(([lang, values]) => {
  if (translations[lang]) Object.assign(translations[lang], values);
});

const neutralLiveDataMessages = {
  ru: {
    loadingPlaceholder: 'Ожидание актуальных данных...',
    calculatorFormulaHint: 'Расчёт обновляется автоматически по актуальным данным.',
    calculatorNoData: 'Ожидание данных калькулятора...',
    calculatorWeightLabel: 'Вес, kg',
    calculatorWeightHint: 'Игровой вес плода в килограммах (kg), как в Grow a Garden 2.',
    calculatorMultiplierLabel: 'Множитель продаж',
    calculatorMultiplierHint: 'Учитывает live-множитель из игры для выбранного фрукта.',
    calculatorCurrentMultiplierButton: (rate) => `Посчитать по текущему x${rate}`,
    calculatorCurrentMultiplierActive: (rate) => `Учитывается x${rate}`,
    calculatorCurrentMultiplierUnavailable: 'Нет текущего множителя'
  },
  en: {
    loadingPlaceholder: 'Waiting for live data...',
    calculatorFormulaHint: 'Calculation updates automatically from live data.',
    calculatorNoData: 'Waiting for calculator data...',
    calculatorWeightLabel: 'Weight, kg',
    calculatorWeightHint: 'In-game fruit weight in kilograms (kg), like in Grow a Garden 2.',
    calculatorMultiplierLabel: 'Sell multiplier',
    calculatorMultiplierHint: 'Uses the current in-game sell multiplier for the selected fruit.',
    calculatorCurrentMultiplierButton: (rate) => `Use current x${rate}`,
    calculatorCurrentMultiplierActive: (rate) => `Using x${rate}`,
    calculatorCurrentMultiplierUnavailable: 'No current multiplier'
  },
  es: {
    loadingPlaceholder: 'Esperando datos en vivo...',
    calculatorFormulaHint: 'El cálculo se actualiza automáticamente con datos en vivo.',
    calculatorNoData: 'Esperando datos de la calculadora...'
  },
  pt: {
    loadingPlaceholder: 'Aguardando dados ao vivo...',
    calculatorFormulaHint: 'O cálculo atualiza automaticamente com dados ao vivo.',
    calculatorNoData: 'Aguardando dados da calculadora...'
  },
  fr: {
    loadingPlaceholder: 'En attente des données en direct...',
    calculatorFormulaHint: 'Le calcul se met à jour automatiquement avec les données en direct.',
    calculatorNoData: 'En attente des données du calculateur...'
  },
  de: {
    loadingPlaceholder: 'Warte auf Live-Daten...',
    calculatorFormulaHint: 'Die Berechnung aktualisiert sich automatisch mit Live-Daten.',
    calculatorNoData: 'Warte auf Rechnerdaten...'
  },
  tr: {
    loadingPlaceholder: 'Canlı veriler bekleniyor...',
    calculatorFormulaHint: 'Hesaplama canlı verilerle otomatik güncellenir.',
    calculatorNoData: 'Hesaplayıcı verileri bekleniyor...'
  },
  id: {
    loadingPlaceholder: 'Menunggu data live...',
    calculatorFormulaHint: 'Perhitungan diperbarui otomatis dari data live.',
    calculatorNoData: 'Menunggu data kalkulator...'
  },
  uk: {
    loadingPlaceholder: 'Очікування актуальних даних...',
    calculatorFormulaHint: 'Розрахунок автоматично оновлюється за актуальними даними.',
    calculatorNoData: 'Очікування даних калькулятора...'
  },
  pl: {
    loadingPlaceholder: 'Oczekiwanie na dane na żywo...',
    calculatorFormulaHint: 'Obliczenia aktualizują się automatycznie z danych na żywo.',
    calculatorNoData: 'Oczekiwanie na dane kalkulatora...'
  },
  zh: {
    loadingPlaceholder: '等待实时数据...',
    calculatorFormulaHint: '计算会根据实时数据自动更新。',
    calculatorNoData: '等待计算器数据...'
  },
  ja: {
    loadingPlaceholder: 'ライブデータを待機中...',
    calculatorFormulaHint: '計算はライブデータで自動更新されます。',
    calculatorNoData: '計算データを待機中...'
  },
  ko: {
    loadingPlaceholder: '실시간 데이터 대기 중...',
    calculatorFormulaHint: '계산은 실시간 데이터로 자동 업데이트됩니다.',
    calculatorNoData: '계산기 데이터 대기 중...'
  },
  ar: {
    loadingPlaceholder: 'بانتظار البيانات المباشرة...',
    calculatorFormulaHint: 'يتم تحديث الحساب تلقائياً من البيانات المباشرة.',
    calculatorNoData: 'بانتظار بيانات الحاسبة...'
  }
};

Object.entries(neutralLiveDataMessages).forEach(([lang, values]) => {
  if (translations[lang]) Object.assign(translations[lang], values);
});

if (translations.ru) {
  translations.ru.calculatorBaseValue = (average, perKg) => `Средняя: ${average} | за kg: ${perKg}`;
  translations.ru.calculatorRottenLabel = 'Сгнивший фрукт';
  translations.ru.calculatorRottenHint = 'В игре полностью сгнивший фрукт продаётся за 20% цены.';
  translations.ru.calculatorSingleHarvestPenaltyLabel = 'Штраф одноразовых растений';
  translations.ru.calculatorSingleHarvestPenaltyHint = 'Если включить, x10 станет x2.35 для single-harvest, как в игровом коде.';
}
if (translations.en) {
  translations.en.calculatorBaseValue = (average, perKg) => `Average: ${average} | per kg: ${perKg}`;
  translations.en.calculatorRottenLabel = 'Rotten fruit';
  translations.en.calculatorRottenHint = 'Fully rotten fruit sells for 20% of the value.';
  translations.en.calculatorSingleHarvestPenaltyLabel = 'Single-harvest penalty';
  translations.en.calculatorSingleHarvestPenaltyHint = 'When enabled, x10 becomes x2.35 for single-harvest crops.';
}
if (translations.ru) {
  translations.ru.multipliersUpdatedAt = (time) => `\u041e\u0431\u043d\u043e\u0432\u0438\u043b\u0438\u0441\u044c \u0432 ${time}`;
  translations.ru.multipliersUpdatedWaiting = '\u041c\u043d\u043e\u0436\u0438\u0442\u0435\u043b\u0438 \u0435\u0449\u0435 \u043d\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u044f\u043b\u0438\u0441\u044c';
}
if (translations.en) {
  translations.en.multipliersUpdatedAt = (time) => `Updated at ${time}`;
  translations.en.multipliersUpdatedWaiting = 'Waiting for multiplier update';
}

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

function getItemTranslationKey(name) {
  return String(name || '').toLowerCase().trim().replace(/\s+/g, ' ');
}

const fallbackWordTranslations = {
  bloom: 'цветение',
  flower: 'цветок',
  fruit: 'фрукт',
  seed: 'семена',
  seeds: 'семена',
  mushroom: 'гриб',
  moon: 'лунное',
  sun: 'солнечное',
  solar: 'солнечное',
  dragon: 'дракон',
  poison: 'ядовитый',
  ghost: 'призрачный',
  hypno: 'гипно',
  hypnotic: 'гипнотический',
  glow: 'светящееся',
  golden: 'золотой',
  rainbow: 'радужный',
  blood: 'кровавый',
  baby: 'маленький'
};

const itemWordTranslations = {
  seed: { ru: 'семена', es: 'semilla', pt: 'semente', fr: 'graine', de: 'Samen', tr: 'tohum', id: 'benih', uk: 'насіння', pl: 'nasiono', zh: '种子', ja: '種', ko: '씨앗', ar: 'بذرة' },
  seeds: { ru: 'семена', es: 'semillas', pt: 'sementes', fr: 'graines', de: 'Samen', tr: 'tohumlar', id: 'benih', uk: 'насіння', pl: 'nasiona', zh: '种子', ja: '種', ko: '씨앗', ar: 'بذور' },
  fruit: { ru: 'фрукт', es: 'fruta', pt: 'fruta', fr: 'fruit', de: 'Frucht', tr: 'meyve', id: 'buah', uk: 'фрукт', pl: 'owoc', zh: '水果', ja: '果物', ko: '과일', ar: 'فاكهة' },
  carrot: { ru: 'морковь', es: 'zanahoria', pt: 'cenoura', fr: 'carotte', de: 'Karotte', tr: 'havuç', id: 'wortel', uk: 'морква', pl: 'marchew', zh: '胡萝卜', ja: 'ニンジン', ko: '당근', ar: 'جزر' },
  strawberry: { ru: 'клубника', es: 'fresa', pt: 'morango', fr: 'fraise', de: 'Erdbeere', tr: 'çilek', id: 'stroberi', uk: 'полуниця', pl: 'truskawka', zh: '草莓', ja: 'イチゴ', ko: '딸기', ar: 'فراولة' },
  watermelon: { ru: 'арбуз', es: 'sandía', pt: 'melancia', fr: 'pastèque', de: 'Wassermelone', tr: 'karpuz', id: 'semangka', uk: 'кавун', pl: 'arbuz', zh: '西瓜', ja: 'スイカ', ko: '수박', ar: 'بطيخ' },
  pumpkin: { ru: 'тыква', es: 'calabaza', pt: 'abóbora', fr: 'citrouille', de: 'Kürbis', tr: 'balkabağı', id: 'labu', uk: 'гарбуз', pl: 'dynia', zh: '南瓜', ja: 'カボチャ', ko: '호박', ar: 'قرع' },
  sunflower: { ru: 'подсолнух', es: 'girasol', pt: 'girassol', fr: 'tournesol', de: 'Sonnenblume', tr: 'ayçiçeği', id: 'bunga matahari', uk: 'соняшник', pl: 'słonecznik', zh: '向日葵', ja: 'ヒマワリ', ko: '해바라기', ar: 'دوار الشمس' },
  wheat: { ru: 'пшеница', es: 'trigo', pt: 'trigo', fr: 'blé', de: 'Weizen', tr: 'buğday', id: 'gandum', uk: 'пшениця', pl: 'pszenica', zh: '小麦', ja: '小麦', ko: '밀', ar: 'قمح' },
  tomato: { ru: 'помидор', es: 'tomate', pt: 'tomate', fr: 'tomate', de: 'Tomate', tr: 'domates', id: 'tomat', uk: 'помідор', pl: 'pomidor', zh: '番茄', ja: 'トマト', ko: '토마토', ar: 'طماطم' },
  potato: { ru: 'картофель', es: 'patata', pt: 'batata', fr: 'pomme de terre', de: 'Kartoffel', tr: 'patates', id: 'kentang', uk: 'картопля', pl: 'ziemniak', zh: '土豆', ja: 'ジャガイモ', ko: '감자', ar: 'بطاطس' },
  onion: { ru: 'лук', es: 'cebolla', pt: 'cebola', fr: 'oignon', de: 'Zwiebel', tr: 'soğan', id: 'bawang', uk: 'цибуля', pl: 'cebula', zh: '洋葱', ja: 'タマネギ', ko: '양파', ar: 'بصل' },
  corn: { ru: 'кукуруза', es: 'maíz', pt: 'milho', fr: 'maïs', de: 'Mais', tr: 'mısır', id: 'jagung', uk: 'кукурудза', pl: 'kukurydza', zh: '玉米', ja: 'トウモロコシ', ko: '옥수수', ar: 'ذرة' },
  pineapple: { ru: 'ананас', es: 'piña', pt: 'abacaxi', fr: 'ananas', de: 'Ananas', tr: 'ananas', id: 'nanas', uk: 'ананас', pl: 'ananas', zh: '菠萝', ja: 'パイナップル', ko: '파인애플', ar: 'أناناس' },
  cabbage: { ru: 'капуста', es: 'col', pt: 'repolho', fr: 'chou', de: 'Kohl', tr: 'lahana', id: 'kubis', uk: 'капуста', pl: 'kapusta', zh: '卷心菜', ja: 'キャベツ', ko: '양배추', ar: 'ملفوف' },
  dragonfruit: { ru: 'драконий фрукт', es: 'pitaya', pt: 'pitaya', fr: 'fruit du dragon', de: 'Drachenfrucht', tr: 'ejder meyvesi', id: 'buah naga', uk: 'драконів фрукт', pl: 'smoczy owoc', zh: '火龙果', ja: 'ドラゴンフルーツ', ko: '용과', ar: 'فاكهة التنين' },
  starfruit: { ru: 'старфрут', es: 'carambola', pt: 'carambola', fr: 'carambole', de: 'Sternfrucht', tr: 'yıldız meyvesi', id: 'belimbing', uk: 'карамбола', pl: 'karambola', zh: '杨桃', ja: 'スターフルーツ', ko: '스타프루트', ar: 'فاكهة النجمة' },
  blueberry: { ru: 'черника', es: 'arándano', pt: 'mirtilo', fr: 'myrtille', de: 'Blaubeere', tr: 'yaban mersini', id: 'blueberry', uk: 'чорниця', pl: 'borówka', zh: '蓝莓', ja: 'ブルーベリー', ko: '블루베리', ar: 'توت أزرق' },
  apple: { ru: 'яблоко', es: 'manzana', pt: 'maçã', fr: 'pomme', de: 'Apfel', tr: 'elma', id: 'apel', uk: 'яблуко', pl: 'jabłko', zh: '苹果', ja: 'リンゴ', ko: '사과', ar: 'تفاح' },
  banana: { ru: 'банан', es: 'plátano', pt: 'banana', fr: 'banane', de: 'Banane', tr: 'muz', id: 'pisang', uk: 'банан', pl: 'banan', zh: '香蕉', ja: 'バナナ', ko: '바나나', ar: 'موز' },
  mango: { ru: 'манго', es: 'mango', pt: 'manga', fr: 'mangue', de: 'Mango', tr: 'mango', id: 'mangga', uk: 'манго', pl: 'mango', zh: '芒果', ja: 'マンゴー', ko: '망고', ar: 'مانجو' },
  mushroom: { ru: 'гриб', es: 'seta', pt: 'cogumelo', fr: 'champignon', de: 'Pilz', tr: 'mantar', id: 'jamur', uk: 'гриб', pl: 'grzyb', zh: '蘑菇', ja: 'キノコ', ko: '버섯', ar: 'فطر' },
  bamboo: { ru: 'бамбук', es: 'bambú', pt: 'bambu', fr: 'bambou', de: 'Bambus', tr: 'bambu', id: 'bambu', uk: 'бамбук', pl: 'bambus', zh: '竹子', ja: '竹', ko: '대나무', ar: 'خيزران' },
  cactus: { ru: 'кактус', es: 'cactus', pt: 'cacto', fr: 'cactus', de: 'Kaktus', tr: 'kaktüs', id: 'kaktus', uk: 'кактус', pl: 'kaktus', zh: '仙人掌', ja: 'サボテン', ko: '선인장', ar: 'صبار' },
  golden: { ru: 'золотой', es: 'dorado', pt: 'dourado', fr: 'doré', de: 'golden', tr: 'altın', id: 'emas', uk: 'золотий', pl: 'złoty', zh: '金色', ja: '金色', ko: '황금', ar: 'ذهبي' },
  diamond: { ru: 'алмазный', es: 'diamante', pt: 'diamante', fr: 'diamant', de: 'Diamant', tr: 'elmas', id: 'berlian', uk: 'діамантовий', pl: 'diamentowy', zh: '钻石', ja: 'ダイヤ', ko: '다이아', ar: 'ماسي' },
  super: { ru: 'супер', es: 'súper', pt: 'super', fr: 'super', de: 'Super', tr: 'süper', id: 'super', uk: 'супер', pl: 'super', zh: '超级', ja: 'スーパー', ko: '슈퍼', ar: 'سوبر' },
  rare: { ru: 'редкий', es: 'raro', pt: 'raro', fr: 'rare', de: 'selten', tr: 'nadir', id: 'langka', uk: 'рідкісний', pl: 'rzadki', zh: '稀有', ja: 'レア', ko: '희귀', ar: 'نادر' },
  epic: { ru: 'эпический', es: 'épico', pt: 'épico', fr: 'épique', de: 'episch', tr: 'epik', id: 'epik', uk: 'епічний', pl: 'epicki', zh: '史诗', ja: 'エピック', ko: '에픽', ar: 'ملحمي' },
  legendary: { ru: 'легендарный', es: 'legendario', pt: 'lendário', fr: 'légendaire', de: 'legendär', tr: 'efsanevi', id: 'legendaris', uk: 'легендарний', pl: 'legendarny', zh: '传奇', ja: '伝説', ko: '전설', ar: 'أسطوري' },
  watering: { ru: 'лейка', es: 'riego', pt: 'rega', fr: 'arrosage', de: 'Gieß', tr: 'sulama', id: 'penyiram', uk: 'лійка', pl: 'podlewania', zh: '浇水', ja: '水やり', ko: '물뿌리개', ar: 'ري' },
  can: { ru: 'лейка', es: 'regadera', pt: 'regador', fr: 'arrosoir', de: 'Kanne', tr: 'kabı', id: 'kaleng', uk: 'лійка', pl: 'konewka', zh: '壶', ja: '缶', ko: '통', ar: 'علبة' },
  sprinkler: { ru: 'спринклер', es: 'aspersor', pt: 'aspersor', fr: 'arroseur', de: 'Sprinkler', tr: 'fıskiye', id: 'sprinkler', uk: 'спринклер', pl: 'zraszacz', zh: '洒水器', ja: 'スプリンクラー', ko: '스프링클러', ar: 'مرش' },
  shovel: { ru: 'лопата', es: 'pala', pt: 'pá', fr: 'pelle', de: 'Schaufel', tr: 'kürek', id: 'sekop', uk: 'лопата', pl: 'łopata', zh: '铲子', ja: 'シャベル', ko: '삽', ar: 'مجرفة' },
  crate: { ru: 'ящик', es: 'caja', pt: 'caixa', fr: 'caisse', de: 'Kiste', tr: 'kasa', id: 'peti', uk: 'ящик', pl: 'skrzynka', zh: '箱子', ja: 'クレート', ko: '상자', ar: 'صندوق' },
  pot: { ru: 'горшок', es: 'maceta', pt: 'vaso', fr: 'pot', de: 'Topf', tr: 'saksı', id: 'pot', uk: 'горщик', pl: 'doniczka', zh: '花盆', ja: '鉢', ko: '화분', ar: 'وعاء' }
};

Object.assign(itemWordTranslations, {
  acorn: { ru: 'Желудь', es: 'bellota', pt: 'bolota', fr: 'gland', de: 'Eichel', tr: 'meşe palamudu', id: 'biji ek', uk: 'жолудь', pl: 'żołądź', zh: '橡子', ja: 'どんぐり', ko: '도토리', ar: 'بلوط' },
  chili: { ru: 'Перец чили', es: 'chile', pt: 'pimenta', fr: 'piment', de: 'Chili', tr: 'acı biber', id: 'cabai', uk: 'чилі', pl: 'chili', zh: '辣椒', ja: 'チリ', ko: '고추', ar: 'فلفل حار' },
  blackberry: { ru: 'Ежевика', es: 'mora', pt: 'amora', fr: 'mûre', de: 'Brombeere', tr: 'böğürtlen', id: 'blackberry', uk: 'ожина', pl: 'jeżyna', zh: '黑莓', ja: 'ブラックベリー', ko: '블랙베리', ar: 'توت أسود' },
  raspberry: { ru: 'Малина', es: 'frambuesa', pt: 'framboesa', fr: 'framboise', de: 'Himbeere', tr: 'ahududu', id: 'raspberi', uk: 'малина', pl: 'malina', zh: '树莓', ja: 'ラズベリー', ko: '라즈베리', ar: 'توت العليق' },
  grape: { ru: 'Виноград', es: 'uva', pt: 'uva', fr: 'raisin', de: 'Traube', tr: 'üzüm', id: 'anggur', uk: 'виноград', pl: 'winogrono', zh: '葡萄', ja: 'ぶどう', ko: '포도', ar: 'عنب' },
  orange: { ru: 'Апельсин', es: 'naranja', pt: 'laranja', fr: 'orange', de: 'Orange', tr: 'portakal', id: 'jeruk', uk: 'апельсин', pl: 'pomarańcza', zh: '橙子', ja: 'オレンジ', ko: '오렌지', ar: 'برتقال' },
  lemon: { ru: 'Лимон', es: 'limón', pt: 'limão', fr: 'citron', de: 'Zitrone', tr: 'limon', id: 'lemon', uk: 'лимон', pl: 'cytryna', zh: '柠檬', ja: 'レモン', ko: '레몬', ar: 'ليمون' },
  cherry: { ru: 'Вишня', es: 'cereza', pt: 'cereja', fr: 'cerise', de: 'Kirsche', tr: 'kiraz', id: 'ceri', uk: 'вишня', pl: 'wiśnia', zh: '樱桃', ja: 'さくらんぼ', ko: '체리', ar: 'كرز' },
  berry: { ru: 'Ягода', es: 'baya', pt: 'fruta silvestre', fr: 'baie', de: 'Beere', tr: 'meyve', id: 'beri', uk: 'ягода', pl: 'jagoda', zh: '浆果', ja: 'ベリー', ko: '베리', ar: 'توت' },
  coconut: { ru: 'Кокос', es: 'coco', pt: 'coco', fr: 'noix de coco', de: 'Kokosnuss', tr: 'hindistan cevizi', id: 'kelapa', uk: 'кокос', pl: 'kokos', zh: '椰子', ja: 'ココナッツ', ko: '코코넛', ar: 'جوز الهند' },
  bonsai: { ru: 'Бонсай', es: 'bonsái', pt: 'bonsai', fr: 'bonsaï', de: 'Bonsai', tr: 'bonsai', id: 'bonsai', uk: 'бонсай', pl: 'bonsai', zh: '盆栽', ja: '盆栽', ko: '분재', ar: 'بونساي' },
  rose: { ru: 'Роза', es: 'rosa', pt: 'rosa', fr: 'rose', de: 'Rose', tr: 'gül', id: 'mawar', uk: 'троянда', pl: 'róża', zh: '玫瑰', ja: 'バラ', ko: '장미', ar: 'وردة' },
  tulip: { ru: 'Тюльпан', es: 'tulipán', pt: 'tulipa', fr: 'tulipe', de: 'Tulpe', tr: 'lale', id: 'tulip', uk: 'тюльпан', pl: 'tulipan', zh: '郁金香', ja: 'チューリップ', ko: '튤립', ar: 'توليب' },
  lily: { ru: 'Лилия', es: 'lirio', pt: 'lírio', fr: 'lys', de: 'Lilie', tr: 'zambak', id: 'lili', uk: 'лілія', pl: 'lilia', zh: '百合', ja: 'ユリ', ko: '백합', ar: 'زنبق' },
  orchid: { ru: 'Орхидея', es: 'orquídea', pt: 'orquídea', fr: 'orchidée', de: 'Orchidee', tr: 'orkide', id: 'anggrek', uk: 'орхідея', pl: 'orchidea', zh: '兰花', ja: 'ラン', ko: '난초', ar: 'أوركيد' },
  lavender: { ru: 'Лаванда', es: 'lavanda', pt: 'lavanda', fr: 'lavande', de: 'Lavendel', tr: 'lavanta', id: 'lavender', uk: 'лаванда', pl: 'lawenda', zh: '薰衣草', ja: 'ラベンダー', ko: '라벤더', ar: 'لافندر' },
  magic: { ru: 'Волшебный', es: 'mágico', pt: 'mágico', fr: 'magique', de: 'magisch', tr: 'sihirli', id: 'ajaib', uk: 'магічний', pl: 'magiczny', zh: '魔法', ja: '魔法', ko: '마법', ar: 'سحري' },
  ancient: { ru: 'Древний', es: 'antiguo', pt: 'antigo', fr: 'ancien', de: 'antik', tr: 'antik', id: 'kuno', uk: 'давній', pl: 'starożytny', zh: '远古', ja: '古代', ko: '고대', ar: 'قديم' },
  spore: { ru: 'Спора', es: 'espora', pt: 'esporo', fr: 'spore', de: 'Spore', tr: 'spor', id: 'spora', uk: 'спора', pl: 'zarodnik', zh: '孢子', ja: '胞子', ko: '포자', ar: 'بوغ' },
  spores: { ru: 'Споры', es: 'esporas', pt: 'esporos', fr: 'spores', de: 'Sporen', tr: 'sporlar', id: 'spora', uk: 'спори', pl: 'zarodniki', zh: '孢子', ja: '胞子', ko: '포자', ar: 'أبواغ' },
  breath: { ru: 'Дыхание', es: 'aliento', pt: 'sopro', fr: 'souffle', de: 'Atem', tr: 'nefes', id: 'napas', uk: 'подих', pl: 'oddech', zh: '吐息', ja: 'ブレス', ko: '숨결', ar: 'نَفَس' },
  green: { ru: 'Зелёный', es: 'verde', pt: 'verde', fr: 'vert', de: 'grün', tr: 'yeşil', id: 'hijau', uk: 'зелений', pl: 'zielony', zh: '绿色', ja: '緑', ko: '초록', ar: 'أخضر' },
  bean: { ru: 'Фасоль', es: 'frijol', pt: 'feijão', fr: 'haricot', de: 'Bohne', tr: 'fasulye', id: 'kacang', uk: 'квасоля', pl: 'fasola', zh: '豆', ja: '豆', ko: '콩', ar: 'فاصوليا' },
  poison: { ru: 'Ядовитый', es: 'venenoso', pt: 'venenoso', fr: 'toxique', de: 'giftig', tr: 'zehirli', id: 'beracun', uk: 'отруйний', pl: 'trujący', zh: '剧毒', ja: '毒', ko: '독', ar: 'سام' },
  ivy: { ru: 'Плющ', es: 'hiedra', pt: 'hera', fr: 'lierre', de: 'Efeu', tr: 'sarmaşık', id: 'ivy', uk: 'плющ', pl: 'bluszcz', zh: '常春藤', ja: 'ツタ', ko: '담쟁이', ar: 'لبلاب' },
  venus: { ru: 'Венерина', es: 'venus', pt: 'vênus', fr: 'vénus', de: 'Venus', tr: 'venüs', id: 'venus', uk: 'венерина', pl: 'wenus', zh: '捕蝇草', ja: 'ハエトリグサ', ko: '파리지옥', ar: 'فينوس' },
  fly: { ru: 'Муха', es: 'mosca', pt: 'mosca', fr: 'mouche', de: 'Fliege', tr: 'sinek', id: 'lalat', uk: 'муха', pl: 'mucha', zh: '捕蝇', ja: 'ハエ', ko: '파리', ar: 'ذبابة' },
  trap: { ru: 'Ловушка', es: 'trampa', pt: 'armadilha', fr: 'piège', de: 'Falle', tr: 'tuzak', id: 'perangkap', uk: 'пастка', pl: 'pułapka', zh: '陷阱', ja: '罠', ko: '덫', ar: 'مصيدة' },
  horned: { ru: 'Рогатый', es: 'cornudo', pt: 'chifrudo', fr: 'cornu', de: 'gehörnt', tr: 'boynuzlu', id: 'bertanduk', uk: 'рогатий', pl: 'rogaty', zh: '有角', ja: '角つき', ko: '뿔 달린', ar: 'مقرن' },
  melon: { ru: 'Дыня', es: 'melón', pt: 'melão', fr: 'melon', de: 'Melone', tr: 'kavun', id: 'melon', uk: 'диня', pl: 'melon', zh: '甜瓜', ja: 'メロン', ko: '멜론', ar: 'شمام' },
  glow: { ru: 'Светящийся', es: 'brillante', pt: 'brilhante', fr: 'lumineux', de: 'leuchtend', tr: 'parlayan', id: 'bercahaya', uk: 'сяючий', pl: 'świecący', zh: '发光', ja: '発光', ko: '빛나는', ar: 'متوهج' },
  ghost: { ru: 'Призрачный', es: 'fantasma', pt: 'fantasma', fr: 'fantôme', de: 'Geister', tr: 'hayalet', id: 'hantu', uk: 'примарний', pl: 'duchowy', zh: '幽灵', ja: 'ゴースト', ko: '유령', ar: 'شبحي' },
  pepper: { ru: 'Перец', es: 'pimiento', pt: 'pimenta', fr: 'poivre', de: 'Pfeffer', tr: 'biber', id: 'lada', uk: 'перець', pl: 'papryka', zh: '辣椒', ja: 'ペッパー', ko: '고추', ar: 'فلفل' },
  venom: { ru: 'Яд', es: 'veneno', pt: 'veneno', fr: 'venin', de: 'Gift', tr: 'zehir', id: 'racun', uk: 'отрута', pl: 'jad', zh: '毒液', ja: '毒', ko: '독', ar: 'سم' },
  spitter: { ru: 'Плюющийся', es: 'escupidor', pt: 'cuspidor', fr: 'cracheur', de: 'Spucker', tr: 'tüküren', id: 'penyembur', uk: 'плювач', pl: 'plujący', zh: '喷吐者', ja: '吐き出すもの', ko: '분사기', ar: 'قاذف' },
  megaphone: { ru: 'Мегафон', es: 'megáfono', pt: 'megafone', fr: 'mégaphone', de: 'Megafon', tr: 'megafon', id: 'megafon', uk: 'мегафон', pl: 'megafon', zh: '扩音器', ja: 'メガホン', ko: '메가폰', ar: 'مكبر صوت' },
  player: { ru: 'Игрок', es: 'jugador', pt: 'jogador', fr: 'joueur', de: 'Spieler', tr: 'oyuncu', id: 'pemain', uk: 'гравець', pl: 'gracz', zh: '玩家', ja: 'プレイヤー', ko: '플레이어', ar: 'لاعب' },
  magnet: { ru: 'Магнит', es: 'imán', pt: 'ímã', fr: 'aimant', de: 'Magnet', tr: 'mıknatıs', id: 'magnet', uk: 'магніт', pl: 'magnes', zh: '磁铁', ja: '磁石', ko: '자석', ar: 'مغناطيس' },
  pet: { ru: 'Питомец', es: 'mascota', pt: 'pet', fr: 'familier', de: 'Haustier', tr: 'evcil', id: 'peliharaan', uk: 'питомец', pl: 'zwierzak', zh: '宠物', ja: 'ペット', ko: '펫', ar: 'حيوان أليف' },
  teleporter: { ru: 'Телепорт', es: 'teletransportador', pt: 'teletransportador', fr: 'téléporteur', de: 'Teleporter', tr: 'ışınlayıcı', id: 'teleporter', uk: 'телепорт', pl: 'teleporter', zh: '传送器', ja: 'テレポーター', ko: '텔레포터', ar: 'ناقل آني' },
  teleporters: { ru: 'Телепорты', es: 'teletransportadores', pt: 'teletransportadores', fr: 'téléporteurs', de: 'Teleporter', tr: 'ışınlayıcılar', id: 'teleporter', uk: 'телепорти', pl: 'teleportery', zh: '传送器', ja: 'テレポーター', ko: '텔레포터', ar: 'نواقل آنية' },
  bear: { ru: 'Медведь', es: 'oso', pt: 'urso', fr: 'ours', de: 'Bär', tr: 'ayı', id: 'beruang', uk: 'ведмідь', pl: 'niedźwiedź', zh: '熊', ja: 'クマ', ko: '곰', ar: 'دب' },
  gnome: { ru: 'Гном', es: 'gnomo', pt: 'gnomo', fr: 'gnome', de: 'Gnom', tr: 'cüce', id: 'gnome', uk: 'гном', pl: 'gnom', zh: '地精', ja: 'ノーム', ko: '노움', ar: 'قزم' },
  ladder: { ru: 'Лестница', es: 'escalera', pt: 'escada', fr: 'échelle', de: 'Leiter', tr: 'merdiven', id: 'tangga', uk: 'драбина', pl: 'drabina', zh: '梯子', ja: 'はしご', ko: '사다리', ar: 'سلم' },
  bench: { ru: 'Скамейка', es: 'banco', pt: 'banco', fr: 'banc', de: 'Bank', tr: 'bank', id: 'bangku', uk: 'лавка', pl: 'ławka', zh: '长椅', ja: 'ベンチ', ko: '벤치', ar: 'مقعد' },
  light: { ru: 'Световой', es: 'luz', pt: 'luz', fr: 'lumière', de: 'Licht', tr: 'ışık', id: 'cahaya', uk: 'світловий', pl: 'świetlny', zh: '灯光', ja: 'ライト', ko: '조명', ar: 'ضوء' },
  sign: { ru: 'Вывеска', es: 'letrero', pt: 'placa', fr: 'panneau', de: 'Schild', tr: 'tabela', id: 'papan', uk: 'вивіска', pl: 'szyld', zh: '标牌', ja: '看板', ko: '표지판', ar: 'لافتة' },
  arch: { ru: 'Арка', es: 'arco', pt: 'arco', fr: 'arche', de: 'Bogen', tr: 'kemer', id: 'lengkungan', uk: 'арка', pl: 'łuk', zh: '拱门', ja: 'アーチ', ko: '아치', ar: 'قوس' },
  roleplay: { ru: 'Ролевой', es: 'rol', pt: 'roleplay', fr: 'jeu de rôle', de: 'Rollenspiel', tr: 'rol yapma', id: 'roleplay', uk: 'рольовий', pl: 'roleplay', zh: '角色扮演', ja: 'ロールプレイ', ko: '역할극', ar: 'تمثيل أدوار' },
  owner: { ru: 'Владелец', es: 'dueño', pt: 'dono', fr: 'propriétaire', de: 'Besitzer', tr: 'sahip', id: 'pemilik', uk: 'власник', pl: 'właściciel', zh: '主人', ja: '所有者', ko: '소유자', ar: 'مالك' },
  door: { ru: 'Дверь', es: 'puerta', pt: 'porta', fr: 'porte', de: 'Tür', tr: 'kapı', id: 'pintu', uk: 'двері', pl: 'drzwi', zh: '门', ja: 'ドア', ko: '문', ar: 'باب' },
  wood: { ru: 'Деревянный', es: 'madera', pt: 'madeira', fr: 'bois', de: 'Holz', tr: 'ahşap', id: 'kayu', uk: 'дерев’яний', pl: 'drewniany', zh: '木制', ja: '木製', ko: '나무', ar: 'خشبي' },
  stone: { ru: 'Каменный', es: 'piedra', pt: 'pedra', fr: 'pierre', de: 'Stein', tr: 'taş', id: 'batu', uk: 'кам’яний', pl: 'kamienny', zh: '石制', ja: '石', ko: '돌', ar: 'حجري' },
  iron: { ru: 'Железный', es: 'hierro', pt: 'ferro', fr: 'fer', de: 'Eisen', tr: 'demir', id: 'besi', uk: 'залізний', pl: 'żelazny', zh: '铁制', ja: '鉄', ko: '철', ar: 'حديدي' },
  gold: { ru: 'Золотой', es: 'oro', pt: 'ouro', fr: 'or', de: 'Gold', tr: 'altın', id: 'emas', uk: 'золотий', pl: 'złoty', zh: '黄金', ja: '金', ko: '금', ar: 'ذهبي' },
  toy: { ru: 'Игрушка', es: 'juguete', pt: 'brinquedo', fr: 'jouet', de: 'Spielzeug', tr: 'oyuncak', id: 'mainan', uk: 'іграшка', pl: 'zabawka', zh: '玩具', ja: 'おもちゃ', ko: '장난감', ar: 'لعبة' },
  decoration: { ru: 'Декор', es: 'decoración', pt: 'decoração', fr: 'décoration', de: 'Dekoration', tr: 'dekorasyon', id: 'dekorasi', uk: 'декор', pl: 'dekoracja', zh: '装饰', ja: '装飾', ko: '장식', ar: 'زخرفة' },
  furniture: { ru: 'Мебель', es: 'mueble', pt: 'móvel', fr: 'meuble', de: 'Möbel', tr: 'mobilya', id: 'furnitur', uk: 'меблі', pl: 'meble', zh: '家具', ja: '家具', ko: '가구', ar: 'أثاث' },
  garden: { ru: 'Садовый', es: 'jardín', pt: 'jardim', fr: 'jardin', de: 'Garten', tr: 'bahçe', id: 'kebun', uk: 'садовий', pl: 'ogród', zh: '花园', ja: '庭園', ko: '정원', ar: 'حديقة' },
  tool: { ru: 'Инструмент', es: 'herramienta', pt: 'ferramenta', fr: 'outil', de: 'Werkzeug', tr: 'alet', id: 'alat', uk: 'інструмент', pl: 'narzędzie', zh: '工具', ja: '道具', ko: '도구', ar: 'أداة' },
  basic: { ru: 'Обычный', es: 'básico', pt: 'básico', fr: 'basique', de: 'einfach', tr: 'basit', id: 'dasar', uk: 'базовий', pl: 'podstawowy', zh: '基础', ja: '基本', ko: '기본', ar: 'أساسي' },
  common: { ru: 'Обычный', es: 'común', pt: 'comum', fr: 'commun', de: 'gewöhnlich', tr: 'yaygın', id: 'umum', uk: 'звичайний', pl: 'zwykły', zh: '普通', ja: '普通', ko: '일반', ar: 'عادي' },
  tropical: { ru: 'Тропический', es: 'tropical', pt: 'tropical', fr: 'tropical', de: 'tropisch', tr: 'tropikal', id: 'tropis', uk: 'тропічний', pl: 'tropikalny', zh: '热带', ja: '熱帯', ko: '열대', ar: 'استوائي' },
  medieval: { ru: 'Средневековый', es: 'medieval', pt: 'medieval', fr: 'médiéval', de: 'mittelalterlich', tr: 'orta çağ', id: 'abad pertengahan', uk: 'середньовічний', pl: 'średniowieczny', zh: '中世纪', ja: '中世', ko: '중세', ar: 'قرون وسطى' },
  cyberpunk: { ru: 'Киберпанк', es: 'cyberpunk', pt: 'cyberpunk', fr: 'cyberpunk', de: 'Cyberpunk', tr: 'cyberpunk', id: 'cyberpunk', uk: 'кіберпанк', pl: 'cyberpunk', zh: '赛博朋克', ja: 'サイバーパンク', ko: '사이버펑크', ar: 'سايبربنك' },
  halloween: { ru: 'Хэллоуинский', es: 'Halloween', pt: 'Halloween', fr: 'Halloween', de: 'Halloween', tr: 'Cadılar Bayramı', id: 'Halloween', uk: 'хелловінський', pl: 'Halloween', zh: '万圣节', ja: 'ハロウィン', ko: '할로윈', ar: 'هالوين' },
  christmas: { ru: 'Новогодний', es: 'Navidad', pt: 'Natal', fr: 'Noël', de: 'Weihnachten', tr: 'Noel', id: 'Natal', uk: 'різдвяний', pl: 'świąteczny', zh: '圣诞', ja: 'クリスマス', ko: '크리스마스', ar: 'عيد الميلاد' },
  bridge: { ru: 'Мост', es: 'puente', pt: 'ponte', fr: 'pont', de: 'Brücke', tr: 'köprü', id: 'jembatan', uk: 'міст', pl: 'most', zh: '桥', ja: '橋', ko: '다리', ar: 'جسر' },
  spring: { ru: 'Пружина', es: 'resorte', pt: 'mola', fr: 'ressort', de: 'Feder', tr: 'yay', id: 'pegas', uk: 'пружина', pl: 'sprężyna', zh: '弹簧', ja: 'バネ', ko: '스프링', ar: 'نابض' },
  seesaw: { ru: 'Качели', es: 'subibaja', pt: 'gangorra', fr: 'bascule', de: 'Wippe', tr: 'tahterevalli', id: 'jungkat-jungkit', uk: 'гойдалка', pl: 'huśtawka', zh: '跷跷板', ja: 'シーソー', ko: '시소', ar: 'أرجوحة' },
  conveyor: { ru: 'Конвейер', es: 'transportador', pt: 'esteira', fr: 'convoyeur', de: 'Förderband', tr: 'konveyör', id: 'konveyor', uk: 'конвеєр', pl: 'przenośnik', zh: '传送带', ja: 'コンベア', ko: '컨베이어', ar: 'ناقل' },
  trowel: { ru: 'Садовая лопатка', es: 'paleta', pt: 'pazinha', fr: 'truelle', de: 'Kelle', tr: 'mala', id: 'sekop kecil', uk: 'садова лопатка', pl: 'łopatka', zh: '小铲', ja: '移植ごて', ko: '모종삽', ar: 'مجرفة صغيرة' },
  rusty: { ru: 'Ржавый', es: 'oxidado', pt: 'enferrujado', fr: 'rouillé', de: 'rostig', tr: 'paslı', id: 'berkarat', uk: 'іржавий', pl: 'zardzewiały', zh: '生锈', ja: '錆びた', ko: '녹슨', ar: 'صدئ' },
  axe: { ru: 'Топор', es: 'hacha', pt: 'machado', fr: 'hache', de: 'Axt', tr: 'balta', id: 'kapak', uk: 'сокира', pl: 'siekiera', zh: '斧头', ja: '斧', ko: '도끼', ar: 'فأس' },
  pickaxe: { ru: 'Кирка', es: 'pico', pt: 'picareta', fr: 'pioche', de: 'Spitzhacke', tr: 'kazma', id: 'beliung', uk: 'кирка', pl: 'kilof', zh: '镐', ja: 'ツルハシ', ko: '곡괭이', ar: 'معول' },
  scissor: { ru: 'Ножницы', es: 'tijeras', pt: 'tesoura', fr: 'ciseaux', de: 'Schere', tr: 'makas', id: 'gunting', uk: 'ножиці', pl: 'nożyczki', zh: '剪刀', ja: 'はさみ', ko: '가위', ar: 'مقص' },
  shears: { ru: 'Секатор', es: 'podadera', pt: 'tesouras', fr: 'sécateur', de: 'Gartenschere', tr: 'budama makası', id: 'gunting tanaman', uk: 'секатор', pl: 'sekator', zh: '修枝剪', ja: '剪定ばさみ', ko: '전지가위', ar: 'مقص تقليم' },
  fertilizer: { ru: 'Удобрение', es: 'fertilizante', pt: 'fertilizante', fr: 'engrais', de: 'Dünger', tr: 'gübre', id: 'pupuk', uk: 'добриво', pl: 'nawóz', zh: '肥料', ja: '肥料', ko: '비료', ar: 'سماد' },
  speed: { ru: 'Скорость', es: 'velocidad', pt: 'velocidade', fr: 'vitesse', de: 'Geschwindigkeit', tr: 'hız', id: 'kecepatan', uk: 'швидкість', pl: 'szybkość', zh: '速度', ja: '速度', ko: '속도', ar: 'سرعة' },
  grow: { ru: 'Рост', es: 'crecimiento', pt: 'crescimento', fr: 'croissance', de: 'Wachstum', tr: 'büyüme', id: 'tumbuh', uk: 'ріст', pl: 'wzrost', zh: '生长', ja: '成長', ko: '성장', ar: 'نمو' },
  pest: { ru: 'Вредитель', es: 'plaga', pt: 'praga', fr: 'nuisible', de: 'Schädling', tr: 'zararlı', id: 'hama', uk: 'шкідник', pl: 'szkodnik', zh: '害虫', ja: '害虫', ko: '해충', ar: 'آفة' },
  spray: { ru: 'Спрей', es: 'spray', pt: 'spray', fr: 'spray', de: 'Spray', tr: 'sprey', id: 'semprotan', uk: 'спрей', pl: 'spray', zh: '喷雾', ja: 'スプレー', ko: '스프레이', ar: 'رذاذ' },
  scythe: { ru: 'Коса', es: 'guadaña', pt: 'foice', fr: 'faux', de: 'Sense', tr: 'tırpan', id: 'sabit', uk: 'коса', pl: 'kosa', zh: '镰刀', ja: '大鎌', ko: '낫', ar: 'منجل' },
  gloves: { ru: 'Перчатки', es: 'guantes', pt: 'luvas', fr: 'gants', de: 'Handschuhe', tr: 'eldiven', id: 'sarung tangan', uk: 'рукавички', pl: 'rękawice', zh: '手套', ja: '手袋', ko: '장갑', ar: 'قفازات' },
  gardening: { ru: 'Садовый', es: 'jardinería', pt: 'jardinagem', fr: 'jardinage', de: 'Gartenarbeit', tr: 'bahçıvanlık', id: 'berkebun', uk: 'садовий', pl: 'ogrodniczy', zh: '园艺', ja: '園芸', ko: '원예', ar: 'بستنة' },
  hose: { ru: 'Шланг', es: 'manguera', pt: 'mangueira', fr: 'tuyau', de: 'Schlauch', tr: 'hortum', id: 'selang', uk: 'шланг', pl: 'wąż', zh: '软管', ja: 'ホース', ko: '호스', ar: 'خرطوم' },
  water: { ru: 'Водяной', es: 'agua', pt: 'água', fr: 'eau', de: 'Wasser', tr: 'su', id: 'air', uk: 'водяний', pl: 'wodny', zh: '水', ja: '水', ko: '물', ar: 'ماء' },
  auto: { ru: 'Авто', es: 'auto', pt: 'auto', fr: 'auto', de: 'Auto', tr: 'otomatik', id: 'otomatis', uk: 'авто', pl: 'auto', zh: '自动', ja: '自動', ko: '자동', ar: 'تلقائي' },
  planter: { ru: 'Сажалка', es: 'plantador', pt: 'plantador', fr: 'planteur', de: 'Pflanzer', tr: 'ekici', id: 'penanam', uk: 'саджалка', pl: 'sadzarka', zh: '种植器', ja: 'プランター', ko: '파종기', ar: 'زارع' },
  harvester: { ru: 'Харвестер', es: 'cosechadora', pt: 'colheitadeira', fr: 'moissonneuse', de: 'Ernter', tr: 'hasatçı', id: 'pemanen', uk: 'збирач', pl: 'kombajn', zh: '收割机', ja: '収穫機', ko: '수확기', ar: 'حصادة' },
  lantern: { ru: 'Фонарь', es: 'linterna', pt: 'lanterna', fr: 'lanterne', de: 'Laterne', tr: 'fener', id: 'lentera', uk: 'ліхтар', pl: 'latarnia', zh: '灯笼', ja: 'ランタン', ko: '랜턴', ar: 'فانوس' },
  wheelbarrow: { ru: 'Тачка', es: 'carretilla', pt: 'carrinho de mão', fr: 'brouette', de: 'Schubkarre', tr: 'el arabası', id: 'gerobak dorong', uk: 'тачка', pl: 'taczka', zh: '手推车', ja: '手押し車', ko: '외바퀴수레', ar: 'عربة يد' },
  vine: { ru: 'Виноградный', es: 'vid', pt: 'videira', fr: 'vigne', de: 'Rebe', tr: 'asma', id: 'anggur rambat', uk: 'виноградний', pl: 'winorośl', zh: '藤蔓', ja: 'つる', ko: '덩굴', ar: 'كرمة' },
  wrapper: { ru: 'Обмотчик', es: 'envoltorio', pt: 'envolvedor', fr: 'enveloppeur', de: 'Wickler', tr: 'sarıcı', id: 'pembungkus', uk: 'обмотувач', pl: 'owijarka', zh: '包裹器', ja: 'ラッパー', ko: '감개', ar: 'غلاف' },
  freeze: { ru: 'Заморозка', es: 'congelador', pt: 'congelante', fr: 'gel', de: 'Frost', tr: 'dondurucu', id: 'pembeku', uk: 'заморозка', pl: 'mrożący', zh: '冰冻', ja: '凍結', ko: '냉동', ar: 'تجميد' },
  ray: { ru: 'Луч', es: 'rayo', pt: 'raio', fr: 'rayon', de: 'Strahl', tr: 'ışın', id: 'sinar', uk: 'промінь', pl: 'promień', zh: '射线', ja: '光線', ko: '광선', ar: 'شعاع' },
  carpet: { ru: 'Ковёр', es: 'alfombra', pt: 'tapete', fr: 'tapis', de: 'Teppich', tr: 'halı', id: 'karpet', uk: 'килим', pl: 'dywan', zh: '地毯', ja: 'カーペット', ko: '카펫', ar: 'سجادة' },
  jump: { ru: 'Прыжок', es: 'salto', pt: 'salto', fr: 'saut', de: 'Sprung', tr: 'zıplama', id: 'lompat', uk: 'стрибок', pl: 'skok', zh: '跳跃', ja: 'ジャンプ', ko: '점프', ar: 'قفز' },
  invisibility: { ru: 'Невидимость', es: 'invisibilidad', pt: 'invisibilidade', fr: 'invisibilité', de: 'Unsichtbarkeit', tr: 'görünmezlik', id: 'tak terlihat', uk: 'невидимість', pl: 'niewidzialność', zh: '隐身', ja: '透明化', ko: '투명화', ar: 'اختفاء' },
  hypno: { ru: 'Гипно', es: 'hipno', pt: 'hipno', fr: 'hypno', de: 'Hypno', tr: 'hipnoz', id: 'hipno', uk: 'гіпно', pl: 'hipno', zh: '催眠', ja: '催眠', ko: '최면', ar: 'تنويم' },
  bloom: { ru: 'Цветение', es: 'floración', pt: 'floração', fr: 'floraison', de: 'Blüte', tr: 'çiçeklenme', id: 'mekar', uk: 'цвітіння', pl: 'kwitnienie', zh: '盛开', ja: '開花', ko: '개화', ar: 'إزهار' }
});

Object.assign(itemWordTranslations, {
  wateringcan: { ru: 'Лейка', es: 'regadera', pt: 'regador', fr: 'arrosoir', de: 'Gießkanne', tr: 'sulama kabı', id: 'kaleng penyiram', uk: 'лійка', pl: 'konewka', zh: '浇水壶', ja: 'じょうろ', ko: '물뿌리개', ar: 'علبة ري' },
  commonwateringcan: { ru: 'Обычная лейка', es: 'regadera común', pt: 'regador comum', fr: 'arrosoir commun', de: 'gewöhnliche Gießkanne', tr: 'yaygın sulama kabı', id: 'kaleng penyiram umum', uk: 'звичайна лійка', pl: 'zwykła konewka', zh: '普通浇水壶', ja: '普通のじょうろ', ko: '일반 물뿌리개', ar: 'علبة ري عادية' },
  superwateringcan: { ru: 'Супер-лейка', es: 'súper regadera', pt: 'super regador', fr: 'super arrosoir', de: 'Super-Gießkanne', tr: 'süper sulama kabı', id: 'kaleng penyiram super', uk: 'супер-лійка', pl: 'super konewka', zh: '超级浇水壶', ja: 'スーパーじょうろ', ko: '슈퍼 물뿌리개', ar: 'علبة ري خارقة' },
  goldenwateringcan: { ru: 'Золотая лейка', es: 'regadera dorada', pt: 'regador dourado', fr: 'arrosoir doré', de: 'goldene Gießkanne', tr: 'altın sulama kabı', id: 'kaleng penyiram emas', uk: 'золота лійка', pl: 'złota konewka', zh: '黄金浇水壶', ja: '金のじょうろ', ko: '황금 물뿌리개', ar: 'علبة ري ذهبية' },
  diamondwateringcan: { ru: 'Алмазная лейка', es: 'regadera diamante', pt: 'regador diamante', fr: 'arrosoir diamant', de: 'Diamant-Gießkanne', tr: 'elmas sulama kabı', id: 'kaleng penyiram berlian', uk: 'діамантова лійка', pl: 'diamentowa konewka', zh: '钻石浇水壶', ja: 'ダイヤじょうろ', ko: '다이아 물뿌리개', ar: 'علبة ري ماسية' },
  dragonfruit: { ru: 'Драконий фрукт', es: 'pitaya', pt: 'pitaya', fr: 'fruit du dragon', de: 'Drachenfrucht', tr: 'ejder meyvesi', id: 'buah naga', uk: 'драконів фрукт', pl: 'smoczy owoc', zh: '火龙果', ja: 'ドラゴンフルーツ', ko: '용과', ar: 'فاكهة التنين' },
  dragonsbreath: { ru: 'Дыхание дракона', es: 'aliento de dragón', pt: 'sopro do dragão', fr: 'souffle du dragon', de: 'Drachenatem', tr: 'ejder nefesi', id: 'napas naga', uk: 'подих дракона', pl: 'oddech smoka', zh: '龙息', ja: 'ドラゴンブレス', ko: '용의 숨결', ar: 'نَفَس التنين' },
  venusflytrap: { ru: 'Венерина мухоловка', es: 'venus atrapamoscas', pt: 'dioneia', fr: 'dionée attrape-mouche', de: 'Venusfliegenfalle', tr: 'venüs sinekkapanı', id: 'venus flytrap', uk: 'венерина мухоловка', pl: 'muchołówka', zh: '捕蝇草', ja: 'ハエトリグサ', ko: '파리지옥', ar: 'مصيدة فينوس' },
  speedgrow: { ru: 'Ускоритель роста', es: 'acelerador de crecimiento', pt: 'acelerador de crescimento', fr: 'accélérateur de croissance', de: 'Wachstumsbeschleuniger', tr: 'büyüme hızlandırıcı', id: 'percepat tumbuh', uk: 'прискорювач росту', pl: 'przyspieszacz wzrostu', zh: '生长加速器', ja: '成長ブースター', ko: '성장 촉진제', ar: 'مسرع النمو' },
  pestspray: { ru: 'Спрей от вредителей', es: 'spray contra plagas', pt: 'spray contra pragas', fr: 'spray anti-nuisibles', de: 'Schädlingsspray', tr: 'zararlı spreyi', id: 'semprotan hama', uk: 'спрей від шкідників', pl: 'spray na szkodniki', zh: '害虫喷雾', ja: '害虫スプレー', ko: '해충 스프레이', ar: 'رذاذ الآفات' },
  scificrate: { ru: 'Научно-фантастический ящик', es: 'caja sci-fi', pt: 'caixa sci-fi', fr: 'caisse sci-fi', de: 'Sci-Fi-Kiste', tr: 'bilim kurgu kasası', id: 'peti sci-fi', uk: 'науково-фантастичний ящик', pl: 'skrzynka sci-fi', zh: '科幻箱子', ja: 'SFクレート', ko: 'SF 상자', ar: 'صندوق خيال علمي' }
});

function transliterateEnglishWord(word) {
  const src = String(word || '').toLowerCase();
  const map = {
    sch: 'ш', sh: 'ш', ch: 'ч', th: 'т', ph: 'ф', gh: 'г', ck: 'к',
    yo: 'йо', yu: 'ю', ya: 'я', ye: 'е', oo: 'у', ee: 'и',
    a: 'а', b: 'б', c: 'к', d: 'д', e: 'е', f: 'ф', g: 'г',
    h: 'х', i: 'и', j: 'дж', k: 'к', l: 'л', m: 'м', n: 'н',
    o: 'о', p: 'п', q: 'к', r: 'р', s: 'с', t: 'т', u: 'у',
    v: 'в', w: 'в', x: 'кс', y: 'и', z: 'з'
  };
  let out = '';
  for (let i = 0; i < src.length;) {
    let matched = false;
    for (const len of [3, 2, 1]) {
      const part = src.slice(i, i + len);
      if (map[part]) {
        out += map[part];
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += src[i];
      i += 1;
    }
  }
  return out || word;
}

function capitalizeTranslation(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

const autoTranslationStorageKey = 'autoItemTranslations:v1';
const autoItemTranslations = new Map();
const pendingAutoTranslations = new Map();
let autoTranslationTimer = null;
let autoTranslationInFlight = false;

try {
  const storedTranslations = JSON.parse(localStorage.getItem(autoTranslationStorageKey) || '[]');
  if (Array.isArray(storedTranslations)) {
    storedTranslations.forEach(entry => {
      if (Array.isArray(entry) && entry.length === 2) {
        autoItemTranslations.set(entry[0], entry[1]);
      }
    });
  }
} catch (err) {
  localStorage.removeItem(autoTranslationStorageKey);
}

function normalizeAutoTranslationName(name) {
  return String(name || '').replace(/\s+/g, ' ').trim();
}

function autoTranslationKey(name, lang = currentLang) {
  return `${lang}:${normalizeAutoTranslationName(name).toLowerCase()}`;
}

function persistAutoTranslations() {
  const entries = Array.from(autoItemTranslations.entries()).slice(-1800);
  try {
    localStorage.setItem(autoTranslationStorageKey, JSON.stringify(entries));
  } catch (err) {
    localStorage.removeItem(autoTranslationStorageKey);
  }
}

function scheduleAutoTranslation(name, lang = currentLang) {
  const cleanName = normalizeAutoTranslationName(name);
  if (!cleanName || lang === 'en') return;
  const key = autoTranslationKey(cleanName, lang);
  if (autoItemTranslations.has(key)) return;

  if (!pendingAutoTranslations.has(lang)) {
    pendingAutoTranslations.set(lang, new Set());
  }
  pendingAutoTranslations.get(lang).add(cleanName);

  if (!autoTranslationTimer) {
    autoTranslationTimer = setTimeout(flushAutoTranslations, 180);
  }
}

function renderTranslatedSurfaces() {
  renderDashboard();
  renderAuction();
  renderMultipliers();
  renderPredictions();
  renderCalculator();
}

async function flushAutoTranslations() {
  autoTranslationTimer = null;
  if (autoTranslationInFlight || pendingAutoTranslations.size === 0) {
    if (pendingAutoTranslations.size > 0 && !autoTranslationTimer) {
      autoTranslationTimer = setTimeout(flushAutoTranslations, 250);
    }
    return;
  }

  autoTranslationInFlight = true;
  const batches = Array.from(pendingAutoTranslations.entries()).map(([lang, set]) => [
    lang,
    Array.from(set).slice(0, 120)
  ]);
  pendingAutoTranslations.clear();

  let changed = false;
  try {
    for (const [lang, names] of batches) {
      if (!names.length || lang === 'en') continue;
      const res = await fetch('/api/translate-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, names })
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (!data || !data.translations) continue;

      Object.entries(data.translations).forEach(([sourceName, translatedName]) => {
        const cleanSource = normalizeAutoTranslationName(sourceName);
        const cleanTranslated = normalizeAutoTranslationName(translatedName);
        if (!cleanSource || !cleanTranslated) return;
        autoItemTranslations.set(autoTranslationKey(cleanSource, lang), cleanTranslated);
        changed = true;
      });
    }
  } catch (err) {
    console.warn('Automatic item translation failed:', err);
  } finally {
    autoTranslationInFlight = false;
  }

  if (changed) {
    persistAutoTranslations();
    renderTranslatedSurfaces();
  }

  if (pendingAutoTranslations.size > 0 && !autoTranslationTimer) {
    autoTranslationTimer = setTimeout(flushAutoTranslations, 250);
  }
}

function translateItemName(name, lang = currentLang) {
  const cleanName = normalizeAutoTranslationName(name);
  if (!cleanName || lang === 'en') return cleanName;

  const translated = autoItemTranslations.get(autoTranslationKey(cleanName, lang));
  if (translated) return translated;

  scheduleAutoTranslation(cleanName, lang);
  return cleanName;
}

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
let auctionData = null;
let calculatorData = null;
let activePredictionTab = 'seeds';
let selectedCalculatorFruitName = '';
let calculatorFruitMenuOpen = false;
let calculatorFruitActiveIndex = 0;
let calculatorUseCurrentMultiplier = false;

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

const rainbowMoonImageIds = ['93602895495056'];

function isRainbowMoonImageRef(imageRef) {
  const ref = String(imageRef || '').toLowerCase();
  const key = normalizeEnvKey(ref);
  return key.includes('rainbowmoon') || rainbowMoonImageIds.some(id => ref.includes(id));
}

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
  sunburst: { emoji: '☀️', ru: 'Солнечная вспышка', en: 'Sunburst' },
  megamoon: { emoji: '🌕', ru: 'Мега луна', en: 'Mega Moon' }
};

const weatherNameTranslations = {
  day: { es: 'Día', pt: 'Dia', fr: 'Jour', de: 'Tag', tr: 'Gündüz', id: 'Siang', uk: 'День', pl: 'Dzień' },
  sunset: { es: 'Atardecer', pt: 'Pôr do sol', fr: 'Coucher du soleil', de: 'Sonnenuntergang', tr: 'Gün batımı', id: 'Senja', uk: 'Захід сонця', pl: 'Zachód słońca' },
  moon: { es: 'Noche', pt: 'Noite', fr: 'Nuit', de: 'Nacht', tr: 'Gece', id: 'Malam', uk: 'Ніч', pl: 'Noc' },
  bloodmoon: { es: 'Luna de sangre', pt: 'Lua de sangue', fr: 'Lune de sang', de: 'Blutmond', tr: 'Kanlı Ay', id: 'Bulan Darah', uk: 'Кривавий місяць', pl: 'Krwawy księżyc' },
  goldmoon: { es: 'Luna dorada', pt: 'Lua dourada', fr: 'Lune dorée', de: 'Goldmond', tr: 'Altın Ay', id: 'Bulan Emas', uk: 'Золотий місяць', pl: 'Złoty księżyc' },
  chainedmoon: { es: 'Luna encadenada', pt: 'Lua acorrentada', fr: 'Lune enchaînée', de: 'Kettenmond', tr: 'Zincirli Ay', id: 'Bulan Berantai', uk: 'Ланцюговий місяць', pl: 'Łańcuchowy księżyc' },
  pizzamoon: { es: 'Luna pizza', pt: 'Lua pizza', fr: 'Lune pizza', de: 'Pizza-Mond', tr: 'Pizza Ay', id: 'Bulan Pizza', uk: 'Піца-місяць', pl: 'Księżyc pizzy' },
  rainbowmoon: { es: 'Luna arcoíris', pt: 'Lua arco-íris', fr: 'Lune arc-en-ciel', de: 'Regenbogenmond', tr: 'Gökkuşağı Ayı', id: 'Bulan Pelangi', uk: 'Веселковий місяць', pl: 'Tęczowy księżyc' },
  solareclipse: { es: 'Eclipse solar', pt: 'Eclipse solar', fr: 'Éclipse solaire', de: 'Sonnenfinsternis', tr: 'Güneş tutulması', id: 'Gerhana matahari', uk: 'Сонячне затемнення', pl: 'Zaćmienie słońca' },
  starfall: { es: 'Lluvia de estrellas', pt: 'Chuva de estrelas', fr: 'Pluie d’étoiles', de: 'Sternenfall', tr: 'Yıldız yağmuru', id: 'Hujan bintang', uk: 'Зорепад', pl: 'Spadające gwiazdy' },
  rainbow: { es: 'Arcoíris', pt: 'Arco-íris', fr: 'Arc-en-ciel', de: 'Regenbogen', tr: 'Gökkuşağı', id: 'Pelangi', uk: 'Веселка', pl: 'Tęcza' },
  snowfall: { es: 'Nevada', pt: 'Nevasca', fr: 'Chute de neige', de: 'Schneefall', tr: 'Kar yağışı', id: 'Salju turun', uk: 'Снігопад', pl: 'Opady śniegu' },
  rain: { es: 'Lluvia', pt: 'Chuva', fr: 'Pluie', de: 'Regen', tr: 'Yağmur', id: 'Hujan', uk: 'Дощ', pl: 'Deszcz' },
  thunderstorm: { es: 'Tormenta eléctrica', pt: 'Tempestade', fr: 'Orage', de: 'Gewitter', tr: 'Fırtına', id: 'Badai petir', uk: 'Гроза', pl: 'Burza' },
  aurora: { es: 'Aurora', pt: 'Aurora', fr: 'Aurore', de: 'Aurora', tr: 'Aurora', id: 'Aurora', uk: 'Аврора', pl: 'Aurora' },
  sunburst: { es: 'Estallido solar', pt: 'Explosão solar', fr: 'Éruption solaire', de: 'Sonnenausbruch', tr: 'Güneş patlaması', id: 'Ledakan matahari', uk: 'Сонячний спалах', pl: 'Rozbłysk słoneczny' },
  megamoon: { es: 'Mega luna', pt: 'Mega lua', fr: 'Méga lune', de: 'Mega-Mond', tr: 'Mega Ay', id: 'Mega Bulan', uk: 'Мега місяць', pl: 'Mega księżyc' }
};

Object.assign(weatherNameTranslations.day, { zh: '白天', ja: '昼', ko: '낮', ar: 'نهار' });
Object.assign(weatherNameTranslations.sunset, { zh: '日落', ja: '夕暮れ', ko: '일몰', ar: 'الغروب' });
Object.assign(weatherNameTranslations.moon, { zh: '夜晚', ja: '夜', ko: '밤', ar: 'الليل' });
Object.assign(weatherNameTranslations.bloodmoon, { zh: '血月', ja: 'ブラッドムーン', ko: '블러드 문', ar: 'قمر الدم' });
Object.assign(weatherNameTranslations.goldmoon, { zh: '金月', ja: 'ゴールドムーン', ko: '골드 문', ar: 'القمر الذهبي' });
Object.assign(weatherNameTranslations.chainedmoon, { zh: '锁链月', ja: 'チェーンムーン', ko: '체인 문', ar: 'القمر المقيد' });
Object.assign(weatherNameTranslations.pizzamoon, { zh: '披萨月', ja: 'ピザムーン', ko: '피자 문', ar: 'قمر البيتزا' });
Object.assign(weatherNameTranslations.rainbowmoon, { zh: '彩虹月', ja: 'レインボームーン', ko: '무지개 달', ar: 'قمر قوس قزح' });
Object.assign(weatherNameTranslations.solareclipse, { zh: '日食', ja: '日食', ko: '일식', ar: 'كسوف الشمس' });
Object.assign(weatherNameTranslations.starfall, { zh: '星落', ja: '流星群', ko: '별똥별', ar: 'تساقط النجوم' });
Object.assign(weatherNameTranslations.rainbow, { zh: '彩虹', ja: '虹', ko: '무지개', ar: 'قوس قزح' });
Object.assign(weatherNameTranslations.snowfall, { zh: '降雪', ja: '降雪', ko: '눈', ar: 'تساقط الثلج' });
Object.assign(weatherNameTranslations.rain, { zh: '雨', ja: '雨', ko: '비', ar: 'مطر' });
Object.assign(weatherNameTranslations.thunderstorm, { zh: '雷暴', ja: '雷雨', ko: '뇌우', ar: 'عاصفة رعدية' });
Object.assign(weatherNameTranslations.aurora, { zh: '极光', ja: 'オーロラ', ko: '오로라', ar: 'الشفق' });
Object.assign(weatherNameTranslations.sunburst, { zh: '太阳爆发', ja: 'サンバースト', ko: '태양 폭발', ar: 'انفجار شمسي' });
Object.assign(weatherNameTranslations.megamoon, { zh: '超级月亮', ja: 'メガムーン', ko: '메가 문', ar: 'القمر العملاق' });

function getLocalizedEnvName(key, fallback = '', option = null) {
  const opt = option || (key && weatherOptions[key] ? weatherOptions[key] : null);
  const extra = key && weatherNameTranslations[key] ? weatherNameTranslations[key] : null;
  const englishName = (opt && opt.en) ||
    (extra && extra.en) ||
    fallback ||
    key ||
    '';
  if (currentLang !== 'en' && englishName) {
    const autoName = translateItemName(englishName, currentLang);
    if (autoName && autoName !== englishName) return autoName;
  }
  return (opt && opt[currentLang]) ||
    (extra && extra[currentLang]) ||
    englishName;
}

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

function canonicalEnvKey(name) {
  const key = normalizeEnvKey(name);
  if (key === 'night') return 'moon';
  if (key === 'raining' || key === 'rainy') return 'rain';
  if (key === 'lightning') return 'thunderstorm';
  return key;
}

function isEmojiFallbackImage(imageRef) {
  if (!imageRef) return false;
  const ref = String(imageRef).toLowerCase();
  return ref.includes('notoemoji') || ref.includes('fonts.gstatic.com');
}

function isInvalidWeatherImageRef(imageRef, key = '') {
  if (!imageRef) return true;
  const ref = String(imageRef).trim().toLowerCase();
  const normKey = canonicalEnvKey(key);
  if (!ref || ref === 'null' || ref === 'undefined' || ref === 'none' || ref === '0') return true;
  if (isEmojiFallbackImage(ref)) return true;
  if (normKey === 'rainbow' && isRainbowMoonImageRef(ref)) return true;
  return ref.includes('asset=0') ||
    ref.includes('rbxassetid://0') ||
    ref.includes('112886786873408') ||
    ref.includes('asset=112886786873408');
}

function firstValidWeatherImageRefForKey(key, ...refs) {
  for (const ref of refs) {
    if (!isInvalidWeatherImageRef(ref, key)) return ref;
  }
  return '';
}

function firstValidWeatherImageRef(...refs) {
  return firstValidWeatherImageRefForKey('', ...refs);
}

const rawWeatherIconCache = JSON.parse(localStorage.getItem('weatherIconCache') || '[]');
const filteredWeatherIconCache = Array.isArray(rawWeatherIconCache)
  ? rawWeatherIconCache.filter(([key, imageRef]) => !isInvalidWeatherImageRef(imageRef, key))
  : [];
const weatherIconCache = new Map(filteredWeatherIconCache);
if (filteredWeatherIconCache.length !== rawWeatherIconCache.length) {
  localStorage.setItem('weatherIconCache', JSON.stringify(filteredWeatherIconCache));
}
if (localStorage.getItem('rainIconCacheResetV1') !== '1') {
  weatherIconCache.delete('rain');
  localStorage.setItem('weatherIconCache', JSON.stringify(Array.from(weatherIconCache.entries())));
  localStorage.setItem('rainIconCacheResetV1', '1');
}
if (localStorage.getItem('weatherIconCacheResetV2') !== '1') {
  weatherIconCache.delete('rain');
  weatherIconCache.delete('snowfall');
  localStorage.setItem('weatherIconCache', JSON.stringify(Array.from(weatherIconCache.entries())));
  localStorage.setItem('weatherIconCacheResetV2', '1');
}
if (localStorage.getItem('weatherIconCacheResetV3') !== '1') {
  weatherIconCache.delete('rain');
  weatherIconCache.delete('snowfall');
  localStorage.setItem('weatherIconCache', JSON.stringify(Array.from(weatherIconCache.entries())));
  localStorage.setItem('weatherIconCacheResetV3', '1');
}
if (localStorage.getItem('weatherIconCacheResetV4') !== '1') {
  weatherIconCache.delete('rainbow');
  localStorage.setItem('weatherIconCache', JSON.stringify(Array.from(weatherIconCache.entries())));
  localStorage.setItem('weatherIconCacheResetV4', '1');
}
if (localStorage.getItem('weatherIconCacheResetV5') !== '1') {
  weatherIconCache.delete('rainbow');
  localStorage.setItem('weatherIconCache', JSON.stringify(Array.from(weatherIconCache.entries())));
  localStorage.setItem('weatherIconCacheResetV5', '1');
}

function rememberWeatherIcon(key, imageRef) {
  const normKey = canonicalEnvKey(key);
  if (!normKey || isInvalidWeatherImageRef(imageRef, normKey)) return;
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
  const normKey = canonicalEnvKey(key);
  const item = stockData && stockData.weatherCatalog && stockData.weatherCatalog[normKey];
  return item && !isInvalidWeatherImageRef(item.image, normKey) ? item.image : '';
}

function getWeatherPreferredImageRef(key, liveImageRef) {
  const normKey = canonicalEnvKey(key);
  return firstValidWeatherImageRefForKey(
    normKey,
    liveImageRef,
    getWeatherCatalogImageRef(normKey),
    weatherIconCache.get(normKey),
    weatherAssetIds[normKey]
  );
}

function getWeatherSettingsIconHtml(key, opt) {
  const normKey = canonicalEnvKey(key);
  const imageRef = getWeatherPreferredImageRef(normKey);
  const srcUrl = weatherImageUrl(imageRef);

  if (!srcUrl) {
    return `<span class="weather-settings-icon-wrapper"></span>`;
  }

  return `
    <span class="weather-settings-icon-wrapper">
      <img src="${srcUrl}" alt="" class="weather-settings-icon" loading="lazy" onload="applyWeatherImageFilters(this, '${normKey}')" onerror="this.onerror=null; this.style.display='none';">
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
  const rawOptKey = normalizeEnvKey(name);
  const optKey = canonicalEnvKey(rawOptKey);
  const discovered = JSON.parse(localStorage.getItem('discoveredEnvs') || '{}');
  const allOptions = { ...weatherOptions, ...discovered };
  const opt = allOptions[optKey] || allOptions[rawOptKey];
  const srcUrl = weatherImageUrl(getWeatherPreferredImageRef(optKey, imageId));
  
  if (!srcUrl) {
    return `<span class="weather-icon-img-wrapper"></span>`;
  }
  
  return `
    <span class="weather-icon-img-wrapper">
      <img src="${srcUrl}" alt="${name}" class="weather-icon-img" onload="applyWeatherImageFilters(this, '${optKey}')" onerror="this.onerror=null; this.style.display='none';">
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
    'rainbowmoon', 'solareclipse', 'megamoon', 'starfall', 'rainbow', 'snowfall', 'rain', 
    'thunderstorm', 'aurora', 'sunburst'
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
const langButtons = document.querySelectorAll('.lang-btn');
const quickNavLinks = document.querySelectorAll('.quick-nav-link');

const crateGrid = document.getElementById('crate-shop-grid');
const gearGrid = document.getElementById('gear-shop-grid');
const seedGrid = document.getElementById('seed-shop-grid');
const auctionGrid = document.getElementById('auction-grid');
const auctionRefreshTimer = document.getElementById('auction-refresh-timer');
const calculatorFruitPicker = document.getElementById('calculator-fruit-picker');
const calculatorFruitInput = document.getElementById('calculator-fruit-input');
const calculatorFruitClear = document.getElementById('calculator-fruit-clear');
const calculatorFruitToggle = document.getElementById('calculator-fruit-toggle');
const calculatorFruitMenu = document.getElementById('calculator-fruit-menu');
const calculatorWeightInput = document.getElementById('calculator-weight-input');
const calculatorMutationSelect = document.getElementById('calculator-mutation-select');
const calculatorSingleHarvestPenaltyToggle = document.getElementById('calculator-single-harvest-penalty-toggle');
const calculatorSingleHarvestPenaltyLabel = document.getElementById('calculator-single-harvest-penalty-label');
const calculatorSingleHarvestPenaltyHint = document.getElementById('calculator-single-harvest-penalty-hint');
const calculatorFriendsInput = document.getElementById('calculator-friends-input');
const calculatorWeightHint = document.getElementById('calculator-weight-hint');
const calculatorMultiplierLabel = document.getElementById('calculator-multiplier-label');
const calculatorCurrentMultiplierBtn = document.getElementById('calculator-current-multiplier-btn');
const calculatorCurrentMultiplierText = document.getElementById('calculator-current-multiplier-text');
const calculatorMultiplierHint = document.getElementById('calculator-multiplier-hint');
const calculatorRottenToggle = document.getElementById('calculator-rotten-toggle');
const calculatorRottenLabel = document.getElementById('calculator-rotten-label');
const calculatorRottenHint = document.getElementById('calculator-rotten-hint');
const calculatorSelectedFruit = document.getElementById('calculator-selected-fruit');
const calculatorResultPrice = document.getElementById('calculator-result-price');
const calculatorBaseValue = document.getElementById('calculator-base-value');
const calculatorUpdatedAt = document.getElementById('calculator-updated-at');
const calculatorFormulaHint = document.getElementById('calculator-formula-hint');

// Translation Functions
function setLanguage(lang) {
  if (!translations[lang]) {
    lang = 'en';
  }
  currentLang = lang;
  localStorage.setItem('siteLang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });
  
  lastWeatherKey = '';
  updateStaticTranslations();
  renderWeatherSettings();
  if (stockData) {
    renderDashboard();
  }
  if (predictionData) {
    renderPredictions();
  }
  renderCalculator();
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
    timerLabels[0].textContent = t.timerLabelSeeds;
    timerLabels[1].textContent = t.timerLabelGears;
    timerLabels[2].textContent = t.timerLabelCrates;
  }

  const navLabels = document.querySelectorAll('.quick-nav-link span');
  if (navLabels.length >= 7) {
    navLabels[0].textContent = t.navSeeds;
    navLabels[1].textContent = t.navGears;
    navLabels[2].textContent = t.navCrates;
    navLabels[3].textContent = t.navAuction;
    navLabels[4].textContent = t.navWeather;
    navLabels[5].textContent = t.navCalculator;
    navLabels[6].textContent = t.navFuture;
  }

  const auctionHeading = document.querySelector('.auction-panel-header h4');
  if (auctionHeading) {
    auctionHeading.innerHTML = `<i class="fa-solid fa-gavel"></i> ${t.auctionTitle}`;
  }
  const auctionRefreshLabel = document.querySelector('.auction-refresh-label');
  if (auctionRefreshLabel) {
    auctionRefreshLabel.textContent = t.auctionRefreshIn;
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

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t[key];
    if (typeof val === 'string') el.textContent = val;
  });

  const calculatorTitle = document.querySelector('#calculator-section .section-title');
  if (calculatorTitle) calculatorTitle.innerHTML = t.calculatorTitle;
  const calculatorFruitLabel = document.getElementById('calculator-fruit-label');
  if (calculatorFruitLabel) calculatorFruitLabel.textContent = t.calculatorFruitLabel;
  if (calculatorFruitInput) calculatorFruitInput.placeholder = t.calculatorFruitPlaceholder;
  const calculatorWeightLabel = document.getElementById('calculator-weight-label');
  if (calculatorWeightLabel) calculatorWeightLabel.textContent = t.calculatorWeightLabel;
  if (calculatorWeightHint) calculatorWeightHint.textContent = t.calculatorWeightHint || 'Game fruit weight in kg';
  const calculatorMutationLabel = document.getElementById('calculator-mutation-label');
  if (calculatorMutationLabel) calculatorMutationLabel.textContent = t.calculatorMutationLabel;
  if (calculatorSingleHarvestPenaltyLabel) calculatorSingleHarvestPenaltyLabel.textContent = t.calculatorSingleHarvestPenaltyLabel || 'Single-harvest penalty';
  if (calculatorSingleHarvestPenaltyHint) calculatorSingleHarvestPenaltyHint.textContent = t.calculatorSingleHarvestPenaltyHint || 'When enabled, mutation multipliers are reduced for one-time crops.';
  const calculatorFriendsLabel = document.getElementById('calculator-friends-label');
  if (calculatorFriendsLabel) calculatorFriendsLabel.textContent = t.calculatorFriendsLabel;
  if (calculatorMultiplierLabel) calculatorMultiplierLabel.textContent = t.calculatorMultiplierLabel || 'Sell multiplier';
  if (calculatorMultiplierHint) calculatorMultiplierHint.textContent = t.calculatorMultiplierHint || 'Uses the current in-game sell multiplier for the selected fruit.';
  if (calculatorRottenLabel) calculatorRottenLabel.textContent = t.calculatorRottenLabel || 'Rotten fruit';
  if (calculatorRottenHint) calculatorRottenHint.textContent = t.calculatorRottenHint || 'Price is reduced to 20%.';
  if (calculatorFormulaHint) calculatorFormulaHint.textContent = t.calculatorFormulaHint;
  
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
  updateMultipliersUpdatedAt();

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

function cleanMojibakeFallbackText(root = document.body) {
  if (!root) return;
  const mojibakePattern = /(Р |РЎ|РЋ|РІР‚|вЂ|СЂСџ)/;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (mojibakePattern.test(node.nodeValue || '')) {
      nodes.push(node);
    }
  }
  nodes.forEach(node => {
    node.nodeValue = '';
  });
}

// Add Switcher Event Listeners
langButtons.forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang') || 'en'));
});

[
  calculatorWeightInput,
  calculatorMutationSelect,
  calculatorSingleHarvestPenaltyToggle,
  calculatorFriendsInput,
  calculatorRottenToggle
].forEach(el => {
  if (!el) return;
  el.addEventListener('input', renderCalculator);
  el.addEventListener('change', renderCalculator);
});

if (calculatorCurrentMultiplierBtn) {
  calculatorCurrentMultiplierBtn.addEventListener('click', () => {
    calculatorUseCurrentMultiplier = !calculatorUseCurrentMultiplier;
    renderCalculator();
  });
}

if (calculatorFruitInput) {
  calculatorFruitInput.addEventListener('input', () => {
    selectedCalculatorFruitName = '';
    calculatorFruitActiveIndex = 0;
    openCalculatorFruitMenu();
    renderCalculator();
  });
  calculatorFruitInput.addEventListener('change', () => {
    if (!String(calculatorFruitInput.value || '').trim()) {
      selectedCalculatorFruitName = '';
    }
    renderCalculator();
  });
  calculatorFruitInput.addEventListener('focus', () => {
    openCalculatorFruitMenu();
  });
  calculatorFruitInput.addEventListener('keydown', handleCalculatorFruitKeydown);
}

if (calculatorFruitToggle) {
  calculatorFruitToggle.addEventListener('click', () => {
    if (calculatorFruitMenuOpen) {
      closeCalculatorFruitMenu();
    } else {
      calculatorFruitInput && calculatorFruitInput.focus();
      openCalculatorFruitMenu();
    }
  });
}

if (calculatorFruitClear) {
  calculatorFruitClear.addEventListener('click', () => {
    if (!calculatorFruitInput) return;
    calculatorFruitInput.value = '';
    selectedCalculatorFruitName = '';
    calculatorFruitActiveIndex = 0;
    calculatorFruitInput.focus();
    openCalculatorFruitMenu();
    renderCalculator();
  });
}

document.addEventListener('click', (event) => {
  if (!calculatorFruitPicker || calculatorFruitPicker.contains(event.target)) return;
  closeCalculatorFruitMenu();
});

// Smooth quick navigation with sticky nav offset and active section state
const quickNavEntries = Array.from(quickNavLinks)
  .map(link => {
    const hash = link.getAttribute('href') || '';
    const target = hash.startsWith('#') ? document.getElementById(hash.slice(1)) : null;
    return { link, hash, target };
  })
  .filter(entry => entry.target);

function getQuickNavOffset() {
  const nav = document.querySelector('.quick-nav');
  return (nav ? nav.offsetHeight : 0) + 16;
}

function scrollToQuickNavTarget(entry) {
  if (!entry || !entry.target) return;
  const top = Math.max(0, entry.target.getBoundingClientRect().top + window.scrollY - getQuickNavOffset());
  window.scrollTo({ top, behavior: 'smooth' });
  history.replaceState(null, '', entry.hash);
}

let quickNavRaf = null;
function updateQuickNavActive() {
  quickNavRaf = null;
  if (!quickNavEntries.length) return;

  const topLimit = getQuickNavOffset();
  const bottomLimit = window.innerHeight;
  let activeEntry = null;
  let bestVisible = 0;

  quickNavEntries.forEach(entry => {
    const rect = entry.target.getBoundingClientRect();
    const visible = Math.max(0, Math.min(rect.bottom, bottomLimit) - Math.max(rect.top, topLimit));
    if (visible > bestVisible) {
      bestVisible = visible;
      activeEntry = entry;
    }
  });

  if (!activeEntry) {
    const pivot = window.scrollY + topLimit + 24;
    const passedEntries = quickNavEntries
      .filter(entry => entry.target.offsetTop <= pivot)
      .sort((a, b) => a.target.offsetTop - b.target.offsetTop);
    activeEntry = passedEntries.length ? passedEntries[passedEntries.length - 1] : null;
  }

  quickNavEntries.forEach(entry => {
    entry.link.classList.toggle('active', entry === activeEntry);
  });
}

function scheduleQuickNavActive() {
  if (quickNavRaf) return;
  quickNavRaf = requestAnimationFrame(updateQuickNavActive);
}

quickNavEntries.forEach(entry => {
  entry.link.addEventListener('click', event => {
    event.preventDefault();
    scrollToQuickNavTarget(entry);
    updateQuickNavActive();
  });
});

window.addEventListener('scroll', scheduleQuickNavActive, { passive: true });
window.addEventListener('resize', scheduleQuickNavActive);
setTimeout(updateQuickNavActive, 0);

// API Poll Functions
async function fetchData() {
  try {
    let newStockData = null;
    
    // 1. Fetch Stock Data
    try {
      const stockRes = await fetch('/api/stock?client=web');
      if (stockRes.ok) {
        newStockData = await stockRes.json();
        if (newStockData.auction) {
          auctionData = newStockData.auction;
        }
      } else if (stockRes.status === 429) {
        console.warn('Stock API rate limited (429)');
      }
    } catch (err) {
      console.error('Error fetching stock:', err);
    }

    // 1b. Fetch Auction Data. WebSocket updates keep it fresh after initial load.
    try {
      const auctionRes = await fetch('/api/auction?client=web');
      if (auctionRes.ok) {
        auctionData = await auctionRes.json();
        renderAuction();
      }
    } catch (err) {
      console.warn('Auction API is not ready yet:', err);
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
      renderAuction();
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

async function fetchCalculatorData() {
  try {
    const res = await fetch('/api/calculator-data?client=web');
    if (!res.ok) {
      renderCalculator();
      return;
    }
    const data = await res.json();
    if (data && Array.isArray(data.fruits)) {
      calculatorData = data;
      renderCalculator();
    }
  } catch (err) {
    console.warn('Calculator API is not ready yet:', err);
    renderCalculator();
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
  let phaseLower = canonicalEnvKey(phase);
  
  const phaseCatalogImage = getWeatherCatalogImageRef(phaseLower);
  const phaseKey = `${phase}:${w.phaseImage || phaseCatalogImage || ''}:${currentLang}`;
  if (timeBox) {
    if (phaseKey !== lastPhaseKey) {
      lastPhaseKey = phaseKey;
      
      const phaseTranslationKey = 'phase' + phaseLower;
      let phaseText = getLocalizedEnvName(phaseLower, phase, weatherOptions[phaseLower]) || t[phaseTranslationKey] || phase;
      
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
  const currentKey = activeWeathers.map(aw => `${aw.name}:${aw.image || getWeatherCatalogImageRef(aw.name) || ''}`).sort().join(',') || 'none';
  
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
          
          const weatherKey = canonicalEnvKey(name);
          let colorStyle = 'var(--text-secondary)';
          if (weatherKey === 'starfall') {
            colorStyle = 'var(--rarity-legendary)';
          } else if (weatherKey === 'rain' || weatherKey === 'rainbow') {
            colorStyle = 'var(--rarity-exotic)';
          } else if (weatherKey === 'thunderstorm') {
            colorStyle = 'var(--color-danger)';
          } else {
            colorStyle = 'var(--rarity-rare)';
          }
          
          let optKey = canonicalEnvKey(name);
          const discovered = JSON.parse(localStorage.getItem('discoveredEnvs') || '{}');
          const allOptions = { ...weatherOptions, ...discovered };
          const opt = allOptions[optKey];
          const displayName = getLocalizedEnvName(optKey, name, opt);
          const imgHtml = getWeatherImageHtml(name, image);
          
          weatherBox.innerHTML = `
            ${imgHtml}
            <div class="weather-box-details" style="display: flex; flex-direction: column; gap: 4px; flex: 1; text-align: inherit;">
              <span class="weather-label">${t.weatherLabelActive}</span>
              <span class="weather-val" style="color: ${colorStyle}">${displayName}</span>
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
  renderAuction();
  renderCalculator();
}

function renderFruitRefresh() {
  // Safe empty fallback
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const COMPACT_NUMBER_SUFFIXES = {
  k: 1_000,
  'к': 1_000,
  m: 1_000_000,
  'м': 1_000_000,
  b: 1_000_000_000,
  'б': 1_000_000_000,
  t: 1_000_000_000_000,
  q: 1_000_000_000_000_000,
  qa: 1_000_000_000_000_000,
  qd: 1_000_000_000_000_000,
  quad: 1_000_000_000_000_000,
  qi: 1_000_000_000_000_000_000,
  sx: 1_000_000_000_000_000_000_000,
  sp: 1_000_000_000_000_000_000_000_000,
  oc: 1_000_000_000_000_000_000_000_000_000,
  no: 1_000_000_000_000_000_000_000_000_000_000,
  dc: 1_000_000_000_000_000_000_000_000_000_000_000
};

const COMPACT_PRICE_UNITS = [
  { value: 1e33, suffix: 'Dc' },
  { value: 1e30, suffix: 'No' },
  { value: 1e27, suffix: 'Oc' },
  { value: 1e24, suffix: 'Sp' },
  { value: 1e21, suffix: 'Sx' },
  { value: 1e18, suffix: 'Qi' },
  { value: 1e15, suffix: 'Qa' },
  { value: 1e12, suffix: 'T' },
  { value: 1e9, suffix: 'B' },
  { value: 1e6, suffix: 'M' },
  { value: 1e3, suffix: 'K' }
];

function parseCompactNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
  if (value === null || value === undefined) return NaN;

  const raw = String(value).trim();
  if (!raw) return NaN;

  const compact = raw
    .replace(/\s+/g, '')
    .replace(/[¢]/g, '')
    .replace(/[,，](?=\d{3}(?:\D|$))/g, '');
  const match = compact.match(/^(-?\d+(?:[.,]\d+)?)([a-zа-я]+)?/i);
  if (!match) return NaN;

  const number = Number(match[1].replace(',', '.'));
  if (!Number.isFinite(number)) return NaN;

  const suffix = String(match[2] || '').toLowerCase();
  return number * (COMPACT_NUMBER_SUFFIXES[suffix] || 1);
}

function trimFixedNumber(value) {
  return String(value).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
}

function formatAuctionPrice(value) {
  const num = parseCompactNumber(value);
  if (!Number.isFinite(num) || num <= 0) return '--';
  if (num >= 1_000_000_000) return `${trimFixedNumber((num / 1_000_000_000).toFixed(num >= 10_000_000_000 ? 0 : 2))}B¢`;
  if (num >= 1_000_000) return `${trimFixedNumber((num / 1_000_000).toFixed(num >= 10_000_000 ? 0 : 2))}M¢`;
  if (num >= 1_000) return `${trimFixedNumber((num / 1_000).toFixed(num >= 10_000 ? 0 : 2))}K¢`;
  return `${Math.floor(num)}¢`;
}

function formatCompactPrice(value) {
  const num = parseCompactNumber(value);
  if (!Number.isFinite(num) || num <= 0) return '--';
  for (const unit of COMPACT_PRICE_UNITS) {
    if (num >= unit.value) {
      return `${trimFixedNumber((num / unit.value).toFixed(num >= unit.value * 10 ? 0 : 2))}${unit.suffix}\u00A2`;
    }
  }
  return `${Math.floor(num)}\u00A2`;
}

function formatFullPrice(value) {
  const num = parseCompactNumber(value);
  if (!Number.isFinite(num) || num <= 0) return '--';
  return `${Math.floor(num).toLocaleString(currentLang || 'en-US')}\u00A2`;
}

function getAuctionNowUnix() {
  const serverNow = Number(auctionData && auctionData.serverNow);
  if (Number.isFinite(serverNow) && serverNow > 0) {
    const updatedAtMs = Number(auctionData && auctionData.updatedAt);
    if (Number.isFinite(updatedAtMs) && updatedAtMs > 0) {
      return serverNow + Math.max(0, (Date.now() - updatedAtMs) / 1000);
    }
    return serverNow;
  }
  return Date.now() / 1000;
}

function formatShortCountdown(targetUnix, nowUnix = Date.now() / 1000) {
  const target = Number(targetUnix || 0);
  if (!Number.isFinite(target) || target <= 0) return '--:--';
  const diff = Math.max(0, Math.floor(target - nowUnix));
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;
  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  }
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

function normalizeTimestampMs(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return numeric < 100000000000 ? numeric * 1000 : numeric;
}

function formatTimeOfDay(value) {
  const timestampMs = normalizeTimestampMs(value);
  if (!timestampMs) return null;
  return new Date(timestampMs).toLocaleTimeString(currentLang || 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function getAuctionLotDisplayName(lot) {
  const rawName = lot.name || lot.item || '';
  return translateItemName(rawName);
}

function renderAuction() {
  if (!auctionGrid) return;
  const t = translations[currentLang];
  const lots = auctionData && Array.isArray(auctionData.lots) ? auctionData.lots : [];

  if (!lots.length) {
    auctionGrid.innerHTML = `<div class="loading-placeholder">${t.auctionEmpty}</div>`;
    updateAuctionTimers();
    return;
  }

  auctionGrid.innerHTML = lots.map(lot => {
    const name = getAuctionLotDisplayName(lot) || lot.lotId || 'Auction lot';
    const rarityClass = `rarity-${String(lot.rarity || 'common').toLowerCase()}`;
    const statusClass = lot.expired ? 'expired' : lot.soldOut ? 'sold' : 'active';
    const statusText = lot.expired ? t.auctionExpired : lot.soldOut ? t.auctionSoldOut : t.auctionAvailable;
    const stockText = lot.stockUnlimited
      ? t.auctionStockUnlimited
      : lot.stockUnknown || lot.stock === null || lot.stock === undefined
        ? '--'
      : t.auctionStockLeft(Math.max(0, Number(lot.stock) || 0));
    const imageHtml = lot.image
      ? `<div class="auction-image-wrapper"><img src="${escapeHtml(lot.image)}" alt="${escapeHtml(name)}" class="auction-image" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.parentNode.classList.add('img-failed');this.remove();"></div>`
      : `<div class="auction-image-wrapper img-failed"></div>`;
    const countHtml = Number(lot.count || 1) > 1 ? `<span class="auction-count">x${Number(lot.count)}</span>` : '';

    return `
      <article class="auction-card ${rarityClass} auction-${statusClass}" data-expires="${Number(lot.expiresAt || 0)}">
        <div class="auction-card-top">
          ${imageHtml}
          ${countHtml}
          <span class="auction-status ${statusClass}">${statusText}</span>
        </div>
        <div class="auction-card-body">
          <h5>${escapeHtml(name)}</h5>
          <span class="auction-meta">${escapeHtml(lot.category || lot.rarity || 'Auction')}</span>
          <div class="auction-info-row">
            <span><i class="fa-solid fa-box"></i> ${escapeHtml(stockText)}</span>
            <span class="auction-lot-timer">--:--</span>
          </div>
          <div class="auction-price-row">
            <span>${t.auctionPrice}</span>
            <strong>${formatCompactPrice(lot.currentPrice)}</strong>
          </div>
        </div>
      </article>
    `;
  }).join('');

  updateAuctionTimers();
}

function updateAuctionTimers() {
  const auctionNow = getAuctionNowUnix();
  if (auctionRefreshTimer) {
    auctionRefreshTimer.textContent = formatShortCountdown(auctionData && auctionData.refreshAt, auctionNow);
  }
  if (!auctionGrid) return;
  auctionGrid.querySelectorAll('.auction-card').forEach(card => {
    const expiresAt = Number(card.getAttribute('data-expires') || 0);
    const timer = card.querySelector('.auction-lot-timer');
    if (timer) timer.textContent = formatShortCountdown(expiresAt, auctionNow);
  });
}

function getCaseInsensitiveMapValue(map, name, fallback) {
  if (!map || typeof map !== 'object') return fallback;
  if (map[name] !== undefined) return Number(map[name]);
  const target = String(name || '').toLowerCase();
  for (const [key, value] of Object.entries(map)) {
    if (String(key).toLowerCase() === target) {
      const num = Number(value);
      return Number.isFinite(num) ? num : fallback;
    }
  }
  return fallback;
}

function getCalculatorSizePower(fruitName, sizeRatio) {
  const cfg = calculatorData && calculatorData.config || {};
  const dr = cfg.diminishingReturns || {};
  const safeRatio = Math.max(0.01, Number(sizeRatio) || 1);
  const exponent = getCaseInsensitiveMapValue(cfg.sizeExponentOverrides, fruitName, Number(cfg.sizeExponent) || 2.65);
  const knee = (Number(dr.knee) || 5) * getCaseInsensitiveMapValue(dr.kneeMultipliers, fruitName, 1);
  let sizePower = Math.pow(safeRatio, exponent);

  if (dr.enabled !== false && knee > 0 && safeRatio > knee) {
    const tailBase = Number(dr.tailExponent) || 1.5;
    const tailMultiplier = getCaseInsensitiveMapValue(dr.tailExponentMultipliers, fruitName, 1);
    const tailExponent = Math.min(tailBase * tailMultiplier, exponent);
    sizePower = Math.pow(knee, exponent) * Math.pow(safeRatio / knee, tailExponent);
  }

  return Number.isFinite(sizePower) && sizePower > 0 ? sizePower : 1;
}

function getCalculatorBaseValuePerKg(fruit) {
  if (!fruit) return 0;
  const provided = parseCompactNumber(fruit.baseValuePerKg ?? fruit.valuePerKg ?? fruit.perKgValue);
  if (Number.isFinite(provided) && provided > 0) return provided;

  const baseValue = parseCompactNumber(fruit.baseValue);
  if (!Number.isFinite(baseValue) || baseValue <= 0) return 0;
  const averageWeight = Number(fruit.averageWeight ?? fruit.avgWeight ?? fruit.weight);
  const divisor = Number(fruit.averageSizePower) > 0
    ? Number(fruit.averageSizePower)
    : getCalculatorSizePower(fruit.name, averageWeight / (averageWeight || 1));
  return divisor > 0 ? baseValue / divisor : baseValue;
}

function clampNumber(value, min, max) {
  const num = Number(value);
  if (!Number.isFinite(num)) return min;
  return Math.min(max, Math.max(min, num));
}

function translateMutationName(name) {
  const mutationMap = {
    none: { ru: 'Нет', es: 'Ninguna', pt: 'Nenhuma', fr: 'Aucune', de: 'Keine', tr: 'Yok', id: 'Tidak ada', uk: 'Немає', pl: 'Brak', zh: '无', ja: 'なし', ko: '없음', ar: 'لا يوجد' },
    wet: { ru: 'Мокрая', es: 'Mojada', pt: 'Molhada', fr: 'Mouillée', de: 'Nass', tr: 'Islak', id: 'Basah', uk: 'Мокра', pl: 'Mokra', zh: '潮湿', ja: '濡れ', ko: '젖음', ar: 'رطبة' },
    frozen: { ru: 'Замороженная', es: 'Congelada', pt: 'Congelada', fr: 'Gelée', de: 'Gefroren', tr: 'Donmuş', id: 'Beku', uk: 'Заморожена', pl: 'Zamrożona', zh: '冻结', ja: '凍結', ko: '얼어붙음', ar: 'مجمدة' },
    electric: { ru: 'Электрическая', es: 'Eléctrica', pt: 'Elétrica', fr: 'Électrique', de: 'Elektrisch', tr: 'Elektrikli', id: 'Listrik', uk: 'Електрична', pl: 'Elektryczna', zh: '电能', ja: '電気', ko: '전기', ar: 'كهربائية' },
    rainbow: { ru: 'Радужная', es: 'Arcoíris', pt: 'Arco-íris', fr: 'Arc-en-ciel', de: 'Regenbogen', tr: 'Gökkuşağı', id: 'Pelangi', uk: 'Веселкова', pl: 'Tęczowa', zh: '彩虹', ja: '虹', ko: '무지개', ar: 'قوس قزح' },
    starstruck: { ru: 'Звёздная', es: 'Estelar', pt: 'Estelar', fr: 'Étoilée', de: 'Sternenhaft', tr: 'Yıldızlı', id: 'Bintang', uk: 'Зоряна', pl: 'Gwiazdowa', zh: '星光', ja: '星付き', ko: '별빛', ar: 'نجمية' },
    aurora: { ru: 'Аврора', es: 'Aurora', pt: 'Aurora', fr: 'Aurore', de: 'Aurora', tr: 'Aurora', id: 'Aurora', uk: 'Аврора', pl: 'Aurora', zh: '极光', ja: 'オーロラ', ko: '오로라', ar: 'الشفق' },
    ignited: { ru: 'Воспламенённая', es: 'Encendida', pt: 'Incendiada', fr: 'Enflammée', de: 'Entzündet', tr: 'Alevli', id: 'Menyala', uk: 'Запалена', pl: 'Rozpalona', zh: '点燃', ja: '燃焼', ko: '점화', ar: 'مشتعلة' }
  };
  const key = String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanName = normalizeAutoTranslationName(name);
  if (currentLang !== 'en' && cleanName) {
    const autoName = translateItemName(cleanName, currentLang);
    if (autoName && autoName !== cleanName) return autoName;
  }
  return (mutationMap[key] && mutationMap[key][currentLang]) || name;
}

function calculateFruitValue(fruit, mutation, weight, friends, currentMultiplier, rotten, applySingleHarvestPenalty) {
  if (!fruit || !calculatorData) return null;
  const cfg = calculatorData.config || {};
  const fruitName = fruit.name;
  
  // 1. Average weight
  const averageWeight = Number(fruit.averageWeight ?? fruit.avgWeight ?? fruit.weight) || 1;
  const safeWeight = Math.max(0.01, Number(weight) || averageWeight);
  
  // 2. Size ratio: Weight / AverageWeight
  const sizeRatio = safeWeight / averageWeight;
  
  // 3. Size power (exponent and diminishing returns)
  const exponent = getCaseInsensitiveMapValue(cfg.sizeExponentOverrides, fruitName, Number(cfg.sizeExponent) || 2.65);
  const dr = cfg.diminishingReturns || {};
  const knee = (Number(dr.knee) || 5) * getCaseInsensitiveMapValue(dr.kneeMultipliers, fruitName, 1);
  
  let sizePower = Math.pow(sizeRatio, exponent);
  if (dr.enabled !== false && knee > 0 && sizeRatio > knee) {
    const tailBase = Number(dr.tailExponent) || 1.5;
    const tailMultiplier = getCaseInsensitiveMapValue(dr.tailExponentMultipliers, fruitName, 1);
    const tailExponent = Math.min(tailBase * tailMultiplier, exponent);
    sizePower = Math.pow(knee, exponent) * Math.pow(sizeRatio / knee, tailExponent);
  }
  
  // 4. Size multiplier flag
  const sizeMultiplier = Number(cfg.sizeMultiplier) || 1;
  
  // 5. Mutation multiplier
  let mutationMultiplier = mutation && mutation.name && String(mutation.name).toLowerCase() !== 'none'
    ? Number(mutation.multiplier) || 1
    : 1;
  if (applySingleHarvestPenalty && fruit.isSingleHarvest && mutationMultiplier > 1) {
    mutationMultiplier = 1 + (mutationMultiplier - 1) * (Number(cfg.singleHarvestMutationBonusScale) || 0.15);
  }
  mutationMultiplier *= Number(cfg.mutationMultiplier) || 1;
  
  // 6. Rot multiplier
  let rotValue = 0;
  if (typeof rotten === 'number') {
    rotValue = rotten;
  } else if (typeof rotten === 'boolean') {
    rotValue = rotten ? 1 : 0;
  }
  const rottenPenaltyScale = Number(cfg.rottenPenaltyMultiplier ?? cfg.decayPenaltyMultiplier) || 0.8;
  const rottenMultiplier = rotValue > 0 ? 1 - Math.min(1, Math.max(0, rotValue)) * rottenPenaltyScale : 1;
  
  // 7. Friends multiplier
  const friendsMultiplier = 1 + Math.max(0, Number(friends) || 0) * 0.1;
  
  // 8. Base price
  const baseValue = Number(fruit.baseValue) || 0;
  
  // Intermediate floor (Script 1)
  const rawCalculatedPrice = baseValue * sizePower * sizeMultiplier * mutationMultiplier * rottenMultiplier * friendsMultiplier;
  let calculatedPrice = Math.floor(rawCalculatedPrice + 1e-6);
  
  // Minimum override
  const minOverride = getCaseInsensitiveMapValue(cfg.minimumValues, fruitName, null);
  if (Number.isFinite(minOverride) && calculatedPrice < minOverride) {
    calculatedPrice = minOverride;
  }
  
  // 9. Store overrides and market multipliers (Script 2)
  const globalMult = Number(cfg.globalMultiplier) || 1;
  const cropMult = getCaseInsensitiveMapValue(cfg.priceMultipliers, fruitName, 1);
  const liveMultiplier = Number.isFinite(Number(currentMultiplier)) && Number(currentMultiplier) > 0 ? Number(currentMultiplier) : 1;
  
  const finalPrice = Math.floor(calculatedPrice * globalMult * cropMult * liveMultiplier + 1e-6);
  return finalPrice;
}

function formatMultiplierRate(rate) {
  const value = Number(rate);
  if (!Number.isFinite(value) || value <= 0) return '1';
  return trimFixedNumber(value.toFixed(value >= 10 ? 0 : 2));
}

function getCurrentFruitMultiplier(fruit) {
  if (!fruit) return null;
  const targetName = normalizeCalculatorFruitText(fruit.name);
  const targetKey = normalizeCalculatorFruitText(fruit.key || fruit.name).replace(/[^a-z0-9]/g, '');
  const targetImage = normalizeCalculatorFruitText(fruit.image || '').replace(/\D/g, '');
  const entries = normalizeFruitMultipliers(stockData && stockData.fruitMultipliers);

  for (const entry of entries) {
    const entryName = normalizeCalculatorFruitText(entry.name);
    const entryKey = normalizeCalculatorFruitText(entry.key).replace(/[^a-z0-9]/g, '');
    const entryImage = normalizeCalculatorFruitText(entry.image || '').replace(/\D/g, '');
    if (
      entryName === targetName ||
      entryKey === targetKey ||
      (targetImage && entryImage === targetImage)
    ) {
      const rate = Number(entry.rate);
      return Number.isFinite(rate) && rate > 0 ? rate : null;
    }
  }

  return null;
}

function updateCalculatorMultiplierButton(fruit) {
  if (!calculatorCurrentMultiplierBtn || !calculatorCurrentMultiplierText) return;
  const t = translations[currentLang];
  const rate = getCurrentFruitMultiplier(fruit);
  const usableRate = rate && rate > 0 ? rate : 1;
  const formatted = formatMultiplierRate(usableRate);
  const hasLiveRate = rate !== null;

  calculatorCurrentMultiplierBtn.disabled = !fruit || !hasLiveRate;
  calculatorCurrentMultiplierBtn.classList.toggle('is-active', calculatorUseCurrentMultiplier && hasLiveRate);
  calculatorCurrentMultiplierBtn.setAttribute('aria-pressed', calculatorUseCurrentMultiplier && hasLiveRate ? 'true' : 'false');

  if (!fruit) {
    calculatorCurrentMultiplierText.textContent = t.calculatorSelectFruit;
  } else if (!hasLiveRate) {
    calculatorCurrentMultiplierText.textContent = t.calculatorCurrentMultiplierUnavailable || 'No current multiplier';
  } else if (calculatorUseCurrentMultiplier) {
    const value = t.calculatorCurrentMultiplierActive || ((x) => `Using x${x}`);
    calculatorCurrentMultiplierText.textContent = typeof value === 'function' ? value(formatted) : value;
  } else {
    const value = t.calculatorCurrentMultiplierButton || ((x) => `Use current x${x}`);
    calculatorCurrentMultiplierText.textContent = typeof value === 'function' ? value(formatted) : value;
  }
}

function getCalculatorFruits() {
  return calculatorData && Array.isArray(calculatorData.fruits) ? calculatorData.fruits : [];
}

function normalizeCalculatorFruitText(value) {
  return String(value || '').trim().toLowerCase();
}

function getCalculatorFruitDisplay(fruit) {
  return translateItemName(fruit && fruit.name || '');
}

function getCalculatorFruitImage(fruit) {
  if (!fruit) return '';
  return fruit.image || itemImageCache.get(String(fruit.name || '').toLowerCase().trim()) || '';
}

function getCalculatorFruitMenuItems() {
  const raw = normalizeCalculatorFruitText(calculatorFruitInput && calculatorFruitInput.value);
  const fruits = getCalculatorFruits();
  if (!raw) return fruits.slice(0, 80);

  return fruits
    .map(fruit => {
      const original = String(fruit.name || '');
      const display = getCalculatorFruitDisplay(fruit);
      const originalLower = original.toLowerCase();
      const displayLower = display.toLowerCase();
      let score = 99;
      if (displayLower === raw || originalLower === raw) score = 0;
      else if (displayLower.startsWith(raw)) score = 1;
      else if (originalLower.startsWith(raw)) score = 2;
      else if (displayLower.includes(raw)) score = 3;
      else if (originalLower.includes(raw)) score = 4;
      return { fruit, score };
    })
    .filter(item => item.score < 99)
    .sort((a, b) => a.score - b.score || (Number(b.fruit.baseValue) || 0) - (Number(a.fruit.baseValue) || 0))
    .slice(0, 80)
    .map(item => item.fruit);
}

function openCalculatorFruitMenu() {
  calculatorFruitMenuOpen = true;
  if (calculatorFruitPicker) calculatorFruitPicker.classList.add('is-open');
  renderCalculatorFruitMenu();
}

function closeCalculatorFruitMenu() {
  calculatorFruitMenuOpen = false;
  if (calculatorFruitPicker) calculatorFruitPicker.classList.remove('is-open');
}

function updateCalculatorFruitPickerState() {
  if (!calculatorFruitPicker || !calculatorFruitInput) return;
  calculatorFruitPicker.classList.toggle('has-value', Boolean(String(calculatorFruitInput.value || '').trim()));
}

function formatCalculatorWeightValue(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return '';
  return trimFixedNumber(num.toFixed(2));
}

function formatCalculatorBaseMeta(fruit) {
  const t = translations[currentLang];
  if (!fruit) {
    const formatter = t.calculatorBaseValue;
    if (typeof formatter === 'function') {
      return formatter.length >= 2 ? formatter('--', '--') : formatter('--');
    }
    return 'Base: --';
  }
  const averagePrice = formatFullPrice(fruit.baseValue || 0);
  const perKgPrice = formatFullPrice(getCalculatorBaseValuePerKg(fruit));
  const formatter = t.calculatorBaseValue;
  if (typeof formatter === 'function') {
    if (formatter.length >= 2) return formatter(averagePrice, perKgPrice);
    return `${formatter(averagePrice)} | kg: ${perKgPrice}`;
  }
  return `Base: ${averagePrice} | kg: ${perKgPrice}`;
}

function selectCalculatorFruit(fruit) {
  if (!fruit || !calculatorFruitInput) return;
  selectedCalculatorFruitName = fruit.name;
  calculatorFruitInput.value = getCalculatorFruitDisplay(fruit);
  const avgWeight = formatCalculatorWeightValue(fruit.averageWeight ?? fruit.avgWeight ?? fruit.weight);
  if (avgWeight && calculatorWeightInput) {
    calculatorWeightInput.value = avgWeight;
  }
  updateCalculatorFruitPickerState();
  calculatorFruitActiveIndex = 0;
  closeCalculatorFruitMenu();
  renderCalculator();
}

function renderCalculatorFruitMenu() {
  if (!calculatorFruitMenu) return;
  const t = translations[currentLang];
  const fruits = getCalculatorFruits();

  if (!fruits.length) {
    calculatorFruitMenu.innerHTML = `<div class="calculator-fruit-empty">${escapeHtml(t.calculatorNoData)}</div>`;
    return;
  }

  const items = getCalculatorFruitMenuItems();
  if (!items.length) {
    const emptyText = currentLang === 'ru' ? 'Ничего не найдено' : 'No matches';
    calculatorFruitMenu.innerHTML = `<div class="calculator-fruit-empty">${escapeHtml(emptyText)}</div>`;
    return;
  }

  calculatorFruitActiveIndex = Math.max(0, Math.min(calculatorFruitActiveIndex, items.length - 1));
  calculatorFruitMenu.innerHTML = '';

  items.forEach((fruit, index) => {
    const display = getCalculatorFruitDisplay(fruit);
    const original = String(fruit.name || '');
    const image = getCalculatorFruitImage(fruit);
    const emoji = getFruitEmoji(original);
    const isSelected = selectedCalculatorFruitName === fruit.name;
    const isActive = index === calculatorFruitActiveIndex;

    const row = document.createElement('button');
    row.type = 'button';
    row.className = `calculator-fruit-option${isSelected ? ' is-selected' : ''}${isActive ? ' is-active' : ''}`;
    row.setAttribute('role', 'option');
    row.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    row.dataset.name = original;
    row.innerHTML = `
      <span class="calculator-fruit-option-icon">
        ${image
          ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(display)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.style.display='none';this.parentNode.classList.add('img-failed');"><span class="calculator-fruit-emoji">${emoji}</span>`
          : `<span class="calculator-fruit-emoji">${emoji}</span>`}
      </span>
      <span class="calculator-fruit-option-main">
        <span class="calculator-fruit-option-name">${escapeHtml(display)}</span>
        <span class="calculator-fruit-option-sub">${escapeHtml(original)}</span>
      </span>
      <span class="calculator-fruit-option-price">${escapeHtml(formatFullPrice(fruit.baseValue))}</span>
    `;
    row.addEventListener('mousedown', event => event.preventDefault());
    row.addEventListener('mousemove', () => {
      if (calculatorFruitActiveIndex === index) return;
      calculatorFruitActiveIndex = index;
      renderCalculatorFruitMenu();
    });
    row.addEventListener('click', () => selectCalculatorFruit(fruit));
    calculatorFruitMenu.appendChild(row);
  });
}

function scrollCalculatorActiveFruitIntoView() {
  if (!calculatorFruitMenu) return;
  requestAnimationFrame(() => {
    const active = calculatorFruitMenu.querySelector('.calculator-fruit-option.is-active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  });
}

function handleCalculatorFruitKeydown(event) {
  const items = getCalculatorFruitMenuItems();
  if (!items.length && event.key !== 'Escape') return;

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (!calculatorFruitMenuOpen) openCalculatorFruitMenu();
    calculatorFruitActiveIndex = (calculatorFruitActiveIndex + 1) % items.length;
    renderCalculatorFruitMenu();
    scrollCalculatorActiveFruitIntoView();
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (!calculatorFruitMenuOpen) openCalculatorFruitMenu();
    calculatorFruitActiveIndex = (calculatorFruitActiveIndex - 1 + items.length) % items.length;
    renderCalculatorFruitMenu();
    scrollCalculatorActiveFruitIntoView();
  } else if (event.key === 'Enter' && calculatorFruitMenuOpen) {
    event.preventDefault();
    selectCalculatorFruit(items[calculatorFruitActiveIndex] || items[0]);
  } else if (event.key === 'Escape') {
    closeCalculatorFruitMenu();
  }
}

function getCalculatorSelectedFruit() {
  const fruits = getCalculatorFruits();
  if (!fruits.length) return null;
  const raw = String(calculatorFruitInput && calculatorFruitInput.value || '').trim().toLowerCase();

  if (!raw) {
    selectedCalculatorFruitName = '';
    return null;
  }

  if (selectedCalculatorFruitName) {
    const selected = fruits.find(fruit => fruit.name === selectedCalculatorFruitName);
    if (selected) return selected;
    selectedCalculatorFruitName = '';
  }

  const exact = fruits.find(fruit =>
    String(fruit.name).toLowerCase() === raw ||
    translateItemName(fruit.name).toLowerCase() === raw
  );
  if (exact) return exact;
  return fruits.find(fruit =>
    String(fruit.name).toLowerCase().includes(raw) ||
    translateItemName(fruit.name).toLowerCase().includes(raw)
  ) || null;
}

function renderCalculator() {
  const t = translations[currentLang];
  if (!calculatorSelectedFruit || !calculatorResultPrice) return;
  updateCalculatorFruitPickerState();

  const fruits = getCalculatorFruits();
  if (!calculatorData || !fruits.length) {
    calculatorSelectedFruit.textContent = t.calculatorNoData;
    calculatorResultPrice.textContent = '--';
    if (calculatorBaseValue) calculatorBaseValue.textContent = t.calculatorBaseValue('--');
    if (calculatorUpdatedAt) calculatorUpdatedAt.textContent = '--';
    updateCalculatorMultiplierButton(null);
    renderCalculatorFruitMenu();
    return;
  }

  renderCalculatorFruitMenu();

  if (calculatorMutationSelect) {
    const previous = calculatorMutationSelect.value || 'None';
    const mutations = Array.isArray(calculatorData.mutations) && calculatorData.mutations.length
      ? calculatorData.mutations
      : [{ name: 'None', multiplier: 1 }];
    calculatorMutationSelect.innerHTML = mutations.map(mutation => {
      const label = `${translateMutationName(mutation.name)} x${trimFixedNumber(Number(mutation.multiplier || 1).toFixed(2))}`;
      return `<option value="${escapeHtml(mutation.name)}">${escapeHtml(label)}</option>`;
    }).join('');
    if (mutations.some(mutation => mutation.name === previous)) {
      calculatorMutationSelect.value = previous;
    }
  }

  const fruit = getCalculatorSelectedFruit();

  const mutationName = calculatorMutationSelect ? calculatorMutationSelect.value : 'None';
  const mutation = (calculatorData.mutations || []).find(item => item.name === mutationName) || { name: 'None', multiplier: 1 };
  const currentMultiplier = calculatorUseCurrentMultiplier ? (getCurrentFruitMultiplier(fruit) || 1) : 1;
  const value = calculateFruitValue(
    fruit,
    mutation,
    calculatorWeightInput ? calculatorWeightInput.value : 1,
    calculatorFriendsInput ? calculatorFriendsInput.value : 0,
    currentMultiplier,
    calculatorRottenToggle ? calculatorRottenToggle.checked : false,
    calculatorSingleHarvestPenaltyToggle ? calculatorSingleHarvestPenaltyToggle.checked : false
  );
  updateCalculatorMultiplierButton(fruit);

  calculatorSelectedFruit.textContent = fruit ? translateItemName(fruit.name) : t.calculatorSelectFruit;
  calculatorResultPrice.textContent = value == null ? '--' : formatFullPrice(value);
  if (calculatorBaseValue) calculatorBaseValue.textContent = formatCalculatorBaseMeta(fruit);
  if (calculatorUpdatedAt) {
    const dateValue = calculatorData.updatedAt || calculatorData.scrapedAt && calculatorData.scrapedAt * 1000;
    calculatorUpdatedAt.textContent = dateValue ? t.calculatorUpdatedAt(new Date(dateValue).toLocaleTimeString()) : '--';
  }
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

function updateMultipliersUpdatedAt() {
  const el = document.getElementById('multipliers-updated-at');
  if (!el) return;
  const t = translations[currentLang] || translations.en;
  const time = formatTimeOfDay(stockData && stockData.fruitMultipliersUpdatedAt);
  if (time) {
    const formatter = t.multipliersUpdatedAt || translations.en.multipliersUpdatedAt;
    el.textContent = formatter(time);
  } else {
    el.textContent = t.multipliersUpdatedWaiting || translations.en.multipliersUpdatedWaiting;
  }
}

function renderMultipliers() {
  const listContainer = document.getElementById('multipliers-list');
  if (!listContainer) return;
  updateMultipliersUpdatedAt();

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

    let displayName = translateItemName(name);

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
    let displayName = translateItemName(fruitName);

    const testTitle = t.notifTrackedTitle;
    const testOptions = {
      body: currentLang === 'ru' 
        ? `Вы получите звуковое оповещение, когда множитель на "${displayName}" станет >= x${threshold.toFixed(1)}.`
        : `We will notify you when "${displayName}" multiplier becomes >= x${threshold.toFixed(1)}.`,
      icon: '/new.png',
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

    const translatedNameForSearch = translateItemName(item.name);

    // Search query match
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !translatedNameForSearch.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
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
      ? `<div class="item-image-wrapper"><img src="${item.image}" alt="${escapeHtml(translateItemName(item.name))}" class="item-card-image" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.parentNode.classList.add('img-failed');this.remove();"></div>`
      : '';
    const displayName = translateItemName(item.name);

    card.className = cardClass;
    card.innerHTML = `
      <div class="item-header">
        <div class="name-container">
          <button class="bell-btn ${bellClass}" data-name="${item.name}" title="${bellTitle}">
            <i class="${bellIcon}"></i>
          </button>
          <h4 class="item-name" title="${escapeHtml(item.name)}">${escapeHtml(displayName)}</h4>
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
  
  let displayName = translateItemName(itemName);

  const title = t.multiplierPushTitle(displayName);
  const options = {
    body: t.multiplierPushBody(currentRate, threshold),
    icon: '/new.png',
    badge: '/new.png',
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
  const displayName = translateItemName(item.name);
  const title = t.pushTitle(displayName);
  const options = {
    body: t.pushBody(item.stock, item.price, item.rarity),
    icon: '/new.png',
    badge: '/new.png',
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
    const displayName = translateItemName(itemName);
      
    const testOptions = {
      body: currentItem && currentItem.stock > 0 
        ? translations[currentLang].notifInStockBody(displayName, currentItem.stock, currentItem.price)
        : translations[currentLang].notifTrackedBody(displayName),
      icon: '/new.png',
      badge: '/new.png'
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
      const optKey = canonicalEnvKey(name);
      const opt = weatherOptions[optKey];
      if (opt) {
        displayName = getLocalizedEnvName(optKey, name, opt);
      }
    } else {
      displayName = translateItemName(name);
    }

    const testTitle = t.notifTrackedTitle;
    const testOptions = {
      body: t.notifTrackedBody(displayName),
      icon: '/new.png',
      badge: '/new.png'
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
    const name = getLocalizedEnvName(key, key, opt);
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
    const envName = getLocalizedEnvName(envKey, envKey, opt);
    
    const testTitle = t.notifTrackedTitle;
    const testOptions = {
      body: t.notifTrackedBody(envName),
      icon: '/new.png',
      badge: '/new.png'
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

  const catalog = stockData && stockData.weatherCatalog && typeof stockData.weatherCatalog === 'object'
    ? stockData.weatherCatalog
    : {};
  for (const [key, item] of Object.entries(catalog)) {
    const lowerName = canonicalEnvKey(key);
    if (!lowerName || weatherOptions[lowerName] || discovered[lowerName]) continue;
    const displayName = item && item.name ? item.name : key;
    discovered[lowerName] = {
      emoji: '',
      ru: displayName,
      en: displayName
    };
    changed = true;
  }
  
  // 1. Discover Phase
  let phase = w.phase || '';
  if (phase) {
    let phaseLower = canonicalEnvKey(phase);
    if (phaseLower === 'night') {
      phase = 'Moon';
    }
  }
  if (phase && phase !== 'Day' && phase !== 'Moon' && phase !== 'Sunset' && phase !== 'day' && phase !== 'moon' && phase !== 'sunset') {
    let phaseLower = canonicalEnvKey(phase);
    if (!weatherOptions[phaseLower] && !discovered[phaseLower]) {
      discovered[phaseLower] = {
        emoji: '',
        ru: phase,
        en: phase
      };
      changed = true;
    }
  }
  
  // 2. Discover Weathers
  if (w.weathers) {
    for (let name of Object.keys(w.weathers)) {
      let lowerName = canonicalEnvKey(name);
      if (!weatherOptions[lowerName] && !discovered[lowerName]) {
        discovered[lowerName] = {
          emoji: '',
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
  
  oldPhase = canonicalEnvKey(oldPhase);
  newPhase = canonicalEnvKey(newPhase);
  
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
        let lowerName = canonicalEnvKey(name);
        oldWeathers.add(lowerName);
      }
    }
  }
  
  if (newW.weathers) {
    for (const [name, info] of Object.entries(newW.weathers)) {
      if (info.playing) {
        let lowerName = canonicalEnvKey(name);
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
    const phaseText = getLocalizedEnvName(phaseKey, phaseKey, weatherOptions[phaseKey]) || t[phaseTranslationKey] || phaseKey;
    title = currentLang === 'ru' ? '🌍 Изменение времени/луны' : '🌍 Time/Moon Phase Change';
    body = currentLang === 'ru' ? `Началась фаза: ${phaseText}` : `New phase started: ${phaseText}`;
  } else if (weatherName) {
    const optKey = canonicalEnvKey(weatherName);
    const opt = weatherOptions[optKey];
    const localizedName = opt ? getLocalizedEnvName(optKey, weatherName, opt) : weatherName;
    title = currentLang === 'ru' ? '🌧️ Изменение погоды' : '🌧️ Weather Change';
    body = currentLang === 'ru' ? `Началась погода: ${localizedName}` : `New weather active: ${localizedName}`;
  }
  
  const options = {
    body: body,
    icon: '/new.png',
    badge: '/new.png',
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
    
    // Determine translation
    let displayName = item.name;
    let emoji = '';
    
    if (isWeather) {
      const optKey = canonicalEnvKey(item.name);
      const opt = weatherOptions[optKey];
      if (opt) {
        displayName = getLocalizedEnvName(optKey, item.name, opt);
      }
    } else {
      displayName = translateItemName(item.name);
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
      const optKey = canonicalEnvKey(item.name);
      
      // Look up live Roblox asset ID if currently active
      let liveAssetId = null;
      if (stockData && stockData.weather) {
        const w = stockData.weather;
        if (w.phase && canonicalEnvKey(w.phase) === optKey) {
          liveAssetId = w.phaseImage;
        } else if (w.weathers) {
          for (const [wName, wInfo] of Object.entries(w.weathers)) {
            if (canonicalEnvKey(wName) === optKey && wInfo.playing) {
              liveAssetId = wInfo.image;
              break;
            }
          }
        }
      }
      
      const srcUrl = weatherImageUrl(getWeatherPreferredImageRef(optKey, liveAssetId || item.image));
      
      if (srcUrl) {
        imgHtml = `
          <span class="pred-item-image-wrapper">
            <img src="${srcUrl}" alt="${displayName}" class="pred-item-image" onload="applyWeatherImageFilters(this, '${optKey}')" onerror="this.onerror=null; this.style.display='none';">
          </span>
        `;
      } else {
        imgHtml = `
          <span class="pred-item-image-wrapper"></span>
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
cleanMojibakeFallbackText();
document.body.classList.add('i18n-ready');
fetchData();
fetchPredictions();
fetchCalculatorData();
setInterval(fetchCalculatorData, 60 * 1000);

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
          if (data.stock.auction) {
            auctionData = data.stock.auction;
          }
          updateItemImageCache(stockData);
          updateWeatherIconCache(stockData);
          
          updateUsersOnlineUI(data.stock.visitorCount);
          renderDashboard();
        }
        if (data.predictions) {
          predictionData = data.predictions;
          renderPredictions();
        }
        if (data.auction) {
          auctionData = data.auction;
          renderAuction();
        }
        if (data.calculatorData) {
          calculatorData = data.calculatorData;
          renderCalculator();
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
          if (data.stock.auction) {
            auctionData = data.stock.auction;
          }
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
      } else if (data.type === 'auction') {
        if (data.auction) {
          auctionData = data.auction;
          renderAuction();
        }
      } else if (data.type === 'calculator-data') {
        if (data.calculatorData) {
          calculatorData = data.calculatorData;
          renderCalculator();
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
    const optKey = canonicalEnvKey(name);
    const opt = weatherOptions[optKey];
    if (opt) {
      displayName = getLocalizedEnvName(optKey, name, opt);
    }
    title = currentLang === 'ru' ? '🔔 Событие началось!' : '🔔 Event Started!';
    body = currentLang === 'ru' ? `Событие "${displayName}" началось прямо сейчас!` : `Event "${displayName}" has started right now!`;
  } else {
    displayName = translateItemName(name);
    title = currentLang === 'ru' ? '🔔 Предсказание началось!' : '🔔 Prediction Started!';
    body = currentLang === 'ru' ? `Предмет "${displayName}" должен появиться в продаже прямо сейчас!` : `Item "${displayName}" is expected to be in stock right now!`;
  }

  const options = {
    body: body,
    icon: '/new.png',
    badge: '/new.png',
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
  updateAuctionTimers();
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
