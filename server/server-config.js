const express = require('express');
const db = require('../db-config');
const bodyParser = require('body-parser')
const path = require('path');

const userController = require('./controllers/users');
const songController = require('./controllers/songs');
const router = require('./routes/index');

const app = express();
app.use(bodyParser.json({limit: '100kb'}));
app.use(express.static('build'));

app.use('/api', router.api)

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../build/index.html'));
});

module.exports = app;
