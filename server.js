const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const cookieParser = require('cookie-parser')
app.use(cookieParser());

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js')(process.env.NODE_ENV || 'dev');
const compiler = webpack(webpackConfig);
const isDevelopment = process.env.NODE_ENV !== 'production';
if (isDevelopment) {
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
}
app.use(express.static(path.join(__dirname, '/www')));

require('./server/database.js').initialize();
require('./server/properties.js').setApp(app);

const server = app.listen(process.env.PORT || app.locals.port, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Syty Auction server is listening at http://%s:%s', host, port);
});

var io = require('socket.io').listen(server, {
    pingInterval: 10000,
    pingTimeout: 25000,
});

require('./server/login.js').setApp(app);
require('./server/dashboard.js').setApp(app, io);

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'www', 'index.html'))
});