const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs')

router.route('/song')
  .get(songController.getSong)
  .post(songController.newSong)
  .put(songController.editSong)

router.route('/songs')
  .get(songController.getAllSongs);

module.exports = router;