`use strict`;

const path = require('path');

module.exports = function(config) {

	var configWebpack = config.webpack;

	// js方言
	const jsRules = {};

	var rules = [
	    {
	    	test: /\.js$/,
            loader: 'happypack/loader?id=1',
            exclude: /node_modules/
        },
        // 为了统计代码覆盖率，对 js 文件加入 istanbul-instrumenter-loader
        {
            test: /\.(js)$/,
            loader: 'istanbul-instrumenter-loader',
            exclude: /node_modules/,
            include: /src|packages/,
            enforce: 'post',
            options: {
                esModules: true
            }
        },
	];

	configWebpack.js.forEach((tpl) => {
	    let rule = jsRules[tpl] || '';
	    rule && rules.push(rule);
	});

	return rules;
};
