import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/global.scss';


export default class TagSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      selected: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterSongs = this.filterSongs.bind(this);
  }

  componentDidMount() {
    axios.get('/api/tags').then((tags) => {
      this.setState({ tags: tags.data });
    });
  }

  filterSongs() {
    this.props.tagGrab(this.state.selected).then((res) => {
      this.props.narrowSelection(res);
    });
  }

  handleChange(e) {
    const pile = e.target.selectedOptions;
    const selected = [];
    for (let i = 0; i < pile.length; i++) {
      selected.push(pile[i].value);
    }
    this.setState({ selected });
  }

  render() {
    return (
      <div>
        <div>
          <select onChange={this.handleChange} id="tags" multiple size="7">
            {
                        this.state.tags.map((tag, key) => <option key={key} value={tag.name}>{tag.name}</option>)
                    }
          </select>
        </div>
        <button onClick={this.filterSongs.bind(this)}>filter them!</button>
      </div>
    );
  }
}
