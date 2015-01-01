
var http = require('http'),
  socketio = require('socket.io'),
  osc = require('osc.io'),
  server = http.createServer(),
  io = socketio.listen(server);


osc(io);
server.listen(8000);

//var server = io.connect('http://localhost/osc/servers/8000');

server.on('ping', function (message) {
  console.log("Ping Received");
  console.log(message);
});


server.on('*', function (message) {
  console.log("Message Received");
  console.log(message);
});


