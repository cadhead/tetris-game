module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  parser: 'babel-eslint',
  extends: 'airbnb-base/legacy',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
  }
};
