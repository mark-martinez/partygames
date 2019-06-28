var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Room = require('./Room.js');
var Client = require('./controller/ClientController.js');
const port = process.env.port || 3000;

server.listen(port);

app.get('/', (req, res)  => {
  console.log('here at server' + port);
  res.end('<h1>Hello World</h1>');
});

var rooms = [];
var clients = [];

io.sockets.on('connection', (socket) => {
  socket.on('room', (code) => {
    //clients.push(new Client(clientInfo));

    if (code === '000'){
      ///'000' indicates user wants to create room
      code = validateRoomCode();
    }
    var newRoom = new Room(code);
    rooms.push(newRoom);
    socket.join(code);
    console.log(socket.id + " joined " + code);
  });

  //handle leave
  socket.on('disconnect', () => {
    console.log(socket.id + " left ");
    //remove from room
  });
});

function validateRoomCode() {
  code = Math.floor(Math.random() * (900)+100);
  var flag = false;
  if (rooms.length != 0){
  rooms.forEach(e => {
    if (rooms[e].Code !== code) {      
        return code;
      } else {
        return code = Math.floor(Math.random() * (900)+100);
      }
    });
  } else {
    return code = Math.floor(Math.random() * (900)+100);
  }
}