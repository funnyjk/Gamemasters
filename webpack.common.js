const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: ['react-hot-loader/patch', './src/index.tsx'],

    // entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
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

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'GameMasters',
            template: path.resolve(__dirname, 'src/index.html'),
            favicon: path.resolve(__dirname, 'src/favicon.png'),
            logo: path.resolve(__dirname, 'src/logo.png')
        }),
    ]
};