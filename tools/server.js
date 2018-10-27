import express from 'express';
import webpack from 'webpack';
import path from 'path';
const favicon = require('serve-favicon');

import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(process.env.PORT || port);
