`use strict`;

const path = require('path'),
	  os = require('os');

var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(config, webpack) {

	var configWebpack = config.webpack,
		isProduction = config.env === 'production';

	var plugins = [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin(configWebpack.injectVar),
		// new webpack.optimize.ModuleConcatenationPlugin()
	];

	if (isProduction) {

		if (configWebpack.compress) {
	        plugins.push(new UglifyJSPlugin({
	        	parallel: {
			    	cache: true,
			    	workers: os.cpus().length,
			    },
			    warnings: true,
	        }));
	    }
	}
	else {
		plugins.push(new webpack.HotModuleReplacementPlugin());
	}

	return plugins;
};