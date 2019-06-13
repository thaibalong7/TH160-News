var express = require('express');
var router = express.Router();
const writersController = require('../controller/writers');
const { middlewareAuthWriterRender } = require('../middleware/auth_render');

router.get('/', middlewareAuthWriterRender, writersController.renderListAll);

router.get('/list-draft', middlewareAuthWriterRender, writersController.renderListDraft);

router.get('/list-approved', middlewareAuthWriterRender, writersController.renderListApproved);

router.get('/list-public', middlewareAuthWriterRender, writersController.renderListPublished);

router.get('/list-rejected', middlewareAuthWriterRender, writersController.renderListRejected);

router.get('/new-post', middlewareAuthWriterRender, writersController.renderCreateNews);

router.get('/w_news/:id/:name', middlewareAuthWriterRender, writersController.renderNews);

module.exports = router;