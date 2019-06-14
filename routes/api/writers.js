var express = require('express');
var router = express.Router();
var writersController = require('../../controller/api/writers');
const { middlewareAuthWriter } = require('../../middleware/auth')
let multer = require('multer');
let upload = multer(); //setting the default folder for multer

router.post('/login', writersController.login);

router.post('/register', writersController.register);

router.get('/me', middlewareAuthWriter, writersController.me);

router.get('/getListNewsByWriter', middlewareAuthWriter, writersController.getListNewsByWriter);

router.post('/createNews', middlewareAuthWriter, upload.single('avatar'), writersController.createNews);

router.get('/getNewsById/:id/:name', middlewareAuthWriter, writersController.getNewsById);

router.post('/edit_news/:id', middlewareAuthWriter, upload.single('avatar'), writersController.editNews);

module.exports = router;