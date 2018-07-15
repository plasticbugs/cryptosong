import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ImportSongData from '../Utils/ImportSongData.jsx';
import Collection from "../Utils/Collection.jsx";
import SongInputForm from "../SongInputForm.jsx";


export default class EditPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editfields: ['instrument', 'topic','location','inkey','beard','tag','import'],
            songNumber: 0,
            choice: null,
            render: "",
        }
        this.newSong = this.newSong.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitChoice = this.submitChoice.bind(this);
        this.selectSong = this.selectSong.bind(this);
        this.renderSomething = this.renderSomething.bind(this);
    }
    
    newSong(e) {
        e.preventDefault();
        this.setState({render:'NEW'});
    }
    
    handleChange (e) {
        const name = e.target.name;
        const value = e.target.value;  
        this.setState({[name]: value});
    }

    submitChoice(e) {
        e.preventDefault();
        this.setState({render:this.state.choice});
    }

    selectSong(e) {
        e.preventDefault();
        this.setState({render:parseInt(this.state.songNumber)});
    }

    renderSomething() {
        let rtnVar;
        console.log(this.state.render);
        if(typeof this.state.render == 'number'){
            rtnVar = <SongInputForm 
                        songId={this.state.render} 
                        editing={true} 
                        {...this.props} 
                    />
        } else if (this.state.render === 'NEW') {
            rtnVar = <SongInputForm {...this.props} />
        } else {
            let apiPath = `/api/${this.state.render}s`;
            let collection = this.state.render.replace(/^\w/, c => c.toUpperCase());
            console.log(collection);
            switch (this.state.render) {
                case "":
                    rtnVar = <div style={{color:"white"}}>MAKE A SELECTION</div>
                    break;
                case 'import':
                    rtnVar = <ImportSongData {...this.props}/>
                break;
                default:
                    rtnVar = <Collection
                                {...this.props}
                                apiCollectionPath={apiPath}
                                collectionName={collection}
                            />
                break;
            }
        }
        return rtnVar;
    }

    render() {
        return (
            <div 
                style={{
                color:"white",
                padding: "2px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}>
                <div> 
                    <Link to='/admin/logout'> LOGOUT |</Link>
                    <Link to='/admin/opts'> ADMIN PANEL</Link>
                    <Link to='/admin/edit'> | SELECT TO EDIT:</Link> 
                </div>
                <div>
                    <form onChange={this.handleChange} onSubmit={this.submitChoice}>
                        <select name="choice">
                            {this.state.editfields.map((opt, key) => {
                                return <option key={key} value={opt}>{opt}s</option>
                            })}
                        </select>
                        <input type="submit" value="<-"/>
                    </form>
                </div>
                <div>
                    <Link to='/admin/edit'> | NEW SONG:</Link> 
                </div>
                <button onClick={this.newSong}>*</button>
                <div>
                    <Link to='/admin/edit'> | EDIT A SONG:</Link> 
                </div>
                <div>
                    <form onChange={this.handleChange} onSubmit={this.selectSong}>
                        <input type="number" 
                            name="songNumber" 
                            placeholder="song number"
                            value={this.state.songNumber}/>
                        <input type="submit" value="<-"/>
                    </form>
                </div>
                <div style ={{width: '100vw'}}>
                    {this.renderSomething()}
                </div>
            </div>
        )
    }
}             
