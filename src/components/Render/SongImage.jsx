import React, { Component } from 'react';
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
        image.onload = () => {
            // setState will redraw layer
            // because "image" property is changed
            this.setState({
                image: image
            });
        };
    }

    render() {
        return (
            <Image
                key={this.state.image}
                image={this.state.image}
                top={0}
                left={0}
            />
        );
    }
}
