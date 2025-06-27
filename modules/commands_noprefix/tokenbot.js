const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'tokenbot',
  execute(message, args, { config1, encrypt, startSubBot }) {
    const userId = message.author.id;
    const token = args[0];

    if (!token) return message.reply('Vui lòng cung cấp token của bot phụ.');

    const encryptedToken = encrypt(token);
    config1.subbots[userId] = encryptedToken;
    fs.writeFileSync(path.join(__dirname, '../../config1.json'), JSON.stringify(config1, null, 2));
    startSubBot(userId, token);
    message.reply('✅ Đã khởi động bot phụ cho bạn.');
  }
};
