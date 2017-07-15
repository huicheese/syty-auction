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

require('./server/properties.js').setApp(app);
require('./server/dashboard.js').setApp(app);
require('./server/login.js').setApp(app);

require('./server/database.js').initialize();

app.ws('/updates', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('new connection established on /updates');
});


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

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'www', 'index.html'))
})
const server = app.listen(app.locals.port, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Syty Auction server is listening at http://%s:%s', host, port);
});