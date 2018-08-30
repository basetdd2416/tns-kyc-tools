require('dotenv').config();

const fs = require('fs');
const path = require('path');
const crypto = require('./crypto'); 

const inputDir = path.resolve(__dirname, 'input');
const outputDir = path.resolve(__dirname, 'output');

const extFilter = 'gitkeep';

function extension(element) {
  var extName = path.extname(element);
  return extName === '.json' 
};


fs.readdirSync(inputDir).filter(extension).forEach(file => {
  try {
    const pathToFile = path.resolve(inputDir, file);
    const jsonData = fs.readFileSync(pathToFile, 'utf8')
    const jsObject = JSON.parse(jsonData);
    const obj = JSON.stringify(jsObject);
    const encryptedData = crypto.encrypt(obj);
    const decryptedData = JSON.stringify(JSON.parse(crypto.decrypt(encryptedData)), null ,2)
    const fileNameOutput = path.basename(file, path.extname(file))
    const pathToOutputEncrypedFile = `${outputDir}/${fileNameOutput}.encrypted `;
    const pathToOutputDecrypedFile = `${outputDir}/${fileNameOutput}.decrypted `;
    fs.writeFileSync(pathToOutputEncrypedFile, encryptedData);
    fs.writeFileSync(pathToOutputDecrypedFile, decryptedData);
    // write file go.
  } catch(e) {
    console.log(e);
  }
});

