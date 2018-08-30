const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});

const makeImages = () => {
  for (let i = 0; i < 360; i++) {
    gm(1792, 768, `hsl(${i}), 100%, 90%`)
    .write(`./client/build/images/${i}.png`, function (err) {
      if (err) {
        console.log(err);
        return;
      }
    });
  }
}

makeImages()