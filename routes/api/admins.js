var express = require('express');
var router = express.Router();
var adminsController = require('../../controller/api/admins');
const { middlewareAuthAdmin } = require('../../middleware/auth')
// let multer = require('multer');
// let upload = multer(); //setting the default folder for multer

router.post('/login', adminsController.login);

router.post('/register', adminsController.register);

router.get('/me', middlewareAuthAdmin, adminsController.me);

// router.get('/getSubCategories/:id', middlewareAuthAdmin, adminsController.getSubCategories)

router.post('/updateSubCategory/:id', middlewareAuthAdmin, adminsController.updateSubCategory);

router.post('/createCategory', middlewareAuthAdmin, adminsController.createCategory);

router.post('/createSubCategory', middlewareAuthAdmin, adminsController.createSubCategory);

router.get('/deleteSubCategory/:id', middlewareAuthAdmin, adminsController.deleteSubCategory);

router.post('/createTag', middlewareAuthAdmin, adminsController.createTag);

module.exports = router;