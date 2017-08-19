'use strict';

const path = require('path'),
      fs = require('fs'),
      os = require('os'),
      utils = require('steamer-webpack-utils'),
      webpack = require('webpack'),
      webpackMerge = require('webpack-merge');

var config = require('../config/project'),
    configWebpack = config.webpack,
    configWebpackMerge = config.webpackMerge,
    configCustom = config.custom,
    isProduction = config.env === 'production';

var baseConfig = {
    context: configWebpack.path.src,
    entry: configWebpack.entry,
    output: {
        publicPath: isProduction ? `/${path.basename(configWebpack.path.dist)}/` : configWebpack.webserver,
        path: isProduction ? configWebpack.path.dist : path.join(configWebpack.path.example, 'dev'),
        filename: '[name].js',
    },
    module: {
        rules: []
    },
    resolve: {
        modules: [
            configWebpack.path.src,
            'node_modules',
            path.join(configWebpack.path.src, 'css/sprites')
        ],
        extensions: [
            '.ts', '.tsx', '.js', '.jsx', '.css', '.scss', 'sass', '.less', '.styl', 
            '.png', '.jpg', '.jpeg', '.ico', '.ejs', '.pug', '.handlebars', '.swf', '.vue'
        ],
        alias: {}
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    watch: !isProduction,
    performance: {
        hints: isProduction ? 'warning' : false,
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
        }
    }
};

/************* 处理脚手架基础rules & plugins *************/
var rules = fs.readdirSync(path.join(__dirname, 'rules')),
    plugins = fs.readdirSync(path.join(__dirname, 'plugins'));

var baseConfigRules = [],
    baseConfigPlugins = [];

rules.forEach((rule) => {
    baseConfigRules = baseConfigRules.concat(require(`./rules/${rule}`)(config));
});

plugins.forEach((plugin) => {
    baseConfigPlugins = baseConfigPlugins.concat(require(`./plugins/${plugin}`)(config, webpack));
});

baseConfig.module.rules = baseConfigRules;
baseConfig.plugins = baseConfigPlugins;

// console.log(rules, plugins);

/************* base 与 user config 合并 *************/
var userConfig = {
    output: configCustom.getOutput(),
    module: configCustom.getModule(),
    resolve: configCustom.getResolve(),
    externals: configCustom.getExternals(),
    plugins: configCustom.getPlugins()
};

var otherConfig = configCustom.getOtherOptions();

for (let key in otherConfig) {
    userConfig[key] = otherConfig[key];
}

baseConfig = configWebpackMerge.mergeProcess(baseConfig);

var webpackConfig = webpackMerge.smartStrategy(
    configWebpackMerge.smartStrategyOption
)(baseConfig, userConfig);

// console.log(JSON.stringify(webpackConfig, null, 4));

module.exports = webpackConfig;