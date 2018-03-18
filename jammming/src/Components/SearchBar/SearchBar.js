import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

  }
  search(term) {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    })
  }
  // When return key is pressed in text box, trigger search click event
  onReturn(event) {
    if (event.keyCode === 13) {
      document.getElementById('btnSearch').click()}
  }

  render() {
    return (
        <div className="SearchBar">
          <input onChange={this.handleTermChange}
            placeholder="Enter A Song, Album, or Artist"
            onKeyDown={this.onReturn} />
          <a onClick={this.search}
            id="btnSearch"
            value="Search"
            >SEARCH</a>
        </div>
    );
  }
}

export default SearchBar
