const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SRC_PATH = path.resolve(__dirname, '..', 'src');
const DIST_PATH = path.resolve(__dirname, '..', 'dist');


/* 基础 配置 */
module.exports = {
    devtool: 'source-map',
    entry: path.resolve(SRC_PATH, 'index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsConfigPathsPlugin()]
    },
    output: {
        filename: '[name]-[chunkhash:8].js',
        path: DIST_PATH,
    }
};

/* 模块 配置 */
module.exports.module = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader?modules&localIdentName=[local]_[hash:base64:5]&minimize=true!sass-loader?sourceMap=true']
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader?minimize=true']
        },
        {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: 'res/img/[name]-[hash:8].[ext]'
            }
        },
        {
            test: /\.(ttf|woff|eot)$/,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: 'res/font/[name].[ext]'
            }
        }
    ]
};

/* 插件 配置*/
module.exports.plugins = [
    // 生成html
    new HtmlWebpackPlugin({
        template: SRC_PATH + "/index.html",
        filename: 'index.html'
    }),
    // 打包前清除打包目录
    new CleanWebpackPlugin([DIST_PATH], {
        root: '/',
        verbose: true,
        dry: false
    }),
    // gzip压缩
    new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(js|css)$'
        ),
        threshold: 10240,
        minRatio: 0.8
    }),
    // css单独打包
    new MiniCssExtractPlugin({
        filename: "css/[name]-[hash:8].css",
        chunkFilename: "[id].css"
    })

];
