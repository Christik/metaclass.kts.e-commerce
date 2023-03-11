module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', {'runtime': 'automatic'}],
      '@babel/preset-typescript',
      'babel-preset-mobx',
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
    ],
  }
}
