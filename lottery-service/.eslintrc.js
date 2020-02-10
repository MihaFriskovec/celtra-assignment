module.exports = {
  extends: ['airbnb'],
  env: {
    es6: true,
    mongo: true,
    node: true
  },
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 9,
    impliedStrict: true,
    sourceType: 'module'
  },
  rules: {
    semi: 'off',
    'comma-dangle': 'off'
  }
}
