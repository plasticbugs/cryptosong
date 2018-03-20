import React, { Component } from 'react';
import { Container, Segment, Radio, Input, Header, Form, Select, Button, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';

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
  {key:"Vocals","text":"Vocals","value":"Vocals"},
  {key:"Baritone Uke","text":"Baritone Uke","value":"Baritone Uke"},
  {key:"Synths","text":"Synths","value":"Synths"},
  {key:"Drum Machine","text":"Drum Machine","value":"Drum Machine"},
  {key:"Snaps","text":"Snaps","value":"Snaps"},
  {key:"Drums","text":"Drums","value":"Drums"},
  {key:"Organ","text":"Organ","value":"Organ"},
  {key:"Electric Guitar","text":"Electric Guitar","value":"Electric Guitar"}
]

const beardOptions = [
  {key: "Stubble", text: "Stubble", value: "Stubble"},
  {key: "None", text: "None", value: "None"},
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
      number: '',
      title: '',
      date: moment(),
      mins: '',
      secs: '',
      inKey: '',
      tempo: '',
      topic: '',
      beard: '',
      link: '',
      description: '',
      acousticProduced: '',
      instruments: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleRadioChange(e, data) {
  //   console.log(data.value)
  //   this.setState({
  //     acousticProduced: data.value
  //   })
  // }

  handleDateChange(date) {
    this.setState({
      date
    });
  }

  handleChange(e, { name, value }) {
    this.setState({[name]: value})
  }

  handleSubmit() {
    axios.post('/api/song', this.state)
    .then(response => {
      console.log(response);
    })
    // console.log(this.state)
  }

  render() {
    const {
      number,
      title,
      mins,
      secs,
      inKey,
      tempo,
      topic,
      beard,
      link,
      description,
      acousticProduced,
      instruments
    } = this.state

    return (
      <Container>
        <Header size='large' style={{marginTop: '2em'}}>Add New Song</Header>
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
            selected={this.state.date}
            onChange={this.handleDateChange}
          />
          </Form.Field>
          <Form.Group inline>
            <Form.Field>
              <label>Length</label>
              <Input name='mins' placeholder='MM' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Input name='secs' placeholder='SS' onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Field control={Select} label='Song Key' name='inKey' options={keyOptions} placeholder='Choose Key' onChange={this.handleChange} />
          <Form.Field>
            <label>Tempo</label>
            <Input name='tempo' type='number' width={4} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field control={Select} name='topic' label='Topic' options={topicOptions} placeholder='Choose a Topic' onChange={this.handleChange} />
          <Form.Field control={Select} name='beard' label='Beard' options={beardOptions} placeholder='Choose a Beard' onChange={this.handleChange} />
          <Form.Field>
            <label>YT Video ID or Link</label>
            <Input name='link' placeholder='YT Video ID' onChange={this.handleChange} />
          </Form.Field>
          <Form.TextArea name ='description' label='Description' placeholder='Enter the full original description...' onChange={this.handleChange} />
          <Form.Field>
            <label>Acoustic or Produced</label>
            <Radio
              label='Acoustic'
              name='acousticProduced'
              value='acoustic'
              checked={this.state.acousticProduced === 'acoustic'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Produced'
              name='acousticProduced'
              value='produced'
              checked={this.state.acousticProduced === 'produced'}
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
              options={instrumentOptions}
              allowAdditions
              onAddItem={(e, d)=> {
                console.log(d);
                instrumentOptions.push({key: d.value, text: d.value, value: d.value})
              }}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}