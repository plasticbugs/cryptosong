import React, {Component} from 'react';
import { Image } from 'react-konva';

export default class SongImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }
  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.imageSrc;
    console.log(image.src)
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  render() {
    return <Image image={this.state.image} top={0} left={0} />;
  }
}
