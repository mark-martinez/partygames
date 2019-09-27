import React, { Component } from 'react';
import NightPhase from '../night-phase.js';

export default class NightMafia extends NightPhase {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h2>Night Mafia</h2>
                </div>
            </div>
        )
    }
}
