'use strict';

const path = require('path'),
      webpack = require('webpack'),
      merge = require('lodash.merge'),
      webpackMerge = require('webpack-merge'),
      utils = require('steamer-webpack-utils');

var config = require('../config/project'),
    configWebpack = config.webpack,
    configWebpackMerge = config.webpackMerge,
    configCustom = config.custom,
    env = process.env.NODE_ENV,
    isProduction = env === 'production';

var Clean = require('clean-webpack-plugin');

var baseConfig = {
    entry: configWebpack.entry,
    output: {
        path: isProduction ? configWebpack.path.dist : path.join(configWebpack.path.example, 'dev'),
        filename: '[name].js',
        publicPath: configWebpack.webserver,
    },
    module: {
        rules: [
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url-loader?limit=1000&name=img/[path]/[name].[ext]',
                ],
            },
        ]
    },
    resolve: {
        modules:['node_modules', configWebpack.path.src],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.css', '.scss', '.less', '.png', '.jpg', '.jpeg', '.ico'],
        alias: {}
    },
    plugins: [
        // remove previous build folder
        new Clean([isProduction ? configWebpack.path.dist : path.join(configWebpack.path.example, 'dev')], {root: path.resolve()}),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    watch: !isProduction,
};

/************* loaders 处理 *************/
// 样式loader
var commonLoaders = [
    {
        loader: 'cache-loader',
        options: {
            // provide a cache directory where cache items should be stored
            cacheDirectory: path.resolve('.cache')
        }
    },
    {
        loader: 'style-loader'
    },
    {
        loader: 'css-loader',
        options: {
            localIdentName: '[name]-[local]-[hash:base64:5]',
            module: config.webpack.cssModule,
            autoprefixer: true,
            minimize: true
        }
    },
    { 
        loader: 'postcss-loader' 
    }
];

// 样式loader
var styleRules = {
    css: {
        test: /\.css$/,
        // 单独抽出样式文件
        use: commonLoaders,
    },
    less: {
        test: /\.less$/,
        use: merge([], commonLoaders).concat([{
            loader: 'less-loader'
        }]),
    },
    stylus: {
        test: /\.styl$/,
        use: merge([], commonLoaders).concat([{
            loader: 'stylus-loader'
        }]),
    },
    sass: {
        test: /\.s(a|c)ss$/,
        use: merge([], commonLoaders).concat([{
            loader: 'sass-loader'
        }]),
    },
};

// 模板loader
var templateRules = {
    html: {
        test: /\.html$/,
        loader: 'html-loader'
    },
    pug: {
        test: /\.pug$/, 
        loader: 'pug-loader'
    },
    handlebars: { 
        test: /\.handlebars$/, 
        loader: 'handlebars-loader' 
    },  
    ejs: {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader',
        query: {
            'htmlmin': true, // or enable here  
            'htmlminOptions': {
                removeComments: true
            }
        }
    }
};

// js方言
var jsRules = {
    ts: {
        test: /\.(tsx|ts)$/,
        loader: 'awesome-typescript-loader'
    }
};

configWebpack.style.forEach((style) => {
    style = (style === 'scss') ? 'sass' : style;
    let rule = styleRules[style] || '';
    rule && baseConfig.module.rules.push(rule);
});

configWebpack.template.forEach((tpl) => {
    let rule = templateRules[tpl] || '';
    rule && baseConfig.module.rules.push(rule);
});

configWebpack.js.forEach((tpl) => {
    let rule = jsRules[tpl] || '';

    rule && baseConfig.module.rules.push(rule);
});

/************* plugins 处理 *************/
if (isProduction) {
    baseConfig.plugins.push(new webpack.DefinePlugin(configWebpack.injectVar));
}
else {
    baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

/************* base 与 user config 合并 *************/
var userConfig = {
    output: configCustom.getOutput(),
    module: configCustom.getModule(),
    resolve: configCustom.getResolve(),
    externals: configCustom.getExternals(),
    plugins: configCustom.getPlugins(),
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
