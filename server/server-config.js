const express = require('express');
const db = require('../db-config');
const userController = require('./controllers/users');

const app = express();
app.use(express.static('build'));

app.get('/hello', userController.hello);

module.exports = app;
