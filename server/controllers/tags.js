const TagModel = require('../models/tag');

module.exports.saveNewTag = (req, res) => {
  let tag = req.body.tag;
  let songID = Number.parseInt(req.body.songID);
  TagModel.insertTag(tag, songID)
  .then(tag => {
    res.send(tag)
  })
}

module.exports.getTags = (req, res) => {
  TagModel.getAll()
  .then(results => {
    res.send(results);
  })
}

module.exports.updateTags = (req, res) => {
  let tags = req.body;
  TagModel.updateAll(tags)
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

module.exports.deleteTags = (req, res) => {
  let tags = req.query.delete;
  TagModel.deleteMany(tags, (err, results) => {
    if (err) {
      res.sendStatus(501)
    } else {
      res.sendStatus(200)
    }
  })
  // .then(results => {
  //   res.sendStatus(200);
  // })
  // .catch(err => {
  //   if (err) {
  //     console.log(err);
  //     res.send(err)
  //   }
  // })
}