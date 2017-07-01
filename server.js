const express = require('express');
const enableWs = require('express-ws');
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();
enableWs(app)
 
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
 
app.ws('/ws/submit', (ws, request) => {
  ws.on('message', msg => {
    console.log('Server received: ' + msg)
  })
})

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'www', 'index.html'))
})

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});