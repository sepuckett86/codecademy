import React from 'react';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <Track />
        <div className="Track">
          <div className="Track-information">
            <h3>Tiny Dancer</h3>
            <p>Elton John | Madman Across The Water</p>
          </div>
          <a className="Track-action">+</a>
        </div>
        <div className="Track">
          <div className="Track-information">
            <h3>Tiny Dancer</h3>
            <p>Tim McGraw | Love Story</p>
          </div>
          <a className="Track-action">+</a>
        </div>
        <div className="Track">
          <div className="Track-information">
            <h3>Tiny Dancer</h3>
            <p>Rockabye Baby! | Lullaby Renditions of Elton John</p>
          </div>
          <a className="Track-action">+</a>
        </div>
        <div className="Track">
          <div className="Track-information">
            <h3>Tiny Dancer</h3>
            <p>The White Raven | Tiny Dancer</p>
          </div>
          <a className="Track-action">+</a>
        </div>
        <div className="Track">
          <div className="Track-information">
            <h3>Tiny Dancer - Live Album Version</h3>
            <p>Ben Folds | Ben Folds Live</p>
          </div>
          <a className="Track-action">+</a>
        </div>
      </div>
    );
  }
}

export default TrackList;
