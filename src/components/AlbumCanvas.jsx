import React, { Component } from 'react';
import { Stage, Image, Layer, Rect } from "react-konva";
import SongImage from './SongImage.jsx';

export default class AlbumCanvas extends Component {
  constructor(props) {
    super(props);
    // this.setUpCanvas = this.setUpCanvas.bind(this);
  }

  componentDidMount() {
    // this.setUpCanvas();
  }
//   setUpCanvas() {
//     console.log('hey')
// // canvas related variables
//     const canvas = this.state.myCanvas;
//     var ctx=canvas.getContext("2d");
//     var cw=canvas.width;
//     var ch=canvas.height;
//     ctx.fillStyle = "pink";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     // ctx.scale(.8,.8);


//     // put the paths to your images in imageURLs[]
//     var imageURLs = this.props.images;

//     console.log(imageURLs)
//     // the loaded images will be placed in imgs[]
//     var imgs=[];

//     // Create a new Image() for each item in imageURLs[]
//     // When all images are loaded, run the callback (==imagesAreNowLoaded)
//     function startLoadingAllImages(callback){
//       console.log('starting loading images')
//       // iterate through the imageURLs array and create new images for each
//       for (var i=0; i<imageURLs.length; i++) {
//         // create a new image an push it into the imgs[] array
//         var img = new Image();
//         // Important! By pushing (saving) this img into imgs[],
//         //     we make sure the img variable is free to
//         //     take on the next value in the loop.
//         imgs.push(img);
//         // when this image loads, call this img.onload
//         img.onload = function(){ 
//           // this img loaded, increment the image counter
//           imagesOK++; 
//           // if we've loaded all images, call the callback
//           if (imagesOK>=imageURLs.length ) {
//             callback();
//           }
//         };
//         // notify if there's an error
//         img.onerror=function(){alert("image load failed");} 
//         // set img properties
//         img.src = `/images/${imageURLs[i]}`;
//         console.log(img)
//       }      
//     }

//     // All the images are now loaded
//     // Do drawImage & fillText
//     function imagesAreNowLoaded(){

//       // the imgs[] array now holds fully loaded images
//       // the imgs[] are in the same order as imageURLs[]

//       ctx.font="30px sans-serif";
//       ctx.fillStyle="#333333";

//       // drawImage the first image (face1.png) from imgs[0]
//       // and fillText its label below the image
//       for(let i = 0; i< imageURLs.length; i++) {
        
//       ctx.drawImage(imgs[i],0,0);
//         }
//       // drawImage the first image (face2.png) from imgs[1]
//       // and fillText its label below the image

//     }

//     var imagesOK=0;
//     startLoadingAllImages(imagesAreNowLoaded);
//   }

  render() {
    return (
      <Stage width={500} height={500} >
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
            return <SongImage imageSrc={`/images/${image}`} />
          })}
        </Layer>
      </Stage>
      // <Surface width={500} height={500} left={0} top={0}>
      //   <Image src={'/images/beard_0.png'} />
      // </Surface>
      // <canvas style={{marginTop: '2em'}} ref={(canvas) => { this.state.myCanvas = canvas; }} width={500} height={500}></canvas>
    )
  }
}