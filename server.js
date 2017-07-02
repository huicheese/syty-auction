const express = require('express');
const enableWs = require('express-ws');
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();
const wsInstance = enableWs(app);
 
const compiler = webpack(webpackConfig);

const bodyParser = require('body-parser')
app.use(bodyParser.json());

var cookieParser = require('cookie-parser')
app.use(cookieParser())

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
 
app.ws('/ws/submit', (ws, request) => {
  ws.on('message', msg => {
    console.log('Server received: ' + msg)
  })
  //send snapshot
})

app.post('/login', (request, response) => {
  console.log(request.cookies.authentication)
  if (request.cookies.authentication === undefined) {
    let id = Math.random().toString()
    id = id.substring(2, id.length)
    response.cookie('authentication', id)
  }
  response.end()
})

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
  console.log("weird keyboard!")
  response.sendFile(path.resolve(__dirname, 'www', 'index.html'))
})

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});