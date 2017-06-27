var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/pureMasonry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pureMasonry.js',
    libraryTarget: 'var',
    library: 'PureMasonry'
  },
  module: {
    loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
        }
      }
    ]
  },
  cache: false,
  stats: {
    colors: true
  },
  devtool: 'source-map'
};