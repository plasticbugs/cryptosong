const db = require('../../db-config')
const Song = require('../models/song').Song;
// const totalSongs = require('../models/song.js').totalSongs;
// const Song = require('../models/song.js');
// const Instrument = require('../models/instrument.js');

module.exports.newSong = (req, res) => {
  let newSong = req.body;
  Song.insertSong(newSong)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.sendStatus(501)
  })
}

module.exports.editSong = (req, res) => {
  let newData = req.body;
  Song.updateSong(newData)
  .then( results => {
    res.send(results)
  })
}

module.exports.getAllSongs = (req, res) => {
  Song.find()
  .populate('inkey')
  .then( results => {
    res.send(results);
  })
}

module.exports.getSongCount = (req, res) => {
  Song.totalSongs()
  .then(number => {
    res.send({number});
  })
  .catch(err => {
    res.send(err);
  })
}

module.exports.getSong = (req, res) => {
  let number = parseInt(req.query.id);
  console.log(number)
  Song.getSongByNumber(number)
  .then(result => {
    console.log(result)
    res.send(result);
  })
}
