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
	},
	externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
	resolve: {
        extensions: ['','.js','.jsx']
    }
}