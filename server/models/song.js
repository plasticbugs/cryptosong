import { Model } from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Models = require('./index.js')
const TagModel = require('./tag')

const tagSchema = new Schema({
  image: String,
  name: String,
})

const songSchema = new Schema({
  number: Number,
  title: String,
  date: Date,
  length: Number,
  inkey: { type: Schema.Types.ObjectId, ref: 'Inkey' },
  tempo: Number,
  topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
  instruments: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
  beard: { type: Schema.Types.ObjectId, ref: 'Beard' },
  videoid: String,
  description: String,
  acousticproduced: String,
  firsts: String,
  comments: String,
  press: String,
  tags: [tagSchema],
});

const Song = mongoose.model('Song', songSchema);

const getLength = (mins, secs) => {
  if (mins && secs) {
    return Number.parseInt(mins) * 60 + Number.parseInt(secs);
  } else if (mins) {
    return Number.parseInt(mins) * 60;
  } else if (secs) {
    return Number.parseInt(secs);
  } else {
    return undefined;
  }
}

const cleanObj = (obj) => {
  obj = obj.toObject();
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key]
    }
  }
  return obj;
}

module.exports.getSongByNumber = (number) => {
  return new Promise((resolve, reject) => {
    Song.find({number})
    .populate('instruments')
    .populate('beard')
    .populate('topic')
    .populate('inkey')
    .populate('location')
    .then(results => {
      const song = results[0];
      resolve(song)
    })
  })
}

module.exports.getSongByNumberWithAllPossibleTags = (number) => {
  return new Promise((resolve, reject) => {
    Song.find({number})
    .populate('instruments')
    .populate('beard')
    .populate('topic')
    .populate('inkey')
    .populate('location')
    .then(song => {
      song = cleanObj(song[0]);
      (async function getAllTags() {
        let instrument = await Models.Instrument.find();
        let beard = await Models.Beard.find();
        let location = await Models.Location.find();
        let topic = await Models.Topic.find();
        let inkey = await Models.Inkey.find();
        let tag = await Models.Tag.find();
        resolve({instrument, beard, location, topic, inkey, song, tag});
      })();

    })
    .catch(err => {
      if (err) {
        console.log(err);
        reject(err);
      }
    })
  })
}

const assignIDsToTags = (data) => {
  let songData = Object.assign({}, data);
  const TAGS = ['beard', 'location', 'topic', 'inkey'];
  TAGS.forEach(tag => {
    if (typeof songData[tag] === 'object' && songData[tag]._id) {
      songData[tag] = songData[tag]._id;
    }
  })
  return songData;
}

module.exports.updateSong = (songData) => {
  return new Promise((resolve, reject) => {
    songData = assignIDsToTags(songData);

    if (songData.instruments.length > 0) {
      songData.instruments = songData.instruments.map(instrument => {
       return instrument._id;
     })
    }
    TagModel.deleteTagsForSong(Number.parseInt(songData.number))
    .then(success => {
      if (songData.tags.length) {
        TagModel.addOrInsertTags(songData.tags, Number.parseInt(songData.number))
        .then(success => {
          delete songData.tags;
          songData.length = getLength(songData.mins, songData.secs);
          Song.findOneAndUpdate({_id: songData._id}, songData, (err, results) => {
            if (err) {
              console.log(err);
              reject(err);
              return;
            }
            resolve(results);
          })
        })
      } else {
        songData.length = getLength(songData.mins, songData.secs);
        Song.findOneAndUpdate({_id: songData._id}, songData, (err, results) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve(results);
        })
      }

    })
  })
}

module.exports.insertSong = (newSong) => {
  console.log('inserting...')
  return new Promise((resolve, reject) => {
    newSong = assignIDsToTags(newSong);
    // newSong.beard = newSong.beard._id;
    // newSong.location = newSong.location._id;
    // newSong.topic = newSong.topic._id;
    // newSong.inkey = newSong.inkey._id;
    newSong.instruments = newSong.instruments.map(instrument => {
      return instrument._id;
    })

    newSong.length = getLength(newSong.mins, newSong.secs);
    let song = new Song(newSong);
    song.save(err => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('it saved');
      resolve('OK');
    })
  })
}

module.exports.updateTagsOnSongs = (newTagData) => {
  return new Promise((resolve, reject) => {
    Song.find({"tags._id": newTagData._id})
    .then(results => {
      results.forEach(song => {
        let tagDoc = song.tags.id(newTagData._id);
        tagDoc.name = newTagData.name;
        tagDoc.image = newTagData.image;
        song.save()
      })
      resolve();
    })
  })
}

module.exports.removeTagsFromSongs = (tagArray) => {
  return new Promise((resolve, reject) => {
    (function recurse(array) {
      console.log('recursing')
      if (!array.length) {
        resolve()
      } else {
        let tag = array.shift();
        console.log(tag)
        Song.find({"tags._id": tag})
        .then(results => {
          results.forEach(song => {
            song.tags.pull(tag)
            song.save()
          })
          recurse(array)
        })
      }
    })(tagArray.slice())
  })
}

module.exports.totalSongs = () => {
  return new Promise((resolve, reject) => {
    Song.count({}, (err, number) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(number)
    })
  })
}

module.exports.Song = Song;
module.exports.songSchema = songSchema;