class Room {
    constructor(roomCode) {
        this.code = roomCode;
        this.clients = [];
        this.listen();
    }

    listen() {
        
    }
}

module.exports = Room;