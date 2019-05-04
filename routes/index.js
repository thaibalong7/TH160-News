var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

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

module.exports = router;
