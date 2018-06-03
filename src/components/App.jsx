import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SongInputForm from "./SongInputForm.jsx";
import Songs from "./Songs.jsx";
import Song from "./Song.jsx";
import Collection from "./Collection.jsx";
import ImportSongData from './ImportSongData.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/song/new"
                    render={props => <SongInputForm {...props} />}
                />
                <Route
                    path="/song/:id/edit"
                    render={props => (
                        <SongInputForm editing={true} {...props} />
                    )}
                />
                <Route path="/song/:id" render={props => <Song {...props} />} />
                <Route path="/songs" render={props => <Songs {...props} />} />
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
            </Switch>
        </BrowserRouter>
    );
};

module.exports = App;
