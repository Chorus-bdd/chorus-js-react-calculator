import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
  constructor(props) {
    super(props);
    
    this.state = {
        myText : 'Nick'
    }
  }
    
  setName(newName) {
      this.setState({ myText: newName })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React {this.state.myText}</h1>
        </header>
        <p className="App-intro">
          To get started Nick, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
