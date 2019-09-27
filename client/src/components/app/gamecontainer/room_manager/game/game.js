import React, { Component } from 'react';
import { Switch, Route , withRouter } from 'react-router-dom';
import PlayerList from './playerlist/player-list.js';
import GameLobby from './gamelobby/game-lobby.js';
import NightMafia from './mafia-phases/night-phases/night-mafia/night-mafia.js';
import Constants from '../../../../../common/constants.js';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {
				socketId: '',
				userName: '',
				userRole: '',
				roomCode: ''
			}
		}
		this.handleStart = this.handleStart.bind(this);
		this.renderSwitch = this.renderSwitch.bind(this);
		this.renderSwitch();
	}

	renderSwitch() {
		switch(this.props.gameData.gameState) {
			case Constants.Phases.LOBBY:
				return <GameLobby gameData={this.props.gameData} handleStart={this.handleStart}/>
			case Constants.Phases.NIGHT_MAFIA:
				return <NightMafia userData={this.props.userData} gameData={this.props.gameData} playerList={this.props.playerList}/>
			default:
				return <GameLobby gameData={this.props.gameData} handleStart={this.handleStart}/>
		}
	}

	handleStart() {
		this.props.handleStart();
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-10">
						{this.renderSwitch()}
					</div>
					<div className="col-lg-2">
						<PlayerList playerList={this.props.playerList}/>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Game);