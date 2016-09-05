var webpack = require('webpack');

module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            { test: /\.(png|gif)$/, loader: "file-loader?name=img/[hash:8].[name].[ext]" }
        ]
    }
}
