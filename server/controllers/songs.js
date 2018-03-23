const db = require('../../db-config')
const Song = require('../models/song.js');
const Instrument = require('../models/instrument.js');

module.exports.newSong = (req, res) => {
  console.log(req.body)
  res.send('Success')
}

module.exports.editSong = (req, res) => {

}

module.exports.getAllSongs = (req, res) => {
  Song.find().then( results => {
    res.send(results);
  })
}

module.exports.getSong = (req, res) => {
  Song.find({number: parseInt(req.query.id)})
  .populate('instruments')
  .populate('beard')
  .populate('topic')
  .populate('inkey')
  .populate('location')
  // .exec()
  .then(song => {
    console.log(song)
    // Instrument.find({name: { $in: song[0].instruments}})
    // .then(results => {
    //   console.log(results)
    // })
    // Instrument.find({name: {$in: song.instruments}})
    // .then(results => {
    //   console.log(results)
    // })
    res.send(song);
  })
}