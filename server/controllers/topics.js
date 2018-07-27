const Topic = require('../models/topic');

module.exports.getTopics = (req, res) => {
  Topic.getAll()
    .then((results) => {
      res.send(results);
    });
};

module.exports.updateTopics = (req, res) => {
  const topics = req.body;
  Topic.updateAll(topics)
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

module.exports.deleteTopics = (req, res) => {
  const topics = req.query.delete;
  Topic.deleteMany(topics)
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
