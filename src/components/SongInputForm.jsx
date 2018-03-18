import React, { Component } from 'react';
import { Container, Input, Header, Form, Select, Button, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  'Vocals',
  'Baritone Uke',
  'Synths',
  'Drum Machine',
  'Snaps',
  'Drums',
  'Organ',
  'Electric Guitar'
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
  constructor (props) {
    super(props)
    this.state = {
      date: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      date
    });
  }

  render() {
    return (
      <Container>
        <Header size='large' style={{marginTop: '2em'}}>Add New Song</Header>
        <Form>
          <Form.Field>
            <label>Number</label>
            <input type='number' width={4} />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <input placeholder='Song Title' />
          </Form.Field>
          <Form.Field>
          <label>Date</label>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleChange}
          />
          </Form.Field>
          <Form.Group inline>
            <Form.Field>
              <label>Length</label>
              <Input placeholder='HH' />
            </Form.Field>
            <Form.Field>
              <Input placeholder='MM' />
            </Form.Field>
          </Form.Group>
          <Form.Field control={Select} label='Song Key' options={keyOptions} placeholder='Choose Key' />
          <Form.Field>
            <label>Tempo</label>
            <input type='number' width={4} />
          </Form.Field>
          <Form.Field control={Select} label='Topic' options={topicOptions} placeholder='Choose a Topic' />
          <Form.Field control={Select} label='Beard' options={beardOptions} placeholder='Choose a Beard' />
          <Form.Field>
            <Dropdown
              search
              selection
              multiple
              options={topicOptions}
              allowAdditions
              onAddItem={(e, d)=> {
                console.log(d);
                topicOptions.push({key: d.value, text: d.value, value: d.value})
              }}
              onChange={(e,d)=>{console.log('change: ', d.value)}}
            />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}