var express = require('express');
var router = express.Router();
const writersController = require('../controller/writers');
const { middlewareAuthWriterRender } = require('../middleware/auth_render');

router.get('/writeredit', function (req, res, next) {
    res.render('WriterEdit', {
        title: 'Soạn bài viết',
        category: [{ name: 'Đánh giá', value: "dg" }, { name: 'Tin tức', value: "tt" }, { name: "Tư vấn", value: "tv" }],
        dg: ['Di động', 'Laptop', 'Máy tính bảng', 'Máy ảnh số', 'Tivi'],
        tt: ['An ninh mạng', 'Thị trường', 'kinh doanh', 'Sản phẩm mới', 'Xe'],
        tv: ['Ảnh số', 'Đồ gia dụng', 'Bảo mật', 'Di động', 'Máy tính'],
        tag: ['SAMSUNG', 'LG', 'PANASONIC', 'MICROSOFT', 'BẢO MẬT', 'Lee Le', 'HUAWEI', 'OPPO', 'XIAOMI']
    });
})


router.get('/', middlewareAuthWriterRender, writersController.renderListAll);

router.get('/list-draft', middlewareAuthWriterRender, writersController.renderListDraft);

router.get('/list-approved', middlewareAuthWriterRender, writersController.renderListApproved);

router.get('/list-public', middlewareAuthWriterRender, writersController.renderListPublished);

router.get('/list-rejected', middlewareAuthWriterRender, writersController.renderListRejected);

module.exports = router;