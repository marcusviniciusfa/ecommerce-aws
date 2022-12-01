module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    "prettier/prettier": ["error"],
    'no-new': ['off'],
    '@typescript-eslint/no-useless-constructor': ['off'],
  }
}
