import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SongInputForm from "./SongInputForm.jsx";
import SearchBy from "./SearchBy.jsx";
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
                {/* songs by tag route */}
                <Route 
                    path="/songs/tag/:tagname" 
                    render={props => (
                        <SearchBy 
                            {...props} 
                            filterBy={"tags"} 
                        />
                    )
                } 
                />   
                {/* routes that display all songs */}
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

                {/* songs by all tags route */}
                <Route 
                    path="/songs" 
                    render={props => (
                        <SearchBy
                            filterBy={false}
                            {...props}
                        />
                    )
                } 
                />

                {/* song detail page route */}
                <Route path="/song/:id" render={props => <Song {...props} />} />

                <Route
                    path="/song/:id/edit"
                    render={props => (
                        <SongInputForm editing={true} {...props} />
                    )}
                />
                
                {/* edit routes */}
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
