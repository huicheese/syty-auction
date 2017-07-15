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

const path = require('path');
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'www', 'index.html'))
})

require('./server/properties.js').setApp(app);
require('./server/login.js').setApp(app);
require('./server/database.js').initialize();

// TODO: GET snapshot, query DB, return full dashboard
// TODO: POST submit, update DB, send update via WS

app.post('/submit', function (request, response) {
    console.log(request.body)
    console.log(request.cookies)
    wsInstance.getWss().clients.forEach(client => {
    //if (client.readyState === WebSocket.OPEN) {
        client.send("ehhhhes");
        console.log('222');
    // }
    })
    console.log('done')
    response.end();
})

const server = app.listen(app.locals.port, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Syty Auction server is listening at http://%s:%s', host, port);
});