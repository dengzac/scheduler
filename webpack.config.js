const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	module: {
		rules: [
		{
		test: /\.(js|jsx)$/,
		exclude: /(node_modules|bower_components)/,
		loader: 'babel-loader'
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		{
			test: /\.(eot|woff|woff2|svg|ttf)$/,
			loader: "file-loader"
		}
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/dist/",
		filename: "bundle.js"
	},
	devServer: {
		proxy: {
			"/api/v1" :{
				changeOrigin: true,
				target: "http://localhost:3000"},
			"/auth": {
				changeOrigin: true,
				target: "http://localhost:3000"
			},
			"/": {
				changeOrigin: true,
				target: "http://localhost:3000"
			}
		},
		contentBase: path.join(__dirname, "public/"),
		port: 4000,
		publicPath: "http://localhost:4000/dist/",
		hotOnly: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin() ]
};
