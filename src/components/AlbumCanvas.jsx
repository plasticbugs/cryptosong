import React, { Component } from 'react';
import { Stage, Image, Layer, Rect, Text } from "react-konva";
import SongImage from './SongImage.jsx';
import { getHueForDate } from '../helpers/hueConversion.js'

import mergeImages from 'merge-images';

export default class AlbumCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mergedImage: '',
    }
    // console.log((Number.parseInt(this.props.songnumber, 10) + 240) % 360)
  }

  componentDidMount() {
    const { song } = this.props;

    let imgUrls = this.getTagImages(song).map(image => {
      return '/images/' + image;
    })

    console.log("image URLS: ", imgUrls)
    mergeImages(imgUrls)
    .then(b64 => {
      // console.log(b64)
      this.setState({mergedImage: b64})
    })
  }

  getTagImages(song) {
    // let { inkey, beard, location, instruments, topic } = song;
    let { inkey, beard } = song;
    let tags = [inkey, beard]
    // let tags = [inkey, beard, location, topic]

    // let currentNumber = Number.parseInt(song.number, 10);
    // let hue = 359 - ((currentNumber + 118) % 360)
    let hue = getHueForDate(new Date(song.date));

    if (!hue) {
      hue = 'black'
    }

    let images = [`${hue}.png`];

    // tags.forEach(tag => {
    //   if (tag && tag.image) {
    //     images.push(tag.image) 
    //   }
    // })


    // let instrumentImages;
    // if (instruments) {
    //   instrumentImages = instruments.map(instrument => {
    //     return instrument.image;
    //   })
    // }
    // if (instrumentImages) {
    //   images = images.concat(instrumentImages);
    // }
    console.log(images)
    return images;
  }

  componentWillReceiveProps(nextProps) {
    const { song } = nextProps;

    let imgUrls = this.getTagImages(song).map(image => {
      return '/images/' + image;
    })

    console.log("image URLS: ", imgUrls)
    mergeImages(imgUrls)
    .then(b64 => {
      console.log(b64)
      this.setState({mergedImage: b64})
    })
  }


  render() {
    const { width, height } = this.props;
    return (
      <div style={{width, height, display: 'inline-block'}}>
        <img src={this.state.mergedImage} style={{maxWidth: '100%', maxHeight: '100%', padding: '3px'}}/>
      </div>
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
    )
  }
}
