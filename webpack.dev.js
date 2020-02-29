const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/public',
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
