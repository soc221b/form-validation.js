module.exports = {
  env: {
    es6: true,
    "jest/globals": true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",

    "import/extensions": "off",

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",

    "no-underscore-dangle": "off",

    "comma-dangle": "error",
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ts", ".d.ts"]
      }
    }
  }
};
