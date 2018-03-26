const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inkeySchema = new Schema({
  name: String,
  image: String
});

const Inkey = mongoose.model('Inkey', inkeySchema);

module.exports = Inkey;