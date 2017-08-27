module.exports = {
    entry: {
        app: ['./src/app.jsx']
    },
    output: {
        path: './build',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!' + 'css?sourcemap'
            },
            {
                test: /\.scss$/,
                loader: 'style!' + 'css?sourcemap' + '!sass?sourcemap'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?optional[]=runtime'
            },
            {
                test: /\.(json)$/,
                exclude: 'node_modules',
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
    ]
};