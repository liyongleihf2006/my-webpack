var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 10 });
module.exports = {
    module:{
       /* dll文件不需要解析 */
       noParse: /dll/,
       rules:[{
            test:/\.html$/,
            use:'happypack/loader?id=html',
            include:path.join(__dirname, 'app')
        },{
           test:/\.js$/,
           use:'happypack/loader?id=js',
           include:path.join(__dirname, 'app')
        },{
           test:/\.css$/,
           use:ExtractTextPlugin.extract({
               fallback:"style-loader",
               use:'happypack/loader?id=css'
           }),
           include:path.join(__dirname, 'app')
        },{
            test: /\.(png|jpg|gif|tiff|bmp|psd)$/,
            use: {
                //据说happypack对图片支持有问题,所以这里不使用happypack
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[path][name].[hash:4].[ext]'
                }
            },
            include:[path.join(__dirname, '/app')]
        },{
            test: /\.(svg|woff2|ttf|eot|woff)$/,
            use: {
                //据说happypack对文件类型支持有问题,所以这里不使用happypack
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash:4].[ext]'
                }
            },
            include:[path.join(__dirname, '/app')]
        },{
            test: /\.(mp3|mp4|wav|wma|ogg|wmv|avi|mpg|rm|rmvb|mov|dat|vob|flv|3gp)$/,
            use: {
                //据说happypack对文件类型支持有问题,所以这里不使用happypack
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash:4].[ext]'
                }
            },
            include:[path.join(__dirname, '/app')]
        },{
            test: /\.json$/,
            loader: 'json-loader',
            include:[path.join(__dirname, '/app')]
        }]
    },
    externals: {
        jQuery: 'jQuery'
    },
    plugins: [
        new ManifestPlugin(),
        //多入口文件的时候使用:用来将公用的chunk提取到同一个文件中
        /* new webpack.optimize.CommonsChunkPlugin({
            name:"common"
        }), */
        new HtmlWebpackPlugin({
            template:__dirname+"/app/index.html",
            /*  让dll始终排在第一位 */
            chunksSortMode:function(chunk1){
                return chunk1.names[0]!=='dll';
            }
        }),
        new ExtractTextPlugin({
            filename:"[name].[contenthash:4].css"
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.join('dll','manifest.json'),
        }),
        new HappyPack({
            id: 'html',
            threadPool: happyThreadPool,
            loaders: [{
                loader:"html-loader",
                options:{
                    attrs: ['img:src', 'link:href','script:src','audio:src'],
                },
            }]
        }),
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: 'css',
            threadPool: happyThreadPool,
            loaders: [{
                loader:"css-loader",
                options: {
                    sourceMap: true
                }
            },{
                loader:"postcss-loader"
            }]
        })
    ]
}