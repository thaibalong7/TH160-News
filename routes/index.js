var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('main')
  res.render('main', { title: 'Express' });
});

router.get('/blog-post', function(req,res,next){
  console.log('blog-post')
	res.render('blog-post', {title: 'Express'});
})
module.exports = router;
