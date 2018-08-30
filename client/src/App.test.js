import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import axois from 'axios';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
