const fs = require("fs");

function signMessage(message, keyPair) {
    const signature = keyPair.sign(message, "hex").toDER("hex");
    fs.writeFileSync("messages/signature.txt", signature);
    return signature;
}

module.exports = { signMessage };