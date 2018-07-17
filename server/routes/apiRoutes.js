const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs')
const optionsController = require('../controllers/options');
const instrumentController = require('../controllers/instruments');
const beardController = require('../controllers/beards');
const topicController = require('../controllers/topics');
const inkeyController = require('../controllers/inkeys');
const locationController = require('../controllers/locations');
const tagController = require('../controllers/tags');
const adminController = require('../controllers/admin');

router.route('/instruments')
  .get(instrumentController.getInstruments)
  .put(instrumentController.updateInstruments)
  .delete(instrumentController.deleteInstruments);

router.route('/beards')
  .get(beardController.getBeards)
  .put(beardController.updateBeards)
  .delete(beardController.deleteBeards);

router.route('/topics')
  .get(topicController.getTopics)
  .put(topicController.updateTopics)
  .delete(topicController.deleteTopics);

router.route('/tags')
  .post(tagController.saveNewTag)
  .get(tagController.getTags)
  .put(tagController.updateTags)
  .delete(tagController.deleteTags);

router.route('/tag/:tagname')
  .get(tagController.getSongsForTag);

router.route('/inkeys')
  .get(inkeyController.getInkeys)
  .put(inkeyController.updateInkeys)
  .delete(inkeyController.deleteInkeys);

router.route('/locations')
  .get(locationController.getLocations)
  .put(locationController.updateLocations)
  .delete(locationController.deleteLocations);

router.route('/song')
  .get(songController.getSongWithTags)
  .post(adminController.isAuthenticated, songController.newSong)
  .put(adminController.isAuthenticated, songController.editSong);

router.route('/song/:id')
  .get(songController.getSongByID);

router.route('/songs')
  .get(songController.getAllSongs);
  
router.route('/find_tags')
  .get(songController.getSongsByTags);

router.route('/songs/count')
  .get(songController.getSongCount);

router.route('/options')
  .get(optionsController.getAllOptions);

router.route('/admin')
  .get(adminController.isAuthenticated, adminController.checkAuthed);

router.route('/admin/login')  
  .post(adminController.login)

router.route('/admin/logout')
  .get(adminController.logout)

router.route('/add_admin')
  .post(adminController.isAuthenticated, adminController.create);

router.route('/admin/set_password')
  .post(adminController.isAuthenticated, adminController.changePassword);

module.exports = router;