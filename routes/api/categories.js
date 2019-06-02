var express = require('express');
var router = express.Router();
var categoriesController = require('../../controller/api/categories');

router.get('/getCategoriesAndNumNews', categoriesController.getCategoriesAndNumNews);

module.exports = router;