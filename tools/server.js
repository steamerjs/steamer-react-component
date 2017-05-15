var express = require('express');
var app = express();
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var proxy = require('http-proxy-middleware');
var path = require('path');
var exec = require('child_process').exec;

var webpackConfig = require("./webpack.base.js"),
	config = require("../config/project"),
	configWebpack = config.webpack;
var port = configWebpack.port;

for (var key in webpackConfig.entry) {
	webpackConfig.entry[key].unshift('webpack-hot-middleware/client');
	webpackConfig.entry[key].unshift('react-hot-loader/patch');
}

var compiler = webpack(webpackConfig),
	devMiddleWare = webpackDevMiddleware(compiler, {
	    hot: true,
		historyApiFallback: true,
		// noInfo: true,
		stats: { 
			chunks: false,
			colors: true 
		},
	}),
	hotMiddleWare = webpackHotMiddleware(compiler);

// 自动打开浏览器
var hasLaunch = false
compiler.plugin('done', function() {
    if (!hasLaunch) {
        var map = {
          darwin: 'open',
          win32: 'start'
        };
        var opener = map[process.platform] || 'xdg-open';
        exec(opener + ' http://127.0.0.1:' + configWebpack.port);

        hasLaunch = true;
    }
});

app.use(devMiddleWare);

app.use(hotMiddleWare);

// 前端转发
app.use(configWebpack.route, proxy({target: 'http://127.0.0.1:' + port}));

app.listen(port, function(err) {
	if (err) {
		console.error(err);
	}
	else {
		console.info("Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.", port, port);
	}
});