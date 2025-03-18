const crypto = require("crypto");

function getSHA256Hash(keyHex) {
  return crypto
    .createHash("sha256")
    .update(Buffer.from(keyHex, "hex"))
    .digest("hex");
}

module.exports = { getSHA256Hash };
