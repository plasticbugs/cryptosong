import React, { Component } from 'react';
import axios from 'axios';
import Log from '../Global/Log.js';
import Select from 'react-select';

export default class TagSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsOrTopics: [],
      selected: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.filterByChoice = this.filterByChoice.bind(this);
    this.whatPicked = this.whatPicked.bind(this);
  }

  whatPicked(choice){
    axios.get(`/api/${choice}`).then((results) => {
      let resultsData = results.data.map(res => {
        return { value: res._id, label: res.name, group: `${choice}`}; 
      });
      this.setState({tagsOrTopics: resultsData});
    })
  }

  filterByChoice() {
    let tagPile = this.state.selected.filter(choice=>{
      return choice.group === 'tags';
    }).map((cho)=>{
      return cho.label;
    })
    let topicPile = this.state.selected.filter(choice=>{
      return choice.group === 'topics';
    }).map((cho)=>{
      return cho.value;
    })
    let numberPile = this.state.selected.filter(choice=>{
      return choice.group === 'titles';
    }).map((cho)=>{
      return parseInt(cho.label.substr(0,cho.label.indexOf(':')),10);
    })
    this.props.tagGrab(tagPile).then((tagRes) => {
      this.doTopicPile(topicPile).then((topRes)=>{
        this.props.titleGrab(numberPile).then((titleRes)=>{
          tagRes.songs = tagRes.songs.concat(topRes);
          tagRes.songs = tagRes.songs.concat(titleRes.songs);
          this.props.narrowSelection(tagRes);
        });
      })
    });
  }

  doTopicPile(pile) {
    return new Promise((res, rej)=>{
      let promises = pile.map((top)=>{
        return this.props.topicGrab(top).then((someSongs) => {
            return someSongs.songs;
        });

      });
      Promise.all(promises).then((songs)=>{
        Log.results('songs you got:');
        Log.results(songs);
        let songArr = [];
        songs.forEach((song)=>{
          songArr = songArr.concat(song);
        });
        res(songArr);
      }).catch(err=>{rej(err)});
    });
  }

  handleChoice(e) {
    const { value } = e.target;
    this.whatPicked(value);
  }

  handleChange(selected) {
    this.setState({ selected });
  }

  render() {
    const { selected, tagsOrTopics } = this.state;
    return (
      <div className="global-search-input icon-search">
        <div className=" search-group"> 
          <div className="search-selects">
            <div className="opt"><input onChange={this.handleChoice.bind(this)} type='radio' name='typesearch' value='tags'/> Tags</div>
            <div className="opt"><input onChange={this.handleChoice.bind(this)} type='radio' name='typesearch' value='topics'/> Topics</div>
            <div className="opt"><input onChange={this.handleChoice.bind(this)} type='radio' name='typesearch' value='titles'/> Titles</div>
          </div> 
          <div className="search-bar">
            <Select
              closeMenuOnSelect={false}
              isMulti
              selected={selected}
              options={tagsOrTopics}
              placeholder={"Search through 365 unique songs"}
              noOptionsMessage={()=>"Select Tags, Topics, or Titles"}
              onChange={this.handleChange}
              groupBy='group'
            >
            </Select>
          </div>
          <div className="go-button">
            <button onClick={this.filterByChoice.bind(this)}>GO</button>
          </div> 
        </div>  
      </div>
    );
  }
};