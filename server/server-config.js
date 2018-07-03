const express = require('express');
const db = require('../db-config');
const bodyParser = require('body-parser')
const path = require('path');

const userController = require('./controllers/users');
const songController = require('./controllers/songs');
const router = require('./routes/index');

const importer = require('./importJSON');

const app = express();
const basicAuth = require('express-basic-auth')

app.use(basicAuth({
    users: { 'someuser': 'somepassword' },
    challenge: true,
    realm: 'Imb4T3st4pp',
}))

app.use(bodyParser.json({limit: '20mb'}));
app.use(express.static('build'));

app.use('/api', router.api)

app.post('/import', (req, res) => {
  importer.importFromJSON(req.body);
  res.sendStatus('200');
})

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../build/index.html'));
});

module.exports = app;
