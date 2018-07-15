// require bcrypt
const bcrypt = require('bcrypt');
// require passport
const passport = require('passport');
// require strategy
const LocalStrategy = require('./strategy');
// require models
const Admin = require('../models/admin');


  /* these are all the routes having to do with authentication of Admin. 
  Either this can be expanded to include Users or Users can be kept seperate 
  or somehere in between. */

module.exports = {  
  // The create Route checks that there is no user with already the same 
  // username or email as the one being submitted and if not it allows the 
  // creation of a new Admin.
  create: (req, res) => {
    Admin.findOne({ username: req.body.username })
      .then((result) => {
        if (!result) {
          Admin.findOne({ email: req.body.email })
            .then((result2) => {
              if (!result2) {
                // make salt
                const salt = bcrypt.genSaltSync(10);
                // get the data we need to encrypt the password
                const password = req.body.password;
                const hashWord = bcrypt.hashSync(password, salt);
                // now make the nooUser Object we'll send to the db
                const newAdmin = {
                  username: req.body.username,
                  email: req.body.email,
                  password: hashWord,
                };

                Admin
                  .create(newAdmin)
                  .then((instance) => {
                    console.log('new admin created:')
                    console.log(instance);
                    res.status(200).json({
                      status: `New Admin "${instance.username}" Created!`
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
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        res.status(200).json({
          status: 'Login successful!'
        });
      })
    })(req, res, next);
  },
  //..
  logout: (req, res) => {
    req.session.destroy(function () { 
      req.logout();
      res.send({loggedOut:true});
    });
  },
  // middleware that checks en route if a user is authenticated before allowing completion of the route
  isAuthenticated: (req, res, next) => {
    let auth = req.isAuthenticated();
    console.log('are you authy?')
    console.log(auth);
    if (auth) {
      return next();
    } else {
      res.json({
        success: true,
        admin: 0,
        status: 'you are not Admin'
      });
    }
  },
  // this method checks if a user is admin and returns a json object with the basic info. 
  // (isAuthenticated runs as middleware on this route)
  checkAuthed: (req, res) => {
    res.json({
      success: true,
      admin: 1,
      status: `You are Admin`
    });
  },
  changePassword: (req, res, next) => {
    db.Admin
      .findOne({ username })
      .then((user) => {
        // make salt
        const salt = bcrypt.genSaltSync(10);
        // get the data we need to encrypt the password
        const newPassword = req.body.newPassword;
        const hashWord = bcrypt.hashSync(newPassword, salt);
        user.password = hashWord;
      }).save();
  },
  hello: (req, res) => {
    console.log("hello " + req.body.username);
  },
};

