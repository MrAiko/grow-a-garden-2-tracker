require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Telegraf } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 3000;
const API_PASSWORD = process.env.API_PASSWORD || 'test_password';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SUBSCRIBED_CHATS_FILE = path.join(__dirname, process.env.SUBSCRIBED_CHATS_FILE || 'subscribed_chats.json');
const STOCK_DATA_FILE = path.join(__dirname, process.env.STOCK_DATA_FILE || 'stock_data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cache in-memory
let currentStock = null;
let subscribedChats = {};

// Load Subscribed Chats
try {
  if (fs.existsSync(SUBSCRIBED_CHATS_FILE)) {
    subscribedChats = JSON.parse(fs.readFileSync(SUBSCRIBED_CHATS_FILE, 'utf8'));
  }
} catch (err) {
  console.error('Error loading subscribed chats:', err);
}

// Load Stock Data
try {
  if (fs.existsSync(STOCK_DATA_FILE)) {
    currentStock = JSON.parse(fs.readFileSync(STOCK_DATA_FILE, 'utf8'));
  }
} catch (err) {
  console.error('Error loading stock data:', err);
}

// Save Subscribed Chats
function saveSubscribedChats() {
  try {
    fs.writeFileSync(SUBSCRIBED_CHATS_FILE, JSON.stringify(subscribedChats, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving subscribed chats:', err);
  }
}

// Save Stock Data
function saveStockData() {
  try {
    fs.writeFileSync(STOCK_DATA_FILE, JSON.stringify(currentStock, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving stock data:', err);
  }
}

// Telegram Bot Setup
let bot = null;
if (BOT_TOKEN && BOT_TOKEN !== 'YOUR_BOT_TOKEN') {
  bot = new Telegraf(BOT_TOKEN);
  
  // Welcome Command
  bot.start((ctx) => {
    ctx.replyWithMarkdown(
      `👋 *Привет! Я бот оповещений для Grow a Garden 2.*\n\n` +
      `Я могу сообщать о завозах в магазинах и появлении редких предметов.\n\n` +
      `*Команды:*\n` +
      `📢 /subscribe - Подписаться на ВСЕ обновления стока\n` +
      `💎 /subscribe_rare - Подписаться ТОЛЬКО на редкие вещи (Epic, Legendary, Secret, Exotic)\n` +
      `❌ /unsubscribe - Отписаться от уведомлений\n` +
      `📦 /stock - Показать текущий сток в игре\n\n` +
      `*Как подключить к каналу или группе:*\n` +
      `1. Добавь меня в администраторы группы или канала.\n` +
      `2. Отправь команду /subscribe или /subscribe_rare прямо в группу/канал.\n` +
      `3. Я автоматически настрою подписку и удалю сообщение команды.`
    );
  });

  // Subscribe Command
  bot.command('subscribe', (ctx) => {
    const chatId = ctx.chat.id.toString();
    const chatTitle = ctx.chat.title || ctx.chat.username || ctx.chat.first_name || 'Chat';
    subscribedChats[chatId] = { type: 'all', title: chatTitle };
    saveSubscribedChats();
    ctx.reply(`✅ Успешно! Этот чат подписан на ВСЕ обновления стоков.`);
  });

  // Subscribe Rare Command
  bot.command('subscribe_rare', (ctx) => {
    const chatId = ctx.chat.id.toString();
    const chatTitle = ctx.chat.title || ctx.chat.username || ctx.chat.first_name || 'Chat';
    subscribedChats[chatId] = { type: 'rare', title: chatTitle };
    saveSubscribedChats();
    ctx.reply(`💎 Успешно! Этот чат подписан ТОЛЬКО на редкие товары.`);
  });

  // Unsubscribe Command
  bot.command('unsubscribe', (ctx) => {
    const chatId = ctx.chat.id.toString();
    if (subscribedChats[chatId]) {
      delete subscribedChats[chatId];
      saveSubscribedChats();
      ctx.reply(`❌ Этот чат отписан от уведомлений.`);
    } else {
      ctx.reply(`⚠️ Этот чат не был подписан.`);
    }
  });

  // Manual Stock Command
  bot.command('stock', (ctx) => {
    if (!currentStock) {
      return ctx.reply(`📭 Данные о стоках пока не получены от Roblox-бота.`);
    }
    const message = buildStockMessage(currentStock, 'all');
    ctx.replyWithMarkdown(message);
  });

  // Channel Command Parsing support (for messages sent in channels)
  bot.on('channel_post', async (ctx) => {
    const text = ctx.channelPost.text;
    const chatId = ctx.chat.id.toString();
    const channelTitle = ctx.chat.title || 'Channel';

    if (text === '/subscribe' || text === '/subscribe@' + ctx.botInfo.username) {
      subscribedChats[chatId] = { type: 'all', title: channelTitle };
      saveSubscribedChats();
      try {
        await ctx.reply(`✅ Этот канал успешно подписан на все обновления стоков.`);
        await ctx.deleteMessage();
      } catch (e) {
        console.error(e);
      }
    } else if (text === '/subscribe_rare' || text === '/subscribe_rare@' + ctx.botInfo.username) {
      subscribedChats[chatId] = { type: 'rare', title: channelTitle };
      saveSubscribedChats();
      try {
        await ctx.reply(`💎 Этот канал успешно подписан только на редкие товары.`);
        await ctx.deleteMessage();
      } catch (e) {
        console.error(e);
      }
    } else if (text === '/unsubscribe' || text === '/unsubscribe@' + ctx.botInfo.username) {
      if (subscribedChats[chatId]) {
        delete subscribedChats[chatId];
        saveSubscribedChats();
        try {
          await ctx.reply(`❌ Этот канал отписан от уведомлений.`);
          await ctx.deleteMessage();
        } catch (e) {
          console.error(e);
        }
      }
    }
  });

  // Custom Subscribe Channel from PM
  bot.command('subscribe_channel', async (ctx) => {
    const args = ctx.message.text.split(' ');
    if (args.length < 2) {
      return ctx.reply(`⚠️ Использование: /subscribe_channel <@username_канала_или_ID> [all/rare]`);
    }
    const channelTarget = args[1];
    const mode = args[2] === 'rare' ? 'rare' : 'all';

    try {
      const chatMember = await ctx.telegram.getChat(channelTarget);
      const chatId = chatMember.id.toString();
      subscribedChats[chatId] = { type: mode, title: chatMember.title || channelTarget };
      saveSubscribedChats();
      ctx.reply(`✅ Канал ${chatMember.title || channelTarget} подписан на обновления (${mode === 'rare' ? 'Только редкие' : 'Все'}).`);
    } catch (err) {
      ctx.reply(`❌ Не удалось найти канал или получить доступ. Убедись, что бот добавлен в администраторы канала: ${err.message}`);
    }
  });

  bot.launch()
    .then(() => console.log('Telegram Bot started successfully!'))
    .catch((err) => console.error('Telegram Bot failed to start:', err));

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
} else {
  console.warn('TELEGRAM_BOT_TOKEN is not set or placeholder. Telegram Bot is disabled.');
}

// Function to construct the Telegram text notification
function buildStockMessage(data, type = 'all') {
  let msg = `⏰ *ОБНОВЛЕНИЕ СТОКА В GAME!*\n\n`;
  let hasRareItems = false;
  let rareSections = [];

  const shopNames = {
    CrateShop: '📦 Магазин ящиков (Crate Shop)',
    GearShop: '⚙️ Магазин снаряжения (Gear Shop)',
    SeedShop_Normal: '🌱 Обычные семена (Normal Seeds)',
    SeedShop_Exclusive: '✨ Эксклюзивные семена (Exclusive Seeds)'
  };

  const rareRarities = ['epic', 'legendary', 'secret', 'exotic', 'super', 'mythic', 'divine'];

  for (const [key, displayName] of Object.entries(shopNames)) {
    const items = data.shops[key] || [];
    if (items.length === 0) continue;

    let sectionText = `*${displayName}:*\n`;
    let itemsAdded = 0;

    for (const item of items) {
      const isRare = rareRarities.includes(item.rarity.toLowerCase());
      const inStock = item.stock > 0;
      
      if (isRare && inStock) {
        hasRareItems = true;
      }

      // If subscriber is "rare", skip non-rare items or out of stock items
      if (type === 'rare' && (!isRare || !inStock)) {
        continue;
      }

      let rarityEmoji = '⚪';
      if (item.rarity.toLowerCase() === 'rare') rarityEmoji = '🔵';
      else if (item.rarity.toLowerCase() === 'epic') rarityEmoji = '🟣';
      else if (item.rarity.toLowerCase() === 'legendary') rarityEmoji = '🟡';
      else if (['secret', 'exotic', 'super', 'mythic', 'divine'].includes(item.rarity.toLowerCase())) rarityEmoji = '🔥';

      const stockEmoji = inStock ? `🟢 ${item.stock} шт.` : `🔴 НЕТ`;
      sectionText += `${rarityEmoji} *${item.name}* [${item.rarity}] — ${stockEmoji} | 🏷️ ${item.price}\n`;
      itemsAdded++;
    }

    if (itemsAdded > 0) {
      rareSections.push(sectionText);
    }
  }

  if (type === 'rare' && !hasRareItems) {
    return null; // Return null so we don't spam rare chats if there's nothing rare
  }

  msg += rareSections.join('\n');
  msg += `\n🔗 [Зайти в игру](https://www.roblox.com/games/grow-a-garden-2)`;
  return msg;
}

// Function to notify subscribers
function notifySubscribers(data, isRestockTimeUpdated) {
  if (!bot) return;

  const allMessage = buildStockMessage(data, 'all');
  const rareMessage = buildStockMessage(data, 'rare');

  for (const [chatId, config] of Object.entries(subscribedChats)) {
    try {
      // If it's a restock time update, or we just want to send updates:
      if (config.type === 'rare' && rareMessage) {
        bot.telegram.sendMessage(chatId, rareMessage, { parse_mode: 'Markdown', disable_web_page_preview: true })
          .catch(err => console.error(`Failed to send message to ${chatId}:`, err.message));
      } else if (config.type === 'all' && allMessage && isRestockTimeUpdated) {
        bot.telegram.sendMessage(chatId, allMessage, { parse_mode: 'Markdown', disable_web_page_preview: true })
          .catch(err => console.error(`Failed to send message to ${chatId}:`, err.message));
      }
    } catch (err) {
      console.error(`Error sending to chat ${chatId}:`, err);
    }
  }
}

// API Routes
app.get('/api/stock', (req, res) => {
  if (!currentStock) {
    return res.status(404).json({ error: 'No stock data available yet' });
  }
  res.json(currentStock);
});

app.post('/api/update-stock', (req, res) => {
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
    // If next restock timestamp has changed for any of the shops, it's a new restock!
    for (const shopKey of Object.keys(newStock.restockTimes || {})) {
      const oldNext = currentStock.restockTimes[shopKey] ? currentStock.restockTimes[shopKey].next : 0;
      const newNext = newStock.restockTimes[shopKey] ? newStock.restockTimes[shopKey].next : 0;
      if (newNext !== oldNext && newNext > 0) {
        isRestockTimeUpdated = true;
        break;
      }
    }
  } else {
    // If no previous stock data, treat it as an initial update but notify subscribers
    isRestockTimeUpdated = true;
  }

  currentStock = {
    restockTimes: newStock.restockTimes,
    shops: newStock.shops,
    updatedAt: Date.now()
  };

  saveStockData();

  // Trigger Notifications
  notifySubscribers(currentStock, isRestockTimeUpdated);

  res.json({ success: true, isRestockTimeUpdated });
});

// Serve web app status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    botConnected: !!bot,
    botUsername: bot && bot.botInfo ? bot.botInfo.username : null,
    subscribersCount: Object.keys(subscribedChats).length,
    lastUpdated: currentStock ? currentStock.updatedAt : null
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
