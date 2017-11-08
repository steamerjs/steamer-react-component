// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind');

// 引入所有测试文件 (以 .spec.js 结尾)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// 引入除了main.js的所有源文件以做覆盖率测试
// 你也可以修改配置只测试一部分js文件
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/);
srcContext.keys().forEach(srcContext);

// 引入enyzme 需要用的helper，参考
// http://airbnb.io/enzyme/docs/installation/index.html
// https://github.com/airbnb/enzyme/issues/1257
var testHelpers = require.context('./helpers');
testHelpers.keys().forEach(testHelpers);
