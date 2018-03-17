const User = require('../models/user');

module.exports.hello = (req, res) => {
  User.all().then((users) => {
    res.send(users);
  });
};
