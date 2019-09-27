import React, { Component } from 'react';
import UserBar from './userbar';
import './gamecontainer.css';
import RoomManager from './room_manager/room-manager.js';

export default class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {
        currentSocketId: '',
				userName: '',
				roomCode: ''
      }
    }
    this.setClient = this.setClient.bind(this);
  }

  setClient(data) {
    console.log("data: " + data.roomCode);
    this.setState({ client: { currentSocketId: data.socketId, userName: data.userName, roomCode: data.roomCode }});
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 nopadding">
            <UserBar client={this.state.client}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" align="center">
            <RoomManager setClient={this.setClient}/>
          </div>
        </div>
      </div>
    );
  }
}