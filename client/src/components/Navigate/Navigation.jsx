import React, { Component } from 'react';
import '../../styles/global.css';

export default class Navigation extends Component {
  render() {
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
      </nav>
    );
  }
};