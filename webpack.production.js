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
    plugins: [
        new webpack.DefinePlugin({ 
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new compressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    }
};
