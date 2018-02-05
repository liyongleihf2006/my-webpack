var path = require('path');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var merge = require('webpack-merge');
var nomock = require('./webpack.dev-nomock.config.js');
module.exports = merge(nomock, {
    entry:{
        "mock-watch":path.join(__dirname,"mock-watch.js")
    },
    plugins: [
        /* 使用mockjs */
        new HtmlWebpackIncludeAssetsPlugin({ assets: ["../bower_components/mockjs/dist/mock.js",{path:"../mock",glob: '**/*.js'}],append:false}),
    ]
})