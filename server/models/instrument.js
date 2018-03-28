const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentSchema = new Schema({
  name: String,
  image: String
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

const getAll = () => {
  return new Promise((resolve, reject) => {
    Instrument.find({})
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

const updateAll = (instruments) => {
  for (let i = 0; i < instruments.length; i++) {
    console.log(instruments[i]._id)
  }
  return new Promise((resolve, reject) => {
    const recurse = (array) => {
      if (!array.length) {
        return Instrument.find({})
        .then(instruments => {
          resolve(instruments);
          return;
        })
      }
      let instrument = array.shift();
      if (!instrument._id) {
        console.log(instrument)
      }
      let num = instrument._id.toString();
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        Instrument.findById(instrument._id)
        .then(doc => {
          doc.image = instrument.image;
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
        if (instrument.name.length) {
          let newInstrument = new Instrument({name: instrument.name, image: instrument.image})
          newInstrument.save((err, saved) => {
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
    recurse(instruments);
  })
}

module.exports = { Instrument, getAll, updateAll }