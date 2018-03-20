const express = require('express');
const db = require('../db-config');
const bodyParser = require('body-parser')

const userController = require('./controllers/users');
const songController = require('./controllers/songs');

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());

app.post('/api/song', songController.newSong);

module.exports = app;
