const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: path.join(__dirname, 'src'),
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './index.js',
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    }
};
