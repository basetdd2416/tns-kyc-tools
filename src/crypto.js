const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secret = process.env.SECRECT;
const iv = process.env.IV;

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secret, iv);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv(algorithm, secret, iv);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  encrypt,
  decrypt
};
