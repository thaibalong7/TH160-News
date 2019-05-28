var express = require('express');
var router = express.Router();
const db = require('../models');
const apiController = require('../controller/api');

router.get('/getLatestNews', apiController.getLatestNews);

router.get('/getCategoriesAndNumNews', apiController.getCategoriesAndNumNews);

router.get('/getNewsById/:id/:name', apiController.getNewsById);

router.get('/getLatestNewsByCategory/:id', apiController.getLatestNewsByCategory);

router.get('/getLatestNewsByIdNews/:id', apiController.getLatestNewsByIdNews);

module.exports = router;