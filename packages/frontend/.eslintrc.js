module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-tabs': 'error', //          AAAAA     FFFF
    camelcase: 'error', // dOn_Ot_even_TRY
    'no-console': 'warn', // console.log("hell naw")
    'no-extra-semi': 'error', // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off' //  this is useful but I WONT TYPE THOSE HOOK FUNCTIONS
  }
}
