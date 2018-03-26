import React, { Component } from 'react';
import logo from './tools.svg';
import Bitrise from './bitrise.js';
import BuddyBuild from './buddybuild.js';
import Jenkins from './jenkins.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CI DASH</h1>
        </header>
        ***************

        ***************        
        <div className="bitrise">
          <Bitrise/>
        </div>
        ***************
        
        ***************        
        <div className="buddybuild">
          <BuddyBuild/>
        </div>
        ***************
        
        ***************        
        <div className="jenkins">
          <Jenkins/>
        </div>
      </div>
    );
  }
}

export default App;
