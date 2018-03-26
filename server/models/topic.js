const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: String,
  image: String
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;