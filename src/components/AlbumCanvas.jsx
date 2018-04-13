import React, { Component } from 'react';
import { Stage, Image, Layer, Rect } from "react-konva";
import SongImage from './SongImage.jsx';

export default class AlbumCanvas extends Component {
  constructor(props) {
    super(props);
    // console.log((Number.parseInt(this.props.songnumber, 10) + 240) % 360)
  }

  render() {
    let currentNumber = Number.parseInt(this.props.songnumber, 10);
    let hue = (currentNumber + 239) % 360
    return (
      <div>
      <Stage width={this.props.width} height={this.props.height} style={{display: 'inherit'}}>
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
      </Stage>
      </div>
    )
  }
}
