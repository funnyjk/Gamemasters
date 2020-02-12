const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    devServer: {
        publicPath: '/',
        // contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 8000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /\.(scss|css)$/,
                exclude: /\.module\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader",
                    }, {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                use: 'graphql-tag/loader',
            }
        ]
    },
    output: {
        filename: 'main.js',
        publicPath: "/",
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            path: path.join(__dirname, './templates')
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            publicPath: '/',
            title: 'Development',
            template: path.resolve(__dirname, 'src/index.html')
        }),
    ],
};