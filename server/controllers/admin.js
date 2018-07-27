// require bcrypt
const bcrypt = require('bcrypt');
// require passport
const passport = require('passport');
// require strategy
require('./strategy');
// require models
const Admin = require('../models/admin');


/* these are all the routes having to do with authentication of Admin.
Either this can be expanded to include Users or Users can be kept seperate
or somehere in between. */

module.exports = {
  /* The create Route checks that there is no user with already the same
  username or email as the one being submitted and if not it allows the
  creation of a new Admin. */
  create: (req, res) => {
    const { username, email, password } = req.body;
    Admin.findOne({ username })
      .then((result) => {
        if (!result) {
          Admin.findOne({ email })
            .then((result2) => {
              if (!result2) {
                // make salt
                const salt = bcrypt.genSaltSync(10);
                // get the data we need to encrypt the password
                const hashWord = bcrypt.hashSync(password, salt);
                // now make the nooUser Object we'll send to the db
                const newAdmin = {
                  username,
                  email,
                  password: hashWord,
                };

                Admin
                  .create(newAdmin)
                  .then((instance) => {
                    console.log('new admin created:');
                    console.log(instance);
                    res.status(200).json({
                      status: `New Admin "${instance.username}" Created!`,
                    });
                  })
                  .catch(err => console.dir(err));
              } else {
                res.json('Sorry! That email is unavailable');
              }
            })
            .catch(err => res.status(422).json(err));
        } else {
          res.json('Sorry! That username is unavailable');
        }
      })
      .catch(err => res.status(422).json(err));
  },
  // only place passport.authenticate needs to be called
  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.json({ message: info.message }); }
      req.logIn(user, (error) => {
        if (err) { return next(error); }
        return res.status(200).json({
          status: 'Login successful!',
        });
      });
    })(req, res, next);
  },
  // ..
  logout: (req, res) => {
    req.session.destroy(() => {
      req.logout();
      res.send({ loggedOut: true });
    });
  },
  // middleware that checks en route if a user is authenticated before
  // allowing completion of the route
  isAuthenticated: (req, res, next) => {
    const auth = req.isAuthenticated();
    console.log('are you authy?');
    console.log(auth);
    if (auth) {
      return next();
    }
    return res.json({
      success: true,
      admin: 0,
      status: 'you are not Admin',
    });
  },
  // this method checks if a user is admin and returns a json object with the basic info.
  // (isAuthenticated runs as middleware on this route)
  checkAuthed: (req, res) => {
    res.json({
      success: true,
      admin: 1,
      status: 'You are Admin',
    });
  },
  changePassword: (req, res) => {
    const { username, newPassword } = req.body;
    console.log(`hello ${username}`);
    Admin
      .findOne({ username })
      .then((user, error) => {
        if (error) { console.dir(error); }
        const hashWord = bcrypt.compareSync(req.body.password, user.password);
        if (hashWord) {
          // make salt
          const salt = bcrypt.genSaltSync(10);
          // get the data we need to encrypt the password
          const hashedWord = bcrypt.hashSync(newPassword, salt);
          user.password = hashedWord;
          user.save((err) => {
            if (err) {
              console.dir(err);
            } else {
              res.json({ success: true });
            }
          });
        } else {
          res.json({ success: false });
        }
      })
      .catch(err => console.dir(err));
  },
};

