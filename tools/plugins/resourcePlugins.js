`use strict`;

const path = require('path');

let Clean = require('clean-webpack-plugin');
let WriteFilePlugin = require('write-file-webpack-plugin');
let HappyPack = require('happypack');
let HtmlResWebpackPlugin = require('html-res-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        new MiniCssExtractPlugin({
            filename: `css/[name].css`,
            chunkFilename: 'css/[name].css'
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
