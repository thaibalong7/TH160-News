var express = require('express');
var router = express.Router();
var editorController = require('../../controller/api/editor');
const { middlewareAuthEditor } = require('../../middleware/auth')
// let multer = require('multer');
// let upload = multer(); //setting the default folder for multer

router.post('/login', editorController.login);

router.post('/register', editorController.register);

router.get('/me', middlewareAuthEditor, editorController.me);

router.get('/getNewsByEditor', middlewareAuthEditor, editorController.getNewsByEditor);


module.exports = router;