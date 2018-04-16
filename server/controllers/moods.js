const MoodModel = require('../models/mood');

module.exports.getMoods = (req, res) => {
  MoodModel.getAll()
  .then(results => {
    res.send(results);
  })
}

module.exports.updateMoods = (req, res) => {
  let moods = req.body;
  MoodModel.updateAll(moods)
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

module.exports.deleteMoods = (req, res) => {
  let moods = req.query.delete;
  MoodModel.deleteMany(moods)
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
