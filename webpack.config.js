const CopyPlugin = require('copy-webpack-plugin');
const DevMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Path = require('path');
const SassPlugin = require('sass-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/js/index.js', './src/js/carousel.js', './src/scss/onetech.scss', './src/scss/custom.scss']
    },
    output: {
        filename: "js/main.js",
    },
    devServer: {
        contentBase: './dist',
        port: 8081,
        watchContentBase: true,
        open: true
    },
    module: {
        rules: [{
                enforce: "pre",
                test: /\.js$/,
                options: {
                    fix: "true"
                },
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.js$|\.jsx$/,
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: { esModules: true }
                },
                enforce: 'post',
                exclude: /node_modules|\.spec\.js$/,
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    DevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img',
                    },
                }, ],
            },
        ],
    },
    plugins: [
        new SassPlugin({ './src/scss/onetech.scss': 'css/main.css' }, {
            sourceMap: false,
            sass: { outputStyle: 'compressed' },
            autoprefixer: false
        }, process.env.NODE_ENV),
        new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'scss/onetech.css'
        }),
        new CopyPlugin([
            { from: 'src/index.html' },
            { from: "src/js/data.json", to: "js/data.json" }, {
                from: 'src/img',
                to: 'img'
            },
            { from: "src/font", to: "font" },
            { from: "src/style/flaticon.css", to: "css/flaticon.css" },
        ]),
    ]
};