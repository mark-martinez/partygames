import React, { Component } from 'react';
import { MemoryRouter } from 'react-router-dom';
import GameContainer from './gamecontainer/game-container.js';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <MemoryRouter>
          <GameContainer/>
        </MemoryRouter>
      </div>
    );
  }
}