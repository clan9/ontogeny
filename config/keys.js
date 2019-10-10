// figure out which set of keys to return
const prodKeys = require("./prod");
const testKeys = require("./Test");
const devKeys = require("./dev");

if (process.env.NODE_ENV === "production") {
  module.exports = prodKeys;
} else if (process.env.NODE_ENV === "test") {
  module.exports = testKeys;
} else {
  module.exports = devKeys;
}
