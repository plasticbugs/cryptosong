const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: String,
  image: String
});

const Location = mongoose.model('Location', locationSchema);

const getAll = () => {
  return new Promise((resolve, reject) => {
    Location.find({})
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

const deleteMany = (locations) => {
  console.log(locations)
  return new Promise((resolve, reject) => {
    Location.remove({_id: {$in: locations}})
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

const updateAll = (locations) => {
  return new Promise((resolve, reject) => {
    const recurse = (array) => {
      if (!array.length) {
        return Location.find({})
        .sort([['_id', -1]])
        .then(locations => {
          resolve(locations);
          return;
        })
      }
      let location = array.shift();
      if (!location._id) {
        console.log(location)
      }
      let num = location._id.toString();
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        Location.findById(location._id)
        .then(doc => {
          doc.name = location.name;
          doc.image = location.image;
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
        if (location.name.length) {
          let newLocation = new Location({name: location.name, image: location.image})
          newLocation.save((err, saved) => {
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
    recurse(locations);
  })
}

module.exports = { Location, getAll, updateAll, deleteMany }