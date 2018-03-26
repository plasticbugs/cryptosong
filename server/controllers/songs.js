const db = require('../../db-config')
const Models = require('../models/index.js');
// const Song = require('../models/song.js');
// const Instrument = require('../models/instrument.js');

module.exports.newSong = (req, res) => {
  console.log(req.body)
  res.send('Success')
}

module.exports.editSong = (req, res) => {
  let newData = req.body;
  newData.beard = newData.beard._id;
  newData.location = newData.location._id;
  newData.topic = newData.topic._id;
  newData.inkey = newData.inkey._id;
  newData.instruments = newData.instruments.map(instrument => {
    return instrument._id;
  })
  newData.length = newData.mins * 60 + newData.secs;
  console.log(typeof newData.mins, newData.mins, typeof newData.secs, newData.secs)
  // console.log(typeof newData.secs)
  console.log(newData.length)
  Models.Song.findOneAndUpdate({_id: req.body._id}, newData, (err, results) => {
    res.send(results);
  })
}

module.exports.getAllSongs = (req, res) => {
  Models.Song.find()
  .populate('inkey')
  .then( results => {
    console.log(results[0])
    res.send(results);
  })
}

module.exports.getSongCount = (req, res) => {
  Models.Song.totalSongs()
  .then(number => {
    // console.log(number)
    res.send({number});
  })
  .catch(err => {
    // console.log(err)
    res.send(err);
  })
}

module.exports.getSong = (req, res) => {
  Models.Song.find({number: parseInt(req.query.id)})
  .populate('instruments')
  .populate('beard')
  .populate('topic')
  .populate('inkey')
  .populate('location')
  // .exec()
  .then(song => {
    async function getAllTags() {
      let instrument = await Models.Instrument.find();
      let beard = await Models.Beard.find();
      let location = await Models.Location.find();
      let topic = await Models.Topic.find();
      let inkey = await Models.Inkey.find();
      res.send({instrument, beard, location, topic, inkey, song: song[0]});
    }
    getAllTags();
    // console.log(song)
    // Instrument.find({name: { $in: song[0].instruments}})
    // .then(results => {
    //   console.log(results)
    // })
    // Instrument.find({name: {$in: song.instruments}})
    // .then(results => {
    //   console.log(results)
    // })
  })
}