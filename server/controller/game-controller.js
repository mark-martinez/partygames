var Constants = require('.././common/constants.js');

var GameController = {};

GameController.GameState = class {
    constructor() {
      this.phase = Constants.Phases.LOBBY;
      this.players = null;
      this.selectedPlayer = null;
      this.protectedPlayer = null;
    }
}

GameController.GameController = class {
    constructor(room) {
      this.gameState = new GameController.GameState;
      this.gameState.players = [];
      this.room = room;
    }

    start() {
      if (this.gameState.players.length > 4) {
        console.log("Game starting...");
        this.gameState.phase = Constants.Phases.STARTED;
        this.nextPhase();
      } else {
        console.log("Game must have 5 or more players.");
      }
    }

    end() {
      console.log("Ending game...");
      this.gameState.phase = Constants.Phases.LOBBY;
      this.gameState.selectedPlayer = null;
      this.gameState.protectedPlayer = null;

      for (var i = 0; i < this.gameState.players.length; i++) {
        this.gameState.players[i].setRole(null);
        this.room.updateClients();
      }
    }

    nextPhase() {
      switch(this.gameState.phase) {
        case Constants.Phases.STARTED:
          this.shuffleRoles();
          this.room.updateClients();
          this.gameState.phase = Constants.Phases.NIGHT_MAFIA;
          break;
        case Constants.Phases.NIGHT_MAFIA:
          //
          this.gameState.phase = Constants.Phases.NIGHT_DOCTOR;
          break;
        case Constants.Phases.NIGHT_DOCTOR:
          this.gameState.phase = Constants.Phases.NIGHT_DETECTIVE;
          break;
        case Constants.Phases.NIGHT_DETECTIVE:
          this.gameState.phase = Constants.Phases.DAY;
          break;
        case Constants.Phases.DAY:
          this.gameState.phase = Constants.Phases.VOTING;
          break;
        case Constants.Phases.VOTING:
          this.gameState.phase = Constants.Phases.LYNCH;
          break;
        case Constants.Phases.LYNCH:
          this.gameState.phase = Constants.Phases.NIGHT_MAFIA;
          break;
        default:
          this.gameState.phase = Constants.Phases.STARTED;
          break;
			}
			this.room.updateGameState(this.gameState.phase);
    }

    setSelectedPlayer(playerId) {
      for (var i = 0; i < this.gameState.players.length; i++) {
        if (this.gameState.players[i].getId() == playerId) {
          this.selectedPlayer = this.gameState.players[i];
        }
        break;
      }
    }

    setProtectedPlayer(playerId) {
      for (var i = 0; i < this.gameState.players.length; i++) {
        if (this.gameState.players[i].getId() == playerId) {
          this.protectedPlayer = this.gameState.players[i];
        }
        break;
      }
    }

    getState() {
      return this.gameState;
    }

    getPlayers() {
      var playerList = [];
      
      for (var i = 0; i < this.gameState.players.length; i++) {        
        playerList.push(
        {
          id: this.gameState.players[i].getId(), 
          client: {
            userName: this.gameState.players[i].getName(), role: this.gameState.players[i].getRole()}
          }
        );
      }
      
      return playerList;
    }

    addPlayer(player) {
      this.gameState.players.push(player);
      this.room.updateClients();
    }

    removePlayer(socket) {
      for (var i = 0; i < this.gameState.players.length; i++) {
        if (this.gameState.players[i].getId() == socket.id) {
          this.gameState.players.splice(i, 1);
        }
      }
    }

    getRole() {
    }

    listRoles() {
      for (var i=0; i<this.gameState.players.length; i++) {
        console.log(this.gameState.players[i].getName() + " is a " + this.gameState.players[i].getRole());
      }
    }

    shuffleRoles() {
      if (this.gameState.phase = Constants.Phases.STARTED) {
        //i should change if narrator

        var playerSize = this.gameState.players.length;
        var mafiaSize = Math.round(playerSize * 0.25);

        this.gameState.players = this.shuffleArray(this.gameState.players);

        for (var i = 0; i < mafiaSize; i++) {
            this.gameState.players[i].client.setRole(Constants.Roles.MAFIA);
        }
        this.gameState.players[mafiaSize].client.setRole(Constants.Roles.DETECTIVE);
        this.gameState.players[mafiaSize+1].client.setRole(Constants.Roles.DOCTOR);
        for (var i = mafiaSize+2; i < playerSize; i++) {
            this.gameState.players[i].client.setRole(Constants.Roles.VILLAGER);
        }
      }
    }

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
}

module.exports = GameController;