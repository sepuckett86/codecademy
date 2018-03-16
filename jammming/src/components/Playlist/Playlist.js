import React from 'react';
import './Playlist.css';

class Playlist extends React.Component {
  render() {
    return(
      <div className="Playlist">
        <input value='New Playlist' />
        <div className="TrackList">
          <div className="Track">
            <div className="Track-information">
              <h3>Stronger</h3>
              <p>Britney Spears | Oops!... I Did It Again</p>
            </div>
            <a className="Track-action">-</a>
          </div>
          <div className="Track">
            <div className="Track-information">
              <h3>So Emotional</h3>
              <p>Whitney Houston | Whitney</p>
            </div>
            <a className="Track-action">-</a>
          </div>
          <div className="Track">
            <div className="Track-information">
              <h3>It's Not Right But It's Okay</h3>
              <p>Whitney Houston | My Love Is Your Love</p>
            </div>
            <a className="Track-action">-</a>
          </div>
        </div>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
