const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'js/[name].[contenthash:8].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '', // cdn 资源路径
        assetModuleFilename: 'asset/[name].[hash:8][ext]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
            },
            {
                include: /\.(txt|htm)$/,
                // 导出文件的源代码
                type: 'asset/source',
            },
            {
                exclude: [
                    /^$/,
                    /\.(js|mjs|jsx|ts|tsx)$/,
                    /\.html$/,
                    /\.json$/,
                    /\.css$/,
                    /\.(txt|htm)$/,
                ],
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            // 产出的文件名字，会放到 dist 里面去
            filename: 'index.html',
        }),
    ],
};
