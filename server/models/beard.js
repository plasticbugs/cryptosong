const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beardSchema = new Schema({
  name: String,
  image: String
});

const Beard = mongoose.model('Beard', beardSchema);

module.exports = Beard;