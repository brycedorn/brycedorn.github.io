const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: devMode ? 'bundle.js' : '[name].[hash].js',
  },
  optimization: devMode ? {} : {
    minimizer: [new UglifyJsPlugin({
      cache: true,
      parallel: true,
      extractComments: 'all',
    })],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV_MODE: devMode,
    }),
    new HtmlWebpackPlugin({
      title: 'bryce.io',
      description: 'I write code.',
      image: 'https://www.bryce.io/assets/sauropod.png',
      url: 'https://bryce.io',
      template: 'src/index.html',
      favicon: 'src/img/sauropod.png'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin()
  ],
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    hot: true,
  },
};
