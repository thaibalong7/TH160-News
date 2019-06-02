const db = require('../models');
const helper = require('../helper');

async function getNav() {
    const nav = [];
    const query = {
        include: [{
            model: db.sub_categories
        }]
    }
    const _categories = await db.categories.findAll(query);

    for (let i = 0, l = _categories.length; i < l; i++) {
        const sub = [];
        if (_categories[i].sub_categories.length === 0)
            continue;

        for (let j = 0, l = _categories[i].sub_categories.length; j < l; j++) {
            _categories[i].sub_categories[j].dataValues.link = '/category/' + _categories[i].sub_categories[j].id + '/' + helper.slugify(_categories[i].sub_categories[j].dataValues.name) + '?isSubCategory=true';
            sub.push(_categories[i].sub_categories[j].dataValues);
        }
        nav.push({
            id: _categories[i].id,
            name: _categories[i].name,
            sub: sub,
            link: '/category/' + _categories[i].id + '/' + helper.slugify(_categories[i].name) + '?isSubCategory=false'
        })
    }
    return nav;
}

exports.home_page = async (req, res) => {
    try {
        res.render('index', {
            title: 'News',
            nav: await getNav(),
            isUser: true
        })
    } catch (error) {
        return res.redirect('/error/?mess=' + error.toString())
    }
}

exports.category_page = async (req, res) => {
    try {
        const num_each_page = 4;
        if (req.query.isSubCategory === 'true') {
            const sub_category = await db.sub_categories.findByPk(req.params.id);
            if (sub_category && helper.slugify(sub_category.name) === req.params.name) {
                const query = {
                    where: {
                        fk_sub_category: req.params.id
                    },
                    attributes: {
                        exclude: ['content']
                    },
                    order: [['publicAt', 'DESC']],
                    limit: 3 + num_each_page, //thêm 3 bài ở đầu nữa
                    offset: 0
                }
                sub_category.dataValues.link = '/category/' + sub_category.id + '/' + helper.slugify(sub_category.name) + '?isSubCategory=true';
                const news = await db.news.findAll(query);
                await helper.fixNews(news);
                const hightlight_news = news.splice(0, 3);

                const new1 = hightlight_news[0];
                const new2 = hightlight_news[1];
                const new3 = hightlight_news[2];
                return res.render('category', {
                    title: sub_category.name,
                    nav: await getNav(),
                    isUser: true,
                    category: sub_category.dataValues,
                    new1: new1,
                    new2: new2,
                    new3: new3,
                    news: news,
                    isNextPage: news.length < num_each_page ? false : true
                })
            }
            else {
                return res.render('index', {
                    title: 'News',
                    nav: await getNav(),
                    isUser: true,
                })
            }
        }
        else {
            const category = await db.categories.findByPk(req.params.id);
            if (category && helper.slugify(category.name) === req.params.name) {
                const _sub_categories = await db.sub_categories.findAll({
                    where: {
                        fk_category: category.id
                    }
                });
                const list_id_sub_category = [];
                for (let i = 0, l = _sub_categories.length; i < l; i++) {

                    list_id_sub_category.push(_sub_categories[i].id);
                }

                const query = {
                    where: {
                        fk_sub_category: {
                            [db.Sequelize.Op.or]: list_id_sub_category
                        }
                    },
                    attributes: {
                        exclude: ['content']
                    },
                    order: [['publicAt', 'DESC']],
                    limit: 3 + num_each_page, //thêm 3 bài ở đầu nữa
                    offset: 0,
                }
                category.dataValues.link = '/category/' + category.id + '/' + helper.slugify(category.name) + '?isSubCategory=true';
                const news = await db.news.findAll(query);
                await helper.fixNews(news);
                const hightlight_news = news.splice(0, 3);

                const new1 = hightlight_news[0];
                const new2 = hightlight_news[1];
                const new3 = hightlight_news[2];
                return res.render('category', {
                    title: category.name,
                    nav: await getNav(),
                    isUser: true,
                    category: category.dataValues,
                    new1: new1,
                    new2: new2,
                    new3: new3,
                    news: news,
                    isNextPage: news.length < num_each_page ? false : true
                })
            }
            else {
                return res.render('index', {
                    title: 'News',
                    nav: await getNav(),
                    isUser: true,
                })
            }
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/error/?mess=' + error.toString())
    }
}

exports.news_page = async (req, res) => {
    try {
        const category = await db.category
        return res.render('news', {
            title: '',
            nav: await getNav(),
            params: req.params.id + '/' + req.params.name,
            idNews: req.params.id
        })
    } catch (error) {
        return res.redirect('/error/?mess=' + error.toString())
    }
}