import React, { Component } from 'react';
import '../../styles/global.css';

export default class Navigation extends Component {
  render() {
    // const number_of_songs = '3,666';
    return (
      <nav className="global-navigation">
        <div className="global-navigation-links">
          <span><a href="/">2009</a> (year one)</span>
        </div>
        <div>
          <h1 className="site-name">Song A Day World</h1>
          <h2 className="site-sub-name">
            By the one and only Jonathan Mann
          </h2>
        </div>
        {/* <div className="global-navigation-search">
          <input
            className="global-search-input icon-search"
            type="search"
            placeholder={`Search through ${number_of_songs} songs`}
          />
        </div> */}
      </nav>
    );
  }
};