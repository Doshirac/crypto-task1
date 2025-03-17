const CryptoJS = require("crypto-js");

module.exports = {
    AES_KEY_SIZE: 16,
    AES_MODE: CryptoJS.mode.ECB,
    AES_PADDING: CryptoJS.pad.ZeroPadding,
    EC_CURVE: "secp256k1"
};
