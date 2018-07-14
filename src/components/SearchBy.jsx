import React, { Component } from "react";
import { Container, Card, Icon, Image, Popup, Embed } from "semantic-ui-react";
import axios from "axios";
import AlbumCanvas from "./AlbumCanvas.jsx";
import Navigation from "./Navigation.jsx";
import TagSelector from "./TagSelector.jsx";

import "../styles/songs.scss";

class SearchBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            size: "md",
            imageSize: 100,
            tagSelector: false,
        };
        this.revealTagSelector = this.revealTagSelector.bind(this);
        this.narrowSelection = this.narrowSelection.bind(this);
        this.getByTags = this.getByTags.bind(this);
        this.tagGrab = this.tagGrab.bind(this);
    }

    componentDidMount() {
        switch (this.props.filterBy) {
            case "tags":
                this.getByTags();
                break;
            default:
                this.getAllSongs();
        };
    }

    getAllSongs() {
        axios.get("/api/songs").then(songs => {
            this.setState({ songs: songs.data });
        });
    }

    getByTags() {
        const tags = [];
        tags.push(this.props.match.params.tagname);
        this.tagGrab(tags).then((res) => {
            this.narrowSelection(res);
        });
    }

    tagGrab(tags) {
        return new Promise ((res, rej) => {
            axios.get("/api/find_tags", {
                params: {
                   tags: tags, 
                },
            }).then(songs => {
                res({ songs: songs.data });
            }).catch(err => rej(err));
        })
    }

    narrowSelection(songs) {
        this.setState(songs);
    }

    revealTagSelector(bool) {
        this.setState({tagSelector:bool})
    }

    renderKey(song) {
        if (song.inkey) {
            return (
                <a>
                    <Icon name="music" />
                    {song.inkey.name}
                </a>
            );
        }
    }    
    
    renderSizes() {
        let sizes = ["sm", "md", "lg"];

        let sizesDom = sizes.map(size => {
            let classes = [];

            if (size === this.state.size) {
                classes.push("active");
            }
            return (
                <li key={size} className={classes.join(" ")}>
                    <a onClick={this.changeZoom.bind(this, size)}>{size}</a>
                </li>
            );
        });

        return sizesDom;
    }

    changeZoom(size) {
        switch (size) {
            case "sm":
                this.setState({ size: "sm", imageSize: 50 });
                return;
            case "md":
                this.setState({ size: "md", imageSize: 100 });
                return;
            case "lg":
                this.setState({ size: "lg", imageSize: 190 });
                return;
            default:
                return;
        }
    }

    render() {
        const { x, y } = this.state;
        const style = {
            borderRadius: 0,
            border: "2px solid black",
            padding: "2em"
        };
        let sizeClass = "size-" + this.state.size;
        return (
            <Container
                style={{
                    padding: "2px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Navigation revealTagSelector={this.revealTagSelector}/>
                {
                    this.state.tagSelector ? 
                    <TagSelector 
                        narrowSelection={this.narrowSelection}
                        tagGrab={(tags)=>this.tagGrab(tags)}
                    /> :
                    null   
                }
                <div className="filter-navigation">
                    <div className="filter-navigation-inner">
                        <ul className="filter-size">
                            <li>Size</li>
                            {this.renderSizes()}
                        </ul>
                    </div>
                </div>
                <div className={"song-list-container " + sizeClass}>
                {this.state.songs.map((song, key) => {
                    return (
                        <AlbumCanvas
                            width={this.state.imageSize}
                            height={this.state.imageSize}
                            backgroundImage={"/" + song.imagePathSmall}
                            song={song}
                            songnumber={song.number}
                            list={true}
                        />
                    );
                })}
                </div>
            </Container>
        );
    }
}

module.exports = SearchBy;