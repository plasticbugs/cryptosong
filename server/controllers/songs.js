const db = require('../../db-config')
const Models = require('../models/index.js');
// const Song = require('../models/song.js');
// const Instrument = require('../models/instrument.js');

module.exports.newSong = (req, res) => {
  console.log(req.body)
  res.send('Success')
}

module.exports.editSong = (req, res) => {

}

module.exports.getAllSongs = (req, res) => {
  Models.Song.find()
  .populate('inkey')
  .then( results => {
    console.log(results[0])
    res.send(results);
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
      console.log(topic)
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