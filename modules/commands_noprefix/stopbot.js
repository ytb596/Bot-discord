const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'stopbot',
  execute(message, args, { config1, stopSubBot }) {
    const userId = message.author.id;

    const stopped = stopSubBot(userId);
    if (!stopped) return message.reply('❌ Bạn chưa có bot phụ nào đang chạy.');

    delete config1.subbots[userId];
    fs.writeFileSync(path.join(__dirname, '../../config1.json'), JSON.stringify(config1, null, 2));
    message.reply('✅ Đã tắt bot phụ của bạn.');
  }
};
