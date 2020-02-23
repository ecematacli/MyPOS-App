const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.png']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /|.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg|ico)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /favicon\.png$/,
        use: 'file-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  plugins: []
};
