module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'no-console': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'max-len': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-relative-packages': 0,
  },
};
