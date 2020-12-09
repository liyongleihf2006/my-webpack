var path = require('path')
var fs = require('fs')
var dotenv = require('dotenv')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = env => {
  const envConfig = dotenv.parse(fs.readFileSync(`./.env.${env}`))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
  return {
    module: {
      rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href', 'script:src', 'audio:src']
          }
        }],
        include: path.join(__dirname, 'app')
      }, {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'app')
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader'
          }],
        include: path.join(__dirname, 'app')
      }, {
        test: /\.(png|jpg|gif|tiff|bmp|psd)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[path][name].[hash:4].[ext]'
          }
        },
        include: [path.join(__dirname, '/app')]
      }, {
        test: /\.(svg|woff2|ttf|eot|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash:4].[ext]'
          }
        },
        include: [path.join(__dirname, '/app')]
      }, {
        test: /\.(mp3|mp4|wav|wma|ogg|wmv|avi|mpg|rm|rmvb|mov|dat|vob|flv|3gp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash:4].[ext]'
          }
        },
        include: [path.join(__dirname, '/app')]
      }, {
        test: /\.json$/,
        loader: 'json-loader',
        include: [path.join(__dirname, '/app')]
      }]
    },
    externals: {
      jQuery: 'jQuery'
    },
    plugins: [
      new webpack.EnvironmentPlugin(Object.keys(envConfig)),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/app/index.html')
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash:4].css',
        chunkFilename: '[id].[contenthash:4].css'
      })
    ]
  }
}
