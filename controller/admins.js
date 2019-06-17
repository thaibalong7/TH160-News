const db = require('../models');
const helper = require('../helper');


exports.renderManageCategoryPage = async (req, res) => {
    try {
        const categories = await db.categories.findAll();
        // const sub_categories = {};
        // for (let i = 0, l = categories.length; i < l; i++) {
        //     sub_categories['' + helper.slugify(categories[i].name, '_')] = categories[i].sub_categories;
        //     categories[i].dataValues.sub_categories = undefined;
        // }

        res.render('admin-category', {
            title: 'Quản lý chuyên mục',
            chuyenmuc: [{ name: 'Đánh giá', value: "danhgia" }, { name: 'Tin tức', value: 'tintuc' }, { name: 'Tư vấn', value: 'tuvan' }],
            danhgia: ['Di động', 'Laptop', 'Máy tính bảng', 'Máy ảnh số', 'Tivi'],
            tintuc: ['An ninh mạng', 'Sản phẩm mới', 'Thị trường', 'Kinh doanh'],
            tuvan: ['Ảnh số', 'Đồ gia dụng', 'Bảo mật', 'Máy tính'],
            editor_danhgia: ['Lê Hữu Lý', 'Nguyễn Văn A'],
            editor_tintuc: ['Thái bá long', 'Nguyên Văn B'],
            editor_tuvan: ['Nguyễn Huy Hùng', 'Nguyễn Văn C'],
            categories: categories,
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}