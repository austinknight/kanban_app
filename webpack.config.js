var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var env = process.env.WEBPACK_ENV;
var plugins = [];

plugins.push(new CopyWebpackPlugin([
  {from: './src/index.html'}
]));

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
}

var entryFile = './src/index.js';

var config = {
  entry: entryFile,
  devtool: 'eval-source-map',
  eslint: {
    configFile: './.eslintrc'
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: plugins
};

module.exports = config;
