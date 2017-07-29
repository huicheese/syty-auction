const path = require('path');
const webpack = require('webpack');

module.exports = {
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
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    }
};
