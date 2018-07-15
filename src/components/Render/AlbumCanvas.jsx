import React, { Component } from 'react';
import { Stage, Image, Layer, Rect, Text } from 'react-konva';
import SongImage from './SongImage.jsx';
import moment from 'moment';

import mergeImages from '../../helpers/mergeImages';

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
    }

    componentWillReceiveProps(nextProps) {
        const { song } = nextProps;
    }

    render() {
        const { backgroundImage, width, height } = this.props;
        let song_date,
            song_link,
            song_list_item_classes = ["song-list-item"],
            returned_item;

        if (this.props.list) {
            song_date = new Date(this.props.song.date);
            song_date = moment(song_date).format("MMMM Do, YYYY");
            song_link = "/song/" + this.props.song.number + "/";
            return (
                <div
                    className={song_list_item_classes.join(" ")}
                    style={{
                        width: width,
                        height: height,
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
                                backgroundPosition: "center center",
                                width: width,
                                height: height
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
