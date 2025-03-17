const CryptoJS = require("crypto-js");
const fs = require("fs");
const { AES_MODE, AES_PADDING } = require("../config");

function decryptAES(ciphertextBase64, key) {
    try {
      const decrypted = CryptoJS.AES.decrypt(
        ciphertextBase64,
        key,
        { mode: AES_MODE, padding: AES_PADDING }
      );
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (decryptedText && decryptedText.trim() !== "") {
        fs.writeFileSync("messages/decrypted.txt", decryptedText);
      }
      return decryptedText;
    } catch (error) {
      return "";
    }
}

module.exports = { decryptAES };
