const crypto = require('crypto');
const key = 'vN8$B7p!xTqz2RfLcJwM1He@9YlG3KDu';

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'utf8'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = Buffer.from(parts[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'utf8'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = { encrypt, decrypt };
