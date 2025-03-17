const CryptoJS = require("crypto-js");
const fs = require("fs");
const { generateAESKey } = require("./utils/generateAESKey");
const { encryptAES } = require("./utils/encryptAES");
const { decryptAES } = require("./utils/decryptAES");
const { recoverAESKey } = require("./utils/recoverAESKey");
const { generateECKeys } = require("./utils/generateECKeys");
const { signMessage } = require("./utils/signMessage");
const { hashSHA256 } = require("./utils/hashSHA256");

// Step 1: Generate and save AES key
const aesKey = generateAESKey();
console.log("Generated AES Key:", aesKey.toString(CryptoJS.enc.Hex));

// Step 2: Encrypt a message
const plaintext = fs.readFileSync("messages/plaintext.txt");
const ciphertextBase64 = encryptAES(plaintext, aesKey);
console.log("Encrypted (Base64):", ciphertextBase64);

// Step 3: Simulate corrupted key transmission (modify last hex digit)
const originalKeyHex = aesKey.toString(CryptoJS.enc.Hex);
const corruptedKeyHex = originalKeyHex.slice(0, -1) + "F";
console.log("Corrupted AES Key:", corruptedKeyHex);

// Step 4: Recover the AES key using the Base64 ciphertext
const recoveredKeyHex = recoverAESKey(ciphertextBase64, corruptedKeyHex);
if (!recoveredKeyHex) process.exit(1);

const recoveredKey = CryptoJS.enc.Hex.parse(recoveredKeyHex);
const decryptedText = decryptAES(ciphertextBase64, recoveredKey);
console.log("Decrypted Text:", decryptedText);

// Step 5: Generate EC key pair
const { keyPair, publicKey, privateKey } = generateECKeys();
console.log("Generated EC Public Key:", publicKey);
console.log("Generated EC Private Key:", privateKey);

// Step 6: Sign the original plaintext message (using its SHA-256 hash)
const messageHash = hashSHA256(plaintext);
const signature = signMessage(messageHash, keyPair);
console.log("Digital Signature:", signature);
