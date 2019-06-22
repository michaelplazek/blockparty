import webpack from 'webpack';
import path from 'path';

const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

export default {
    devtool: 'inline-source-map',
    mode: 'development',
    entry: [
        path.resolve(__dirname, 'src/index'),
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            'GOOGLE_MAPS_KEY',
            'BLOCKTAP_TOKEN',
            'PUBLIC_PUSH_KEY',
            'MONERO_ADDRESS',
            'BITCOIN_ADDRESS',
            'BASE_URL',
            'BLOCKTAP_URL',
        ]),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/scripts/sw.js'),
            excludes: [
                '**/.*',
                '**/*.map',
                '*.html',
            ],
            filename: "sw.js",
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    module: {
        rules: [
            {test: /\.js$/, include: [
                    path.join(__dirname, 'src')
                ], loaders: ['babel-loader']},
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /(\.css)$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};