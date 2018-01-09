// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// Constant with our paths
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC : path.resolve(__dirname, 'src'),
	JS  : path.resolve(__dirname, 'src/js'),
	APP : {
		ROOT   : path.resolve(__dirname, 'src/js'),
		REQUEST: path.resolve(__dirname, 'src/js/request'),
		SERVICE: path.resolve(__dirname, 'src/js/service'),
		VIEW   : path.resolve(__dirname, 'src/js/view'),
		DOMAIN : path.resolve(__dirname, 'src/js/domain')
	}
};

// Webpack configuration
module.exports = {
	entry  : path.join(paths.JS, 'app.js'),
	context: paths.SRC,
	output : {
		path    : paths.DIST,
		filename: 'app.bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, 'index.html'),
		}),
	],
	module : {
		rules: [
			{
				test   : /\.(js)$/,
				exclude: /node_modules/,
				use    : [
					'babel-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js'],
		alias     : {
			app    : paths.APP.ROOT,
			request: paths.APP.REQUEST,
			service: paths.APP.SERVICE,
			view   : paths.APP.VIEW,
			domain : paths.APP.DOMAIN,
		}
	},
};
