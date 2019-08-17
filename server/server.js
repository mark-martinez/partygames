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

var rooms = new Map();		//(roomCode, Room())
var clients = new Map();	//(socket.id, roomCode)

rooms.set('000', new Room('000'));

io.sockets.on('connection', (socket) => {
	socket.on('room', (message) => {
		connectRoom(socket, message.userName, message.roomCode);
	});

	socket.on('disconnect',	() => {
		handleDisconnect(socket);
	});

	socket.on('startGame', (roomCode) => {
		rooms.get(roomCode).startGame();
	});
});

function connectRoom(socket, name, code) {
	if (code == '000') code = validateRoomCode(); //'000' = create room
	

	//for some reason it's saying a duplicate doesn't exist
	if (!(rooms.has(code))) {
		rooms.set(code, new Room(code));
		console.log("NEW ROOM " + code);
	}
	rooms.get(code).addPlayer(socket, name, code);

	clients.set(socket.id, code);

	socket.join(code);
	socket.emit('updateRoomCode', code);
	io.to(code).emit('updatePlayers', rooms.get(code).getPlayers());

	console.log(socket.id + " " + name + " JOINED ROOM " + code);
}

function handleDisconnect(socket) {
	var room;	//should be a roomCode
	if (room = clients.get(socket.id)) {
		console.log(socket.id + " LEFT " + room);
		clients.delete(socket.id);

		if (rooms.size > 0) {
			rooms.get(room).removePlayer(socket);
			io.to(room).emit('updatePlayers', rooms.get(room).getPlayers());

			if (rooms.get(room).isEmpty()) {				
				console.log("ROOM " + room + " DELETED");
				rooms.delete(room);
			}
		}
	} else {
		console.log(socket.id + " not found");
	}
}

function validateRoomCode() {
	code = Math.floor(Math.random() * (900)+100);
	if (rooms.size > 0) {
		while (rooms.get(code)){
			code = Math.floor(Math.random() * (900)+100);
		}
		return code.toString();
	} else {
		return code.toString();
	}
}