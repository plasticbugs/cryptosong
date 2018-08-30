const BeardModel = require('../models/beard');

module.exports.getBeards = (req, res) => {
  BeardModel.getAll()
    .then((results) => {
      res.send(results);
    });
};

module.exports.updateBeards = (req, res) => {
  const beards = req.body;
  BeardModel.updateAll(beards)
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

module.exports.deleteBeards = (req, res) => {
  const beards = req.query.delete;
  BeardModel.deleteMany(beards)
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
