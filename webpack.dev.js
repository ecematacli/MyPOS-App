const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    inline: true,
    hot: true
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
