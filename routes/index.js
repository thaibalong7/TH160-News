var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/blog-post', function (req, res, next) {
	res.render('blog-post', { title: 'Express' });
})
module.exports = router;
