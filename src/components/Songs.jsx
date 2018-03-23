import React, { Component } from 'react';
import { Container, Card, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';

export default class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  componentDidMount() {
    axios.get('/api/songs')
    .then(songs => {
      this.setState({songs: songs.data})
    })
    // console.log(randomColor())
  }


  render() {
    return (<Container>
      <Card.Group itemsPerRow={4}>
    {this.state.songs.map( (song) => {
      return (
        <Card key={song.number}>
          <Image src={`https://img.youtube.com/vi/${song.videoid}/mqdefault.jpg`} />
          <Card.Content>
            <Card.Header>
              {song.title}
            </Card.Header>
            <Card.Meta>
              <span className='date'>
                {new Date(song.date).toDateString()}
              </span>
            </Card.Meta>
            <Card.Description>
              {song.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='music' />
              {song.inkey}
            </a>
            <br />
            <a href={`https://www.youtube.com/watch?v=${song.videoid}`}>
              <Icon name='video' />
              Watch
            </a>
          </Card.Content>
        </Card>
      )
    })}
    </Card.Group>
    </Container>)
  }
}



// // canvas related variables
// var canvas=document.getElementById("canvas");
// var ctx=canvas.getContext("2d");
// var cw=canvas.width;
// var ch=canvas.height;

// // put the paths to your images in imageURLs[]
// var imageURLs=[];  
// imageURLs.push("instrument0.png");
// imageURLs.push("instrument1.png");
// imageURLs.push("instrument2.png");
// imageURLs.push("instrument3.png");


// // the loaded images will be placed in imgs[]
// var imgs=[];
// var imagesOK=0;
// startLoadingAllImages(imagesAreNowLoaded);

// // Create a new Image() for each item in imageURLs[]
// // When all images are loaded, run the callback (==imagesAreNowLoaded)
// function startLoadingAllImages(callback){

//   // iterate through the imageURLs array and create new images for each
//   for (var i=0; i<imageURLs.length; i++) {
//     // create a new image an push it into the imgs[] array
//     var img = new Image();
//     // Important! By pushing (saving) this img into imgs[],
//     //     we make sure the img variable is free to
//     //     take on the next value in the loop.
//     imgs.push(img);
//     // when this image loads, call this img.onload
//     img.onload = function(){ 
//       // this img loaded, increment the image counter
//       imagesOK++; 
//       // if we've loaded all images, call the callback
//       if (imagesOK>=imageURLs.length ) {
//         callback();
//       }
//     };
//     // notify if there's an error
//     img.onerror=function(){alert("image load failed");} 
//     // set img properties
//     img.src = imageURLs[i];
//   }      
// }

// // All the images are now loaded
// // Do drawImage & fillText
// function imagesAreNowLoaded(){

//   // the imgs[] array now holds fully loaded images
//   // the imgs[] are in the same order as imageURLs[]

//   ctx.font="30px sans-serif";
//   ctx.fillStyle="#333333";

//   // drawImage the first image (face1.png) from imgs[0]
//   // and fillText its label below the image
// 	for(let i = 0; i< imageURLs.length; i++) {
		
//   ctx.drawImage(imgs[i],0,0);
//     }

//   // drawImage the first image (face2.png) from imgs[1]
//   // and fillText its label below the image


// }