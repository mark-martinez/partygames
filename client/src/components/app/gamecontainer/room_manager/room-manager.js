import React, { Component } from 'react';
import Game from './game/game.js';
import { MemoryRouter } from 'react-router-dom';
import io from 'socket.io-client';
import Constants from '../../../../common/constants.js';

export default class RoomManager extends Component {
	constructor(props) {
		super(props);
    	this.socket = null;
		this.state = {
			isVisible: true,
			roomInputVisible: false,
			connectedClients: [],
			gameData: {
				gameType: '',
				gameState: ''
			},
			userData: {
				socketId: '',
				userName: 'Username',
				userRole: '',
				roomCode: '000',
				isLeader: false
			}
		}
		this.handleJoin = this.handleJoin.bind(this);
		this.handleStart = this.handleStart.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEmit = this.handleEmit.bind(this);
		this.connectSocket = this.connectSocket.bind(this);
	}

	updateParentClient() {
		console.log("atm: " + this.state.userData.socketId  + this.state.userData.userName  + this.state.userData.userRole +  + this.state.userData.roomCode);
		this.props.setClient(this.state.userData);
	}

	connectSocket() {
		this.socket = io("http://192.168.0.35:5000");
		//let socket = io("https://partygames-server.herokuapp.com");
	}
	
	handleEmit() {
		this.connectSocket();

		this.socket.on('connect', () => {
			this.socket.emit(Constants.ClientMessageType.CONNECT, this.state.userData);
			this.setState({ userData: {...this.state.userData, socketId: this.socket.id}});
			this.setState({ isVisible: false });
		});
		
		this.socket.on(Constants.ServerMessageType.UPDATE_CLIENTS, (data) => {
			for (var i = 0; i < data.length; i++) {
				if (data[i].id === this.socket.id) {
					this.setState({ userData: {
						socketId: data[i].id,
						userName: this.state.userData.userName,
						userRole: data[i].client.role,
						roomCode: this.state.userData.roomCode
					}});
				}
			}
			this.setState({ connectedClients: data });
			//need to update self
		});

		this.socket.on(Constants.ServerMessageType.UPDATE_ROOMSTATE, (data) => {
			this.setState({ userData: {...this.state.userData, roomCode: data}});
			this.updateParentClient();
		});

		this.socket.on(Constants.ServerMessageType.UPDATE_GAMESTATE, (state) => {
			console.log("phase is: " + state);
			//pass state to Game
			this.setState({ gameData: { gameType: "Mafia", gameState: state } });
		});
	}

	handleJoin(e) {
		if ((this.state.roomInputVisible === true) && (this.state.roomCode !== '000')) {
			e.preventDefault();
			//text validate
			this.handleEmit();
		} else {
			this.setState({ roomInputVisible: !this.state.roomInputVisible });
		}
	}

	handleStart() {
		this.socket.emit(Constants.ClientMessageType.START_GAME, this.state.userData.roomCode);
	}

	handleSend(socketId, messageType) {
		if (messageType === Constants.ClientMessageType.SELECT_PLAYER) {
			this.socket.emit(Constants.ClientMessageType.SELECT_PLAYER, socketId);
		} else if (messageType === Constants.ClientMessageType.PROTECT_PLAYER) {
			this.socket.emit(Constants.ClientMessageType.PROTECT_PLAYER, socketId);
		} else {
			console.log("Must specify Client Message Type");
		}
	}

	handleChange(e) {
		if (e.target.type === "text") {
			this.setState({ userData: {...this.state.userData, userName: e.target.value }});
		}		
		if (e.target.type === "number") {
			if (e.target.value === "") {			
				this.setState({ userData: {...this.state.userData, roomCode: '000' }});
			} else {
				this.setState({ userData: {...this.state.userData, roomCode: e.target.value }});
			}
		}
	}

	render() {
		return (
			<div className="container-fluid">
				{
					this.state.isVisible
					?				
						<div className="component-roomselector">
							<form onSubmit={this.handleJoin}>
								<input type="text" ref={(ref) => this.code = ref} maxLength="10" name="input-name" onChange={this.handleChange} placeholder={this.state.userData.userName}/>
							</form>
							<button onClick={this.handleEmit}>Create</button><br/>
							<button onClick={this.handleJoin}>Join</button>
							{
								this.state.roomInputVisible 
								?   <form onSubmit={this.handleJoin}>
										<input type="number" ref={(ref) => this.code = ref} maxLength="3" name="input-room" onChange={this.handleChange} placeholder={this.state.userData.roomCode}/>
										</form>
								: null
							}
						</div>
					: 
					<div>
						<MemoryRouter>
							<Game userData={this.state.userData} playerList={this.state.connectedClients} gameData={this.state.gameData} handleStart={this.handleStart}/>
						</MemoryRouter>
					</div>
				}				
			</div>
		);
	}
}