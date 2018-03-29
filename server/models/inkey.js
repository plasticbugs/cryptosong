const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inkeySchema = new Schema({
  name: String,
  image: String
});

const Inkey = mongoose.model('Inkey', inkeySchema);

const getAll = () => {
  return new Promise((resolve, reject) => {
    Inkey.find({})
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

const deleteMany = (inkeys) => {
  console.log(inkeys)
  return new Promise((resolve, reject) => {
    Inkey.remove({_id: {$in: inkeys}})
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

const updateAll = (inkeys) => {
  return new Promise((resolve, reject) => {
    const recurse = (array) => {
      if (!array.length) {
        return Inkey.find({})
        .sort([['_id', -1]])
        .then(inkeys => {
          resolve(inkeys);
          return;
        })
      }
      let inkey = array.shift();
      if (!inkey._id) {
        console.log(inkey)
      }
      let num = inkey._id.toString();
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        Inkey.findById(inkey._id)
        .then(doc => {
          doc.name = inkey.name;
          doc.image = inkey.image;
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
        if (inkey.name.length) {
          let newInkey = new Inkey({name: inkey.name, image: inkey.image})
          newInkey.save((err, saved) => {
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
    recurse(inkeys);
  })
}

module.exports = { Inkey, getAll, updateAll, deleteMany }