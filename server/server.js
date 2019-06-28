var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var Room = require('./Room.js');
var Client = require('./controller/ClientController.js');

const port = process.env.port || 5000;
server.listen(port);

var allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.configure(() => {
  app.use(allowCrossDomain);
});

app.get('/', (req, res)  => {
  console.log('here at server port: ' + port);
  res.send('<h1>Hello Worldddd</h1>');
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