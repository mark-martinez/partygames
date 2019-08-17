import React, { Component } from 'react';
import io from 'socket.io-client';
import { Switch, Route , withRouter } from 'react-router-dom';
import RoomSelector from './roomselector';
import GameLobby from './gamelobby';
import UserBar from './userbar';
import './gamecontainer.css';

class GameContainer extends Component {
    constructor(props) {
      super(props);
      this.socket = null;
      this.state = {
        client: {
          userName: "",
          roomCode: ""
        },
        gameData: {
          gameType: "Mafia",
        },
        connectedClients: []
      }
      this.handleCreate = this.handleCreate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmit = this.handleEmit.bind(this);
      this.handleStart = this.handleStart.bind(this);
      this.renderSwitch = this.renderSwitch.bind(this);
    }

    connectSocket() {
      this.socket = io("http://192.168.0.35:5000");
      //let socket = io("https://partygames-server.herokuapp.com");
    }

    handleCreate(data) {
      this.setState({ client: { userName: data.userName, roomCode: '000' }}, this.handleEmit());
    }
  
    handleSubmit = (data) => {
      this.setState({ client: { userName: data.userName, roomCode: data.roomCode }}, this.handleEmit());
    }

    handleStart() {
      this.socket.emit('startGame', this.state.client.roomCode);
    }
    
    handleEmit() {
      this.connectSocket();

      this.socket.on('connect', () => {
        this.socket.emit('room', this.state.client);
        this.renderSwitch('gamelobby')
      });
      
      this.socket.on('updatePlayers', (data) => {
        this.setState({ connectedClients: data });
      });

      this.socket.on('updateRoomCode', (data) => {
        this.setState( prevState => {
          let client = Object.assign({}, prevState.client);
          client.roomCode = data;
          return { client };
        });
      });
    }

    renderSwitch(state) { //change to Constants.Phase
      switch(state) {
        case 'gamelobby':
          return this.props.history.push('/gamelobby');;
        default:
          return null;
      }
    }
    
    render() {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 nopadding">
                <UserBar client={this.state.client}/>
              </div>
              <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                <Switch>
                  <Route exact path='/' render={() => <RoomSelector onSubmit={this.handleSubmit} onCreate={this.handleCreate}/>}/>
                  <Route path='/gamelobby' render={() => <GameLobby data={this.state} playerList={this.state.connectedClients} gameData={this.state.gameData} handleStart={this.handleStart}/>}/>
               </Switch>
                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default withRouter(GameContainer);