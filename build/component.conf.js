var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var vueLoaderConfig = require('./vue-loader.conf')
var utils = require('./utils')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    entry: {
        "vue2-jsoneditor": "./src/components/JsonEditor.vue",
    },
    output: {
        filename: "./dist/[name].js"
    },
    plugins: [
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
    ]

});
