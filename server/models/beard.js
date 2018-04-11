const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beardSchema = new Schema({
  name: String,
  image: String
});

const Beard = mongoose.model('Beard', beardSchema);

const getAll = () => {
  return new Promise((resolve, reject) => {
    Beard.find({})
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

const deleteMany = (beards) => {
  console.log(beards)
  return new Promise((resolve, reject) => {
    Beard.remove({_id: {$in: beards}})
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

const updateAll = (beards) => {
  return new Promise((resolve, reject) => {
    const recurse = (array) => {
      if (!array.length) {
        return Beard.find({})
        .sort([['_id', -1]])
        .then(beards => {
          resolve(beards);
          return;
        })
      }
      let beard = array.shift();
      if (!beard._id) {
        console.log(beard)
      }
      let num = beard._id.toString();
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        Beard.findById(beard._id)
        .then(doc => {
          doc.name = beard.name;
          doc.image = beard.image;
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
        if (beard.name.length) {
          let newBeard = new Beard({name: beard.name, image: beard.image})
          newBeard.save((err, saved) => {
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
    recurse(beards);
  })
}

module.exports = { Beard, getAll, updateAll, deleteMany }