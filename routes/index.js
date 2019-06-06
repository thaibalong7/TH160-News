var express = require('express');
var router = express.Router();
const indexController = require('../controller');

/* GET home page. */
router.get('/', indexController.home_page);

router.get('/category/:id/:name', indexController.category_page);

router.get('/news/:id/:name', indexController.news_page);

router.get('/tag/:id/:name', indexController.tag_page);

router.get('/blog-post', function (req, res, next) {
	res.render('blog-post', { title: 'Express' });
})

router.get('/catalog-sport', function (req, res, next) {
	res.render('catalog-sport', { title: 'Express' });
})

router.get('/catalog-business', function (req, res, next) {
	res.render('catalog-business', { title: 'Express' });
})

router.get('/catalog-health', function (req, res, next) {
	res.render('catalog-health', { title: 'Express' });
})

router.get('/catalog-travel', function (req, res, next) {
	res.render('catalog-travel', { title: 'Express' });
})

router.get('/log-in', function (req, res, next) {
	res.render('log-in', { title: 'Express' });
})

router.get('/change-password', function (req, res, next) {
	res.render('changepassword', { title: 'Express' });
})

router.get('/forgot-password', function (req, res, next) {
	res.render('forgotpassword', { title: 'Express' });
})

router.get('/writeredit', function (req, res, next) {
	res.render('WriterEdit', { title: 'Express' });
})

router.get('/edit', function (req, res, next) {
	res.render('WriterEdit', { title: 'Express' });
})

router.get('/list', function (req, res, next) {
	res.render('list', { title: 'Express'
});
})

router.get('/listdxb', function (req, res, next) {
	res.render('list', {
		title: 'Express',
		news: [{name: 'ĐÁNH GIÁ SAMSUNG GALAXY A70: DÀNH CHO NHỮNG "CƯ DÂN MẠNG THỰC THỤ"', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá",category: "Di Động"}],
		status: "đã xuất bản"
	});
})

router.get('/listcxb', function (req, res, next) {
	res.render('list', {
		title: 'Express',
		news: [{name: 'MICROSOFT CẢNH BÁO VẪN CÒN 1 TRIỆU MÁY TÍNH CHƯA “VÁ” CÁC LỖ HỔNG BẢO MẬT WINDOWS NGHIÊM TRỌNG', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá", category: "Laptop"}],
		status: "đã được duyệt và chờ xuất bản"
	});
})

router.get('/listbtc', function (req, res, next) {
	res.render('list', { 
		title: 'Express',
		news: [{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,category: "An Ninh Mạng"},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,category: "An Ninh Mạng"}
	],
		edit: 'true',
		status: "bị từ chối"
	});
})

router.get('/listcdd', function (req, res, next) {
	res.render('list', { 
		title: 'Express',
		news: [
			{name: 'BỎ 10.000 USD MUA CAMERA CÓ ĐỘ PHÂN GIẢI 100 MEGAPIXEL, CÓ ĐÁNG KHÔNG?', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá", category: "Ảnh Số"},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,category: "An Ninh Mạng"}],
		edit: 'true',
		status: "chưa được duyệt"
	});
})

module.exports = router;
