const Location = require('../models/location');

module.exports.getLocations = (req, res) => {
  Location.getAll()
  .then(results => {
    res.send(results);
  })
}

module.exports.updateLocations = (req, res) => {
  let locations = req.body;
  Location.updateAll(locations)
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

module.exports.deleteLocations = (req, res) => {
  let locations = req.query.delete;
  Location.deleteMany(locations)
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