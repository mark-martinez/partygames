//shared file between server and client

const Constants = {}

Constants.ClientMessageType = {
    CONNECT: "connectToRoom",
    DISCONNECT: "disconnectFromRoom",
    CREATE_ROOM: "createRoom",
    LEAVE_ROOM: "leaveRoom",
    START_GAME: "startGameRequest",
    SELECT_PLAYER: "selectThisPlayer",
    PROTECT_PLAYER: "protectThisPlayer"
}

Constants.ServerMessageType = {
    UPDATE_GAMESTATE: "updatingGameState",
    UPDATE_CLIENTS: "updatingConnectedClients",
    UPDATE_ROOMSTATE: "updatingRoomState"
}

Constants.Phases = {
    LOBBY: "gameNotStarted",
    STARTED: "gameStarted",
    MEETING: "gameMeeting",
    NIGHT_MAFIA: "gameNightMafia",
    NIGHT_DOCTOR: "gameNightDoctor",
    NIGHT_DETECTIVE: "gameNightDetective",
    DAY: "gameDayTime",
    VOTING: "gameVotingTime",
    DEFENSE: "gameDefenseTime",
    LYNCH: "gameLynchingTime"
}

Constants.Roles = {
    VILLAGER: "roleVillager",
    MAFIA: "roleMafia",
    DOCTOR: "roleDoctor",
    DETECTIVE: "roleDetective"
}

module.exports = Constants;