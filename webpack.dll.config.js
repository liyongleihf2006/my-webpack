const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const library = "dll";
module.exports = {
    output: {
        path: path.join(__dirname,'dll'),
        filename: '[name].js',
        libraryTarget:'umd',
        library:library,
    },
    entry: {
        dll: ['mobx','lodash','axios'],
    },
    mode:"development",
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname,"dll")]),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll','manifest.json'),
            // This must match the output.library option above
            name: "window."+library,
            //这里的context要设置的跟webpack.common.config.js中的相同
            //若webpack.common.config.js中没有设置context，那么这里不要设置
            /* context:...  */
        }),
    ],
}
