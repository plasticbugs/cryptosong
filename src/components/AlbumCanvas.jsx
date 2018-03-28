import React, { Component } from 'react';
import { Stage, Image, Layer, Rect } from "react-konva";
import SongImage from './SongImage.jsx';

export default class AlbumCanvas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stage width={500} height={500}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={500}
            height={500}
            fill="pink"
            shadowBlur={2}
          />
          {this.props.images.map(image => {
            // return <SongImage key={image} imageSrc={`/images/${image}`} />
            return <SongImage key={image} imageSrc={`/images/${image}`} />
          })}
        </Layer>
      </Stage>
    )
  }
}
