import React, { Component } from 'react';

export default class UserBar extends Component {
    render() {
        return (
            <div className="navbar navbar-expand-lg">
                <ul className="navbar-brand mb-0 h1">Party Games</ul>
                <ul className="nav navbar-nav ml-auto">
                    <b className="text-white">{this.props.client.userName} {this.props.client.roomCode}</b>
                </ul>
            </div>
        );
    }
}