// webpack.config.js
const Dotenv = require('dotenv-webpack')

module.exports = {
  plugins: [
    new Dotenv({ systemvars: true }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
}
