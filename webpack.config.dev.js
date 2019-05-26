import webpack from 'webpack';
import path from 'path';

const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

export default {
    // debug: true,
    devtool: 'inline-source-map',
    // noInfo: true,
    mode: 'development',
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname, '/dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    node: {
        fs: 'empty'
    },
    // options: {
    //     // This is a feature of `babel-loader` for webpack (not Babel itself).
    //     // It enables caching results in ./node_modules/.cache/babel-loader/
    //     // directory for faster rebuilds.
    //     cacheDirectory: true,
    //     plugins: ['react-hot-loader/babel'],
    // },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin(['GOOGLE_MAPS_KEY', 'BLOCKTAP_TOKEN']),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, '/src/scripts/sw.js'),
            excludes: [
                '**/.*',
                '**/*.map',
                '*.html',
            ],
            filename: 'sw.js'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
        // stats: 'errors-only'
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
            {test: /(\.css)$/, loaders: ['style', 'css']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
        ]
    }
};