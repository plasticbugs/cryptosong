const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentSchema = new Schema({
  name: String,
  image: String
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = Instrument;