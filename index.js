const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, prefix } = require('./config.json');
const config1 = require('./config1.json');
const { encrypt, decrypt } = require('./utils/crypto');
const loadCommands = require('./utils/loadCommands');
const setupMessageHandler = require('./utils/messageHandler');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const childBots = {};
client.commands = new Collection();
client.slashCommands = new Collection();
loadCommands(client);

function startSubBot(userId, token) {
  if (childBots[userId]) return;

  const { Client, GatewayIntentBits, Collection } = require('discord.js');
  const subBot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  subBot.commands = new Collection();
  subBot.slashCommands = new Collection();
  loadCommands(subBot);
  setupMessageHandler(subBot, { prefix, config1, encrypt, decrypt, startSubBot, stopSubBot, childBots });

  subBot.on('ready', () => {
    console.log(`Sub-bot của ${userId} đang chạy dưới tên ${subBot.user.tag}`);
  });

  subBot.login(token).catch(err => {
    console.error(`Lỗi khi login bot phụ của ${userId}:`, err.message);
  });

  childBots[userId] = subBot;
}

function stopSubBot(userId) {
  if (!childBots[userId]) return false;
  childBots[userId].destroy();
  delete childBots[userId];
  return true;
}

setupMessageHandler(client, { prefix, config1, encrypt, decrypt, startSubBot, stopSubBot, childBots });
client.login(token);
