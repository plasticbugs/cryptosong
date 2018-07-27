import React, { Component } from 'react';
import '../../styles/global.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const number_of_songs = '3,666';
    return (
      <nav className="global-navigation">
        <div className="global-navigation-links">
          <a href="/">All</a>
          <div style={{ cursor: 'pointer' }}>
            <span><a onClick={() => this.props.revealTagSelector(true)}>Show Tags</a> |</span>
            <span> <a onClick={() => this.props.revealTagSelector(false)}>Hide Tags</a></span>
          </div>
        </div>
        <div>
          <h1 className="site-name">Song A Day World</h1>
          <h2 className="site-sub-name">
                        By the one and only Jonathan Mann
          </h2>
        </div>
        <div className="global-navigation-search">
          <input
            className="global-search-input icon-search"
            type="search"
            placeholder={`Search through ${number_of_songs} songs`}
          />
        </div>
      </nav>
    );
  }
}
module.exports = Navigation;
