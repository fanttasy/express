const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.ts',
  output: {
    filename: "bundle.js"
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
