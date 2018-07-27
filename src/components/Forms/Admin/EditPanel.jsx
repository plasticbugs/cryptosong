import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImportSongData from '../Utils/ImportSongData.jsx';
import Collection from '../Utils/Collection.jsx';
import SongInputForm from '../SongInputForm.jsx';


export default class EditPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editfields: ['instrument', 'topic', 'location', 'inkey', 'beard', 'tag', 'import'],
      songNumber: 0,
      choice: 'instrument',
      render: '',
    };
    this.newSong = this.newSong.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitChoice = this.submitChoice.bind(this);
    this.selectSong = this.selectSong.bind(this);
    this.renderSomething = this.renderSomething.bind(this);
  }

  newSong(e) {
    e.preventDefault();
    this.setState({ render: 'NEW' });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submitChoice(e) {
    e.preventDefault();
    this.setState({ render: this.state.choice });
  }

  selectSong(e) {
    e.preventDefault();
    const songNum = parseInt(this.state.songNumber, 10);
    this.setState({ render: songNum });
  }

  renderSomething() {
    let rtnVar;
    console.log(this.state.render);
    if (typeof this.state.render === 'number') {
      const editing = true;
      rtnVar = (
        <SongInputForm
          songId={this.state.render}
          editing={editing}
          {...this.props}
        />
      );
    } else if (this.state.render === 'NEW') {
      rtnVar = <SongInputForm {...this.props} />;
    } else {
      const apiPath = `/api/${this.state.render}s`;
      const collection = this.state.render.replace(/^\w/, c => c.toUpperCase());
      console.log(collection);
      switch (this.state.render) {
        case '':
          rtnVar = <div style={{ color: 'white', marginBottom: '10px' }}>MAKE A SELECTION</div>;
          break;
        case 'import':
          rtnVar = <ImportSongData {...this.props} />;
          break;
        default:
          rtnVar = (
            <Collection
              {...this.props}
              apiCollectionPath={apiPath}
              collectionName={collection}
            />
          );
          break;
      }
    }
    return rtnVar;
  }

  render() {
    const formStyle = {
      color: 'white',
      padding: '2px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      lineHeight: '3px',
    };
    return (
      <div style={formStyle}>
        <pre><Link to="/admin/logout"> LOGOUT</Link> | </pre>
        <pre><Link to="/admin/opts">ADMIN PANEL</Link> | </pre>
        <pre><Link to="/admin/edit">SELECT TO EDIT:</Link></pre>
        <form style={formStyle} onChange={this.handleChange} onSubmit={this.submitChoice}>
          <select name="choice">
            {this.state.editfields.map((opt, key) =>
              <option key={key} value={opt}>{opt}s</option>)}
          </select>
          <input type="submit" value="<-" />
        </form>
        <pre> | <Link to="/admin/edit">NEW SONG:</Link></pre>
        <button style={formStyle} onClick={this.newSong}><pre> * </pre></button>
        <pre> | <Link to="/admin/edit">EDIT A SONG:</Link></pre>
        <form style={formStyle} onChange={this.handleChange} onSubmit={this.selectSong}>
          <input
            type="number"
            name="songNumber"
            placeholder="song number"
            value={this.state.songNumber}
          />
          <input type="submit" value="<-" />
        </form>
        <div style={{ width: '100vw' }}>
          {this.renderSomething()}
        </div>
      </div>
    );
  }
}
