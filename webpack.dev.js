const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        publicPath: '/',
        historyApiFallback: true,
        compress: true,
        port: 8000,
        hot: true
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                exclude: /\.module\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: "css-loader",
                    }, {
                        loader: "sass-loader"
                    }
                ]
            },
        ]

    },
    output: {
        publicPath: "/",
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});