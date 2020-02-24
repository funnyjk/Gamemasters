
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                exclude: /\.module\.(scss|css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },{
                    loader: "css-loader",
                }, {
                    loader: "sass-loader"
                }
                ]
            },
        ]

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            // path: path.join(__dirname, './templates')
        }),
        // new BundleAnalyzerPlugin({
        //     generateStatsFile: true
        // }),
    ]
});