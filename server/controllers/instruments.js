const Instrument = require('../models/instrument');

module.exports.getInstruments = (req, res) => {
  Instrument.getAll()
    .then((results) => {
      res.send(results);
    });
};

module.exports.updateInstruments = (req, res) => {
  const instruments = req.body;
  Instrument.updateAll(instruments)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      }
    });
};

module.exports.deleteInstruments = (req, res) => {
  const instruments = req.query.delete;
  Instrument.deleteMany(instruments)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
    });
};
