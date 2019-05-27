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
            _categories[i].sub_categories[j].dataValues.link = '/category/' + _categories[i].sub_categories[j].id + '/' + helper.slugify(_categories[i].sub_categories[j].dataValues.name)
            sub.push(_categories[i].sub_categories[j].dataValues);
        }
        nav.push({
            id: _categories[i].id,
            name: _categories[i].name,
            sub: sub
        })
    }
    return nav;
}

exports.home = async (req, res) => {
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

exports.category = async (req, res) => {
    try {
        const category = await db.sub_categories.findByPk(req.params.id);
        if (category && helper.slugify(category.name) === req.params.name) {
            const num_each_page = 4;
            const query = {
                where: {
                    fk_sub_category: req.params.id
                },
                attributes: {
                    exclude: ['content']
                },
                limit: 3 + num_each_page, //thêm 3 bài ở đầu nữa
                offset: 0
            }
            category.dataValues.link = '/category/' + category.id + '/' + helper.slugify(category.name);
            const news = await db.news.findAll(query);
            await helper.fixNews(news);
            const hightlight_news = news.splice(0, 3);
            
            const new1 = hightlight_news[0];
            const new2 = hightlight_news[1];
            const new3 = hightlight_news[2];
            console.log(new1)
            return res.render('category', {
                title: category.name,
                nav: await getNav(),
                isUser: true,
                category: category.dataValues,
                new1: new1,
                new2: new2,
                new3: new3,
                news: news,
            })
        }
        else {
            return res.render('index', {
                title: 'News',
                nav: await getNav(),
                isUser: true,
                cat: 'cat-3'
            })
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/error/?mess=' + error.toString())
    }
}