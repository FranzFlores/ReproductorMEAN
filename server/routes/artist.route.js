'use strict'

const express = require('express');
const router = express.Router();

var artistController = require('../controllers/artist.controller');
const md_auth = require('../lib/auth');
const multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './server/uploads/artists' });


router.post('/createArtist',md_auth.ensureAuth,artistController.createArtist);
router.get('/artists',md_auth.ensureAuth,artistController.getArtists);
router.post('/allArtists',md_auth.ensureAuth,artistController.getAllArtists);
router.put('/updateArtist/:id',md_auth.ensureAuth,artistController.updateArtist);
router.put('/deleteArtist/:id',md_auth.ensureAuth,artistController.deleteArtist);
router.put('/restoreArtist/:id',md_auth.ensureAuth,artistController.restoreArtist);
router.put('/uploadImageArtist/:id',[md_auth.ensureAuth,md_upload],artistController.uploadImage);
router.get('/getImageArtist/:imageFile',artistController.getImagenFile);

module.exports = router;