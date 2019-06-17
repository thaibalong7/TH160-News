var express = require('express');
var router = express.Router();
const adminsController = require('../controller/admins');
const { middlewareAuthAdminsRender } = require('../middleware/auth_render');

router.get('/', middlewareAuthAdminsRender, adminsController.renderManageCategoryPage);

//router.get('/e_news/:id/:name', middlewareAuthEditorRender, editorController.renderNews);

module.exports = router;