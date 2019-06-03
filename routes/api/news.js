var express = require('express');
var router = express.Router();
var newsController = require('../../controller/api/news');

//Bài viết mới nhất mọi chuyên mục
router.get('/getLatestNews', newsController.getLatestNews);

//Bài viết nhiều view nhất mọi chuyên mục
router.get('/getNewsMostViews', newsController.getNewsMostViews);

//Bài viết nổi bậc nhất tuần (đang xét nhiều view nhất được public trong tuần)
router.get('/getFeaturedNews', newsController.getFeaturedNews);

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