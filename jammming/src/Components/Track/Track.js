import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction(isRemoval) {
    if(isRemoval) {
      return '+';
    }
    return '-';
  }
  render() {
    return (
      <div class="Track">
  <div class="Track-information">
    <h3>Name</h3>
    <p>Artist | Album</p>
  </div>
  <a class="Track-action">{this.renderAction(false)}</a>
</div>
);
  }
}

export default Track;
