const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: String,
  image: String
});

const Topic = mongoose.model('Topic', topicSchema);

const getAll = () => {
  return new Promise((resolve, reject) => {
    Topic.find({})
    .sort([['_id', -1]])
    .then(results => {
      resolve(results);
    })
    .catch(err => {
      if (err) {
        reject(err);
      }
    })
  })
}

const deleteMany = (topics) => {
  console.log(topics)
  return new Promise((resolve, reject) => {
    Topic.remove({_id: {$in: topics}})
    .then( success => {
      "removed a bunch"
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    })
  })
}

const updateAll = (topics) => {
  return new Promise((resolve, reject) => {
    const recurse = (array) => {
      if (!array.length) {
        return Topic.find({})
        .sort([['_id', -1]])
        .then(topics => {
          resolve(topics);
          return;
        })
      }
      let topic = array.shift();
      if (!topic._id) {
        console.log(topic)
      }
      let num = topic._id.toString();
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        Topic.findById(topic._id)
        .then(doc => {
          doc.name = topic.name;
          doc.image = topic.image;
          doc.save((err, updated) => {
            if (err) {
              console.log(err)
              reject(err);
            } else {
              recurse(array);
            }
          })
        })
      } else {
        if (topic.name.length) {
          let newTopic = new Topic({name: topic.name, image: topic.image})
          newTopic.save((err, saved) => {
            if (err) {
              reject(err);
              return;
            }
            recurse(array);
          })  
        } else {
          recurse(array);
        }
      }
    }
    recurse(topics);
  })
}

module.exports = { Topic, getAll, updateAll, deleteMany }