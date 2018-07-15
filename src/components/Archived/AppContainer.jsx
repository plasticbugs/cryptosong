// import React, { Component } from 'react';
// import NavComponent from './NavComponent.jsx';

class AppContainer extends Component {
  
  render() {
    return (
      <section>
        <NavComponent />
        {this.props.children}
      </section>
    )
  }
}
