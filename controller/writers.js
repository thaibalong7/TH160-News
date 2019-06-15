const db = require('../models');
const helper = require('../helper');


exports.renderListAll = async (req, res) => {
    try {
        // do something to get data
        res.render('list', {
            title: 'Home - Writer',
            nav: await helper.getNavWriter(),
            isWriter: true,
            isAll: true,
            post_type: "Tất cả bài viết",
            post_type_dev: "all"
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

exports.renderListDraft = async (req, res) => {
    try {
        // do something to get data
        res.render('list', {
            title: 'Home',
            nav: await helper.getNavWriter(),
            isWriter: true,
            isDraft: true,
            post_type: "Chờ duyệt",
            post_type_dev: "draft"
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

exports.renderListApproved = async (req, res) => {
    try {
        // do something to get data
        res.render('list', {
            title: 'Home',
            nav: await helper.getNavWriter(),
            isWriter: true,
            isApproved: true,
            post_type: "Chờ xuất bản",
            post_type_dev: "approved"
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

exports.renderListRejected = async (req, res) => {
    try {
        // do something to get data
        res.render('list', {
            title: 'Home',
            nav: await helper.getNavWriter(),
            isWriter: true,
            isRejected: true,
            post_type: "Bị từ chối",
            post_type_dev: "rejected"
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

exports.renderListPublished = async (req, res) => {
    try {
        // do something to get data
        res.render('list', {
            title: 'Home',
            nav: await helper.getNavWriter(),
            isWriter: true,
            isPublished: true,
            post_type: "Đã xuất bản",
            post_type_dev: "published"
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

exports.renderCreateNews = async (req, res) => {
    try {
        const tag = await db.tags.findAll();

        res.render('writer-create-news', {
            nav: await helper.getNavWriter(),
            isWriter: true,
            title: 'Đăng bài',
            tag: tag,
        });

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
                nav: await helper.getNavWriter(),
                isWriter: true,
                title: news.name,
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

exports.renderEditNews = async (req, res) => {
    try {
        const tag = await db.tags.findAll();
        return res.render('writer-edit', {
            id: req.params.id,
            titleNews: req.params.name,
            nav: await helper.getNavWriter(),
            isWriter: true,
            title: 'Edit Page',
            tag: tag,
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/writers');
    }
}
