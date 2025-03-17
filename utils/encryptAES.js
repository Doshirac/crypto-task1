const CryptoJS = require("crypto-js");
const fs = require("fs");
const { AES_MODE, AES_PADDING } = require("../config");

function encryptAES(plaintext, key) {
    const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(plaintext),
        key,
        { mode: AES_MODE, padding: AES_PADDING }
    );
    const ciphertextBase64 = encrypted.toString();
    fs.writeFileSync("messages/encrypted.txt", ciphertextBase64);
    return ciphertextBase64;
}

module.exports = { encryptAES };