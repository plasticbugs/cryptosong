const Song = require('../models/song.js');

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