var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

var merge = require('webpack-merge');
var common = require('./webpack.common.config.js');
var outputFolder = "build";
var publicCSS = "css";
module.exports = merge(common, {
    devtool:"source-map",
    entry:{
        index: path.join(__dirname,"app","./index.js"),
        /* 键必须叫dll，原因是下面的HtmlWebpackPlugin对chunk排序时使用了这个叫做dll的键，并让这个键代表的chunk始终在第一位 */
        dll:path.join(__dirname,"dll","dll.js")
    },
    output:{
        path:path.join(__dirname,outputFolder),
        filename:"[name].[chunkhash:4].js",
        chunkFilename:'[name].[chunkhash:4].js'
        /* publicPath:"http://www.baidu.com/" */
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name:"[path][name].[hash:4].[ext]"
                        }
                    },
                    {
                        loader: "extract-loader-path-correction"
                    },
                    {
                        loader: 'css-loader'
                    }
                ],
                include:[path.join(__dirname, '/static'),path.join(__dirname, '/vender'),path.join(__dirname, '/bower_components')]
            },{
                test: function(content){
                    return !/\.css$/.test(content);
                },
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[hash:4].[ext]'
                        }
                    }
                ],
                include:[path.join(__dirname, '/static'),path.join(__dirname, '/vender'),path.join(__dirname, '/bower_components')]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname,outputFolder)]),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
        }),
        new webpack.BannerPlugin('没有版权,请任意使用'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        /* new UglifyJSPlugin({
            sourceMap: true
        }), */
        /* 
            压缩操作的时候所有的html css js json都进行gzip 
            所有的其他文件都不进行gzip压缩
            所以将来服务器端在向前端发送数据的时候,设置gzip的时候要根据文件后缀来决定
            发送的response header 的'Content-Encoding'是否值为'gzip',只有html
            css js json才会这样发送
            minRatio设置为非常大的值(1000)是为了让文件一定会被gzip
        */
        /* new CompressionPlugin({
            test:/\.(html|css|js|json)$/,
            deleteOriginalAssets:false,
            asset:"[file]",
            minRatio:1000
        }) */
    ]
})