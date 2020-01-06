'use strict'

const express = require('express');
const router = express.Router();

var albumController = require('../controllers/album.controller');
const md_auth = require('../lib/auth');

router.post('/createAlbum/:id',md_auth.ensureAuth,albumController.createAlbum);
router.get('/albums',md_auth.ensureAuth,albumController.getAlbums);
router.put('/updateAlbum/:id',md_auth.ensureAuth,albumController.updateAlbum);
router.put('/deleteAlbum/:id',md_auth.ensureAuth,albumController.deleteAlbum);

module.exports = router;