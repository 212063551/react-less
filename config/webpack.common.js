"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const { isDevelopment, isProduction } = require("./env");

const getCssLoaders = () => {
	const cssLoaders = [
		// 开发模式使用style-loader，生产模式MiniCssExtractPlugin.loader
		isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
		{
			loader: "css-loader",
			options: {
				modules: {
					// 模块化类名，防止重复
					localIdentName: "[local]-[hash:base64:5]",
				},
				sourceMap: isDevelopment,
			},
		},
	];

	// 加css前缀的loader配置
	const postcssLoader = {
		loader: "postcss-loader",
		options: {
			postcssOptions: {
				plugins: [
					isProduction && [
						"postcss-preset-env",
						{
							autoprefixer: {
								grid: true,
							},
						},
					],
				],
			},
		},
	};

	// 生产模式时，才需要加css前缀
	isProduction && cssLoaders.push(postcssLoader);

	return cssLoaders;
};

module.exports = {
	entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
	output: {
		filename: "static/js/[name].js", // 每个输出js的名称
		path: path.join(__dirname, "../dist"), // 打包结果输出路径
		clean: true, //
		publicPath: "/", // 打包后文件的公共前缀路径
		filename: "static/js/[name].[chunkhash:8].js", // // 加上[chunkhash:8]
	},
	module: {
		rules: [
			{
				include: [path.resolve(__dirname, "../src")],
				test: /.(ts|tsx)$/,
				use: ["thread-loader", "babel-loader"],
			},
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, "../src")],
				use: getCssLoaders(),
			},
			{
				test: /\.less$/,
				include: [path.resolve(__dirname, "../src")],
				use: [
					...getCssLoaders(),
					{
						loader: "less-loader",
						options: {
							sourceMap: isDevelopment,
						},
					},
				],
			},
			{
				test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
				type: "asset", // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 小于10kb转base64位
					},
				},
				generator: {
					filename: "static/images/[name].[contenthash:8][ext]", // 加上[contenthash:8]
				},
			},
			{
				test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
				type: "asset", // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 小于10kb转base64位
					},
				},
				generator: {
					filename: "static/fonts/[name].[contenthash:8][ext]", // 文件输出目录和命名
				},
			},
			{
				test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
				type: "asset", // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 小于10kb转base64位
					},
				},
				generator: {
					filename: "static/media/[name].[contenthash:8][ext]", // 文件输出目录和命名
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
			inject: true, // 自动注入静态资源
		}),
		new webpack.DefinePlugin({
			"process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
		}),
		new WebpackBar({
			// color: "#85d", // 默认green，进度条颜色支持HEX
			basic: false, // 默认true，启用一个简单的日志报告器
			profile: false, // 默认false，启用探查器。
		}),
	],
	resolve: {
		modules: [path.resolve(__dirname, "../node_modules")],
		extensions: [".js", ".tsx", ".ts"],
		alias: {
			"@": path.join(__dirname, "../src"),
		},
	},
	cache: {
		type: "filesystem", // 使用文件缓存
	},
};
