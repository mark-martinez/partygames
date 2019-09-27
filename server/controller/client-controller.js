var Client = require('../model/data/client.js');

class ClientController {
    constructor(socket, name, room) {
        //should accept JSON as parameter and deconstruct here
        this.client = new Client(name, room);
        this.socket = socket;
        //this.socketHandler();
    }

    getId() {
        return this.socket.id;
    }

    getName() {
        return this.client.getName();
    }
    
    getRole() {
        return this.client.getRole();
    }
    
    setRole(role) {
        this.client.setRole(role);
    }
  
    socketHandler() {
        //this.io.sockets.on()
        this.socket.on('startGame', () => {
            console.log("inside here fromm " + this.socket.id);
        });
    }
}


module.exports = ClientController;