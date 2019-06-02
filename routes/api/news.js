var express = require('express');
var router = express.Router();
var newsController = require('../../controller/api/news');

router.get('/getLatestNews', newsController.getLatestNews);

router.get('/getNewsById/:id/:name', newsController.getNewsById);

router.get('/getLatestNewsByCategory/:id', newsController.getLatestNewsByCategory);

router.get('/getLatestNewsByIdNews/:id', newsController.getLatestNewsByIdNews);

module.exports = router;