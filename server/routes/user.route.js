'use strict'

const express = require('express');
const router = express.Router();

const multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './server/uploads/users' });

var userController = require('../controllers/user.controller');
const md_auth = require('../lib/auth');
router.post('/signup', userController.createUser);
router.post('/createAdministrador',md_auth.ensureAuth,userController.createAdministrador);
router.post('/login', userController.login);
router.get('/users', md_auth.ensureAuth, userController.getUsers);
router.put('/updateUser/:id', md_auth.ensureAuth, userController.updateUser);
router.put('/updatePassword/:id', md_auth.ensureAuth, userController.updatePassword);
router.put('/deleteUser/:id', md_auth.ensureAuth, userController.deleteUser);
router.put('/restoreUser/:id',md_auth.ensureAuth, userController.restoreUser);
router.put('/uploadImageUser/:id',[md_auth.ensureAuth,md_upload], userController.uploadImage);
router.get('/getImageUser/:imageFile',userController.getImageFile);


module.exports = router;