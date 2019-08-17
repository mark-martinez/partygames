import React, { Component } from 'react';

var playerCount = 0;
var Players = (props) => {
    return <ul>{props.clients.map((client) => <li key={++playerCount}>{client}</li>)}</ul>
};

export default class PlayerList extends Component {
    render() {
        return (
            <div>
                <h1>Players:</h1>
                <Players clients={this.props.clients}/>
            </div>
        )
    }
}