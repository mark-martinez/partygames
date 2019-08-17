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

}

Constants.GameState = {
    
}

module.exports = Constants;