const db = require('../models');
const helper = require('../helper');


exports.renderManageCategoryPage = async (req, res) => {
    try {
        const categories = await db.categories.findAll();

        res.render('admin-category', {
            nav: await helper.getNavAdmin(),
            isAdmin: true,
            categories: categories,
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}