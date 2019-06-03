const db = require('../../models');
const helper = require('../../helper');

exports.getLatestNews = async (req, res) => {
    try {
        const default_num_news = 10;
        var num_news;
        if (typeof req.query.num_news === 'undefined') num_news = default_num_news;
        else num_news = parseInt(req.query.num_news);
        const query = {
            attributes: {
                exclude: ['content']
            },
            limit: num_news,
            offset: 0,
            order: [['createdAt', 'DESC']],
            where: {
                status: 'published'
            },
            include: [{
                model: db.sub_categories
            }]
        }
        db.news.findAll(query).then(async _news => {
            await helper.fixNews(_news);
            return res.status(200).json({
                data: _news
            })
        })
    } catch (error) {
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getNewsMostViews = async (req, res) => {
    try {
        const default_num_news = 10;
        var num_news;
        if (typeof req.query.num_news === 'undefined') num_news = default_num_news;
        else num_news = parseInt(req.query.num_news);
        const query = {
            attributes: {
                exclude: ['content']
            },
            limit: num_news,
            offset: 0,
            order: [['view', 'DESC']],
            where: {
                status: 'published'
            },
            include: [{
                model: db.sub_categories
            }]
        }
        db.news.findAll(query).then(async _news => {
            await helper.fixNews(_news);
            return res.status(200).json({
                data: _news
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getFeaturedNews = async (req, res) => {
    try {
        const default_num_news = 3;
        var num_news;
        if (typeof req.query.num_news === 'undefined') num_news = default_num_news;
        else num_news = parseInt(req.query.num_news);
        const query = {
            attributes: {
                exclude: ['content']
            },
            limit: num_news,
            offset: 0,
            order: [['view', 'DESC']],
            where: {
                publicAt: {
                    [db.Sequelize.Op.gte]: new Date(helper.formatDate(-7) + ' 00:00:00 GMT+07:00')
                },
                status: 'published'
            },
            include: [{
                model: db.sub_categories
            }]
        }
        db.news.findAll(query).then(async _news => {
            await helper.fixNews(_news);
            return res.status(200).json({
                data: _news
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getLatestNewsByCategory = async (req, res) => {
    try {
        const _sub_categories = await db.sub_categories.findAll({
            where: {
                fk_category: req.params.id,
                status: 'published'
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
            attributes: ['id', 'title', 'avatar'],
            limit: 3, //lấy 3 bài thôi
            offset: 0,
            order: [['createdAt', 'DESC']]
        }
        db.news.findAll(query).then(_data => {
            const result = [];
            for (let i = 0, l = _data.length; i < l; i++) {
                _data[i] = _data[i].dataValues;
                _data[i].link = '/news/' + _data[i].id + '/' + helper.slugify(_data[i].title);
                result.push(_data[i]);
            }
            return res.status(200).json({
                data: result
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getLatestNewsByIdNews = async (req, res) => {
    try {
        const _news = await db.news.findOne({
            attributes: ['id', 'fk_sub_category'],
            where: {
                id: req.params.id,
                status: 'published'
            },
            include: [{
                model: db.sub_categories,
                attributes: ['id', 'fk_category'],
                include: [{
                    model: db.categories,
                    attributes: ['id'],
                }]
            }]
        })
        const _sub_categories = await db.sub_categories.findAll({
            where: {
                fk_category: _news.sub_category.category.id
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
            attributes: ['id', 'title', 'avatar'],
            limit: 5, //lấy 3 bài thôi
            offset: 0,
            order: [['createdAt', 'DESC']]
        }
        db.news.findAll(query).then(_data => {
            const result = [];
            for (let i = 0, l = _data.length; i < l; i++) {
                _data[i] = _data[i].dataValues;
                _data[i].link = '/news/' + _data[i].id + '/' + helper.slugify(_data[i].title);
                result.push(_data[i]);
            }
            return res.status(200).json({
                data: result
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getNewsById = async (req, res) => {
    try {
        db.news.findByPk(req.params.id).then((_news) => {
            if (_news && _news.status === 'published') {
                if (helper.slugify(_news.title) === req.params.name)
                    return res.status(200).json({
                        data: _news
                    })
                else return res.status(400).json({ msg: 'Wrong path' })
            }
            else {
                return res.status(400).json({ msg: 'Wrong id news' })
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.increaseView = async (req, res) => {
    try {
        db.news.findByPk(req.params.id).then(async (_news) => {
            if (_news) {
                if (helper.slugify(_news.title) === req.params.name) {
                    _news.view = _news.view + 1;
                    await _news.save();
                    return res.status(200).json({ msg: 'Increase success' })
                }
                else return res.status(400).json({ msg: 'Wrong path' })
            }
            else {
                return res.status(400).json({ msg: 'Wrong id news' })
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getNewsByTag = async (req, res) => { //phân trang
    try {
        const page_default = 1;
        const per_page_default = 10;
        var page, per_page;
        if (typeof req.query.page === 'undefined') page = page_default;
        else page = req.query.page
        if (typeof req.query.per_page === 'undefined') per_page = per_page_default;
        else per_page = req.query.per_page
        if (isNaN(page) || isNaN(per_page) || parseInt(per_page) <= 0 || parseInt(page) <= 0) {
            return res.status(400).json({ msg: 'Params is invalid' })
        }
        else {
            page = parseInt(page);
            per_page = parseInt(per_page);
            const query = {
                attributes: {
                    exclude: ['content']
                },
                where: {
                    status: 'published'
                },
                order: [['publicAt', 'DESC']],
                limit: per_page,
                offset: (page - 1) * per_page,
                include: [{
                    model: db.sub_categories
                },
                {
                    model: db.tags_new,
                    where: {
                        fk_tag: req.params.id
                    }
                }]
            };
            const news = await db.news.findAndCountAll(query);
            var next_page = page + 1;
            //Kiểm tra còn dữ liệu không
            if ((parseInt(news.rows.length) + (next_page - 2) * per_page) === parseInt(news.count))
                next_page = -1;
            //Nếu số lượng record nhỏ hơn per_page  ==> không còn dữ liệu nữa => trả về -1 
            if ((parseInt(news.rows.length) < per_page))
                next_page = -1;
            if (parseInt(news.rows.length) === 0)
                next_page = -1;
            await helper.fixNews(news.rows);
            return res.status(200).json({
                itemCount: news.count, //số lượng record được trả về
                data: news.rows,
                next_page: next_page //trang kế tiếp, nếu là -1 thì hết data rồi
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getTagsByNews = async (req, res) => { //get danh sách các tags của news đó
    try {
        const limit_tags = 8; //gới hạn số lượng tag được hiện ra
        const query = {
            where: {
                fk_new: req.params.id
            },
            include: [{
                model: db.tags
            }],
            limit: limit_tags,
            offset: 0
        };
        db.tags_new.findAll(query).then(async _tags_news => {
            await helper.addLinkTagToListTagNew(_tags_news);
            return res.status(200).json({
                data: _tags_news
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getNewsBySubCategory = async (req, res) => {
    try {
        const page_default = 1;
        const per_page_default = 10;
        var page, per_page;
        if (typeof req.query.page === 'undefined') page = page_default;
        else page = req.query.page
        if (typeof req.query.per_page === 'undefined') per_page = per_page_default;
        else per_page = req.query.per_page
        if (isNaN(page) || isNaN(per_page) || parseInt(per_page) <= 0 || parseInt(page) <= 0) {
            return res.status(400).json({ msg: 'Params is invalid' })
        }
        else {
            page = parseInt(page);
            per_page = parseInt(per_page);
            const query = {
                where: {
                    fk_sub_category: req.params.id,
                    status: 'published'
                },
                attributes: {
                    exclude: ['content']
                },
                order: [['publicAt', 'DESC']],
                include: [{
                    model: db.sub_categories
                }],
                limit: per_page,
                offset: (page - 1) * per_page
            }
            const news = await db.news.findAndCountAll(query);
            var next_page = page + 1;
            //Kiểm tra còn dữ liệu không
            if ((parseInt(news.rows.length) + (next_page - 2) * per_page) === parseInt(news.count))
                next_page = -1;
            //Nếu số lượng record nhỏ hơn per_page  ==> không còn dữ liệu nữa => trả về -1 
            if ((parseInt(news.rows.length) < per_page))
                next_page = -1;
            if (parseInt(news.rows.length) === 0)
                next_page = -1;
            await helper.fixNews(news.rows);
            return res.status(200).json({
                itemCount: news.count, //số lượng record được trả về
                data: news.rows,
                next_page: next_page //trang kế tiếp, nếu là -1 thì hết data rồi
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getNewsByCategory = async (req, res) => {
    try {
        const page_default = 1;
        const per_page_default = 10;
        var page, per_page;
        if (typeof req.query.page === 'undefined') page = page_default;
        else page = req.query.page
        if (typeof req.query.per_page === 'undefined') per_page = per_page_default;
        else per_page = req.query.per_page
        if (isNaN(page) || isNaN(per_page) || parseInt(per_page) <= 0 || parseInt(page) <= 0) {
            return res.status(400).json({ msg: 'Params is invalid' })
        }
        else {
            page = parseInt(page);
            per_page = parseInt(per_page);
            const _sub_categories = await db.sub_categories.findAll({
                where: {
                    fk_category: req.params.id,
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
                limit: per_page,
                offset: (page - 1) * per_page,
                include: [{
                    model: db.sub_categories
                }]
            }
            const news = await db.news.findAndCountAll(query);
            var next_page = page + 1;
            //Kiểm tra còn dữ liệu không
            if ((parseInt(news.rows.length) + (next_page - 2) * per_page) === parseInt(news.count))
                next_page = -1;
            //Nếu số lượng record nhỏ hơn per_page  ==> không còn dữ liệu nữa => trả về -1 
            if ((parseInt(news.rows.length) < per_page))
                next_page = -1;
            if (parseInt(news.rows.length) === 0)
                next_page = -1;
            await helper.fixNews(news.rows);
            return res.status(200).json({
                itemCount: news.count, //số lượng record được trả về
                data: news.rows,
                next_page: next_page //trang kế tiếp, nếu là -1 thì hết data rồi
            })

        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}


exports.getCommentByNews = async (req, res) => {
    try {
        const page_default = 1;
        const per_page_default = 10;
        var page, per_page;
        if (typeof req.query.page === 'undefined') page = page_default;
        else page = req.query.page
        if (typeof req.query.per_page === 'undefined') per_page = per_page_default;
        else per_page = req.query.per_page
        if (isNaN(page) || isNaN(per_page) || parseInt(per_page) <= 0 || parseInt(page) <= 0) {
            return res.status(400).json({ msg: 'Params is invalid' })
        }
        else {
            page = parseInt(page);
            per_page = parseInt(per_page);
            query = {
                where: {
                    fk_new: req.params.id
                },
                order: [['createdAt', 'DESC']],
                limit: per_page,
                offset: (page - 1) * per_page,
            }
            const comments = await db.comments.findAndCountAll(query);
            var next_page = page + 1;
            //Kiểm tra còn dữ liệu không
            if ((parseInt(comments.rows.length) + (next_page - 2) * per_page) === parseInt(comments.count))
                next_page = -1;
            //Nếu số lượng record nhỏ hơn per_page  ==> không còn dữ liệu nữa => trả về -1 
            if ((parseInt(comments.rows.length) < per_page))
                next_page = -1;
            if (parseInt(comments.rows.length) === 0)
                next_page = -1;
            await helper.fixListComments(comments.rows);
            return res.status(200).json({
                itemCount: comments.count, //số lượng record được trả về
                data: comments.rows,
                next_page: next_page //trang kế tiếp, nếu là -1 thì hết data rồi
            })

        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}