'use strict'

const express = require('express');
const router = express.Router();

var playlistController = require('../controllers/playlist.controller');
const md_auth = require('../lib/auth');
const multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './server/uploads/playlists' });

router.post('/createPlaylist',md_auth.ensureAuth,playlistController.createPlaylist);
router.get('/playlists',md_auth.ensureAuth,playlistController.getPlaylists);
router.put('/update/:id',md_auth.ensureAuth,playlistController.updatePlaylist);
router.put('/delete/:id',md_auth.ensureAuth,playlistController.deletePlaylist);
router.put('/uploadImage/:id',[md_auth.ensureAuth,md_upload],playlistController.uploadImage);
router.get('/getImage/:imageFile',playlistController.getImageFile);

module.exports = router;
