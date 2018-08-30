import React, { Component } from 'react';
import axios from 'axios';
import { Input, Icon, List, Divider, Form, Grid, Container, Header, Button, Transition, Message } from 'semantic-ui-react/dist/commonjs';

export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      successIsOpen: false,
      errorIsOpen: false,
      isAdding: false,
      markedForDeletion: [],
      isSaving: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.saveAnyChangesToDB = this.saveAnyChangesToDB.bind(this);
    this.removeItemsFromDB = this.removeItemsFromDB.bind(this);
  }

  componentDidUpdate() {
    axios.get(this.props.apiCollectionPath)
      .then((results) => {
        this.setState({ collection: results.data });
      });
  }

  handleChange(e, { name, value, id }) {
    let item = this.state.collection.filter(element => element._id === id);

    if (item.length > 0) {
      const ind = this.state.collection.indexOf(item[0]);
      item = Object.assign({}, item[0], { [name]: value });

      const collection = [
        ...this.state.collection.slice(0, ind),
        item,
        ...this.state.collection.slice(ind + 1),
      ];
      this.setState({ collection });
    }
  }

  addNewItem(e) {
    e.preventDefault();
    const item = {
      _id: this.state.collection.length.toString(),
      name: '',
      image: '',
    };
    const collection = [item, ...this.state.collection];
    this.setState({ collection });
  }

  saveAnyChangesToDB(cb) {
    axios.put(this.props.apiCollectionPath, this.state.collection)
      .then((response) => {
        cb(null, response.data);
      })
      .catch((err) => {
        if (err) {
          cb(err);
        }
      });
  }

  removeItemsFromDB(cb) {
    const deleteThese = this.state.markedForDeletion.filter(id => id.match(/^[0-9a-fA-F]{24}$/));
    if (deleteThese.length) {
      axios.delete(this.props.apiCollectionPath, {
        params: {
          delete: deleteThese,
        },
      })
        .then((success) => {
          this.setState({ markedForDeletion: [] }, () => {
            cb();
          });
        });
    } else {
      this.setState({ markedForDeletion: [] }, () => {
        cb();
      });
    }
  }

  handleSubmit() {
    this.setState({ isSaving: true });
    this.removeItemsFromDB(() => {
      this.saveAnyChangesToDB((err, collection) => {
        if (err) {
          this.setState({ isSaving: false, errorIsOpen: true });
        } else {
          this.setState({ collection, isSaving: false }, () => {
            this.setState({ successIsOpen: true });
          });
        }
      });
    });
  }

  handleDelete(e, id) {
    e.preventDefault();
    const item = this.state.collection.filter(element => element._id === id);
    const index = this.state.collection.indexOf(item[0]);
    const state = this.state.collection;
    const markedForDeletion = this.state.markedForDeletion;
    this.setState({
      collection: state.slice(0, index).concat(state.slice(index + 1)),
      markedForDeletion: [...markedForDeletion, item[0]._id],
    });
  }

  renderItemFields(item) {
    return (
      <List.Item
        size="small"
        key={item._id}
      >
        <Form.Group widths="equal">
          <Form.Field>
            <label>{this.props.collectionName} name</label>
            <Input id={item._id} fluid name="name" placeholder={`${this.props.collectionName} name`} value={item.name} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Image filename</label>
            <Input id={item._id} fluid name="image" placeholder="image name" value={item.image} onChange={this.handleChange} />
          </Form.Field>
        </Form.Group>
        <Button size="mini" negative onClick={(e) => { this.handleDelete(e, item._id); }}>Delete {this.props.collectionName}</Button>
        <Divider horizontal><Icon name="music" /></Divider>
      </List.Item>
    );
  }

  render() {
    const { collection, successIsOpen } = this.state;
    return (
      <Container>
        <Header size="large" style={{ marginTop: '2em' }}>Edit {this.props.collectionName}s</Header>
        <Button style={{ marginBottom: '2em' }} onClick={this.addNewItem}>Add New {this.props.collectionName}</Button>
        <Form onSubmit={this.handleSubmit}>
          <List>{collection.map(item => this.renderItemFields(item))}
          </List>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Button disabled={this.state.isSaving} type="submit">Save Changes</Button>
              </Grid.Column>
              <Grid.Column>
                <Transition onShow={() => { setTimeout(() => { this.setState({ successIsOpen: false }); }, 2000); }} visible={successIsOpen} duration={400} animation="fade" >
                  <Message
                    success
                    header={`${this.props.collectionName} changes have been saved`}
                    content="You can safely leave this page if no more edits are needed."
                  />
                </Transition>
                <Transition visible={this.state.errorIsOpen} animation="scale" duration={400}>
                  <Message
                    negative
                    header="There was an error saving these changes"
                    content="Please try again, or contact the site admin if you continue to have issues."
                  />
                </Transition>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}
