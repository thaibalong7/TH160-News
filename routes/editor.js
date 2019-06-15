var express = require('express');
var router = express.Router();
const editorController = require('../controller/editor');
const { middlewareAuthEditorRender } = require('../middleware/auth_render');

router.get('/', middlewareAuthEditorRender, editorController.renderEditorPage);

module.exports = router;