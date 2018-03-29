const Inkey = require('../models/inkey');

module.exports.getInkeys = (req, res) => {
  Inkey.getAll()
  .then(results => {
    res.send(results);
  })
}

module.exports.updateInkeys = (req, res) => {
  let inkeys = req.body;
  Inkey.updateAll(inkeys)
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

module.exports.deleteInkeys = (req, res) => {
  let inkeys = req.query.delete;
  Inkey.deleteMany(inkeys)
  .then(results => {
    res.sendStatus(200);
  })
  .catch(err => {
    if (err) {
      console.log(err);
      res.send(err)
    }
  })
}