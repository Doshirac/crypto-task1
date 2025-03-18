const { getSHA256Hash } = require("./getSHA256Hash");

function findMatchingKey(keys, targetHash) {
  for (const key of keys) {
    if (getSHA256Hash(key) === targetHash) {
      return key;
    }
  }
  return null;
}

module.exports = { findMatchingKey };
