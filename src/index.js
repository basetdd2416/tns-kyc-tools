require('dotenv').config();

const fs = require('fs');
const path = require('path');
const crypto = require('./crypto'); 

const inputEncryptDir = path.resolve(__dirname, 'encryptions','input');
const outputEncryptDir = path.resolve(__dirname, 'encryptions','output');
const inputDecryptDir = path.resolve(__dirname, 'decryptions','input');
const outDecryptDir = path.resolve(__dirname, 'decryptions','output');

const extFilter = 'gitkeep';

function extension(element) {
  var extName = path.extname(element);
  return extName === '.json' 
};

function extensionD(element) {
  var extName = path.extname(element);
  return extName === '.txt' 
};


fs.readdirSync(inputEncryptDir).filter(extension).forEach(file => {
  try {
    const pathToFile = path.resolve(inputEncryptDir, file);
    const jsonData = fs.readFileSync(pathToFile, 'utf8')
    const jsObject = JSON.parse(jsonData);
    const obj = JSON.stringify(jsObject);
    const encryptedData = crypto.encrypt(obj);
    const decryptedData = JSON.stringify(JSON.parse(crypto.decrypt(encryptedData)), null ,2)
    const fileNameOutput = path.basename(file, path.extname(file))
    const pathToOutputEncrypedFile = `${outputEncryptDir}/${fileNameOutput}.encrypted `;
    const pathToOutputDecrypedFile = `${outputEncryptDir}/${fileNameOutput}.decrypted `;
    fs.writeFileSync(pathToOutputEncrypedFile, encryptedData);
    fs.writeFileSync(pathToOutputDecrypedFile, decryptedData);
    // write file go.
  } catch(e) {
    console.log(e);
  }
});

fs.readdirSync(inputDecryptDir).filter(extensionD).forEach(file => {
  try {
    const pathToFile = path.resolve(inputDecryptDir, file);
    const data = fs.readFileSync(pathToFile, 'utf8')
    const decryptedData = JSON.stringify(JSON.parse(crypto.decrypt(data)), null ,2)
    const fileNameOutput = path.basename(file, path.extname(file))
    const pathToOutputDecrypedFile = `${outDecryptDir}/${fileNameOutput}.decrypted `;
    fs.writeFileSync(pathToOutputDecrypedFile, decryptedData);
    // write file go.
  } catch(e) {
    console.log(e);
  }
});


