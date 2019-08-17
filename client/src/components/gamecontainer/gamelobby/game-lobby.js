import React, { Component } from 'react';
import PlayerList from '../playerlist';

export default class GameLobby extends Component {
    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
    }

    handleStart() {
        this.props.handleStart();
    }

    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h1>{this.props.data.gameData.gameType}<small> {this.props.data.client.roomCode}</small></h1>
                    <button onClick={this.handleStart}>Start</button>
                </div>
                <div className="col-lg-4">
                    <PlayerList clients={this.props.playerList}/>
                </div>
            </div>
        </div>
        );
    }
}