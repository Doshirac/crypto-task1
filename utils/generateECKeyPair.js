const crypto = require("crypto");

function generateECKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      "ec",
      {
        namedCurve: "prime256v1",
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          return reject(err);
        }
        resolve({ publicKey, privateKey });
      }
    );
  });
}

module.exports = { generateECKeyPair };
