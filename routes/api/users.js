var express = require('express');
var router = express.Router();
var usersController = require('../../controller/api/users');
const { middlewareAuthUser } = require('../../middleware/auth')

router.post('/login', usersController.login);

router.post('/register', usersController.register);

router.get('/me', middlewareAuthUser, usersController.me);

module.exports = router;