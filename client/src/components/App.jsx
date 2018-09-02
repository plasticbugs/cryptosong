import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import SongInputForm from "./Forms/SongInputForm.jsx";
import SearchBy from './Navigate/SearchBy.jsx';
import Song from './Navigate/Song.jsx';
// import Collection from "./Forms/Utils/Collection.jsx";
// import ImportSongData from './Forms/Utils/ImportSongData.jsx';
import IsAdmin from './Forms/Utils/IsAdmin.jsx';
import Login from './Forms/Login.jsx';
import Log from './Forms/Utils/Log.jsx';

Log.info('Welcome to App.jsx', 'App.jsx');
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

      {/* edit routes (exported to EditPanel)

                <Route
                    path="/song/:id/edit"
                    render={props => (
                        <SongInputForm editing={true} {...props} />
                    )}
                />

                <Route
                    path="/instruments"
                    render={props => (
                        <Collection
                            {...props}
                            apiCollectionPath="/api/instruments"
                            collectionName="Instrument"
                        />
                    )}
                />
                <Route
                    path="/topics"
                    render={props => (
                        <Collection
                            {...props}
                            apiCollectionPath="/api/topics"
                            collectionName="Topic"
                        />
                    )}
                />
                <Route
                    path="/locations"
                    render={props => (
                        <Collection
                            {...props}
                            apiCollectionPath="/api/locations"
                            collectionName="Location"
                        />
                    )}
                />
                <Route
                    path="/inkeys"
                    render={props => (
                        <Collection
                            {...props}
                            apiCollectionPath="/api/inkeys"
                            collectionName="Key"
                        />
                    )}
                />
                <Route
                    path="/beards"
                    render={props => (
                        <Collection
                            {...props}
                            apiCollectionPath="/api/beards"
                            collectionName="Beard"
                        />
                    )}
                />
                <Route
                    path="/tags"
                    render={props => (
                        <Collection
                            {...props}
                            apiCollectionPath="/api/tags"
                            collectionName="Tag"
                        />
                    )}
                />
                <Route
                    path="/import-song-data"
                    render={props => (
                        <ImportSongData
                            {...props}
                        />
                    )}
                />

                <Route
                    path="/song/new"
                    render={props => <SongInputForm {...props} />}
                />
*/}

    </Switch>
  </BrowserRouter>
);

export default App;
