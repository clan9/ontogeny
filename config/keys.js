// figure out which set of keys to return
// const prodKeys = require("./prod");
// const testKeys = require("./Test");
// const devKeys = require("./dev");

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./Test");
} else {
  module.exports = require("./dev");
}
