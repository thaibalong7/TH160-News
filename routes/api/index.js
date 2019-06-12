var express = require('express');
var router = express.Router();

router.use('/news', require('./news'));

router.use('/categories', require('./categories'));

router.use('/users', require('./users'));

router.use('/writers', require('./writers'));

module.exports = router;