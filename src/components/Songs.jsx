import React, { Component } from 'react';
import { Container, Card, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';

export default class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  componentDidMount() {
    axios.get('/api/songs')
    .then(songs => {
      this.setState({songs: songs.data})
    })
    // console.log(randomColor())
  }


  render() {
    return (<Container>
      <Card.Group itemsPerRow={4}>
    {this.state.songs.map( (song) => {
      return (
        <Card key={song.number}>
          <Image src={`https://img.youtube.com/vi/${song.videoid}/mqdefault.jpg`} />
          <Card.Content>
            <Card.Header>
              {song.title}
            </Card.Header>
            <Card.Meta>
              <span className='date'>
                {new Date(song.date).toDateString()}
              </span>
            </Card.Meta>
            <Card.Description>
              {song.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='music' />
              {song.inkey}
            </a>
            <br />
            <a href={`https://www.youtube.com/watch?v=${song.videoid}`}>
              <Icon name='video' />
              Watch
            </a>
          </Card.Content>
        </Card>
      )
    })}
    </Card.Group>
    </Container>)
  }
}
