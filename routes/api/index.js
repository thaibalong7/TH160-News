var express = require('express');
var router = express.Router();

router.use('/news', require('./news'));

router.use('/categories', require('./categories'));

router.use('/users', require('./users'));

module.exports = router;