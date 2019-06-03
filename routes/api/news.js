var express = require('express');
var router = express.Router();
var newsController = require('../../controller/api/news');

router.get('/getLatestNews', newsController.getLatestNews);

router.get('/getNewsById/:id/:name', newsController.getNewsById);

router.get('/increaseView/:id/:name', newsController.increaseView);

router.get('/getLatestNewsByCategory/:id', newsController.getLatestNewsByCategory);

router.get('/getLatestNewsByIdNews/:id', newsController.getLatestNewsByIdNews);

router.get('/getTagsByNews/:id', newsController.getTagsByNews);

router.get('/getNewsByTag/:id', newsController.getNewsByTag);

router.get('/getNewsBySubCategory/:id', newsController.getNewsBySubCategory);

router.get('/getNewsByCategory/:id', newsController.getNewsByCategory);

router.get('/getCommentByNews/:id', newsController.getCommentByNews);


module.exports = router;