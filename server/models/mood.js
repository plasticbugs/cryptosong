const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moodSchema = new Schema({
  name: String,
  image: String
});

const Mood = mongoose.model('Mood', moodSchema);

const getAll = () => {
  return new Promise((resolve, reject) => {
    Mood.find({})
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

const deleteMany = (moods) => {
  console.log(moods)
  return new Promise((resolve, reject) => {
    Mood.remove({_id: {$in: moods}})
    .then( success => {
      resolve();
    })
    .catch(err => {
      if (err) {
        console.log(err);
        reject(err);
      }
    })
  })
}

const updateAll = (moods) => {
  return new Promise((resolve, reject) => {
    const recurse = (array) => {
      if (!array.length) {
        return Mood.find({})
        .sort([['_id', -1]])
        .then(moods => {
          resolve(moods);
          return;
        })
      }
      let mood = array.shift();
      if (!mood._id) {
        console.log(mood)
      }
      let num = mood._id.toString();
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        Mood.findById(mood._id)
        .then(doc => {
          doc.name = mood.name;
          doc.image = mood.image;
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
        if (mood.name.length) {
          let newMood = new Mood({name: mood.name, image: mood.image})
          newMood.save((err, saved) => {
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
    recurse(moods);
  })
}

module.exports = { Mood, getAll, updateAll, deleteMany }
