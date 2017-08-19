`use strict`;

const path = require('path');

var Clean = require('clean-webpack-plugin'),
	WriteFilePlugin = require('write-file-webpack-plugin'),
    HappyPack = require('happypack'),
    HtmlResWebpackPlugin = require('html-res-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(config, webpack) {

	var configWebpack = config.webpack,
		isProduction = config.env === 'production';

	var plugins = [
		new HappyPack({
            id: '1',
            verbose: false,
            loaders: [{
                path: 'babel-loader',
                options: {
                    cacheDirectory: './.cache/'
                }
            }]
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
              return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true,
            disable: !((isProduction || !config.webpack.extractCss))
        }),
        
	];

	if (isProduction) {
		
	}
	else {
		if (configWebpack.showSource) {
	        plugins.push(new WriteFilePlugin());
	    }

        config.webpack.html.forEach(function(page, key) {
            plugins.push(new HtmlResWebpackPlugin({
                mode: "html",
                filename: page.key + ".html",
                template: page.path,
                htmlMinify: null,
                entryLog: true,
                removeUnMatchedAssets: true,
                env: isProduction ? 'production' : 'development',
                templateContent: function(tpl) {
                    return tpl;
                }
            }));
        }); 
	}

	if (configWebpack.clean) {
        // 生产环境，只删除一次
	    plugins.push(new Clean([isProduction ? configWebpack.path.dist : path.join(configWebpack.path.example, 'dev')], {root: path.resolve()}),);
	}

	return plugins;
};