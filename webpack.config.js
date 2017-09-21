var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app: ['./src/app.jsx']
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
          {
            test: /\.css$/,
            loader: 'css-loader!' + 'css?sourceMap'
          },
          {
            test: /\.scss$/,
            loader: 'style-loader!' + 'css?sourceMap' + '!sass?sourceMap'
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader?optional[]=runtime',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'stage-0'] // <--- here
            }
          },
          {
            test: /\.(json)$/,
            exclude: /node_modules/,
            loader: 'json-loader'
          },
          {
            test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d\.\d+\.\d+)?$/,
            loader: 'url-loader'
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Har Viewer'
        })  
    ],
    devtool: 'source-map'
};