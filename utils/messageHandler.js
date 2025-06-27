module.exports = (bot, { prefix, config1, encrypt, decrypt, startSubBot, stopSubBot, childBots }) => {
  bot.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const cmd = args.shift().toLowerCase();
      const command = bot.commands.get(cmd);
      if (command) command.execute(message, args);
    }

    if (message.content.startsWith('/')) {
      const cmdName = message.content.split(' ')[0].slice(1).toLowerCase();
      const args = message.content.split(' ').slice(1);
      const command = bot.slashCommands.get(cmdName);
      if (command) {
        message.delete().catch(() => {});
        command.execute(message, args, { config1, encrypt, decrypt, startSubBot, stopSubBot, childBots });
      }
    }
  });
};
