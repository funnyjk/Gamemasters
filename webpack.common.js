const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['react-hot-loader/patch', './src/index.tsx'],

    // entry: './src/index.tsx',
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
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss']
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            // path: path.join(__dirname, './templates')
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'GameMasters',
            template: path.resolve(__dirname, 'src/index.html'),
            favicon: path.resolve(__dirname, 'src/favicon.png'),
            logo: path.resolve(__dirname, 'src/logo.png')
        }),
    ]
};