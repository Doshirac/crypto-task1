const EC = require("elliptic").ec;
const fs = require("fs");
const { EC_CURVE } = require("../config");

function generateECKeys() {
    const ec = new EC(EC_CURVE);
    const keyPair = ec.genKeyPair();

    const publicKey = keyPair.getPublic("hex");
    const privateKey = keyPair.getPrivate("hex");

    fs.writeFileSync("messages/ec_public_key.txt", publicKey);
    fs.writeFileSync("messages/ec_private_key.txt", privateKey);

    return { keyPair, publicKey, privateKey };
}

module.exports = { generateECKeys };