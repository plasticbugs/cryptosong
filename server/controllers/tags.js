const TagModel = require('../models/tag');

module.exports.saveNewTag = (req, res) => {
  const tag = req.body.tag;
  const songID = Number.parseInt(req.body.songID);
  TagModel.insertTag(tag, songID)
    .then((tag) => {
      res.send(tag);
    });
};

module.exports.getTags = (req, res) => {
  TagModel.getAll()
    .then((results) => {
      res.send(results);
    });
};

module.exports.updateTags = (req, res) => {
  const tags = req.body;
  TagModel.updateAll(tags)
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

module.exports.deleteTags = (req, res) => {
  const tags = req.query.delete;
  TagModel.deleteMany(tags, (err, results) => {
    if (err) {
      res.sendStatus(501);
    } else {
      res.sendStatus(200);
    }
  });
  // .then(results => {
  //   res.sendStatus(200);
  // })
  // .catch(err => {
  //   if (err) {
  //     console.log(err);
  //     res.send(err)
  //   }
  // })
};

module.exports.getSongsForTag = (req, res) => {
  const tagName = req.params.tagname;
  console.log(tagName);
  TagModel.getSongsForTag(tagName)
    .then((results) => {
      res.send(results);
    });
};
