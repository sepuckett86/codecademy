import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: '',
      playlistName: 'User Playlist',
      playlistTracks: [
        {name: 'A',
        artist: 'X',
        album: 'Alb1',
        id: '1'},
        {name: 'B',
        artist: 'Y',
        album: 'Alb2',
        id: '2'},
        {name: 'C',
        artist: 'Z',
        album: 'Alb3',
        id: '3'}],
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let trackStored = false;
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      if (track.id === this.state.playlistTracks[i].id) {
        trackStored = true;
      }
    }
    if (!trackStored) {
      this.setState({
        playlistTracks: this.state.playlistTracks.push(
        {name: track.name,
         artist: track.artist,
         album: track.album,
         id: track.id})
       });
    }
    }


  removeTrack(track) {
    let trackNo = '';
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      if (track.id === this.state.playlistTracks[i].id) {
        trackNo = i;
      }};
    let playlistTracksHere = this.state.playlistTracks;
    playlistTracksHere.splice(trackNo, 1);
    this.setState({
        playlistTracks: playlistTracksHere
       });
  }


  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
        </header>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
