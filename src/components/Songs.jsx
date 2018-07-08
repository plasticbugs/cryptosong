import React, { Component } from "react";
import { Container, Card, Icon, Image, Popup, Embed } from "semantic-ui-react";
import axios from "axios";
import AlbumCanvas from "./AlbumCanvas.jsx";
import Navigation from "./Navigation.jsx";
import TagSelector from "./TagSelector.jsx";

import "../styles/songs.scss";

class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            tagSelector: false,
        };
        this.tagGrab = this.tagGrab.bind(this);
        this.revealTagSelector = this.revealTagSelector.bind(this);
    }

    // _onMouseMove(e) {
    //   let y = event.clientY - event.target.offsetTop

    //   this.setState({ x: e.clientX, y });
    //   console.log(this.state.x, this.state.y)

    // }

    componentDidMount() {
        const { match } = this.props;
        if(match.path === '/songs/:tagname'){
            axios.get(`/api/songs/${match.params.tagname}`).then(response => {
                this.setState({ songs: response.data })
            });
        } else {
            axios.get("/api/songs").then(songs => {
                console.log(songs.data);
                this.setState({ songs: songs.data });
            });
        }
        // console.log(randomColor())
    }

    componentDidUpdate() {
        console.log(this.state.songs)
    }

    revealTagSelector(bool) {
        this.setState({tagSelector:bool})
    }

    tagGrab(tags) {
        let songArr = [];
        let promises = [];
        tags.forEach(tag => {
            promises.push(
                axios.get(`/api/songs/${tag}`).then(songs => {
                    let songsList = [];
                    songs.data.forEach(song => {
                        let already = false;
                        for(let i = 0; i < songArr.length; i ++){
                            if(songArr[i].number === song.number){
                                already = true;
                            }
                        }
                        if(!already){
                            songsList.push(song);
                        }
                    })
                    songArr = songArr.concat(songsList);
                })
            );
        });
        Promise.all(promises).then(()=>{
            this.setState({ songs: songArr });
        })
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
        // Used for testing
        // let tempSongs = this.state.songs.slice(0, 80);
        return (
            <Container
                style={{
                    padding: "2px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}
            >
                <Navigation revealTagSelector={this.revealTagSelector}/>
                {
                    this.state.tagSelector ? 
                        <TagSelector tagGrab={this.tagGrab} /> :
                    <div>&nbsp;</div>     
                }
                {/* <Embed
                    id="7Af6b9-yqa8"
                    placeholder={`https://img.youtube.com/vi/7Af6b9-yqa8/mqdefault.jpg`}
                    source="youtube"
                /> */}
                <div className="song-header-container" />

                {/* <Image.Group size='small' style={{marginTop: '5px', backgroundColor: 'black'}}> */}
                {this.state.songs.map((song, key) => {
                    return (
                        //<img src={"2009/" + song.title.replace(/\s/g,'_') + "_small.png"}
                        <AlbumCanvas
                            key={key}
                            width={300}
                            backgroundImage={"/" + song.imagePathSmall}
                            song={song}
                            songnumber={song.number}
                            list={true}
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

module.exports = Songs;