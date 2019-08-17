class Client {
    constructor (name, room){
        this.name = name;
        this.room = room;
        this.role = '';
    }
    
    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setRole(role) {
        this.role = role;
    }

    getRole() {
        return this.role;
    }

    setRoom(room) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }
}

module.exports = Client;