const crypto = require("crypto");

function signMessage(message, privateKey) {
  const sign = crypto.createSign("SHA256");
  sign.update(message);
  sign.end();
  return sign.sign(privateKey, "hex");
}

module.exports = { signMessage };
