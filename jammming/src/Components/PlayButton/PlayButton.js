import React from 'react';
import './PlayButton.css';

class PlayButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    let trackID = this.props.id.toString();
    // Check if track sample is available
    if (this.props.sample === null) {
      return alert("Track sample not available")
    }
    // If song isn't playing
    else if (this.props.playing === 'none') {
      if (document.getElementById(trackID).paused) {
        document.getElementById(trackID).play();
        this.props.isPlaying(trackID);

      } else {
        document.getElementById(trackID).pause();
        this.props.isPlaying('none');
      }
    }
    // If song is playing
    else {
      // Check if song playing is same song you clicked on
      if (trackID === this.props.playing) {
        document.getElementById(trackID).pause();
        this.props.isPlaying('none');
      }
      else if (document.getElementById(this.props.playing) === null) {
        document.getElementById(trackID).play();
        this.props.isPlaying(trackID);
      }
      else {
        document.getElementById(this.props.playing).pause();
        document.getElementById(trackID).play();
        this.props.isPlaying(trackID);

      }
    }
  }

  render() {
    return(
      <div>
      <audio id={this.props.id} src={this.props.sample}>
        <p>If you are reading this, it is because your browser does not support the audio element.</p>
      </audio>
      <button onClick={this.handleClick}><i className="fas fa-play"></i></button>
      </div>
      )
  }
}

export default PlayButton;
