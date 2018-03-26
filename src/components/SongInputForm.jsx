import React, { Component } from 'react';
import { Transition, Message, Container, Grid, Segment, Radio, Input, Header, Form, Select, Button, Dropdown, Popup } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';

import AlbumCanvas from './AlbumCanvas.jsx';


export default class SongInputForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
    this.handleChange =         this.handleChange.bind(this);
    this.handleDateChange =     this.handleDateChange.bind(this);
    this.handleSubmit =         this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.setUpDropdowns =       this.setUpDropdowns.bind(this);
    this.getTagImages =         this.getTagImages.bind(this);
    this.getInstrumentNames =   this.getInstrumentNames.bind(this);
  }

  getInstrumentNames() {
    let names = this.state.song.instruments.map(instrument => {
      return instrument.name;
    })
    return names;
  }

  formatSong(songData) {
    let song = Object.assign({}, songData);
    song.date = moment(song.date);
    song.secs = song.length % 60
    song.mins = Math.floor(song.length / 60);
    // song.instruments = song.instruments.map(instrument => {
    //   // song.images.push(instrument.image)
    //   return instrument.name;
    // })
    return song;
  }

  getTagImages() {
    if (this.state.song.inkey.image && this.state.song.beard.image) {
      return ([
        this.state.song.inkey.image,
        this.state.song.beard.image,
      ])
    }
    return [];
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
        this.setUpDropdowns(response.data, () => {
          this.setState({song});
        });

      })
    }
  }

  setUpDropdowns({beard, instrument, inkey, location, topic}, cb) {
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
    this.setState({beard, instrument, inkey, location, topic, ...options}, () => {
      cb();
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
      return;
    }
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

  handleDropdownChange(e, { name, value }, fullSong) {
    let instruments = [];
    for (let i = 0; i < value.length; i++) {
      let selected = this.state.instrument.find( instrument => {
        return instrument.name === value[i];
      })
      instruments.push(selected)
    }
    let song = Object.assign({}, this.state.song);
    song.instruments = instruments;
    this.setState({song});
  }


  handleSubmit() {
    if (this.props.editing) {
      // this.setState({isOpen: true})
      axios.put('/api/song', this.state.song)
      .then(response => {
        this.setState({isOpen: true}, ()=> {
          setTimeout(()=>{this.setState({isOpen: false})}, 3000)
        })
        console.log(response)
      })
      return;
    }
    axios.post('/api/song', this.state.song)
    .then(response => {
      console.log(response.data)
    })
  }

  renderHeader() {
    if (this.props.editing) {
      return (
        <Header size='large' style={{marginTop: '2em'}}>Edit Song</Header>
      )
    }
    return (
      <Header size='large' style={{marginTop: '2em'}}>Add New Song</Header>
    )
  }

  renderSubmitButton() {
    if (this.props.editing) {
      return <Button type='submit'>Save Changes</Button>
    }
    return <Button type='submit'>Submit</Button>
  }

  render() {
    const {
      date,
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
                    selected={date}
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
                  <Form.Field
                    control={Select}
                    label='Song Key'
                    value={inkey.name}
                    name='inkey'
                    options={this.state.inkeyOptions}
                    placeholder='Choose Key'
                    onChange={this.handleChange}
                  />
                  <Form.Field>
                    <label>Tempo</label>
                    <Input name='tempo' value={tempo} type='number' width={4} onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field
                    control={Select}
                    value={topic.name}
                    name='topic'
                    label='Topic'
                    options={this.state.topicOptions}
                    placeholder='Choose a Topic'
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    control={Select}
                    value={beard.name}
                    name='beard'
                    label='Beard'
                    options={this.state.beardOptions}
                    placeholder='Choose a Beard'
                    onChange={this.handleChange}
                  />
                  <Form.Field>
                    <label>YT Video ID or Link</label>
                    <Input
                      name='videoid'
                      value={videoid}
                      placeholder='YT Video ID'
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.TextArea
                    value={description}
                    name ='description'
                    label='Description'
                    placeholder='Enter the full original description...'
                    onChange={this.handleChange}
                  />
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
                      value={this.getInstrumentNames()}
                      options={this.state.instrumentOptions}
                      allowAdditions
                      onAddItem={(e, d)=> {
                        this.state.instrumentOptions.push({key: d.value, text: d.value, value: d.value})
                      }}
                      onChange={this.handleDropdownChange}
                    />
                  </Form.Field>
                  {this.renderSubmitButton()}
                </Form>
            </Grid.Column>
            <Grid.Column>
              <div style={{position: 'fixed', marginTop: '3em'}}>
                <AlbumCanvas images={this.getTagImages()}/>
                <Transition visible={this.state.isOpen} animation='scale' duration={400}>
                  <Message
                    success
                    header='Song Updated'
                    content='All changes have been saved'
                  />
                </Transition>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}


