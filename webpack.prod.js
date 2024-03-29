const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => ({
  entry: __dirname + '/src/index.tsx',
  output: {
    filename: 'bundle.[contentHash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.png'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|svg|jpg|ico|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
      favicon: path.join(__dirname, 'src/assets/img/merit.png'),
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(env.API_URL),
    }),
    new CleanWebpackPlugin(),
  ],
  mode: 'production',
  devtool: 'none',
});
