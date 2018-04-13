const Fawn = require('fawn');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/cryptosong', {
  promiseLibrary: global.Promise
});

Fawn.init(mongoose);

module.exports = mongoose.connection;