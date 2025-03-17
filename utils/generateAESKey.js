const CryptoJS = require("crypto-js");
const fs = require("fs");
const { AES_KEY_SIZE } = require("../config");

function generateAESKey() {
    const key = CryptoJS.lib.WordArray.random(AES_KEY_SIZE);
    fs.writeFileSync("messages/aes_key.txt", key.toString(CryptoJS.enc.Hex));
    return key;
}

module.exports = { generateAESKey };