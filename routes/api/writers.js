var express = require('express');
var router = express.Router();
var writersController = require('../../controller/api/writers');
const { middlewareAuthWriter } = require('../../middleware/auth')

router.post('/login', writersController.login);

router.post('/register', writersController.register);

router.get('/me', middlewareAuthWriter, writersController.me);

module.exports = router;