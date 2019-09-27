import React, { Component } from 'react';

export default class GameLobby extends Component {
	constructor(props) {
		super(props);
		this.handleStart = this.handleStart.bind(this);
	}

	handleStart() {
		this.props.handleStart();
	}
	
	setGameData() {
		
	}

	render() {
		return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-8">
					<h1>Lobby <small>{this.props.gameData.gameType}</small></h1>
					<button onClick={this.handleStart}>Start</button>
				</div>
			</div>
		</div>
		);
	}
}