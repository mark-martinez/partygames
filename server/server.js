var express = require('express'),
app = express(),
server = require('http').createServer(app),
cors = require('cors'),
io = require('socket.io').listen(server),
wildcard = require('socketio-wildcard')(),
Room = require('./room.js'),
Constants = require('./common/constants.js');

io.use(wildcard);

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

rooms.set('000', new Room('000', null));

io.sockets.on('connection', (socket) => {
	socket.on('disconnect',	() => {
		handleDisconnect(socket);
	});

	socket.on("*", (packet) => {
		if (packet.data[0] == Constants.ClientMessageType.CONNECT) {
			connectRoom(socket, packet.data[1].userName, packet.data[1].roomCode, io);
		} else {
			console.log(packet);
			console.log(packet.data[1].roomCode);
			rooms.get((packet.data[1])).messageHandler(packet.data[0]);
		}
	});
/*
	socket.on(Constants.ClientMessageType.START_GAME, (roomCode) => {
		rooms.get(roomCode).startGame();
		//rooms.get(roomCode).messageHandler(event)
	});
	*/
});

function connectRoom(socket, name, code, io) {
	if (code == '000') code = validateRoomCode(); //'000' = create room	

	if (!(rooms.has(code))) {
		rooms.set(code, new Room(code, io));
		console.log("NEW ROOM " + code);
	}
	rooms.get(code).addPlayer(socket, name, code);
	clients.set(socket.id, code);

	socket.join(code);
	socket.emit(Constants.ServerMessageType.UPDATE_ROOMSTATE, code);
	io.to(code).emit(Constants.ServerMessageType.UPDATE_CLIENTS, rooms.get(code).getPlayers());
	
	console.log(socket.id + " " + name + " JOINED ROOM " + code);
}

function handleDisconnect(socket) {
	var room;	//roomCode
	if (room = clients.get(socket.id)) {
		console.log(socket.id + " LEFT " + room);
		clients.delete(socket.id);

		if (rooms.size > 0) {
			rooms.get(room).removePlayer(socket);
			io.to(room).emit(Constants.ServerMessageType.UPDATE_CLIENTS, rooms.get(room).getPlayers());

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