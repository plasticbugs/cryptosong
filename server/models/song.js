const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Models = require('./index.js');

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
  firsts: String
});

const Song = mongoose.model('Song', songSchema);

const getLength = (mins, secs) => {
  return Number.parseInt(mins) * 60 + Number.parseInt(secs);
}

module.exports.getSongByNumber = (number) => {
  return new Promise((resolve, reject) => {
    Song.find({number})
    .populate('instruments')
    .populate('beard')
    .populate('topic')
    .populate('inkey')
    .populate('location')
    .then(song => {
      (async function getAllTags() {
        let instrument = await Models.Instrument.find();
        let beard = await Models.Beard.find();
        let location = await Models.Location.find();
        let topic = await Models.Topic.find();
        let inkey = await Models.Inkey.find();
        resolve({instrument, beard, location, topic, inkey, song: song[0]});
      })();

    })
    .catch(err => {
      reject(err);
    })
  })
}

module.exports.updateSong = (songData) => {
  return new Promise((resolve, reject) => {
    songData.beard = songData.beard._id;
    songData.location = songData.location._id;
    songData.topic = songData.topic._id;
    songData.inkey = songData.inkey._id;
    songData.instruments = songData.instruments.map(instrument => {
      return instrument._id;
    })
    songData.length = getLength(songData.mins, songData.secs);
    Song.findOneAndUpdate({_id: songData._id}, songData, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    })
  })
}

module.exports.insertSong = (newSong) => {
  console.log('inserting...')
  return new Promise((resolve, reject) => {
    newSong.beard = newSong.beard._id;
    newSong.location = newSong.location._id;
    newSong.topic = newSong.topic._id;
    newSong.inkey = newSong.inkey._id;
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