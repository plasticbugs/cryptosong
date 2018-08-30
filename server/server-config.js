const express = require('express');
const db = require('../db-config');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const router = express.Router();

const importer = require('./importJSON');

const session = require('express-session');

const app = express();
const basicAuth = require('express-basic-auth');

if (process.env.NODE_ENV != 'development') {
  app.use(basicAuth({
    users: { someuser: 'somepassword' },
    challenge: true,
    realm: 'Imb4T3st4pp',
  }));
}

// required for passport session
app.use(session({
  secret: 'some of the wordiest words',
  saveUninitialized: true,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json({ limit: '20mb' }));

app.use(express.static(path.join(__dirname,'../client/public')));

app.use(require('./routes'))

app.post('/import', (req, res) => {
  importer.importFromJSON(req.body);
  res.sendStatus('200');
});

if( process.env.NODE_ENV === 'production' ){
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
  });
};
module.exports = app;
