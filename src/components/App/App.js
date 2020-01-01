import React from 'react';

import './App.css';
import BussinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      sortedBy: 'best_match'
    };
    this.searchYelp = this.searchYelp.bind(this);
  }
  searchYelp(term, location, sortMode) {
    Yelp.search(term, location, sortMode).then(businesses => {
      this.setState({businesses: businesses});
    });
  }
  componentDidMount() {
    Yelp.searchNearYou().then(result => {
      result.map(business => {
          this.setState({
            businesses: [...this.state.businesses, business]
          });
      });
      this.setState({businesses: ['FIRSTLOAD', ...this.state.businesses]});
    });
  }
  render() {
    return (
      <div className="App">
        <div className="img-container">
        <div className="header">
          <h1 id='title'>TEA+</h1>
        </div>
        <SearchBar searchYelp={this.searchYelp} />
        <BussinessList businesses={this.state.businesses} />
        </div>

      </div>
    );
  }}
