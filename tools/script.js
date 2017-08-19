'use strict';

const utils = require('steamer-webpack-utils'),
	  webpack = require('webpack'),
	  opn = require('opn'),
	  fs = require('fs'),
	  path = require('path');

var karma = require('karma').server;

var isProduction = process.env.NODE_ENV === 'production',
	isKarma = process.env.KARMA_ENV === 'karma';

const feature = require('./feature/feature');

if (feature.installDependency()) {
	return;
}


if (isKarma) {	
	var config = require('../config/project'),
    	configWebpack = config.webpack;
    
	karma.start({
		configFile: path.join(configWebpack.path.test, '/unit/karma.conf.js'),
		singleRun: true
	}, function(){
		console.log("karma test done!");
		opn(path.join(configWebpack.path.test,'unit/coverage/lcov-report/index.html'));
	});
}
else if (!isProduction) {	
	require('./server');
}
else if (isProduction) {
	compilerRun(require('./webpack.base'));
}

function compilerRun(config) {
	var compiler = webpack(config);

	compiler.run(function(err, stats) {
	    if (!err) {
	        // const jsonStats = stats.toJson();
	        // print asset stats
	        // fs.writeFileSync("stats.txt", JSON.stringify(jsonStats, " " , 4))
	        
	        console.log(stats.toString({
	            assets: true,
		        cached: true,
		        colors: true,
		        children: false,
		        errors: true,
		        warnings: true,
		        version: true,
	        }));
	    }
	    else {
	        console.log(err);
	    }
	});
}