var GameController = require('./controller/game-controller.js'),
ClientController = require('./controller/client-controller.js');

class Room {
	constructor(roomCode, io) {
		this.code = roomCode;
		this.players = [];  //array of ClientController
		this.gameController = new GameController.GameController();
		this.io = io;
		this.listen();
	}

	startGame() {
		if (this.players.length < 5) {
     		console.log(this.code + " DOES NOT HAVE ENOUGH CLIENTS");
		} else {
      		this.gameController.start();
  
			for (var i=0; i<this.players.length; i++) {
			console.log(this.players[i].getName() + " is a " + this.players[i].getRole());
			}
		}
	}
	
	addPlayer(socket, name, room) {
		this.players.push(new ClientController(socket, name, room));
    	this.gameController.addPlayer(this.players[this.players.length-1]);
	}

	removePlayer(socket) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].getId() == socket.id){
				console.log(this.players[i].getName() + " HAS QUIT");
				this.players.splice(i, 1);
				break;
			}
		}
	}

	findPlayerName(socket) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].getId() == socket.id) {
				return this.players[i].getName();
			}
		}
	}

	getPlayers() {
		var playerNames = [];
		for (var i = 0; i < this.players.length; i++) {
			playerNames.push(this.players[i].getName());
    	}
		return playerNames;
	}

	isEmpty() {
		if (this.players.length == 0) return true;
	}
	  
	listen() {
	}
}

module.exports = Room;