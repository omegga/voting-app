const merge = require('webpack-merge');
const dotenv = require("dotenv");
dotenv.config();
const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		hot: true,
		proxy: {
			'/api': 'http://localhost:' + process.env.PORT
		}
	}
});
