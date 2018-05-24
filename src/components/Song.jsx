import React, { Component } from "react";
import axios from "axios";
import { Header, Container, Segment, Embed } from "semantic-ui-react";
import AlbumCanvas from "./AlbumCanvas.jsx";
import Navigation from "./Navigation.jsx";
import moment from "moment";

import "../styles/song.scss";

// const Song = ({ match }) => {
//   const id = match.params.id;
//   axios.get('/api/song/${id}')
//   .then(response => {
//     return (
//       <div>
//         {response.data.title}
//       </div>
//     )
//   })
//   // return (
//   //   <div>{match.params.id}</div>
//   // )
// }
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
            tags = [];

        song.instruments.map(instrument => {
            instruments.push(instrument.name);
        });

        song.tags.map(tag => {
            tags.push(tag.name);
        });

        return (
            <div>
                <div className="song-header-container">
                    <AlbumCanvas
                        width={300}
                        images={[]}
                        song={song}
                        songnumber="song.number"
                        list={false}
                    />
                </div>
                <div className="song-content-container">
                    <div className="song-meta">
                        <table>
                            <tr>
                                <td>Instruments:</td>
                                <td>{instruments.join(", ")}</td>
                            </tr>
                            <tr>
                                <td>Tags:</td>
                                <td>{tags.join(", ")}</td>
                            </tr>
                            <tr>
                                <td>Firsts:</td>
                                <td>{song.firsts}</td>
                            </tr>
                            <tr>
                                <td>Location it was written:</td>
                                <td>{song.location.name}</td>
                            </tr>
                            <tr>
                                <td>mood:</td>
                                <td>{song.mood.name}</td>
                            </tr>
                            <tr>
                                <td>Topic:</td>
                                <td>{song.topic.name}</td>
                            </tr>
                            <tr>
                                <td>Key:</td>
                                <td>{song.inkey.name}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="rarity">27%</div>
                    <div className="song-content">
                        <Header
                            as="h1"
                            content={song.title}
                            subheader={moment(song.date).format(
                                "MMMM Do, YYYY"
                            )}
                        />
                        <Header
                            as="h5"
                            content={`SongADay number ${song.number}`}
                        />
                        <p>
                            {song.description}
                            <a href={``} />
                        </p>
                        <Embed
                            style={{ width: "640px", height: "360px" }}
                            id={song.videoid}
                            placeholder={`https://img.youtube.com/vi/${
                                song.videoid
                            }/mqdefault.jpg`}
                            source="youtube"
                        />
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
        // const { match } = this.props;
        // return (
        //   <div>
        //     {match.params.id}
        //   </div>
        // )
    }
}

module.exports = Song;
