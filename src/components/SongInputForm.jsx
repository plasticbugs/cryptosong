import React, { Component } from 'react';
import { Container, Grid, Segment, Radio, Input, Header, Form, Select, Button, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';

import AlbumCanvas from './AlbumCanvas.jsx';

const keyOptions = [
  {key: "A", text: "A", value: "A"},
  {key: "Am", text: "Am", value: "Am"},
  {key: "B", text: "B", value: "B"},
  {key: "Bb", text: "Bb", value: "Bb"},
  {key: "Bbm", text: "Bbm", value: "Bbm"},
  {key: "Bm", text: "Bm", value: "Bm"},
  {key: "C", text: "C", value: "C"},
  {key: "D", text: "D", value: "D"},
  {key: "D#m", text: "D#m", value: "D#m"},
  {key: "Em", text: "Em", value: "Em"},
  {key: "F", text: "F", value: "F"},
  {key: "F#", text: "F#", value: "F#"},
  {key: "G", text: "G", value: "G"},
  {key: "Gm", text: "Gm", value: "Gm"},
]

const topicOptions = [
  {key: "Airport", text: "Airport", value: "Airport"},
  {key: "Animals", text: "Animals", value: "Animals"},
  {key: "Anxiety", text: "Anxiety", value: "Anxiety"},
  {key: "Apple", text: "Apple", value: "Apple"},
  {key: "Commission", text: "Commission", value: "Commission"},
  {key: "Friend", text: "Friend", value: "Friend"},
  {key: "Internet", text: "Internet", value: "Internet"},
  {key: "Life", text: "Life", value: "Life"},
  {key: "Love", text: "Love", value: "Love"},
  {key: "Poetic", text: "Poetic", value: "Poetic"},
  {key: "Politics", text: "Politics", value: "Politics"},
  {key: "Sex", text: "Sex", value: "Sex"},
  {key: "Sick", text: "Sick", value: "Sick"},
  {key: "Social Justice", text: "Social Justice", value: "Social Justice"},
  {key: "Song A Day", text: "Song A Day", value: "Song A Day"},
  {key: "Video Games", text: "Video Games", value: "Video Games"},
]

const instrumentOptions = [
  {key:"vocals","text":"Vocals","value":"vocals"},
  {key:"baritone uke","text":"Baritone Uke","value":"baritone uke"},
  {key:"synths","text":"Synths","value":"synths"},
  {key:"drum machine","text":"Drum Machine","value":"drum machine"},
  {key:"snaps","text":"Snaps","value":"snaps"},
  {key:"drums","text":"Drums","value":"drums"},
  {key:"organ","text":"Organ","value":"organ"},
  {key:"electric guitar","text":"Electric Guitar","value":"electric guitar"}
]

const beardOptions = [
  {key: "Stubble", text: "Stubble", value: "Stubble"},
  {key: "N/A", text: "N/A", value: "N/A"},
  {key: "Clean", text: "Clean", value: "Clean"},
  {key: "Shadow", text: "Shadow", value: "Shadow"},
]


const buildOptions = (arr) => {
  let obj = {};
  arr.forEach(key => {
    if (!obj[key]) {
      obj[key] = true;
    }
  })
  let solution = [];
  Object.keys(obj).forEach((key, index) => {
    solution.push({
      key,
      text: key,
      value: key
    })
  })
  return solution;
}

export default class SongInputForm extends Component {
  // constructor (props) {
    // super(props)
    // this.state = {
    //   date: moment()
    // };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleRadioChange = this.handleRadioChange.bind(this);
  // }

  constructor(props) {
    super(props);
    this.state = {
      song: {
        number: '',
        title: '',
        date: moment(),
        mins: '',
        secs: '',
        inkey: '',
        tempo: '',
        topic: '',
        beard: '',
        videoid: '',
        description: '',
        acousticproduced: '',
        instruments: [],
        images: []
      },
      images: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.getInstrumentNames = this.getInstrumentNames.bind(this);
    // this.setUpCanvas = this.setUpCanvas.bind(this);
  }

  formatSong(songData) {
    let song = Object.assign({}, songData);
    song.date = moment(song.date);
    song.secs = song.length % 60
    song.mins = Math.floor(song.length / 60);
    song.images = [];
    song.instruments = song.instruments.map(instrument => {
      // song.images.push(instrument.image)
      return instrument.name;
    })
    song.images.push(song.beard.image)
    // song.images.push(song.location.image)
    song.images.push(song.inkey.image)
    // song.images.push(song.topic.image)
    song.beard = song.beard.name;
    song.location = song.location.name;
    song.topic = song.topic.name;
    song.inkey = song.inkey.name;
    return song;
  }

  componentDidMount() {
    if(this.props.match.params.id) {
      axios.get('/api/song', {
        params:
          {
            id: this.props.match.params.id
          }
        })
      .then(response => {
        console.log(response.data[0])
        let song = this.formatSong(response.data[0]);
        this.handleDateChange(song.date);
        // this.setState({selected: ['vocals']})
        this.setState({song}, () => {
          console.log(song);
        })
        // this.setState({song: {instruments: song.instruments}}, ()=> {
        //   delete song.instruments
        // })
        // for (let key in song) {
        //   this.handleChange(null, {
        //     name: key,
        //     value: song[key]
        //   })
        // }
      })
    }
    // if (this.props.match)
  }


  handleDateChange(date) {
    let song = Object.assign({}, this.state.song, {date})
    this.setState({
      song
    });
  }

  handleChange(e, { name, value }) {
    // if (fullSong) {
    //   let song = Object.assign({}, fullSong);
    console.log(name, value)
    // } else {
      let song = Object.assign({}, this.state.song, {[name]: value});
      this.setState({song})
    // }
  }

  handleDropdownChange(e, { name, value }, fullSong) {
    // if (fullSong) {
    //   let song = Object.assign({}, fullSong);

    // } else {
      let song = Object.assign({}, this.state.song, {[name]: value});
      this.setState({song})
    // }
  }


  handleSubmit() {
    axios.post('/api/song', this.state.song)
    .then(response => {
      console.log(response);
    })
    // console.log(this.state)
  }

  renderHeader() {
    if (this.props.editing) {
      return (
        <Header size='large' style={{marginTop: '2em'}}>Edit Song</Header>
      )
    } else {
      return (
        <Header size='large' style={{marginTop: '2em'}}>Add New Song</Header>
      )
    }
  }

  getInstrumentNames() {
    let strings = [];
    this.state.song.instruments.forEach(instrument => {
      strings.push(instrument.name);
    })
    return strings;
  }

  render() {
    const {
      number,
      title,
      mins,
      secs,
      inkey,
      tempo,
      topic,
      beard,
      videoid,
      description,
      acousticproduced,
      instruments
    } = this.state.song

    return (
      <Container>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
                {this.renderHeader()}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Number</label>
                    <Form.Input name='number' type='number' value={number} width={4} onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Title</label>
                    <Form.Input name='title' placeholder='Song Title' value={title} onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                  <label>Date</label>
                  <DatePicker
                    selected={this.state.song.date}
                    onChange={this.handleDateChange}
                  />
                  </Form.Field>
                  <Form.Group inline>
                    <Form.Field>
                      <label>Length</label>
                      <Input name='mins' placeholder='MM' value={mins} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                      <Input name='secs' placeholder='SS' value={secs} onChange={this.handleChange} />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field control={Select} label='Song Key' value={inkey} name='inkey' options={keyOptions} placeholder='Choose Key' onChange={this.handleChange} />
                  <Form.Field>
                    <label>Tempo</label>
                    <Input name='tempo' value={tempo} type='number' width={4} onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field control={Select} value={topic} name='topic' label='Topic' options={topicOptions} placeholder='Choose a Topic' onChange={this.handleChange} />
                  <Form.Field control={Select} value={beard} name='beard' label='Beard' options={beardOptions} placeholder='Choose a Beard' onChange={this.handleChange} />
                  <Form.Field>
                    <label>YT Video ID or Link</label>
                    <Input name='videoid' value={videoid} placeholder='YT Video ID' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.TextArea value={description} name ='description' label='Description' placeholder='Enter the full original description...' onChange={this.handleChange} />
                  <Form.Field>
                    <label>Acoustic or Produced</label>
                    <Radio
                      label='Acoustic'
                      name='acousticproduced'
                      value='Acoustic'
                      checked={acousticproduced === 'Acoustic'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label='Produced'
                      name='acousticproduced'
                      value='Produced'
                      checked={acousticproduced === 'Produced'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Instruments</label>
                    <Dropdown
                      name='instruments'
                      search
                      selection
                      multiple
                      value={instruments}
                      options={instrumentOptions}
                      allowAdditions
                      onAddItem={(e, d)=> {
                        instrumentOptions.push({key: d.value, text: d.value, value: d.value})
                      }}
                      onChange={this.handleDropdownChange}
                    />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
            </Grid.Column>
            <Grid.Column>
              <AlbumCanvas images={this.state.song.images}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}


