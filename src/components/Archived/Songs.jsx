// import React, { Component } from "react";
// import { Container, Card, Icon, Image, Popup, Embed } from "semantic-ui-react";
// import axios from "axios";
// import AlbumCanvas from "./AlbumCanvas.jsx";
// import Navigation from "./Navigation.jsx";
// import TagSelector from "./TagSelector.jsx";

import '../styles/songs.scss';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      size: 'md',
      imageSize: 100,
    };
  }

  // _onMouseMove(e) {
  //   let y = event.clientY - event.target.offsetTop

  //   this.setState({ x: e.clientX, y });
  //   console.log(this.state.x, this.state.y)

  // }

  componentDidMount() {
    axios.get('/api/songs').then((songs) => {
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

  renderSizes() {
    const sizes = ['sm', 'md', 'lg'];

    const sizesDom = sizes.map((size) => {
      const classes = [];

      if (size === this.state.size) {
        classes.push('active');
      }
      return (
        <li key={size} className={classes.join(' ')}>
          <a onClick={this.changeZoom.bind(this, size)}>{size}</a>
        </li>
      );
    });

    return sizesDom;
  }

  changeZoom(size) {
    switch (size) {
      case 'sm':
        this.setState({ size: 'sm', imageSize: 50 });
        return;
      case 'md':
        this.setState({ size: 'md', imageSize: 100 });
        return;
      case 'lg':
        this.setState({ size: 'lg', imageSize: 190 });

      default:
    }
  }

  render() {
    const { x, y } = this.state;
    const style = {
      borderRadius: 0,
      border: '2px solid black',
      padding: '2em',
    };
    const sizeClass = `size-${this.state.size}`;
    // Used for testing
    // let tempSongs = this.state.songs.slice(0, 80);
    return (
      <Container>
        <Navigation />
        <div className="filter-navigation">
          <div className="filter-navigation-inner">
            <ul className="filter-size">
              <li>Size</li>
              {this.renderSizes()}
            </ul>
          </div>
        </div>
        <div className={`song-list-container ${sizeClass}`}>
          {this.state.songs.map((song) => {
                        return (
                            // <img src={"2009/" + song.title.replace(/\s/g,'_') + "_small.png"}
                          <AlbumCanvas
                            width={this.state.imageSize}
                            height={this.state.imageSize}
                            backgroundImage={`/${song.imagePathSmall}`}
                            song={song}
                            songnumber={song.number}
                            list
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
        </div>
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

// module.exports = Songs;
