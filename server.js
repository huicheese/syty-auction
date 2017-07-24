const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const enableWs = require('express-ws');
const wsInstance = enableWs(app);

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
app.use(express.static(__dirname + '/www'));
app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));
app.use(require("webpack-hot-middleware")(compiler));

require('./server/properties.js').setApp(app);
require('./server/login.js').setApp(app);
require('./server/dashboard.js').setApp(app, wsInstance);
require('./server/database.js').initialize();

const path = require('path');
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'www', 'index.html'))
});

const server = app.listen(app.locals.port, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Syty Auction server is listening at http://%s:%s', host, port);
});