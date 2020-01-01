import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sortedBy: 'best_match'}
    this.handleClick = this.handleClick.bind(this);
    this.handleSortedBy = this.handleSortedBy.bind(this);
  }
  handleClick(e) {
   const businessType = document.querySelector('#search-business').value;
   const businessLocation = document.querySelector('#location').value;
   this.props.searchYelp(businessType, businessLocation, this.state.sortedBy);
 }
 handleSortedBy(e) {
   this.setState({sortedBy: e.target.value});
 }
  render() {
    return(
      <div id="main-div">
        <div id="search-sort" onChange={this.handleSortedBy}>
          <label className="sortBy"><input type="radio" name="sortBy" value='best_match' />Best Match</label>
          <label className="sortBy"><input type="radio" name="sortBy" value='rating' />Highest Rated</label>
          <label className="sortBy"><input type="radio" name="sortBy" value='review_count' />Most Viewed</label>
        </div>

        <div className="search-inputs">
          <input id='search-business' className="text-input" type='text' name='term' placeholder='search' required />
          <input id='location' className="text-input" type='text' name='location' placeholder='where?' required />
          <button id="search-button" onClick={this.handleClick}>go</button>
        </div>
      </div>
    );
  }
}
