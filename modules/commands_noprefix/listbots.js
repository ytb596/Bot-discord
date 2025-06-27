module.exports = {
  name: 'listbots',
  execute(message, args, { childBots }) {
    const bots = Object.entries(childBots);
    if (bots.length === 0) return message.reply('❌ Không có bot phụ nào đang chạy.');
    const list = bots.map(([id, bot]) => `👤 <@${id}> — ${bot.user?.tag || 'đang khởi động...'}`).join('\n');
    message.reply(`📋 Danh sách bot phụ đang chạy:\n${list}`);
  }
};
