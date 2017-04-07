const opn = require('opn');
const path = require('path');
var karma = require('karma').server;
var config = require('../config/project'),
    configWebpack = config.webpack;

karma.start({
    configFile: path.join(configWebpack.path.test, '/unit/karma.conf.js'),
    singleRun: true
}, function(){
    console.log("karma test done!");
    opn(path.join(configWebpack.path.test,'unit/coverage/lcov-report/index.html'));
})