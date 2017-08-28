var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app: ['./src/app.jsx']
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!' + 'css?sourceMap'
            },
            {
                test: /\.scss$/,
                loader: 'style!' + 'css?sourcemap' + '!sass?sourceMap'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(json)$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
            {
                test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Har Viewer'
        })  
    ],
    devtool: 'source-map'
};