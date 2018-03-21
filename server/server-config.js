const express = require('express');
const db = require('../db-config');
const bodyParser = require('body-parser')
const path = require('path');

const userController = require('./controllers/users');
const songController = require('./controllers/songs');

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());

app.post('/api/song', songController.newSong);

app.get('/api/songs', songController.getAllSongs);

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../build/index.html'));
});

module.exports = app;
