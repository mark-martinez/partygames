var GameController = require('./controller/game-controller.js'),
ClientController = require('./controller/client-controller.js'),
Constants = require('./common/constants.js');

class Room {
	constructor(roomCode, io) {
		this.code = roomCode;
		this.gameController = new GameController.GameController(this);
		this.io = io;
		this.narrator = null;
	}
	
	messageHandler(message) {
		//switch statements that call class functions
		switch(message) {
			case Constants.ClientMessageType.START_GAME:
				this.startGame();
				break;
			case Constants.ClientMessageType.SELECT_PLAYER:
				break;
			case Constants.ClientMessageType.PROTECT_PLAYER:
				break;

		}
	}

	startGame() {
		if (this.gameController.getPlayers().length < 5) {
     		console.log(this.code + " DOES NOT HAVE ENOUGH CLIENTS");
		} else {
			this.gameController.start();
		}
	}
	
	addPlayer(socket, name, room) {
		this.gameController.addPlayer(new ClientController(socket, name, room));
	}

	removePlayer(socket) {
		this.gameController.removePlayer(socket);
	}

	getPlayers() {
		return this.gameController.getPlayers();
	}

	isEmpty() {
		if (this.gameController.getPlayers().length == 0) return true;
	}
	
	updateGameState(gameState) {
		this.io.to(this.code).emit(Constants.ServerMessageType.UPDATE_GAMESTATE, gameState);
	}

	updateClients() {
		this.io.to(this.code).emit(Constants.ServerMessageType.UPDATE_CLIENTS, this.gameController.getPlayers());
	}
}

module.exports = Room;