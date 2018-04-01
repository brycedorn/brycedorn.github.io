'use strict'

var Path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  PROD = true

var webpackConfig = module.exports = {
  entry: './client/scripts/index.js',
  output: {
    path: Path.resolve(__dirname, '../public/assets'),
    publicPath: 'assets/',
    filename: (PROD ? '[hash].js' : 'bundle.js')
  },
  module: {
    loaders: [
      { test: /\.js(x?)$/, loaders: ['jsx-loader?harmony', 'babel-loader?stage=0'] },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader?root=../' },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'svg-inline-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: '../index.html',
      favicon: './client/img/sauropod.png'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(PROD ? 'production' : 'development')
    }),
    new UglifyJSPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ]
}