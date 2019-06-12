const db = require('../models');
const helper = require('../helper');
const localStorage = require('localStorage');

exports.home_page = async (req, res) => {
    try {
        res.render('index', {
            title: 'News',
            nav: await helper.getNav(db),
            isUser: true
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
}

exports.category_page = async (req, res) => {
    try {
        const num_each_page = 3;
        if (req.query.isSubCategory === 'true') {
            const sub_category = await db.sub_categories.findByPk(req.params.id);
            if (sub_category && helper.slugify(sub_category.name) === req.params.name) {
                const query = {
                    where: {
                        fk_sub_category: req.params.id,
                        status: 'published'
                    },
                    attributes: {
                        exclude: ['content']
                    },
                    order: [['publicAt', 'DESC']],
                    limit: 3 + num_each_page, //thêm 3 bài ở đầu nữa
                    offset: 0,
                    include: [{
                        model: db.sub_categories
                    }]
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
                    nav: await helper.getNav(db),
                    isUser: true,
                    category: sub_category.dataValues,
                    new1: new1,
                    new2: new2,
                    new3: new3,
                    news: news,
                    isNextPage: news.length < num_each_page ? false : true,
                    next_page: 2,
                    isSubCategory: true
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
                        fk_category: category.id,
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
                        },
                        status: 'published'
                    },
                    attributes: {
                        exclude: ['content']
                    },
                    order: [['publicAt', 'DESC']],
                    limit: 3 + num_each_page, //thêm 3 bài ở đầu nữa
                    offset: 0,
                    include: [{
                        model: db.sub_categories
                    }]
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
                    nav: await helper.getNav(db),
                    isUser: true,
                    category: category.dataValues,
                    new1: new1,
                    new2: new2,
                    new3: new3,
                    news: news,
                    isNextPage: news.length < num_each_page ? false : true,
                    next_page: 2,
                    isSubCategory: false,
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
        return res.redirect('/')
    }
}

exports.news_page = async (req, res) => {
    try {
        return res.render('news', {
            title: 'Tin Tức',
            nav: await helper.getNav(db),
            params: req.params.id + '/' + req.params.name,
            idNews: req.params.id,
            num_cmt_each_page: 3,
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
}

exports.tag_page = async (req, res) => {
    try {
        const num_each_page = 7;
        const check_tag = await db.tags.findByPk(req.params.id);
        if (check_tag && helper.slugify(check_tag.name) === req.params.name) {
            const query = {
                attributes: {
                    exclude: ['content']
                },
                where: {
                    status: 'published'
                },
                order: [['publicAt', 'DESC']],
                limit: num_each_page,
                offset: 0,
                include: [{
                    model: db.sub_categories
                },
                {
                    model: db.tags_new,
                    where: {
                        fk_tag: check_tag.id
                    }
                }]
            };
            const news = await db.news.findAll(query);
            await helper.fixNews(news);
            return res.render('tag', {
                title: check_tag.name,
                tag: check_tag.dataValues,
                nav: await helper.getNav(db),
                news: news,
                isNextPage: news.length < num_each_page ? false : true,
                next_page: 2,
                per_page: num_each_page,
            })
        }
        else {
            return res.redirect('/');
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}