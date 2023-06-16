export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "2020",
    sourceType: "module",
  },
  rules: {
    "import/no-named-as-default-member": 0,
    "import/no-named-as-default": 0,
    "no-console": 0,
  },
};
