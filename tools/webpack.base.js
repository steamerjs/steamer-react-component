'use strict';

const path = require('path'),
      webpack = require('webpack'),
      webpackMerge = require('webpack-merge'),
      utils = require('steamer-webpack-utils');

var config = require('../config/project'),
    configWebpack = config.webpack,
    configWebpackMerge = config.webpackMerge,
    configCustom = config.custom,
    env = process.env.NODE_ENV,
    isProduction = env === 'production';

var Clean = require('clean-webpack-plugin'),
    NpmInstallPlugin  = require('npm-install-webpack-plugin-steamer'),
    StylelintWebpackPlugin = require('stylelint-webpack-plugin');

var baseConfig = {
    entry: {
        "index": [
            isProduction ? 
            path.join(configWebpack.path.src, "index.js")
            : path.join(configWebpack.path.example, "src/index.js")
        ],
    },
    output: {
        path: isProduction ? configWebpack.path.dist : path.join(configWebpack.path.example, "dev"),
        filename: "[name].js",
        publicPath: configWebpack.webserver,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: configWebpack.path.src
            },
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
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
        new Clean([isProduction ? configWebpack.path.dist : path.join(configWebpack.path.example, "dev")], {root: path.resolve()}),
        new webpack.NoEmitOnErrorsPlugin(),
        new StylelintWebpackPlugin({
            configFile: path.resolve(__dirname, '../.stylelintrc.js'),
            context: 'inherits from webpack',
            files: '../src/**/*.@(?(s)?(a|c)ss|less|html)',
            syntax: 'less',
            failOnError: false,
            lintDirtyModulesOnly: true,                 // 只在改变的时候lint，其他时候跳过
            extractStyleTagsFromHtml: true,
        }),
        new NpmInstallPlugin({
            // Use --save or --save-dev
            dev: true,
            // Install missing peerDependencies
            peerDependencies: true,
            // Reduce amount of console logging
            quiet: false,
        })
    ],
    watch: !isProduction,
};

/************* loaders 处理 *************/
// 样式loader
var styleRules = {
    css: {
        test: /\.css$/,
        // 单独抽出样式文件
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    root: config.webpack.path.src,
                    module: config.webpack.cssModule,
                    autoprefixer: true,
                }
            },
            {
                loader: 'postcss-loader'
            }
        ],
    },
    less: {
        test: /\.less$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    root: config.webpack.path.src,
                    module: config.webpack.cssModule,
                    autoprefixer: true,
                }
            },
            {
                loader: 'postcss-loader'
            },
            {
                loader:  'less-loader',
                options: {
                    paths: [
                        config.webpack.path.src,
                        "node_modules"
                    ]
                }
            }
        ],
    },
    stylus: {
        test: /\.styl$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    root: config.webpack.path.src,
                    module: config.webpack.cssModule,
                    autoprefixer: true,
                }
            },
            {
                loader: 'postcss-loader'
            },
            { 
                loader:  'stylus-loader',
                options: {
                    paths: [
                        config.webpack.path.src,
                        "node_modules"
                    ]
                }
            },
        ],
    },
    sass: {
        test: /\.s(a|c)ss$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    root: config.webpack.path.src,
                    module: config.webpack.cssModule,
                    autoprefixer: true,
                }
            },
            {
                loader: 'postcss-loader'
            },
            { 
                loader:  'sass-loader',
                options: {
                    includePaths: [
                        config.webpack.path.src,
                        "node_modules"
                    ]
                }
            },
        ],
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
        loader: "handlebars-loader" 
    },  
    ejs: {
        test: /\.ejs$/,
        loader: "ejs-compiled-loader",
        query: {
            'htmlmin': true, // or enable here  
            'htmlminOptions': {
                removeComments: true
            }
        }
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
