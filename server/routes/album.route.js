'use strict'

const express = require('express');
const router = express.Router();

var albumController = require('../controllers/album.controller');
const md_auth = require('../lib/auth');
const multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './server/uploads/albums' });

router.post('/createAlbum',md_auth.ensureAuth,albumController.createAlbum);
router.get('/albums',md_auth.ensureAuth,albumController.getAlbums);
router.put('/updateAlbum/:id',md_auth.ensureAuth,albumController.updateAlbum);
router.put('/deleteAlbum/:id',md_auth.ensureAuth,albumController.deleteAlbum);
router.put('/uploadImageAlbum/:id',[md_auth.ensureAuth,md_upload],albumController.uploadImage);
router.get('/getImageArtist/:imageFile',albumController.getImagenFile);

module.exports = router;