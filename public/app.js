// State Management
let stockData = null;
let statusData = null;
let activeRarityFilter = 'all'; // 'all', 'rare+', 'epic+'
let activeStockFilter = false; // true/false
let searchQuery = '';

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
      stockData = await stockRes.json();
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
    card.className = `item-card ${rarityClass}`;

    const inStock = item.stock > 0;
    const stockHtml = inStock 
      ? `<span class="item-stock stock-in"><i class="fa-solid fa-circle-check"></i> ${item.stock} шт.</span>`
      : `<span class="item-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> Нет стока</span>`;

    card.innerHTML = `
      <div class="item-header">
        <h4 class="item-name" title="${item.name}">${item.name}</h4>
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

// Event Listeners for Filters
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderDashboard();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Rarity and Stock Buttons check
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

// Init and Loops
fetchData();
setInterval(fetchData, 5000); // Poll API data every 5 seconds
setInterval(updateTimers, 1000); // Tick timers every second
