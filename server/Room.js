var GameController = require('./controller/game-controller.js');

class Room {
    constructor(roomCode) {
        this.code = roomCode;
        this.players = [];  //array of sockets
        //this.gameController = new GameController()
        //this.narrator = clients[0];
    }
    
    addPlayer(socket) {
        this.players.push(socket);
    }

    removePlayer(socket) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].id == socket.id){
                this.players.splice(i, 1);
            }
            break;
        }
    }

    isEmpty() {
        if (this.players.length == 0) return true;
    }
}

module.exports = Room;