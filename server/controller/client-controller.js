/*
class ClientController {
    constructor(socket, name, room) {
        //should accept JSON as parameter and deconstruct here
        this.socket = socket;
        this.name = name;
        this.currentRoom = room;
        this.socketId = socket.id;
        this.test();
    }

    test(){
        console.log(this.socketId + " has joined room " + this.currentRoom);
    }

    getSocketId() {
        return this.socketId;
    }

    getName() {
        return this.name;
    }

    getRoom() {
        return this.currentRoom;
    }

    joinRoom() {
        //this.io.sockets.on()
    }
}


module.exports = ClientController;
*/
module.exports = (socket, name, room) => {
    var socket = socket,
    name = name,
    room = room;

    


    this.joinRoom = () => {
        io.emit('data', { msg: "testest"});
        alert("joining room");
    }
};
