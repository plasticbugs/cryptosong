import React, {Component} from 'react';
import axios from 'axios';
import { Input, Form, Grid, Container, Header, Button, Transition, Message } from 'semantic-ui-react'

export default class Instruments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruments: [],
      successIsOpen: false,
      errorIsOpen: false,
      isAdding: false,

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewInstrument = this.addNewInstrument.bind(this);
  }

  componentDidMount() {
    axios.get('/api/instruments')
    .then(results => {
      this.setState({instruments: results.data})
    })
  }

  handleChange(e, { name, value, id }) {
      let instrument = this.state.instruments.filter((element) => {
        return element._id === id;
      })

    console.log(instrument)
    if (instrument.length > 0) {
      console.log('yo')
      let ind = this.state.instruments.indexOf(instrument[0]);
      instrument = Object.assign({}, instrument[0], {[name]: value});
      console.log(instrument)
      console.log(ind)
     
      let instruments = [...this.state.instruments.slice(0, ind), instrument, ...this.state.instruments.slice(ind + 1)]
      this.setState({instruments})
      return;
    }
    // instrument = this.state.instruments.filter((element, index) => {
    //   return element.name === name;
    // })
    // let ind = this.state.instruments.indexOf(instrument[0]);
    // instrument = Object.assign({}, instrument[0], {[name]: value});

    // let instruments = [...this.state.instruments.slice(0, ind), instrument, ...this.state.instruments.slice(ind + 1)]
    // this.setState({instruments});
    // console.log(instrument[0]);
  }

  addNewInstrument(e) {
    e.preventDefault();
    let inst = {
      _id: this.state.instruments.length,
      name: '',
      image: ''
    }
    let instruments = [inst, ...this.state.instruments]
    this.setState({instruments});
  }

  handleSubmit() {
    axios.put('/api/instruments', this.state.instruments)
    .then(response => {
      let instruments = response.data;
      console.log(instruments)
      this.setState({instruments, successIsOpen: true}, ()=> {
        setTimeout(()=>{this.setState({successIsOpen: false})}, 3000)
      })
    })
    .catch(err => {
      if (err) {
        console.log(err)
        this.setState({errorIsOpen: true}, ()=> {
          setTimeout(()=>{this.setState({errorIsOpen: false})}, 3000)
        })
      }
    })
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Header size='large' style={{marginTop: '2em'}}>Edit Instruments</Header>
          <Button style={{marginBottom: '2em'}} onClick={this.addNewInstrument}>Add New Instrument</Button>
          {this.state.instruments.map((instrument, i) => {
            if (instrument.__v !== 0) {
              return (
                <Form.Field key={i}>
                  <Input style={{marginBottom: '1em'}} id={instrument._id} fluid name='name' placeholder='instrument name' value={instrument.name} onChange={this.handleChange} />
                  <Input style={{marginBottom: '2em'}} id={instrument._id} fluid name='image' placeholder='image name' value={instrument.image} onChange={this.handleChange} />
                </Form.Field>
              )
            } else {
              return (
                <Form.Field key={instrument._id}>
                  <label>{instrument.name}</label>
                  <Input style={{marginBottom: '2em'}} id={instrument._id} fluid name='image' placeholder='image name' value={instrument.image} onChange={this.handleChange} />
                </Form.Field>
              );
            }
          })}
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column><Button type='submit'>Save Changes</Button></Grid.Column>
              <Grid.Column>
              <Transition visible={this.state.successIsOpen} animation='scale' duration={400}>
                <Message
                  success
                  header='Instrument changes have been saved'
                  content='You can safely leave this page if no more edits are needed.'
                />
              </Transition>
              <Transition visible={this.state.errorIsOpen} animation='scale' duration={400}>
                <Message
                  success
                  header='There was an error saving these changes'
                  content='Please try again, or contact the site admin if you continue to have issues.'
                />
              </Transition>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    )
  }
}