"use strict";

const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const port = process.env.PORT || "6060";

module.exports = merge(baseConfig, {
	stats: "minimal",
	mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
	// 打包环境注释下面这行代码
	devtool: "eval-cheap-module-source-map", // 源码调试模式,开发模式使用：nosources-source-map
	devServer: {
		port,
		host: "0.0.0.0",
		compress: false, // gzip压缩,开发环境不开启,提升热更新速度
		hot: true, // 开启热更新，后面会讲react模块热替换具体配置
		historyApiFallback: true, // 解决history路由404问题
		static: {
			directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
		},
		https: false,
	},
	plugins: [
		new ReactRefreshWebpackPlugin(), // 添加热更新插件
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [
					`Local:           http://localhost:${port}`,
					`On Your Network: http://192.168.33.17:${port}`,
				],
			},
			clearConsole: true,
		}),
	],
});
