import React, { Component } from 'react';
import RoomSelector from '../roomselector';
import io from 'socket.io-client';

export default class GameContainer extends Component {
    constructor(props) {
      super(props);  
      this.state = {
        roomCode: "",
        userName: "tester"
      }
      this.handleCreate = this.handleCreate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmit = this.handleEmit.bind(this);
    }

    handleCreate() {
      //ping server to create room
      //return room code, set state
      //switch views
      this.setState({ roomCode: '000'}, this.handleEmit());
    }
  
    handleSubmit = (rc) => {
      this.setState({ roomCode: rc}, this.handleEmit());
    }

    handleEmit() {
      let socket = io("http://localhost:5000");
      socket.on('connect', () => {
        socket.emit('room', this.state.roomCode);
      });
    }
  
    render() {
        return (
          <div className="component-gamecontainer">
            <RoomSelector onSubmit={this.handleSubmit} onCreate={this.handleCreate}/>
          </div>
        );
      }
}