const path = require('path');
const webpack = require('webpack');
const compressionPlugin = require('compression-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
        './index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                },
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    }
};
