var express = require('express');
var router = express.Router();
const indexController = require('../controller');

/* GET home page. */
router.get('/', indexController.home_page);

router.get('/category/:id/:name', indexController.category_page);

router.get('/news/:id/:name', indexController.news_page);

router.get('/tag/:id/:name', indexController.tag_page);

// router.get('/blog-post', function (req, res, next) {
// 	res.render('blog-post', { title: 'Express' });
// })

// router.get('/catalog-sport', function (req, res, next) {
// 	res.render('catalog-sport', { title: 'Express' });
// })

// router.get('/catalog-business', function (req, res, next) {
// 	res.render('catalog-business', { title: 'Express' });
// })

// router.get('/catalog-health', function (req, res, next) {
// 	res.render('catalog-health', { title: 'Express' });
// })

// router.get('/catalog-travel', function (req, res, next) {
// 	res.render('catalog-travel', { title: 'Express' });
// })

router.get('/log-in', function (req, res, next) {
	res.render('log-in', { title: 'Đăng nhập' });
})

router.get('/change-password', function (req, res, next) {
	res.render('changepassword', { title: 'Đổi mật khẩu' });
})

router.get('/forgot-password', function (req, res, next) {
	res.render('forgotpassword', { title: 'Quên mật khẩu' });
})

router.get('/search', indexController.search_page);

router.get('/writeredit', function (req, res, next) {
	res.render('WriterEdit', { 
		title: 'Soạn bài viết',
		category: [{name:'Đánh giá',value :"dg"},{name: 'Tin tức', value:"tt" }, {name:"Tư vấn", value: "tv"}],
		dg: ['Di động','Laptop','Máy tính bảng','Máy ảnh số','Tivi'],
		tt: ['An ninh mạng', 'Thị trường', 'kinh doanh', 'Sản phẩm mới', 'Xe'],
		tv: ['Ảnh số','Đồ gia dụng','Bảo mật', 'Di động', 'Máy tính'],
		tag: ['SAMSUNG','LG','PANASONIC','MICROSOFT','BẢO MẬT', 'Lee Le','HUAWEI', 'OPPO', 'XIAOMI']
	});
})

router.get('/edit', function (req, res, next) {
	res.render('WriterEdit', { 
		title: 'Chỉnh sửa'
	});
})

router.get('/listdxb', function (req, res, next) {
	res.render('list', {
		isAll: true,
		title: 'Đã xuất bản',
		news: [{name: 'ĐÁNH GIÁ SAMSUNG GALAXY A70: DÀNH CHO NHỮNG "CƯ DÂN MẠNG THỰC THỤ"', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá",publicAt: "1/2/2019",draft: "draft", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",approved: "approved", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",published: "published", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",rejected: "rejected", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."}],
		status: "đã xuất bản",
		tag: ['SAMSUNG','LG','PANASONIC','MICROSOFT','BẢO MẬT', 'Lee Le','HUAWEI', 'OPPO', 'XIAOMI']
	});
})

router.get('/listcxb', function (req, res, next) {
	res.render('list', {
		title: 'Chưa xuất bản',
		news: [{name: 'MICROSOFT CẢNH BÁO VẪN CÒN 1 TRIỆU MÁY TÍNH CHƯA “VÁ” CÁC LỖ HỔNG BẢO MẬT WINDOWS NGHIÊM TRỌNG', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá",publicAt: "1/2/2019", category: "Laptop", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."}],
		status: "đã được duyệt và chờ xuất bản",
		tag: ['SAMSUNG','LG','PANASONIC','MICROSOFT','BẢO MẬT', 'Lee Le','HUAWEI', 'OPPO', 'XIAOMI']
	});
})

router.get('/listbtc', function (req, res, next) {
	res.render('list', { 
		title: 'Bị từ chối',
		news: [{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."}
	],
		edit: 'true',
		status: "bị từ chối",
		tag: ['SAMSUNG','LG','PANASONIC','MICROSOFT','BẢO MẬT', 'Lee Le','HUAWEI', 'OPPO', 'XIAOMI']
	});
})

router.get('/listcdd', function (req, res, next) {
	res.render('list', { 
		title: 'Chưa được duyệt',
		news: [
		{name: 'BỎ 10.000 USD MUA CAMERA CÓ ĐỘ PHÂN GIẢI 100 MEGAPIXEL, CÓ ĐÁNG KHÔNG?', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá",publicAt: "1/2/2019", category: "Ảnh Số", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
		{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
		author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."}],
		edit: 'true',
		status: "chưa được duyệt",
		tag: ['SAMSUNG','LG','PANASONIC','MICROSOFT','BẢO MẬT', 'Lee Le','HUAWEI', 'OPPO', 'XIAOMI']
	});
})

router.get('/profile',function(req,res,next){
	res.render('UpdateInfo',{
		title: 'Cập nhật thông tin',
		lehuuly: [{name:"Lê Hữu Lý",email:"lehuuly1512313@gmail.com",birthday:"1/2/2019"}],
		thaibalong: [{name:"Thái Bá Long", email: "thaibalong7@gmail.com", birthday:"1/2/2019"}]
	});
})


router.get('/editor-danhgia',function(req,res,next){
	res.render('editor',{
		title: 'Editor đánh giá',
		category: [{name:'Đánh giá',value :"dg"}],
		chuyenmuc: ['Di động','Laptop','Máy tính bảng','Máy ảnh số','Tivi'],
		tag: ['SAMSUNG','LG','PANASONIC','MICROSOFT','BẢO MẬT', 'Lee Le','HUAWEI', 'OPPO', 'XIAOMI'],
		news: [
			{name: 'BỎ 10.000 USD MUA CAMERA CÓ ĐỘ PHÂN GIẢI 100 MEGAPIXEL, CÓ ĐÁNG KHÔNG?', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá",publicAt: "1/2/2019", category: "Ảnh Số", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."}]
	});
})

router.get('/editor-tuvan',function(req,res,next){
	res.render('editor',{
		title: 'Editor tư vấn',
		category: [{name:'Tư vấn',value :"tv"}],
		chuyenmuc: ['Ảnh số','Đồ gia dụng','Bảo mật', 'Di động', 'Máy tính'],
		tag: ['SAMSUNG','LG','PANASONIC','MICROSOFT','BẢO MẬT', 'Lee Le','HUAWEI', 'OPPO', 'XIAOMI'],
		news: [
			{name: 'BỎ 10.000 USD MUA CAMERA CÓ ĐỘ PHÂN GIẢI 100 MEGAPIXEL, CÓ ĐÁNG KHÔNG?', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá",publicAt: "1/2/2019", category: "Ảnh Số", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."}]
	});
})


router.get('/editor-tintuc',function(req,res,next){
	res.render('editor',{
		title: 'Editor tin tức',
		category: [{name:'Tin tức',value :"tt"}],
		chuyenmuc: ['An ninh mạng', 'Thị trường', 'kinh doanh', 'Sản phẩm mới', 'Xe'],
		tag: ['SAMSUNG','LG','PANASONIC','MICROSOFT','BẢO MẬT', 'Lee Le','HUAWEI', 'OPPO', 'XIAOMI'],
		news: [
			{name: 'BỎ 10.000 USD MUA CAMERA CÓ ĐỘ PHÂN GIẢI 100 MEGAPIXEL, CÓ ĐÁNG KHÔNG?', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá",publicAt: "1/2/2019", category: "Ảnh Số", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."},
			{name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png', 
			author: 'Lê Hữu Lý', type: "Đánh giá" ,publicAt: "1/2/2019",category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."}]
	});
})

module.exports = router;
