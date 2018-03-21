import React from 'react';
import SongInputForm from './SongInputForm.jsx';
import Songs from './Songs.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import ScatterChart from './ScatterChart.jsx';
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
