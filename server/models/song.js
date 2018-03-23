const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Instrument = mongoose.model('Instrument', {name: String, image: String});
const Inkey = mongoose.model('Inkey', {name: String, image: String});
const Topic = mongoose.model('Topic', {name: String, image: String});
const Beard = mongoose.model('Beard', {name: String, image: String});
const City = mongoose.model('Location', {name: String, image: String});

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

module.exports = Song;