'use strict'

const express = require('express');
const router = express.Router();

var songController = require('../controllers/song.controller');
const md_auth = require('../lib/auth');
const multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './server/uploads/songs' });

router.post('/createSong',md_auth.ensureAuth,songController.createSong);
router.get('/songs',md_auth.ensureAuth,songController.getSongs);
router.post('/songsByStatus',md_auth.ensureAuth,songController.getSonsByStatus);
router.put('/updatesong/:id',md_auth.ensureAuth,songController.updateSong);
router.put('/deleteSong/:id',md_auth.ensureAuth,songController.deleteSong);
router.put('/restoreSong/:id',md_auth.ensureAuth,songController.restoreSong);
router.put('/uploadSongFile/:id',[md_auth.ensureAuth,md_upload],songController.uploadFile);
router.get('/getSongFile/:file',songController.getSongFile);

module.exports = router;