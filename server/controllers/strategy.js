// require bcrypt
const bcrypt = require('bcrypt');
// require models
const Admin = require('../models/admin');
// require passport
const passport = require('passport');
// require passport-local
const LocalStrategy = require('passport-local').Strategy;

// define local strategy
passport.use(new LocalStrategy((username, password, done) => {
  Admin
    .findOne({ username })
    .then((user) => {
      // does not exist
      if (!user) {
        return done(null, false, { message: 'No Such Admin' });
      }
      // if exists check password
      const hashWord = bcrypt.compareSync(password, user.password);
      // match hashWords
      if (hashWord) {
        return done(null, user);
      }
      return done(null, false, { message: 'Wrong Password' });
    })
    .catch(err => console.error(err));
}));
// this part handles passport user serialization and deserialization
passport.serializeUser((user, done) => {
  console.log('serializing user: ');
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = LocalStrategy;
