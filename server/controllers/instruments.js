const Instrument = require('../models/instrument');

module.exports.getInstruments = (req, res) => {
  Instrument.getAll()
  .then(results => {
    res.send(results);
  })
}

module.exports.updateInstruments = (req, res) => {
  console.log(req.body.length)
  let instruments = req.body;
  Instrument.updateAll(instruments)
  .then(results => {
    res.send(results)
  })
  .catch(err => {
    if (err) {
      console.log(err)
      res.sendStatus(501);
    }
  })
}