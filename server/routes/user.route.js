'use strict'

const express = require('express');
const router = express.Router();

var userController = require('../controllers/user.controller');
const md_auth = require('../lib/auth');
router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/users', md_auth.ensureAuth, userController.getUsers);
router.put('/updateUser/:id', md_auth.ensureAuth, userController.updateUser);
router.put('/updatePassword/:id', md_auth.ensureAuth, userController.updatePassword);
router.put('/deleteUser/:id', md_auth.ensureAuth, userController.deleteUser);

module.exports = router;