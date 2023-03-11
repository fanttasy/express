const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.ts',
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  module: {
    rules:[
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader'
      }
    ]
  }
}
