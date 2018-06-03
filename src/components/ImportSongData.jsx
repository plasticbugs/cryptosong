import React, { Component } from 'react';
import { Container, TextArea, Button } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

export default class ImportSongData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songData: '',
      buttonText: 'Rebuild Database',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({songData: e.target.value})
  }

  handleSubmit() {
    axios.post('./import', JSON.parse(this.state.songData))
    .then( success => {
      this.setState({songData: '', buttonText: 'Database Updated'})
    })
    .catch( err => {
      this.setState({buttonText: 'There was an error. Try again.'})
    })
  }

  render() {
    return (
      <Container>
        <TextArea placeholder='Paste song data (JSON)...' style={{width: '100%', minHeight: 200}} value={this.state.songData} onChange={this.handleChange} />
        <Button onClick={this.handleSubmit}>{this.state.buttonText}</Button>
      </Container>
    )
  }
}

