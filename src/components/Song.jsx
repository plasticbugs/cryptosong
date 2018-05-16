import React, { Component } from "react";
import axios from "axios";
import { Header, Container, Segment, Embed } from "semantic-ui-react";
import moment from "moment";

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
        return (
            <div>
                <Header
                    as="h1"
                    content={song.title}
                    subheader={moment(song.date).format("MMMM Do, YYYY")}
                />
                <Header as="h5" content={`SongADay number ${song.number}`} />
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
        );
    }
    render() {
        return (
            <Container text style={{ marginTop: "20px" }}>
                {this.state.done && this.renderSong()}
                {!this.state.done && <div>Loading</div>}
            </Container>
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
