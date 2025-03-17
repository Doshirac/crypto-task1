const CryptoJS = require("crypto-js");

function hashSHA256(data) {
    return CryptoJS.SHA256(data).toString();
}

module.exports = { hashSHA256 };
