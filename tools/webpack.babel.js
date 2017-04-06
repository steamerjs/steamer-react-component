'use strict';

const path = require('path'),
      webpack = require('webpack'),
      utils = require('steamer-webpack-utils');

var config = require('../config/project'),
    configWebpack = config.webpack;

var Clean = require('clean-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {
    entry: {
        "index": [path.join(configWebpack.path.src, "index.js")],
    },
    output: {
        path: path.join(configWebpack.path.dist),
        filename: "[name].js",
        library: "lib",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    "plugins": [
                        "transform-decorators-legacy"
                    ],
                    "presets": [
                        ["es2015", {"loose": true, "modules": false}], 
                        "react",
                        "stage-0"
                    ]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?-autoprefixer&localIdentName=[name]-[local]-[hash:base64:5]?postcss-loader!less-loader?root=" + path.resolve('src')
                }),
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "url-loader?limit=1000&name=img/[path]/[name].[ext]",
                ],
            },
        ]
    },
    resolve: {
        modules:['node_modules', configWebpack.path.src],
        extensions: [".js", ".jsx", ".es6", ".css", ".scss", ".less", ".png", ".jpg", ".jpeg", ".ico"],
        alias: {}
    },
    plugins: [
        // remove previous build folder
        new Clean([path.join(configWebpack.path.dist)], {root: path.resolve()}),
        new ExtractTextPlugin({
            filename:  (getPath) => {
              return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true,
            disable: false,
        }),
    ],
    // 是否添加source-map，可去掉注释开启
    // devtool: "#inline-source-map",
};

module.exports = webpackConfig;
