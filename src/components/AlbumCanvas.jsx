import React, { Component } from 'react';
import { Stage, Image, Layer, Rect, Text } from "react-konva";
import SongImage from './SongImage.jsx';

export default class AlbumCanvas extends Component {
  constructor(props) {
    super(props);
    // console.log((Number.parseInt(this.props.songnumber, 10) + 240) % 360)
  }

  render() {
    let currentNumber = Number.parseInt(this.props.songnumber, 10);
    let hue = 359 - ((currentNumber + 118) % 360)
    return (
      <Stage width={this.props.width} height={this.props.height} className="album-art" style={{float: 'left', border: '5px solid black'}}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={500}
            height={500}
            fill={`hsl(${hue},100%,90%)`}
            shadowBlur={2}
          />
          {this.props.images.map(image => {
            // return <SongImage key={image} imageSrc={`/images/${image}`} />
            return <SongImage key={image} imageSrc={`/images/${image}`} />
          })}
        </Layer>
        <Layer>
          <Text text={currentNumber} fontSize={30} fontFamily='Helvetica' fill='black'/>
        </Layer>
      </Stage>
    )
  }
}
