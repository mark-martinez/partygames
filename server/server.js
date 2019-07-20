var express = require('express'),
app = express(),
server = require('http').createServer(app),
cors = require('cors'),
io = require('socket.io').listen(server),
Room = require('./room.js'),
Client = require('./controller/client-controller.js');

const port = process.env.port || 5000;
server.listen(port, () => {
  console.log("port is: " + port) + "\n";
});

app.use(cors({
  origin: "http://localhost:3005",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get('/', (req, res)  => {
  console.log('here at server port: ' + port);
  res.send('<h1>Hello World</h1>');
});

var rooms = []; //Room()
var clients = []; //{socket.id, roomCode} OR Client(io, name, room)

rooms.push(new Room('000'));  //placeholder

io.sockets.on('connection', (socket) => {
  //server should only communicate with Room, Room communicates to Controller
  //server only passes Client obj to Room to insert into Controller
  socket.on('room', (code) => {
    connectRoom(socket, code);
  });

  socket.on('disconnect', () => {
    disconnectClient(socket);
  });
});

//move functionality to clientcontroller
function connectRoom(socket, code) {  
  if (code === '000') code = validateRoomCode(); //'000' = create room

  if (rooms.length > 0) {
    if (!rooms.some(r => r.code == code)) {
          rooms.push(new Room(code));
          rooms[rooms.length - 1].addPlayer(socket);
      } else {
        for (var i = 0; i < rooms.length; i++) {
          if (rooms[i].code == code) {
            rooms[i].addPlayer(socket);
          }
          break;
        }
      }
  }
  socket.join(code);
  clients.push({ID: socket.id, room: code });
  console.log(socket.id + " joined " + code);
}

/*
function connectRoom(client) {  
  if (client.currentRoom === '000') client.currentRoom = validateRoomCode(); //'000' = create room

  if (rooms.length > 0) {
    if (!rooms.some(r => r.code == client.currentRoom)) {
          rooms.push(new Room(client.currentRoom));
          rooms[rooms.length - 1].addPlayer(client);
      } else {
        for (var i = 0; i < rooms.length; i++) {
          if (rooms[i].code == client.currentRoom) {
            rooms[i].addPlayer(client);
          }
          break;
        }
      }
  }
  client.joinRoom();
  //clients.push({ID: socket.id, room: code });
  //client.currentRoom = room;
  clients.push(client);
  console.log(socket.id + " joined " + code);
}
*/

function disconnectClient(socket) {
  for (var i = 0; i < clients.length; i++) {
    if (clients[i].ID == socket.id) {
      var room = clients[i].room;
      console.log(socket.id + " left " + room);
      clients.splice(i, 1);

      if (rooms.length > 0) {
        for (var j = 0; j < rooms.length; j++) {
          if (rooms[j].code == room) {
            rooms[j].removePlayer(socket);

            if (rooms[j].isEmpty()) {
              console.log("room " + rooms[j].code + " removed");
              rooms.splice(j, 1);
            }
            break;
          }
        }
      break;
      }
    }
  }
}

function validateRoomCode() {
  code = Math.floor(Math.random() * (900)+100);
  if (rooms.length > 0) {
    while (rooms.some(room => room.code == code)){
      code = Math.floor(Math.random() * (900)+100);
    }
    return code;
  } else {
    return code;
  }
}
