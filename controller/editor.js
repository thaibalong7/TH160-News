const db = require('../models');
const helper = require('../helper');


exports.renderEditorPage = async (req, res) => {
    try {
        console.log('editor page')
        res.render('editor', {
            title: 'Home - Editor',
            nav: [], //k có gì trên thanh nav
            isEditor: true,
            category: [{ name: 'Tư vấn', value: "tv" }],
            chuyenmuc: ['Ảnh số', 'Đồ gia dụng', 'Bảo mật', 'Di động', 'Máy tính'],
            tag: ['SAMSUNG', 'LG', 'PANASONIC', 'MICROSOFT', 'BẢO MẬT', 'Lee Le', 'HUAWEI', 'OPPO', 'XIAOMI'],
            news: [
                {
                    name: 'BỎ 10.000 USD MUA CAMERA CÓ ĐỘ PHÂN GIẢI 100 MEGAPIXEL, CÓ ĐÁNG KHÔNG?', img: 'samsung.png',
                    author: 'Lê Hữu Lý', type: "Đánh giá", publicAt: "1/2/2019", category: "Ảnh Số", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."
                },
                {
                    name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png',
                    author: 'Lê Hữu Lý', type: "Đánh giá", publicAt: "1/2/2019", category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."
                },
                {
                    name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png',
                    author: 'Lê Hữu Lý', type: "Đánh giá", publicAt: "1/2/2019", category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."
                },
                {
                    name: 'BỘ CÔNG AN CẢNH BÁO THỦ ĐOẠN MỚI CỦA CÁC HACKER NHẰM CHIẾM ĐOẠT TÀI SẢN CÁC TỔ CHỨC, CÁ NHÂN, DOANH NGHIỆP', img: 'samsung.png',
                    author: 'Lê Hữu Lý', type: "Đánh giá", publicAt: "1/2/2019", category: "An Ninh Mạng", abstract: "Realme, thương hiệu mới của Oppo, từ khi ra mắt năm ngoái đã tung ra thị trường một số sản phẩm với giá bán hấp dẫn như Realme 2, Realme 2 Pro và Realme C1. Chiếc Realme 3 vừa được bán ra thị trường Việt Nam cũng là sản phẩm khá thú vị ở tầm giá dưới 4 triệu đồng."
                }]
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}