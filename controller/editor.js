const db = require('../models');
const helper = require('../helper');


exports.renderEditorPage = async (req, res) => {
    try {
        const num_each_page = 1;

        const tag = await db.tags.findAll({
            order: [['name', 'ASC']]
        });

        res.render('editor', {
            title: 'Home - Editor',
            nav: [], //k có gì trên thanh nav
            isEditor: true,
            tag: tag,
            per_page: num_each_page,
            page: 1,
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

exports.renderNews = async (req, res) => {
    try {
        const id_news = req.params.id;
        let news = await db.news.findOne({
            where: {
                id: id_news
            },
            include: [{
                model: db.tags_new
            }]
        })
        if (news && helper.slugify(news.title) === req.params.name) {
            news = news.dataValues;
            news.createdAt = helper.toStringDate(new Date(news.createdAt));
            news.avatar = '/img/news_avatar/' + news.avatar;
            return res.render('writer-news', {
                nav: [],
                isEditor: true,
                title: news.title,
                news: news
            })
        }
        else {
            return res.redirect('/writers');
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/writers');
    }
}