import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SongInputForm from './SongInputForm.jsx';
import Songs from './Songs.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/song/new' render={(props) => <SongInputForm {...props} />} />
        <Route path='/song/:id/edit' render={(props) => <SongInputForm editing={true} {...props} />} />
        <Route path='/songs' render={(props) => <Songs {...props} />} />
      </Switch>
    </BrowserRouter>
  )
}

module.exports = App;
