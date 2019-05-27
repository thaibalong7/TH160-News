var express = require('express');
var router = express.Router();
const db = require('../models');
const apiController = require('../controller/api');

router.get('/getLatestNews', apiController.getLatestNews);

router.get('/getCategoriesAndNumNews', apiController.getCategoriesAndNumNews);

module.exports = router;