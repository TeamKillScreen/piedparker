module.exports = {
	entry: "./app/src/app.jsx",
	output: {
		filename: "./app/src/app.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel?optional[]=runtime&stage=0'
			}
		]
	}
}
