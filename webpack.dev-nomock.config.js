var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var merge = require('webpack-merge');
var common = require('./webpack.common.config.js');
var outputFolder = "dist";
module.exports = merge(common, {
    devtool:"cheap-module-eval-source-map",//开发环境中最好的Devtool
    entry:{
        index: path.join(__dirname,"app","./index.js")
    },
    output:{
        path:path.join(__dirname,outputFolder),
        filename:"[name].[hash:4].js",
        chunkFilename:'[name].[hash:4].js'
    },
    mode:"development",
    module:{
        rules:[
            {
                test: /.*/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        publicPath:"../",
                        emitFile:false
                    }
                },
                include:[path.join(__dirname, 'static'),path.join(__dirname, 'vender'),path.join(__dirname, 'bower_components')]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname,outputFolder)]),
        new HtmlWebpackIncludeAssetsPlugin({ assets: [path.join("../dll","dll.js")],append:false}),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})