import React, { Component } from 'react';
import { Container, Grid, Segment, Radio, Input, Header, Form, Select, Button, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';

import AlbumCanvas from './AlbumCanvas.jsx';


export default class SongInputForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inkeyOptions: [{key:"",text:"",value:""}],
      beardOptions: [{key:"",text:"",value:""}],
      instrumentOptions: [{key:"",text:"",value:""}],
      topicOptions: [{key:"",text:"",value:""}],
      locationOptions: [{key:"",text:"",value:""}],
      instrument: [],
      inkey: [],
      topic: [],
      location: [],
      beard: [],
      song: {
        number: '',
        title: '',
        date: moment(),
        mins: '',
        secs: '',
        inkey: {name: ''},
        tempo: '',
        topic: {name: ''},
        beard: {name: ''},
        videoid: '',
        description: '',
        acousticproduced: '',
        instruments: [],
      },
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.getInstrumentNames = this.getInstrumentNames.bind(this);
    this.setUpDropdowns = this.setUpDropdowns.bind(this);
    this.getTagImages = this.getTagImages.bind(this);
  }

  formatSong(songData) {
    let song = Object.assign({}, songData);
    song.date = moment(song.date);
    song.secs = song.length % 60
    song.mins = Math.floor(song.length / 60);
    song.instruments = song.instruments.map(instrument => {
      // song.images.push(instrument.image)
      return instrument.name;
    })
    return song;
  }

  getTagImages() {
    if (this.state.song) {
      return ([
        this.state.song.inkey.image,
        this.state.song.beard.image,
      ])
    } else {
      return [];
    }
  }

  componentWillMount() {
    if(this.props.match.params.id) {
      axios.get('/api/song', {
        params:
          {
            id: this.props.match.params.id
          }
        })
      .then(response => {
        console.log(response.data)
        let song = this.formatSong(response.data.song);
        this.handleDateChange(song.date);
        this.setUpDropdowns(response.data, song);

      })
    }
  }

  setUpDropdowns({beard, instrument, inkey, location, topic}, song) {
    let instrumentOptions = [];
    let beardOptions = [];
    let inkeyOptions = [];
    let locationOptions = [];
    let topicOptions = [];

    

    let tagArray = [{beard}, {instrument}, {inkey}, {location}, {topic}]
    let options = {};
    tagArray.forEach(tag => {
      let optionArray = [];
      let key = Object.keys(tag)[0];
      tag[key].forEach(element => {
        optionArray.push({key: element.name, text: element.name, value: element.name});
      })
      let theKey = key + 'Options';
      options[theKey] = optionArray;
    })
    console.log(options)

    this.setState({beard, instrument, inkey, location, topic, ...options}, () => {
      this.setState({song});
    });
  }

  handleDateChange(date) {
    let song = Object.assign({}, this.state.song, {date})
    this.setState({
      song
    });
  }

  handleChange(e, { name, value }) {

    let arr = this.state[name];

    if (!Array.isArray(arr)) {
      this.setState(prevState => ({
        ...prevState,
        song: {
          ...prevState.song,
          [name]: value
        }
      }))
    } else {
      let selectedItem = arr.find(element => {
        return element.name === value;
      })
      this.setState(prevState => ({
        ...prevState,
        song: {
          ...prevState.song,
          [name]: selectedItem
        }
      }))
    }
  }

  handleDropdownChange(e, { name, value }, fullSong) {
      let song = Object.assign({}, this.state.song, {[name]: value});
      this.setState({song})
  }


  handleSubmit() {
    axios.post('/api/song', this.state.song)
    .then(response => {
    })
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
    // console.log(beard)
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
                  <Form.Field control={Select} label='Song Key' value={inkey.name} name='inkey' options={this.state.inkeyOptions} placeholder='Choose Key' onChange={this.handleChange} />
                  <Form.Field>
                    <label>Tempo</label>
                    <Input name='tempo' value={tempo} type='number' width={4} onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field control={Select} value={topic.name} name='topic' label='Topic' options={this.state.topicOptions} placeholder='Choose a Topic' onChange={this.handleChange} />
                  <Form.Field control={Select} value={beard.name} name='beard' label='Beard' options={this.state.beardOptions} placeholder='Choose a Beard' onChange={this.handleChange} />
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
                      options={this.state.instrumentOptions}
                      allowAdditions
                      onAddItem={(e, d)=> {
                        this.state.instrumentOptions.push({key: d.value, text: d.value, value: d.value})
                      }}
                      onChange={this.handleDropdownChange}
                    />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
            </Grid.Column>
            <Grid.Column>
              <AlbumCanvas images={this.getTagImages()}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}


