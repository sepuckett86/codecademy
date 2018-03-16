import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Results from './components/Results/Results';
import Playlist from './components/Playlist/Playlist';

class App extends Component {
  render() {
    return (
      <div>
      <div className="App">
        <header className="App-header">
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
        </header>
        <SearchBar />
        <div className="App-playlist">
          <Results />
          <Playlist />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
