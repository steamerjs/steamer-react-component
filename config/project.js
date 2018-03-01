'use strict';

const path = require('path'),
      os = require('os'),
      webpack = require('webpack'),
      utils = require('steamer-webpack-utils'),
      steamerConfig = require('./steamer.config'),
      __basename = path.dirname(__dirname),
      __env = process.env.NODE_ENV,
      isProduction = __env === 'production';

var srcPath = path.resolve(__basename, "src"),
    devPath = path.resolve(__basename, "dev"),
    distPath = path.resolve(__basename, "dist"),
    examplePath = path.resolve(__basename, "example"),
    testPath = path.resolve(__basename, "test");

var entry = {};


if (isProduction) {
    entry = {
        index: path.join(srcPath, 'index.js'),
        pindex: path.join(srcPath, 'pindex.js')
    };
}
else {
    // 根据约定，自动扫描js entry，约定是example/src/page/xxx/main.js 或 example/src/page/xxx/main.jsx
    /**
        获取结果示例
        {
            'js/index': [path.join(configWebpack.path.src, "/page/index/main.js")],
            'js/spa': [path.join(configWebpack.path.src, "/page/spa/main.js")],
            'js/pindex': [path.join(configWebpack.path.src, "/page/pindex/main.jsx")],
        }
     */
    entry = utils.filterJsFileByCmd(utils.getJsEntry({
        srcPath: path.join(examplePath, "src/page"),
        fileName: "main",
        extensions: ["js", "jsx"],
        keyPrefix: "",
        level: 1
    }));
}

// ========================= webpack快捷配置 =========================
// 基本情况下，你只需要关注这里的配置
var config = {
    // ========================= webpack环境配置 =========================
    env: __env,

    // 默认使用的npm命令行
    npm: 'npm',

    webpack: {

        // ========================= webpack路径与url =========================
        // 项目路径
        path: {
            src: srcPath,
            dev: devPath,
            dist: distPath,
            example: examplePath,
            test: testPath,
        },

        // ========================= webpack服务器及路由配置 =========================
        // 开发服务器配置
        webserver: steamerConfig.webserver,
        port: steamerConfig.port,    // port for local server
        route: [], // proxy route, 例如: /news/

        // ========================= webpack自定义配置 =========================
        // 是否显示开发环境下的生成文件
        showSource: true,

        // 是否清理生成文件夹
        clean: true,

        // 是否压缩
        compress: false,

        // javascript 方言, 目前仅支持 ts(typescript)
        js: [],

        // 预编译器，默认支持css 和 less. sass, scss 和 stylus 由npm-install-webpack-plugin自动安装
        style: [
            "css", "less"
        ],
        // 生产环境是否提取css
        extractCss: true,
        // 是否启用css模块化
        cssModule: false,

        // html 模板. 默认支持html 和 ejs, handlebars 和 pug 由npm-install-webpack-plugin自动安装
        template: [
            "html",
        ],

        // 利用DefinePlugin给应用注入变量
        injectVar: {
            "process.env": {
                NODE_ENV: JSON.stringify(__env)
            }
        },

        alias: {

        },

        // ========================= webpack entry配置 =========================
        entry: entry,

        // 自动扫描html，配合html-res-webpack-plugin
        /**
            获取结果示例
            [
                {
                    key: 'index',
                    path: 'path/src/page/index/index.html'
                },
                {
                    key: 'spa',
                    path: 'path/src/page/spa/index.html'
                },
                {
                    key: 'pindex',
                    path: 'path/src/page/pindex/index.html'
                }
            ]
         */
        html: utils.filterHtmlFileByCmd(utils.getHtmlEntry({
            srcPath: path.join(examplePath, "src/page"),
            level: 1
        })),

    },
};



// ========================= webpack深度配置 =========================
// 使用了webpack-merge与webpack.base.js进行配置合并
// 如果上面的配置仍未能满足你，你可以在此处对webpack直接进行配置，这里的配置与webpack的配置项目一一对应
config.custom = {
    // webpack output
    getOutput: function() {

        if (isProduction) {
            return {
                library: "lib",
                libraryTarget: "commonjs2",
            };
        }
        else {
            return {};
        }
    },

    // webpack module
    getModule: function() {

        var module = {
            rules: []
        };

        return module;
    },

    // webpack resolve
    getResolve: function() {
        return {
            alias: config.webpack.alias
        };
    },

    // webpack plugins
    getPlugins: function() {
        var plugins = [];

        return plugins;
    },

    // webpack externals
    getExternals: function() {
        if (isProduction) {
            return {
                'react': "React",
                'react-dom': "ReactDOM",
                'preact': 'preact',
            };
        }

        return {};
    },

    // 其它 webpack 配置
    getOtherOptions: function() {
        return {};
    }
};

// ========================= webpack merge 的策略 =========================
config.webpackMerge = {
    // webpack-merge smartStrategy 配置
    smartStrategyOption: {
        "module.rules": "append",
        "plugins": "append"
    },

    // 在smartStrategy merge 之前，用户可以先行对 webpack.base.js 的配置进行处理
    mergeProcess: function(webpackBaseConfig) {

        return webpackBaseConfig;
    }
};

module.exports = config;
