//shared file between server and client
//should always be the same

const Constants = {}

Constants.ClientMessageType = {
    CONNECT: "connectToRoom",
    DISCONNECT: "disconnectFromRoom",
    CREATEROOM: "createRoom",
    LEAVEROOM: "leaveRoom"
}

Constants.ServerMessageType = {

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

Constants.GameState = {
    
}

Constants.Roles = {
    VILLAGER: "roleVillager",
    MAFIA: "roleMafia",
    DOCTOR: "roleDoctor",
    DETECTIVE: "roleDetective"
}

module.exports = Constants;