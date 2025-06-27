const fs = require('fs');
const { Collection } = require('discord.js');

function loadCommands(bot) {
  bot.commands = new Collection();
  bot.slashCommands = new Collection();

  fs.readdirSync('./modules/commands').forEach(file => {
    const command = require(`../modules/commands/${file}`);
    bot.commands.set(command.name, command);
  });

  fs.readdirSync('./modules/commands_noprefix').forEach(file => {
    const command = require(`../modules/commands_noprefix/${file}`);
    bot.slashCommands.set(command.name, command);
  });
}

module.exports = loadCommands;
