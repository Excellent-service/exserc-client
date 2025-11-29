// eslint.config.js
import next from "eslint-config-next";

export default [
  ...next(),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];