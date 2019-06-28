class ClientController {
    constructor(clientJSON) {
        //should accept JSON as parameter and deconstruct here
        this.name = JSON.parse(clientJSON.room);
        this.socketId = id;
        this.currentRoom = room;
    }
}
