module.exports = {
  plugins: [
    [
      'styled-components',
      {
        displayName: process.env.NODE_ENV === 'development',
        preprocess: false,
      },
    ],
    // support async/await
    '@babel/plugin-transform-runtime',
  ],
}
