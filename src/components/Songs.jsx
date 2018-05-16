import React, { Component } from "react";
import { Container, Card, Icon, Image, Popup, Embed } from "semantic-ui-react";
import axios from "axios";
import AlbumCanvas from "./AlbumCanvas.jsx";

export default class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        };
    }

    // _onMouseMove(e) {
    //   let y = event.clientY - event.target.offsetTop

    //   this.setState({ x: e.clientX, y });
    //   console.log(this.state.x, this.state.y)

    // }

    componentDidMount() {
        axios.get("/api/songs").then(songs => {
            console.log(songs.data);
            this.setState({ songs: songs.data });
        });
        // console.log(randomColor())
    }

    renderKey(song) {
        if (song.inkey) {
            return (
                <a>
                    <Icon name="music" />
                    {song.inkey.name}
                </a>
            );
        }
    }

    render() {
        const { x, y } = this.state;
        const style = {
            borderRadius: 0,
            border: "2px solid black",
            padding: "2em"
        };
        return (
            <Container
                style={{
                    padding: "2px",
                    display: "flex",
                    flexWrap: "wrap"
                }}
            >
                {/* <Embed
                    id="7Af6b9-yqa8"
                    placeholder={`https://img.youtube.com/vi/7Af6b9-yqa8/mqdefault.jpg`}
                    source="youtube"
                /> */}

                {/* <Image.Group size='small' style={{marginTop: '5px', backgroundColor: 'black'}}> */}
                {this.state.songs.map(song => {
                    return (
                        <AlbumCanvas
                            width={300}
                            images={[]}
                            song={song}
                            songnumber={song.number}
                        />
                    );
                    //   <Popup size='tiny' key={song._id} style={style} hoverable inverted trigger={<AlbumCanvas width={100} height={100} images={[]} song={song} songnumber={song.number} />}>
                    //     <Popup.Header>{song.title}</Popup.Header>
                    //     <Popup.Content>
                    //       <Embed style={{width:'340px', height: '160px'}}
                    //         id={song.videoid}
                    //         placeholder={`https://img.youtube.com/vi/${song.videoid}/mqdefault.jpg`}
                    //         source='youtube'
                    //       />
                    //       {this.renderKey(song)}
                    //     </Popup.Content>
                    //   </Popup>
                    // )
                    // })}
                    {
                        /* </Image.Group> */
                    }
                })}
            </Container>
        );
    }
    //   <Container>
    //     <Card.Group itemsPerRow={4}>
    //   {this.state.songs.map( (song) => {
    //     return (
    //       <Card key={song.number}>
    //         <Image src={`https://img.youtube.com/vi/${song.videoid}/mqdefault.jpg`} />
    //         <Card.Content>
    //           <Card.Header>
    //             {song.title}
    //           </Card.Header>
    //           <Card.Meta>
    //             <span className='date'>
    //               {new Date(song.date).toDateString()}
    //             </span>
    //           </Card.Meta>
    //           <Card.Description>
    //             {song.description}
    //           </Card.Description>
    //         </Card.Content>
    //         <Card.Content extra>
    //           {this.renderKey(song)}
    //           <br />
    //           <a href={`https://www.youtube.com/watch?v=${song.videoid}`}>
    //             <Icon name='video' />
    //             Watch
    //           </a>
    //         </Card.Content>
    //       </Card>
    //     )
    //   })}
    //   </Card.Group>
    // </Container>)
}
