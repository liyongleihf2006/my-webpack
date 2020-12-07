var path = require('path')
var webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var merge = require('webpack-merge')
var common = require('./webpack.common.config.js')
var outputFolder = 'dist'
module.exports = merge(common, {
  devtool: 'source-map', // 开发环境中最好的Devtool
  entry: {
    index: path.join(__dirname, 'app', './index.js')
  },
  output: {
    path: path.join(__dirname, outputFolder),
    filename: '[name].[hash:4].js',
    chunkFilename: '[name].[hash:4].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.*/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '../',
            emitFile: false
          }
        },
        include: [path.join(__dirname, 'static'), path.join(__dirname, 'vender')]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, outputFolder)]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin()
  ]
})
