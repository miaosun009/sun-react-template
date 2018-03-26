const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const SRC_PATH = path.resolve(__dirname, '..', 'src')
const DIST_PATH = path.resolve(__dirname, '..', 'dist')

/* 基础 配置 */
module.exports = {
    devtool: 'source-map',
    entry: path.resolve(SRC_PATH, 'index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsConfigPathsPlugin()]
    },
    output: {
        filename: 'main.js',
        path: DIST_PATH,
    }
}

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
            exclude: path.resolve(SRC_PATH, 'assets/css'),
            loader: 'style-loader!css-loader?modules&localIdentName=[local]_[hash:base64:5]!sass-loader?sourceMap=true'
        },
        {
            test: /\.scss$/,
            include: path.resolve(SRC_PATH, 'assets/css'),
            loader: 'style-loader!css-loader?modules&localIdentName=[local]_[hash:base64:5]!sass-loader?sourceMap=true'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: 'res/img/[name].[ext]'
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
}

/* 插件 配置*/
module.exports.plugins = [
    // 生成html
    new HtmlWebpackPlugin({
        template: SRC_PATH + "/index.html",
        filename: 'index.html'
    })
]

/* devServer 配置 */
module.exports.devServer = {
    open: true
}