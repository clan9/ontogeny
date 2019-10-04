module.exports = {
  extends: "airbnb-base",
  rules: {
    "no-console": "off",
    "import/newline-after-import": "off",
    "no-multiple-empty-lines": "off",
    quotes: "off",
    "func-names": "off",
    "no-underscore-dangle": "off"
  },
  overrides: [
    {
      files: ["**/*.spec.js", "**/*.test.js"],
      env: {
        jest: true
      }
    }
  ]
};
