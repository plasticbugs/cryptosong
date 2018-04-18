import React, { Component } from 'react';
import { Transition, Message, Container, Grid, Segment, Radio, Input, Header, Form, Select, Button, Dropdown, Popup } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';

import AlbumCanvas from './AlbumCanvas.jsx';

const GENESIS = '1/1/2009';

export default class SongInputForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      inkeyOptions: [],
      beardOptions: [],
      instrumentOptions: [],
      topicOptions: [],
      locationOptions: [],
      tagOptions: [],
      moodOptions: [],
      // mainInstrumentOptions: [{key:"",text:"",value:""}],
      // secondaryInstrumentOptions: [{key:"",text:"",value:""}],
      instrument: [],
      inkey: [],
      topic: [],
      location: [],
      beard: [],
      tag: [],
      mood: [],
      song: {
        number: this.dateDiff(GENESIS, moment().format('MM/DD/YYYY')),
        title: '',
        date: moment(),
        mins: '',
        secs: '',
        inkey: {name: ''},
        tempo: '',
        topic: {name: ''},
        beard: {name: ''},
        location: {name: ''},
        videoid: '',
        description: '',
        acousticproduced: '',
        instruments: [],
        tags: [],
        press: '',
        comments: '',
        firsts: '',
        mood: {name: ''},
        mainInstrument: {name: ''},
        secondaryInstrument: {name: ''},
      },
    }
    this.handleChange =         this.handleChange.bind(this);
    this.handleDateChange =     this.handleDateChange.bind(this);
    this.handleSubmit =         this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleTagDropdownChange = this.handleTagDropdownChange.bind(this);
    this.setUpDropdowns =       this.setUpDropdowns.bind(this);
    this.getTagImages =         this.getTagImages.bind(this);
    this.getTagNames =          this.getTagNames.bind(this);
    this.getInstrumentNames =   this.getInstrumentNames.bind(this);
  }

  dateDiff(first, second) {
    const parseDate = (str) => {
      var mdy = str.split('/');
      return new Date(mdy[2], mdy[0]-1, mdy[1]);
    }
    first = parseDate(first);
    second = parseDate(second);
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24)) + 1;
  }

  getInstrumentNames() {
    // get first and second primaries:
    let first;
    let second;

    let names = this.state.song.instruments.map(instrument => {
      return instrument.name;
    })

    names.forEach((inst, index) => {
      if (inst === this.state.song.mainInstrument.name) {
        first = index;
      }
      if (inst === this.state.song.secondaryInstrument.name) {
        second = index;
      }
    })

    let toRemove = [];
    let sorted = [];

    if (first !== undefined) {
      sorted.push(names[first]);
      toRemove.push(first);
    }
    if (second !== undefined) {
      sorted.push(names[second])
      toRemove.push(second);
    }

    toRemove.sort((a, b) => {
      return b - a;
    })

    for (let removeThis of toRemove) {
      names.splice(removeThis, 1);
    }

    return sorted.concat(names);
  }

  getTagNames() {
    let names = this.state.song.tags.map(tag => {
      return tag.name;
    })
    return names;
  }

  formatSong(songData) {
    let song = Object.assign({}, songData);
    if (song.date) {
      let date = new Date(song.date);
      date = (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear());
      song.date = moment(date, 'M/D/YYYY');
    }
    if (song.length) {
      song.secs = song.length % 60
      song.mins = Math.floor(song.length / 60);
    }
    return song;
  }

  getTagImages() {
    let { inkey, beard, location, instruments, topic } = this.state.song;
    let tags = [inkey, beard, location, topic]
    let images = [];

    tags.forEach(tag => {
      if (tag.image) {
        images.push(tag.image)
      }
    })
    let instrumentImages = instruments.map(instrument => {
      return instrument.image;
    })
    images = images.concat(instrumentImages);
    return images;
  }

  componentDidMount() {
    if(this.props.match.params.id) {
      let number = Number.parseInt(this.props.match.params.id);
      let date = moment(GENESIS, 'M-D-YYYY').add(number - 1, 'days');
      let nextState = {number, date}
      this.setState(prevState => ({
        ...prevState,
        song: {
          ...prevState.song,
          ...nextState
        }
      }))
      axios.get('/api/song', {
        params:
          {
            id: this.props.match.params.id
          }
        })
      .then(response => {
        let song = this.formatSong(response.data.song);
        if (song.date) {
          this.handleDateChange(song.date);
        }
        this.setUpDropdowns(response.data, () => {
          this.setState(prevState => ({
            ...prevState,
            song: {
              ...prevState.song,
              ...song
            }
          }))
        });
      })
      .catch(err => {
        throw new Error(err);
      })
    } else {
      axios.get('/api/options')
      .then(response => {
        this.setUpDropdowns(response.data, ()=>{})
      })
    }

  }

  setUpDropdowns({beard, instrument, inkey, location, topic, tag, mood}, cb) {
    let tagArray = [{beard}, {instrument}, {inkey}, {location}, {topic}, {tag}, {mood}]
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

    this.setState({beard, instrument, inkey, location, topic, mood, tag, ...options}, () => {
      cb();
    });
  }

  handleDateChange(date) {
    let selected = moment(date).format('MM/DD/YYYY');
    let number = this.dateDiff(GENESIS, selected)
    let song = Object.assign({}, this.state.song, {date, number})
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

  handleTagDropdownChange(e, { name, value }, fullSong) {
    let tags = [];
    for (let i = 0; i < value.length; i++) {
      let selected = this.state.tag.find( tag => {
        return tag.name === value[i];
      })
      if (selected) {
        tags.push(selected)
      } else {
        let newTag = {
          _id: this.state.tag.length,
          name: value[value.length - 1],
          image: undefined,
        }
        tags.push(newTag)
        this.setState({tag: [...this.state.tag, newTag]})
      }
    }

    let song = Object.assign({}, this.state.song);
    song.tags = tags;
    this.setState({song});
  }

  handleDropdownChange(e, { name, value }, fullSong) {
    let instruments = [];
    for (let i = 0; i < value.length; i++) {
      let selected = this.state.instrument.find( instrument => {
        return instrument.name === value[i];
      })
      if (selected) {
        instruments.push(selected)
      } else {
        let newInstrument = {
          _id: this.state.instrument.length,
          name: value[value.length - 1],
          image: undefined,
        }
        instruments.push(newInstrument)
        this.setState({instrument: [...this.state.instrument, newInstrument]})
      }
    }
    let song = Object.assign({}, this.state.song);
    song.instruments = instruments;
    this.setState({song}, () => {
      if (value.indexOf(this.state.song.mainInstrument.name) === -1) {
        this.setState(prevState => ({
          ...prevState,
          song: {
            ...prevState.song,
            mainInstrument: {name: ''}
          }
        }))
      }
      if (value.indexOf(this.state.song.secondaryInstrument.name) === -1) {
        this.setState(prevState => ({
          ...prevState,
          song: {
            ...prevState.song,
            secondaryInstrument: {name: ''}
          }
        }))
      }
    });
  }

  cleanSong(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        if (obj[key].name === '') {
          delete obj[key]
        }
      }
    }
    return obj;
  }

  handleSubmit() {
    let song = Object.assign({}, this.state.song);
    song = this.cleanSong(song);
    if (this.props.editing) {
      // this.setState({isOpen: true})
      axios.put('/api/song', song)
      .then(response => {
        this.setState({isOpen: true}, ()=> {
          setTimeout(()=>{this.setState({isOpen: false})}, 3000)
        })
      })
      return;
    }
    axios.post('/api/song', song)
    .then(response => {
      this.props.history.push(`/song/${this.state.song.number}/edit`)
      this.setState({isOpen: true}, () => {
        setTimeout(() => {this.setState({isOpen: false})}, 3000)
      })
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
      location,
      videoid,
      description,
      acousticproduced,
      instruments,
      press,
      comments,
      firsts,
      mood,
      mainInstrument,
      secondaryInstrument,
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
                      <Input name='mins' type='number' placeholder='MM' value={mins} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                      <Input name='secs' type='number' placeholder='SS' value={secs} onChange={this.handleChange} />
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
                  <Form.Field
                    control={Select}
                    label='Location'
                    value={location.name}
                    name='location'
                    options={this.state.locationOptions}
                    placeholder='Choose Location'
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
                  <Form.Field
                    control={Select}
                    value={mood.name}
                    name='mood'
                    label='Mood'
                    options={this.state.moodOptions}
                    placeholder='Choose a Mood'
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
                        this.setState({
                          instrumentOptions: [{ key: d.value, text: d.value, value: d.value }, ...this.state.instrumentOptions],
                        })
                        // this.state.instrumentOptions.push({key: d.value, text: d.value, value: d.value})
                      }}
                      onChange={this.handleDropdownChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Tags</label>
                    <Dropdown
                      name='tags'
                      search
                      selection
                      multiple
                      value={this.getTagNames()}
                      options={this.state.tagOptions}
                      allowAdditions
                      onAddItem={(e, d)=> {
                        this.setState({
                          tagOptions: [{ key: d.value, text: d.value, value: d.value }, ...this.state.tagOptions],
                        })
                        // this.state.tagOptions.push({key: d.value, text: d.value, value: d.value})
                      }}
                      onChange={this.handleTagDropdownChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Firsts</label>
                    <Form.Input name='firsts' placeholder='Any firsts?' value={firsts} onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Comments</label>
                    <Form.Input name='comments' placeholder='Add Comment' value={comments} onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Press</label>
                    <Form.Input name='press' placeholder='Press link' value={press} onChange={this.handleChange} />
                  </Form.Field>
                  {this.renderSubmitButton()}
                </Form>
            </Grid.Column>
            <Grid.Column>
              <div style={{position: 'fixed', marginTop: '3em'}}>
                <AlbumCanvas width={500} height={500} images={this.getTagImages()} song={this.state.song} songnumber={this.state.song.number}/>
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


