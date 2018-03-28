const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs')
const optionsController = require('../controllers/options');
const instrumentController = require('../controllers/instruments');

router.route('/instruments')
  .get(instrumentController.getInstruments)
  .put(instrumentController.updateInstruments)

router.route('/song')
  .get(songController.getSong)
  .post(songController.newSong)
  .put(songController.editSong)

router.route('/songs')
  .get(songController.getAllSongs);

router.route('/songs/count')
  .get(songController.getSongCount);

router.route('/options')
  .get(optionsController.getAllOptions)

module.exports = router;