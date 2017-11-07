module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-empty-function": ["error", { "allow": ["arrowFunctions"] }],
    "no-unused-expressions": "error",
    "callback-return": "error",
    "block-spacing": "error",
    "brace-style": "error",
    "camelcase": ["error", { properties: "never" }],
    "capitalized-comments": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error", "always"],
    "func-call-spacing": ["error", "never"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "keyword-spacing": ["error", { "before": true }],
    "max-len": ["error", 130],
    "multiline-ternary": ["error", "never"],
    "newline-before-return": "error",
    "no-tabs": "error",
    "no-trailing-spaces": "error",
    "quotes": ["error", "single"],
    "nonblock-statement-body-position": ["error", "below"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
};
