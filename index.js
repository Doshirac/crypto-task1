const fs = require("fs").promises;
const path = require("path");
const { findMatchingKey } = require("./utils/findMatchingKey");
const { decryptAES128 } = require("./utils/decryptAES128");
const { generateECKeyPair } = require("./utils/generateECKeyPair");
const { signMessage } = require("./utils/signMessage");

async function main() {
  try {
    // Read keys from file
    const keysData = await fs.readFile(
      path.join(__dirname, "data", "keys.txt"),
      "utf8"
    );
    const keys = keysData.trim().split("\n");

    // Read target hash
    const targetHash = await fs.readFile(
      path.join(__dirname, "data", "target-hash.txt"),
      "utf8"
    );

    // Read encrypted data
    const encryptedData = await fs.readFile(
      path.join(__dirname, "data", "encrypted-data.txt"),
      "utf8"
    );
    const encryptedConfig = Object.fromEntries(
      encryptedData.split("\n").map((line) => line.split("="))
    );

    // Step 2: Find the correct symmetric key
    const correctKey = findMatchingKey(keys, targetHash.trim());
    if (!correctKey) {
      console.error("No matching symmetric key found.");
      process.exit(1);
    }
    console.log("Correct symmetric key found:", correctKey);

    // Step 3: Decrypt the message using the correct key
    const decryptedMessage = decryptAES128(
      encryptedConfig.message,
      correctKey,
      encryptedConfig.iv
    );
    console.log("Decrypted message:", decryptedMessage);

    // Step 4: Generate EC key pair and sign the message
    const { publicKey, privateKey } = await generateECKeyPair();
    console.log("EC Public Key:\n", publicKey);
    console.log("EC Private Key:\n", privateKey);

    // Sign the decrypted message
    const signature = signMessage(decryptedMessage, privateKey);
    console.log("Digital signature (hex):", signature);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
