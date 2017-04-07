// Karma configuration Generated on Thu Mar 30 2017 20:56:56 GMT+0800 (中国标准时间)

var webpackTestConf = require('../../tools/webpack.babel.js');

// 给webpack基础配置增加一些针对测试环境的配置
webpackTestConf = Object.assign(webpackTestConf, {
      // karma需要开启inline source map
      devtool: "#inline-source-map",
      // 针对enzyme的issue https://github.com/airbnb/enzyme/issues/503
      externals: {
          'cheerio': 'window',
          'react/addons': true,
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true
      }
})
module.exports = function (config) {
  config.set({

    // 将被用于所有配置的基础路径 (eg. files, exclude)
    basePath: '',

    // 使用的测试框架 可用的框架: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha'
    ],

    // Karma的入口文件
    files: [
        //{pattern: path.join(__basename, 'node_modules/chai/chai.js'),include: true},
      './index.js'
      ],

    // 需排除的文件
    exclude: [],

    // 需要预处理的文件，比如需要webpack进行处理后再让karma运行服务器 可用的预处理器:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      ['index.js']: ['webpack', 'sourcemap']
    },

    // 配置webpack
    webpack: webpackTestConf,
    webpackMiddleware: {
      noInfo: true
    },

    // 测试结果报告，覆盖率报告如有需要在这里配置 可用的报告插件:
    // https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'mocha', 'coverage'
    ],

    // mocha报告插件配置 
    mochaReporter: {
      showDiff: true
    },

    // 覆盖率报告插件配置
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {
          type: 'json',
          subdir: '.',
          file: 'coverage.json'
        }, {
          type: 'lcov',
          subdir: '.'
        }, {
          type: 'text-summary'
        }
      ]
    },
    // 服务器端口
    port: 9876,

    // 是否要有颜色
    colors: true,

    // logging的级别 可用值: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
    // config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // 是否监听文件变动
    autoWatch: true,

    // 启动下列这些浏览器 可用的启动器: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome', 'PhantomJS'
    ],

    // 持续集成模式 如果是true，Karma只会运行一次并退出
    singleRun: true
  })
}
