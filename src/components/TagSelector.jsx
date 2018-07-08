import React, { Component } from "react";
import axios from "axios";
import "../styles/global.scss";


export default class TagSelector extends Component {
    constructor(props) {
        super(props);
        this.state ={
            tags: [],
            selected: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.filterByTags = this.filterByTags.bind(this);
    }
    componentDidMount() {
        axios.get('/api/tags').then(tags => {
            this.setState({tags:tags.data});
            // tags.data.map(tag => {
            //     return <option value={tag._id}>{tag.name}</option>;
            // })
        })
    }
    filterByTags() {
        console.log('filterbytags');
        console.log(this.state.selected);
        this.props.tagGrab(this.state.selected);
    }
    handleChange(e) {
        let pile = e.target.selectedOptions;
        let selected = [];
        for (let i = 0; i < pile.length; i++){
            selected.push(pile[i].value);
        }
        this.setState({selected});
    }
    render() {
        return (
            <div>
                <div>
                    <select onChange={this.handleChange} id="tags" multiple size="5">
                    {
                        this.state.tags.map((tag, key) => {
                            return <option key={key} value={tag.name}>{tag.name}</option>;
                        })
                    }   
                    </select>
                </div>
                <button onClick={this.filterByTags.bind(this)}>filter them!</button>
            </div>
        );
    }
}