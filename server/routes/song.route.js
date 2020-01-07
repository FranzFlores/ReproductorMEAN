'use strict'

const express = require('express');
const router = express.Router();

var songController = require('../controllers/song.controller');
const md_auth = require('../lib/auth');

router.post('/createSong',md_auth.ensureAuth,songController.createSong);
router.get('/songs',md_auth.ensureAuth,songController.getSongs);
router.put('/updatesong/:id',md_auth.ensureAuth,songController.updateSong);
router.put('/deletesong/:id',md_auth.ensureAuth,songController.deleteSong);

module.exports = router;