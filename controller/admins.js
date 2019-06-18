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

exports.renderManageTagPage = async (req, res) => {
    try {
        const tags = await db.tags.findAll({
            order: [['name', 'ASC']]
        });

        res.render('admin-tag', {
            nav: await helper.getNavAdmin(),
            isAdmin: true,
            tags: tags,
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}