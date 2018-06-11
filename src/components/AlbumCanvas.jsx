import React, { Component } from "react";
import { Stage, Image, Layer, Rect, Text } from "react-konva";
import SongImage from "./SongImage.jsx";
import { getHueForDate } from "../helpers/hueConversion.js";
import moment from "moment";

import mergeImages from "../helpers/mergeImages.js";

export default class AlbumCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mergedImage: ""
        };
        // console.log((Number.parseInt(this.props.songnumber, 10) + 240) % 360)
    }

    componentDidMount() {
        const { song } = this.props;

        let imgUrls = this.getTagImages(song).map(image => {
            return image;
        });

        mergeImages(imgUrls)
            .then(b64 => {
                this.setState({ mergedImage: b64 });
            })
            .catch(err => {
                throw new Error(`One or more layers did not load: ${err}`);
            });
    }

    getTagImages(song) {
        // let { inkey, beard, location, instruments, topic } = song;
        let {
            inkey,
            beard,
            location,
            instruments,
            mood,
            topic,
            mainInstrument,
            secondaryInstrument
        } = song;
        let tags = [location, mood, topic, beard];
        // let tags = [inkey, beard, location, topic]

        // let currentNumber = Number.parseInt(song.number, 10);
        // let hue = 359 - ((currentNumber + 118) % 360)
        let hue = getHueForDate(new Date(song.date));

        if (!hue) {
            hue = "black";
        }

        let images = [`/images/${hue}.png`];

        tags.forEach(tag => {
            if (tag && tag.image) {
                images.push(`/artlayers/${tag.image}`);
            }
        });

        let instrumentImages;
        if (mainInstrument.name === "vocals") {
            if (secondaryInstrument.name) {
                switch (secondaryInstrument.name) {
                    case "piano":
                        instrumentImages = [
                            `/artlayers/instrument_vocals_no_hands.png`,
                            `/artlayers/${secondaryInstrument.image}`
                        ];
                        break;
                    default:
                        instrumentImages = [
                            `/artlayers/${secondaryInstrument.image}`,
                            `/artlayers/instrument_vocals_no_hands.png`
                        ];
                }
            } else {
                instrumentImages = [`/artlayers/${mainInstrument.image}`];
            }
        } else {
            instrumentImages = [`/artlayers/${mainInstrument.image}`];
        }

        // instrumentImages = instruments.map(instrument => {
        //   return `/artlayers/${instrument.image}`;
        // })
        console.log(instrumentImages);

        if (instrumentImages) {
            images = images.concat(instrumentImages);
        }
        return images;
    }

    componentWillReceiveProps(nextProps) {
        const { song } = nextProps;

        let imgUrls = this.getTagImages(song);

        console.log("image URLS: ", imgUrls);
        mergeImages(imgUrls)
            .then(b64 => {
                this.setState({ mergedImage: b64 });
                return true;
            })
            .catch(err => {
                console.log(err);
                throw new Error(`One or more layers did not load: ${err}`);
                return false;
            });
    }

    render() {
        const { width, height } = this.props;
        let is_loading = this.state.mergedImage ? false : true,
            backgroundImage = this.state.mergedImage
                ? this.state.mergedImage
                : "/loading.gif",
            song_date,
            song_link,
            song_list_item_classes = ["song-list-item"],
            returned_item;

        if (is_loading) {
            song_list_item_classes.push("is-loading");
        }

        if (this.props.list) {
            if (!is_loading) {
                song_date = new Date(this.props.song.date);
                song_date = moment(song_date).format("MMMM Do, YYYY");
                song_link = "/song/" + this.props.song.number + "/";
            }
            return (
                <div
                    className={song_list_item_classes.join(" ")}
                    style={{
                        width: "100px",
                        height: "100px",
                        flexShrink: "0",
                        margin: "5px"
                    }}
                >
                    <a href={song_link}>
                        <div
                            className="song-list-image"
                            style={{
                                backgroundImage: "url(" + backgroundImage + ")",
                                backgroundSize: "cover",
                                backgroundPosition: "center center"
                            }}
                        />
                    </a>
                    <div className="song-list-item-data">
                        <div>
                            Day: {this.props.song.number}{" "}
                            <span className="song-list-item-data-date">
                                {song_date}
                            </span>
                        </div>
                        <h3 className="song-list-item-data-title">
                            <a href={song_link}>
                                {this.props.song.title.slice(0, 100)}
                            </a>
                        </h3>
                    </div>
                </div>
            );
        } else {
            return <img src={backgroundImage} className="song-image" />;
        }

        // <Stage width={this.props.width} height={this.props.height} className="album-art" style={{float: 'left', border: '5px solid black'}}>
        //   <Layer>
        //     <Rect
        //       x={0}
        //       y={0}
        //       width={500}
        //       height={500}
        //       fill={`hsl(${hue},100%,90%)`}
        //       shadowBlur={2}
        //     />
        //     {this.props.images.map(image => {
        //       // return <SongImage key={image} imageSrc={`/images/${image}`} />
        //       return <SongImage key={image} imageSrc={`/images/${image}`} />
        //     })}
        //   </Layer>
        //   <Layer>
        //     <Text text={currentNumber} fontSize={30} fontFamily='Helvetica' fill='black'/>
        //   </Layer>
        // </Stage>
    }
}
