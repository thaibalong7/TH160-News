const db = require('../../models');
const helper = require('../../helper');

exports.getLatestNews = async (req, res) => {
    try {
        const query = {
            attributes: ['id', 'title', 'avatar'],
            limit: 5,
            offset: 0,
            order: [['createdAt', 'DESC']],
            where:{
                status: 'published'
            }
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
        const query = {
            attributes: {
                exclude: ['content']
            },
            include: [{
                model: db.tags_new,
                where: {
                    fk_tag: req.params.id
                }
            }],
            where: {
                status: 'published'
            }
        };
        const _news = await db.news.findAll(query);
        return res.status(200).json({
            data: _news
        })
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
