var Constants = require('.././common/constants.js');

var GameController = {};

GameController.GameState = class {
    constructor() {
      this.phase = '';
      this.players = null;
      this.selectedPlayer = null;
    }
}

GameController.GamePlayer = class {
    constructor(name, role) {
      this.name = name;
      this.role = role;
    }

    getName() {
      return this.name;
    }

    setName(name) {
      this.name = name;
    }

    getRole() {
      return this.role;
    }

    setRole(role) {
      this.role = role;
    }
}

GameController.GameController = class {
    constructor() {
      this.gameState = new GameController.GameState;
      this.gameState.players = [];
    }

    start() {
      if (this.gameState.players.length > 4) {
        console.log("Game Starting...");
        this.gameState.phase = Constants.Phases.STARTED;
        this.shuffleRoles();
        this.nextPhase();
      } else {
        console.log("Game must have 5 or more players.");
      }
    }

    end() {
        
    }

    nextPhase() {
      switch(this.gameState.phase) {
        case Constants.Phases.STARTED:
          this.gameState.phase = Constants.Phases.NIGHT_MAFIA;
          break;
        case Constants.Phases.NIGHT_MAFIA:
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
    }

    getState() {
      return this.gameState;
    }

    addPlayer(p) {
      //this.gameState.players.push(new GameController.GamePlayer(p.getName(), null));
      this.gameState.players.push({client: p, role: null});
    }

    removePlayer(player) {
        //this.gameState.players.delete(player);
    }

    getRole() {
      //temp
      for (var i = 0; i<this.gameState.players.length; i++) {
          console.log("name: " + this.gameState.players[i].client.getName() +
                      " role: " + this.gameState.players[i].client.getRole());
      }
    }

    shuffleRoles() {
      if (this.gameState.phase = Constants.Phases.STARTED) {
        //i should change if narrator

        var playerSize = this.gameState.players.length;
        var mafiaSize = Math.round(playerSize * 0.25);

        this.shuffleArray(this.gameState.players);

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