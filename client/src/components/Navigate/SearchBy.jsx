import React, { Component, Icon } from 'react';
import { Container } from 'semantic-ui-react/dist/commonjs';
import axios from 'axios';
import Log from '../Global/Log.js';
import AlbumCanvas from '../Render/AlbumCanvas.jsx';
import TagSelector from '../Forms/TagSelector.jsx';
import Navigation from './Navigation.jsx';

export default class SearchBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      size: 'md',
      imageSize: 100,
    };
    this.narrowSelection = this.narrowSelection.bind(this);
    this.getByTags = this.getByTags.bind(this);
    this.tagGrab = this.tagGrab.bind(this);
    this.titleGrab = this.titleGrab.bind(this);
    this.topicGrab = this.topicGrab.bind(this);
  }

  componentDidMount() {
    Log.info(this);
    switch (this.props.filterBy) {
      case 'tags':
        this.getByTags();
        break;
      default:
        this.getAllSongs();
    }
  }

  getAllSongs() {
    axios.get('/api/songs').then((songs) => {
      this.setState({ songs: songs.data });
    });
  }

  getByTags() {
    const tags = [];
    tags.push(this.props.match.params.tagname);
    this.tagGrab(tags).then((res) => {
      this.narrowSelection(res);
    });
  }

  tagGrab(tags) {
    return new Promise((res, rej) => {
      axios.get('/api/find_tags', {
        params: {
          tags,
        },
      }).then((songs) => {
        res({ songs: songs.data });
      }).catch(err => rej(err));
    });
  }

  topicGrab(topic) {
    return new Promise((res, rej) => {
      axios.get('/api/find_topics', {
        params: {
          topic,
        },
      }).then((songs) => {
        res({ songs: songs.data });
      }).catch(err => rej(err));
    });
  }

  titleGrab(numbers) {
    return new Promise((res, rej)=>{
      axios.get('/api/find_by_number', {
        params: {
          numbers,
        },
      }).then((songs) =>{
        res({songs: songs.data});
      }).catch(err => rej(err));
    })
  }

  narrowSelection(songs) {
    this.setState(songs);
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
      break;
      default:
    }
  }

  render() {
    const sizeClass = `size-${this.state.size}`;
    return (
      <Container
        style={{
                    padding: '0px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
      >
        <Navigation 
        />
        <div className="filter-navigation">
          <div className="filter-navigation-inner">
            <TagSelector
              narrowSelection={this.narrowSelection}
              tagGrab={tags => this.tagGrab(tags)}
              topicGrab={topic => this.topicGrab(topic)}
              titleGrab={title => this.titleGrab(title)}
            />
            <ul className="filter-size">
              <li>Size</li>
              {this.renderSizes()}
            </ul>
          </div>
        </div>
        <div className={`song-list-container ${sizeClass}`}>
          {this.state.songs.map((song, key) => (
            <AlbumCanvas
              key={key}
              width={this.state.imageSize}
              height={this.state.imageSize}
              backgroundImage={`/${song.imagePathSmall}`}
              song={song}
              songnumber={song.number}
              list
            />
                    ))}
        </div>
      </Container>
    );
  }
};
