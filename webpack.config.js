var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
		publicPath: path.resolve(__dirname, 'src', 'images')

    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src', 'js')],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            {            
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src', 'css')],
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader'
			} 
            
        ]
    },
    plugins: [
		new ExtractTextPlugin("styles.css")
	]
};
