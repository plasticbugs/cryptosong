const db = require('../../db-config')
// const Song = require('../models/song').Song;
const SongModel = require('../models/song');
// const totalSongs = require('../models/song.js').totalSongs;
// const Song = require('../models/song.js');
// const Instrument = require('../models/instrument.js');

module.exports.newSong = (req, res) => {
  let newSong = req.body;
  SongModel.insertSong(newSong)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.sendStatus(501)
  })
}

module.exports.editSong = (req, res) => {
  let newData = req.body;
  SongModel.updateSong(newData)
  .then( results => {
    res.send(results)
  })
}

module.exports.getAllSongs = (req, res) => {
  SongModel.Song.find()
  .populate('inkey')
  .populate('beard')
  .then( results => {
    results.sort((a,b) => {
      return a.number - b.number;
    })
    res.send(results);
  })
}

module.exports.getSongCount = (req, res) => {
  SongModel.totalSongs()
  .then(number => {
    res.send({number});
  })
  .catch(err => {
    res.send(err);
  })
}

module.exports.getSongWithTags = (req, res) => {
  const number = parseInt(req.query.id);
  SongModel.getSongByNumberWithAllPossibleTags(number)
  .then(result => {
    // console.log(result)
    res.send(result);
  })
}

module.exports.getSongByID = (req, res) => {
  const songNum = req.params.id;
  SongModel.getSongByNumber(songNum)
  .then(song => res.send(song))
}