const path = require('path');

let webpackTestConf = require('../../tools/webpack.base.js');

// karma 目前只认 umd，commonjs/commonjs2会报错
webpackTestConf.output.libraryTarget = 'umd';
delete webpackTestConf.output.library;
// 需要删掉entry
delete webpackTestConf.entry;
// 不能设置 vue 的 externals
delete webpackTestConf.externals;
webpackTestConf.externals = {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
};

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        // basePath: '',
        // 手动引入 karma 的各项插件，如果不显式引入，karma 也会自动寻找 karma- 开头的插件并自动引入
        plugins: [
            'karma-coverage-istanbul-reporter',
            'karma-mocha',
            'karma-sinon-chai',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // 设定要使用的 frameworks
        frameworks: ['mocha', 'sinon-chai'],
        // list of files / patterns to load in the browser
        // 入口文件，按照 istanbul-instrumenter-loader 的要求来写
        files: ['./index.js'],
        // list of files to exclude
        exclude: [
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // 加入 webpack 与 sourcemap 插件
        preprocessors: {
            './index.js': ['webpack', 'sourcemap'],
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // 设定报告输出插件： spec 和 coverage-istanbul
        reporters: ['spec', 'coverage-istanbul'],
        // coverage-istanbul 输出配置，报告文件输出于根目录下的 coverage 文件夹内
        coverageIstanbulReporter: {
            // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
            reports: ['html', 'lcovonly', 'text-summary'],
            // base output directory
            dir: path.join(__dirname, './coverage'),
            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,
            // Most reporters accept additional config options. You can pass these through the `report-config` option
            'report-config': {
                // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
                html: {
                    // outputs the report in ./coverage/html
                    subdir: 'html'
                }
            }
        },
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS', 'Chrome'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        // 设定终端上不输出 webpack 的打包信息
        webpackMiddleware: {
            noInfo: true
        },
        // 用来预编译源代码的 webpack 配置，基本就是项目的 webpack 配置，但要去掉 entry 属性
        webpack: webpackTestConf,

        babelPreprocessor: {
            options: {
                presets: ['airbnb']
            }
        },
    });
};


// const path = require('path');

// let webpackTestConf = require('../../tools/webpack.base.js');

// // 给webpack基础配置增加一些针对测试环境的配置
// webpackTestConf = Object.assign(webpackTestConf, {
//   // karma需要开启inline source map
//   devtool: "#inline-source-map",
//   // 针对enzyme的issue https://github.com/airbnb/enzyme/issues/503
//   externals: {
//     'cheerio': 'window',
//     'react/addons': true,
//     'react/lib/ExecutionEnvironment': true,
//     'react/lib/ReactContext': true
//   }
// })
// module.exports = function (config) {
//   config.set({

//     // 将被用于所有配置的基础路径 (eg. files, exclude)
//     basePath: '',

//     // 使用的测试框架 可用的框架: https://npmjs.org/browse/keyword/karma-adapter
//     frameworks: ['mocha'],

//     // Karma的入口文件
//     files: [
//         //{pattern: path.join(__basename, 'node_modules/chai/chai.js'),include: true},
//         './index.js'
//     ],

//     // 需排除的文件
//     exclude: [],

//     // 需要预处理的文件，比如需要webpack进行处理后再让karma运行服务器 可用的预处理器:
//     // https://npmjs.org/browse/keyword/karma-preprocessor
//     preprocessors: {
//       ['index.js']: ['webpack', 'sourcemap']
//     },

//     // 配置webpack
//     webpack: webpackTestConf,
//     webpackMiddleware: {
//       noInfo: true
//     },

//     // 测试结果报告，覆盖率报告如有需要在这里配置 可用的报告插件:
//     // https://npmjs.org/browse/keyword/karma-reporter
//     reporters: [
//       'mocha', 'coverage'
//     ],

//     // mocha报告插件配置
//     mochaReporter: {
//       showDiff: true
//     },

//     // 覆盖率报告插件配置
//     coverageReporter: {
//       dir: path.join(__dirname, 'coverage'),
//       reporters: [
//         {
//           type: 'json',
//           subdir: '.',
//           file: 'coverage.json'
//         }, {
//           type: 'lcov',
//           subdir: '.'
//         }, {
//           type: 'text-summary'
//         }
//       ]
//     },
//     // 服务器端口
//     port: 9876,

//     // 是否要有颜色
//     colors: true,

//     // logging的级别 可用值: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
//     // config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_INFO,

//     // 是否监听文件变动
//     autoWatch: true,

//     // 启动下列这些浏览器 可用的启动器: https://npmjs.org/browse/keyword/karma-launcher
//     browsers: [
//       'Chrome', 'PhantomJS'
//     ],

//     // 持续集成模式 如果是true，Karma只会运行一次并退出
//     singleRun: true
//   })
// }
