const db = require('../../models');
const helper = require('../../helper');

exports.getCategoriesAndNumNews = async (req, res) => {
    try {
        const query = {
            include: [{
                model: db.sub_categories,
                include: [{
                    model: db.news,
                    attributes: ['id']
                }]
            }]
        }
        db.categories.findAll(query).then(async _categories => {
            const result = [];
            for (let i = 0, l = _categories.length; i < l; i++) {
                let num_news = 0;
                for (let j = 0; j < _categories[i].sub_categories.length; j++) {
                    num_news += _categories[i].sub_categories[j].news.length;
                }
                result.push({
                    name: _categories[i].name,
                    link: '/category/' + _categories[i].id + '/' + helper.slugify(_categories[i].name),
                    num_news: num_news
                })
            }
            return res.status(200).json({
                data: result
            })
        })
    } catch (error) {
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getAllCategories = async (req, res) =>{
    try {
        const list_category = await db.categories.findAll({
            include: [{
                model: db.sub_categories
            }]
        })
        const list_sub_category = {};
        for (let i = 0, l = list_category.length; i < l; i++) {
            list_sub_category[list_category[i].name] = list_category[i].dataValues.sub_categories;
            list_category[i] = list_category[i].dataValues;
            list_category[i].sub_categories = undefined
        }
        return res.status(200).json({
            data: {
                list_category: list_category,
                list_sub_category: list_sub_category
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}
