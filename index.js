var SERVER_NAME = 'stationaryStore-api'
var PORT = 8000;
var HOST = '127.0.0.1';


var restify = require('restify')
  , stationaryStore = require('save')('stationaryStore')
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
})

server .use(restify.fullResponse()).use(restify.bodyParser())
