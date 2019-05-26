var express = require('express');
var router = express.Router();
const indexController = require('../controller');

/* GET home page. */
router.get('/', indexController.home);

router.get('/blog-post', function (req, res, next) {
	res.render('blog-post', { title: 'Express' });
})

router.get('/catalog-sport', function (req, res, next) {
	res.render('catalog-sport', { title: 'Express' });
})

router.get('/catalog-business', function (req, res, next) {
	res.render('catalog-business', { title: 'Express' });
})

router.get('/catalog-health', function (req, res, next) {
	res.render('catalog-health', { title: 'Express' });
})

router.get('/catalog-travel', function (req, res, next) {
	res.render('catalog-travel', { title: 'Express' });
})

router.get('/log-in', function (req, res, next) {
	res.render('log-in', { title: 'Express' });
})

router.get('/change-password', function (req, res, next) {
	res.render('changepassword', { title: 'Express' });
})

router.get('/forgot-password', function (req, res, next) {
	res.render('forgotpassword', { title: 'Express' });
})

module.exports = router;
