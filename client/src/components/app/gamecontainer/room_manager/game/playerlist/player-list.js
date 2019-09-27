import React, { Component } from 'react';

var playerCount = 0;
var Players = (props) => {
    return <ul>{
        props.clients.map((client) => 
            <li key={++playerCount}>
                <b>{client.client.userName} { props.isRolesVisible ? <small>{client.client.role}</small> : null }</b>
            </li>
        )}</ul>
};

export default class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRolesVisible: true, //for testing purposes
            selectedPlayer: ''
        }
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
    }

    handlePlayerClick(e) {
        console.log("here: " + e.target.value);
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Players:</h1>
                <div align="left">
                    <Players clients={this.props.playerList} isRolesVisible={this.state.isRolesVisible}/>
                </div>
            </div>
        )
    }
}