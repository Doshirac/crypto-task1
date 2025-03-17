const CryptoJS = require("crypto-js");
const { decryptAES } = require("./decryptAES");

function recoverAESKey(ciphertextBase64, corruptedKeyHex) {
    for (let i = 0; i < 256; i++) {
      const testKeyHex = corruptedKeyHex.slice(0, -2) + i.toString(16).padStart(2, "0");
      const testKey = CryptoJS.enc.Hex.parse(testKeyHex);
  
      const decryptedText = decryptAES(ciphertextBase64, testKey);
      if (decryptedText && decryptedText.trim() !== "") {
        console.log("Recovered AES-128 Key:", testKeyHex);
        return testKeyHex;
      }
    }
    console.log("Key recovery failed!");
    return null;
}

module.exports = { recoverAESKey };
