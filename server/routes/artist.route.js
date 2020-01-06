'use strict'

const express = require('express');
const router = express.Router();

var artistController = require('../controllers/artist.controller');
const md_auth = require('../lib/auth');

router.post('/createArtist',md_auth.ensureAuth,artistController.createArtist);
router.get('/artists',md_auth.ensureAuth,artistController.getArtists);
router.put('/updateArtist/:id',md_auth.ensureAuth,artistController.updateArtist);
router.put('/deleteArtist/:id',md_auth.ensureAuth,artistController.deleteArtist);

module.exports = router;