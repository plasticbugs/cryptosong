const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  number: Number,
  title: String,
  date: Date,
  length: Number,
  inkey: String,
  tempo: Number,
  topic: String,
  location: String,
  instruments: [String],
  beard: String,
  videoid: String,
  description: String,
  acousticproduced: String,
  firsts: String
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;