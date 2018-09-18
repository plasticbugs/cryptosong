import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import SongInputForm from "./Forms/SongInputForm.jsx";
import Log from './Global/Log.js';
import SearchBy from './Navigate/SearchBy.jsx';
import Song from './Navigate/Song.jsx';
// import Collection from "./Forms/Utils/Collection.jsx";
// import ImportSongData from './Forms/Utils/ImportSongData.jsx';
import IsAdmin from './Forms/Utils/IsAdmin.jsx';
import Login from './Forms/Login.jsx';

import '../styles/songs.css';

Log.info('We are now using debug via Log for frontend logging in dev');
Log.error('error example');
Log.warn('warn example');
Log.info('info example');
Log.results('results example');
Log.trace('trace example');
Log.silly('😜 silly example');

const App = () => (
  <BrowserRouter>
    <Switch>

      {/* song detail page route */}
      <Route path="/song/:id" render={props => <Song {...props} />} />

      {/* songs by tag route */}
      <Route
        path="/songs/tag/:tagname"
        render={props => (
          <SearchBy
            {...props}
            filterBy="tags"
          />
                    )
                }
      />

      {/* login route for admin */}
      <Route
        path="/admin/login"
        render={props => (
          <Login
            path="/admin"
            {...props}
          />
                    )}
      />

      {/* route for admin edit options */}
      <Route
        path="/admin/edit"
        render={props => (
          <IsAdmin
            {...props}
            path="/admin/edit"
          />
                    )}
      />

      {/* change password route for admin */}
      <Route
        path="/admin/change_password"
        render={props => (
          <IsAdmin
            {...props}
            path="/admin/change_password"
          />
                    )}
      />

      {/* add new route for admin */}
      <Route
        path="/admin/add_admin"
        render={props => (
          <IsAdmin
            {...props}
            path="/admin/add_admin"
          />
                    )}
      />

      {/* route for admin edit options */}
      <Route
        path="/admin/logout"
        render={props => (
          <IsAdmin
            {...props}
            path="/admin/logout"
          />
                    )}
      />

      {/* route for admin main options */}
      <Route
        path="/admin"
        render={props => (
          <IsAdmin
            {...props}
            path="/admin"
          />
                    )}
      />

      {/* or else display all songs */}
      <Route
        path="/"
        render={props => (
          <SearchBy
            filterBy={false}
            {...props}
          />
                    )
                }
      />

    </Switch>
  </BrowserRouter>
);
export default App;
