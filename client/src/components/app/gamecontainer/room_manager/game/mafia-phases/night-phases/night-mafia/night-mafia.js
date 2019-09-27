import React from 'react';
import NightPhase from '../night-phase.js';
import Constants from '../../../../../../../../common/constants.js';

var playerCount = 0;
var MafiaMembers = (props) => {
    return (
        <div>
            <ul>{
                props.playerList.filter(player => {
                    console.log("role: " + player.client.userRole);
                    return player.client.userRole === Constants.Roles.MAFIA
                })
                .map((player) => 
                    <li key={++playerCount}>
                        <b>{player.client.userName} is a {player.client.userRole}.</b>
                    </li>
                
                )}
            </ul>
        </div>
    )
}

export default class NightMafia extends NightPhase {
    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.userData.userRole == Constants.Roles.MAFIA) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <h2>Night - Mafia's Turn</h2>
                        <MafiaMembers playerList={this.props.playerList}/>
                    </div>
                </div>
            )
        }
    }
}
