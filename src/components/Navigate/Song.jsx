import React, { Component } from "react";
import axios from "axios";
import { Header, Container, Segment, Embed } from "semantic-ui-react";
import AlbumCanvas from "./AlbumCanvas.jsx";
import Navigation from "./Navigation.jsx";
import moment from "moment";

import "../styles/song.scss";

class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            song: null
        };
    }

    componentDidMount() {
        const { match } = this.props;
        axios.get(`/api/song/${match.params.id}`).then(response => {
            this.setState({ song: response.data, done: true });
        });
    }

    renderSong() {
        const { song } = this.state;
        let instruments = [],
            tags = [],
            rarity = Math.floor(Math.random() * 100) + "%";

        song.instruments.map(instrument => {
            instruments.push(instrument.name);
        });

        song.tags.map(tag => {
            tags.push(tag.name);
        });

        return (
            <div>
                <a href={`/song/${song.number - 1}`} className="page-nav previous-song">
                    <span className="text">The Day Before</span>
                </a>
                <a href={`/song/${song.number + 1}`} className="page-nav next-song">
                    <span className="text">The Next Day</span>
                </a>

                <div className="song-header-container">
                    <AlbumCanvas
                        backgroundImage={"/" + song.imagePath}
                        song={song}
                        songnumber={song.number}
                        list={false}
                    />
                </div>
                <div className="song-content-container">
                    <div className="song-meta">
                        <h2 className="song-meta-title">Instruments</h2>
                        <p className="song-meta-content">
                            {instruments.join(", ")}
                        </p>

                        <h2 className="song-meta-title">Tags</h2>
                        <p className="song-meta-content">
                            { 
                                tags.map((tag, key) => {
                                    let url = `/songs/tag/${tag}`
                                    return  <span key={key}><a href={url}>{tag}</a>{tags.length == (key + 1)?" ":", "}</span>
                                })
                            }
                        </p>

                        <h2 className="song-meta-title">Location Written</h2>
                        <p className="song-meta-content">
                            {song.location.name}
                        </p>

                        <h2 className="song-meta-title">Mood</h2>
                        <p className="song-meta-content">{song.mood.name}</p>

                        <h2 className="song-meta-title">Topic</h2>
                        <p className="song-meta-content">{song.topic.name}</p>

                        <h2 className="song-meta-title">Key</h2>
                        <p className="song-meta-content">{song.inkey.name}</p>
                    </div>
                    <div className="rarity">
                        <div style={{ width: "200px", height: "200px" }}>
                            <div className="rarity-score">{rarity}</div>
                            <div className="rarity-title">Rarity Score</div>
                        </div>
                    </div>
                    <div className="song-content">
                        <h1 className="song-title">{song.title}</h1>
                        <h2 className="song-date">
                            {`Song ${song.number} | ${moment(song.date).format(
                                "MMMM Do, YYYY"
                            )}`}
                        </h2>

                        <p className="song-firsts">{song.firsts}</p>

                        <Embed
                            id={song.videoid}
                            placeholder={`https://img.youtube.com/vi/${
                                song.videoid
                            }/mqdefault.jpg`}
                            source="youtube"
                        />
                        <p className="song-description">{song.description}</p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Navigation />
                {this.state.done && this.renderSong()}
                {!this.state.done && <div>Loading</div>}
            </div>
        );
    }
}

module.exports = Song;
