const db = require('../../db-config')
const Models = require('../models/index.js');
import Song from '../models/song';
// const totalSongs = require('../models/song.js').totalSongs;
// const Song = require('../models/song.js');
// const Instrument = require('../models/instrument.js');

module.exports.newSong = (req, res) => {
  // console.log(req.body)
  let newSong = req.body;
  Song.insertSong(newSong)
  .then(result => {
    console.log('good', result)
    res.send(result)
  })
  .catch(err => {
    console.log('bad', err)
    res.sendStatus(501)
  })
}

module.exports.editSong = (req, res) => {
  let newData = req.body;
  // console.log(newData)
  Song.updateSong(newData)
  .then( results => {
    res.send(results)
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
  let number = parseInt(req.query.id);
  Song.getSongByNumber(number)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.sendStatus(501);
  })
}