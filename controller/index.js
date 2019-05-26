const db = require('../models');
const helper = require('../helper');

exports.home = async (req, res) => {
    try {
        const query = {
            include: [{
                model: db.sub_categories
            }]
        }
        db.categories.findAll(query).then(_categories => {
            const nav = [];
            for (let i = 0, l = _categories.length; i < l; i++) {
                if (_categories[i].sub_categories.length === 0)
                    continue;
                const sub = [];
                for (let j = 0, l = _categories[i].sub_categories.length; j < l; j++) {
                    _categories[i].sub_categories[j].dataValues.link = '/category/' + _categories[i].sub_categories[j].id + '/' + helper.slugify(_categories[i].sub_categories[j].dataValues.name)
                    sub.push(_categories[i].sub_categories[j].dataValues);
                }
                nav.push({
                    id: _categories[i].id,
                    name: _categories[i].name,
                    sub: sub
                })
            }
            res.render('index', {
                title: 'News',
                nav: nav,
                isUser: true
            })
        })
    } catch (error) {
        return res.redirect('/error/?mess=' + error.toString())
    }
}