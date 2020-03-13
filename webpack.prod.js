const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => ({
  entry: __dirname + '/src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.png']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|svg|jpg|ico|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs'
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html'
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(env.API_URL)
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'production',
  output: {
    filename: 'bundle.[contentHash].js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'none'
});
