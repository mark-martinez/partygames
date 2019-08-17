var express = require('express'),
app = express(),
server = require('http').createServer(app),
cors = require('cors'),
io = require('socket.io').listen(server),
Room = require('./room.js');

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

var rooms = []; //Room()	//should instead be a map
//map allows for using room a = rooms.get(code) and removing for loop iteration
var clients = new Map();

rooms.push(new Room('000'));  //placeholder

io.sockets.on('connection', (socket) => {
	socket.on('room', (message) => {
		connectRoom(socket, message.userName, message.roomCode);
	});

	socket.on('disconnect', () => {
		disconnectClient(socket);
	});
	
	socket.on('startGame', (roomCode) => {
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].code == roomCode) {
				rooms[i].startGame();
			}
		}
	});

	//socket on(MESSAGE.STATE.) 
});

function connectRoom(socket, name, code) {
	if (code === '000') code = validateRoomCode(); //'000' = create room
	var roomIndex;
	var flag = false;

	if (rooms.length > 0) {
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].code == code) {
				roomIndex = i;
				flag = true;
				break;
			}
		}
		if (!flag) {
			rooms.push(new Room(code));
			console.log("NEW ROOM " + code);
			roomIndex = rooms.length-1;
		}
	}
	
	rooms[roomIndex].addPlayer(socket, name, code);
	clients.set(socket.id, code);

	socket.join(code);
	socket.emit('updateRoomCode', code);
	io.to(code).emit('updatePlayers', rooms[roomIndex].getPlayers());

	console.log(socket.id + " " + name + " JOINED ROOM " + code);
}

function disconnectClient(socket) {
	var room;
	if (room = clients.get(socket.id)) {
		console.log(socket.id + " LEFT " + room);
		clients.delete(socket.id);

		if (rooms.length > 0) {
			for (var i = 0; i < rooms.length; i++) {
				if (rooms[i].code == room) {          
					rooms[i].removePlayer(socket);
					io.to(rooms[i].code).emit('updatePlayers', rooms[i].getPlayers());

					if (rooms[i].isEmpty()) {
						console.log("ROOM " + room + " DELETED")
						rooms.splice(i, 1);
						break;
					}
				}
			}
		}
	} else {
		console.log(socket.id + " not found");
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