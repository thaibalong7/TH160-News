const db = require('../../models');
const writers = db.writers;
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const helper = require('../../helper');
// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync('./middleware/private.key', 'utf8');
const signOptions = {
    expiresIn: '5d',
    algorithm: "RS256"
}


exports.register = async (req, res) => {
    try {
        const email = req.body.email;
        if (await helper.validateEmail(req.body.email)) {
            const check_user = await writers.findOne({
                where: {
                    email: email
                }
            });
            if (!check_user) {
                let id_user = await helper.generateIDUser(4);

                let check_id_user = await writers.findAll({ where: { id: id_user } })

                while (!check_id_user) {
                    id_user = await helper.generateIDUser(4);
                    check_id_user = await writers.findAll({ where: { id: id_user } })
                }
                const new_user = {
                    id: id_user,
                    email: req.body.email,
                    name: req.body.name,
                    birthdate: new Date(req.body.birthdate),
                    password: bcrypt.hashSync(req.body.password, null, null).toString()
                }
                writers.create(new_user).then(_subcriber => {
                    const token = jwt.sign(
                        {
                            email: _subcriber.email,
                            id: _subcriber.id,
                            name: _subcriber.name
                        },
                        privateKEY,
                        signOptions
                    );

                    _subcriber.dataValues.password = undefined;
                    return res
                        .status(200)
                        .cookie('token', token, { maxAge: 432000000 }) //5d
                        .json({
                            msg: 'Auth successful',
                            token: token,
                            profile: _subcriber
                        })
                })
            }
            else {
                return res.status(400).json({ msg: 'Email đã tồn tại' })
            }
        }
        else {
            return res.status(400).json({ msg: 'Email không hợp lệ' })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.login = async (req, res) => {
    try {
        const username = req.body.username;
        const check_user = await writers.findOne({
            where: {
                email: username
            }
        });
        if (check_user) {
            if (bcrypt.compareSync(req.body.password, check_user.password)) {
                const token = jwt.sign(
                    {
                        email: check_user.email,
                        id: check_user.id,
                        name: check_user.name,
                        writer: true
                    },
                    privateKEY,
                    signOptions
                )
                check_user.dataValues.password = undefined;
                return res
                    .status(200)
                    .cookie('token', token, { maxAge: 432000000 }) //5d
                    .json({
                        msg: 'Auth successful',
                        token: token,
                        profile: check_user
                    })
            }
            else {
                return res.status(400).json({ msg: ' Tài khoản hoặc mật khẩu không đúng' })
            }
        }
        else {
            return res.status(400).json({ msg: ' Tài khoản hoặc mật khẩu không đúng' })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.me = async (req, res) => {
    try {
        const _user = req.writerData;
        _user.password = undefined;
        const token = jwt.sign(
            {
                email: _user.email,
                id: _user.id,
                name: _user.name,
                writer: true
            },
            privateKEY,
            signOptions
        )
        return res.status(200)
            .cookie('token', token, { maxAge: 432000000 }) //5d
            .status(200).json({
                msg: 'Auth successful',
                profile: _user
            })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getListNewsByWriter = async (req, res) => {
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
            const query_params = req.query.query;
            const query = {
                attributes: {
                    exclude: ['content', 'view', 'updatedAt', 'fk_writer']
                },
                where: {
                    fk_writer: req.writerData.id,
                },
                order: [['createdAt', 'DESC']],
                limit: per_page,
                offset: (page - 1) * per_page,
            };
            if (query_params === 'all') {
                //do not do anything
            }
            if (query_params === 'draft') {
                query.where.status = 'draft'
            }
            if (query_params === 'approved') {
                query.where.status = 'approved'
            }
            if (query_params === 'rejected') {
                query.where.status = 'rejected'
            }
            if (query_params === 'published') {
                query.where.status = 'published'
            }
            db.news.findAndCountAll(query).then(async _news => {
                var next_page = page + 1;
                //Kiểm tra còn dữ liệu không
                if ((parseInt(_news.rows.length) + (next_page - 2) * per_page) === parseInt(_news.count))
                    next_page = -1;
                //Nếu số lượng record nhỏ hơn per_page  ==> không còn dữ liệu nữa => trả về -1 
                if ((parseInt(_news.rows.length) < per_page))
                    next_page = -1;
                if (parseInt(_news.rows.length) === 0)
                    next_page = -1;
                await helper.fixWriterNews(_news.rows);
                return res.status(200).json({
                    itemCount: _news.count, //số lượng record được trả về
                    data: _news.rows,
                    next_page: next_page //trang kế tiếp, nếu là -1 thì hết data rồi
                })
            })

        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.getNewsById = async (req, res) => {
    try {
        db.news.findOne({
            where: {
                id: req.params.id,
                fk_writer: req.writerData.id
            },
            include: [{
                model: db.sub_categories,
            },
            {
                model: db.tags_new,
                include: [{
                    model: db.tags
                }]
            }]
        }).then(async _news => {
            _news.dataValues.avatar = '/img/news_avatar/' + _news.dataValues.avatar;
            if (_news && helper.slugify(_news.title) === req.params.name) {
                return res.status(200).json({
                    msg: 'Get thành công',
                    data: _news
                })
            }
            else {
                return res.status(400).json({ msg: "Lỗi ở đâu đó rồi" })
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.createNews = async (req, res) => {
    try {
        const new_news = {
            title: req.body.title,
            abstract: req.body.abstract,
            fk_sub_category: parseInt(req.body.sub_category),
            content: req.body.content,
            status: 'draft',
            fk_writer: req.writerData.id
        };
        const avatar = req.file;
        if (avatar) {
            let id_news = await helper.generateIDNews(8);
            //kiểm tra id vừa tạo có bị trùng
            let check_id_news = await db.news.findAll({ where: { id: id_news } })
            while (!check_id_news) {
                id_user = await helper.generateIDNews(8);
                check_id_news = await db.news.findAll({ where: { id: id_news } })
            }
            new_news.id = id_news;
            new_news.avatar = id_news + '.jpg';
            //ghi file avatar thư mục 
            fs.writeFile('public/img/news_avatar/' + id_news + '.jpg', avatar.buffer, async (err) => {
                if (err) {
                    return res.status(400).json({ msg: err.toString() })
                }

                //tạo news mới
                await db.news.create(new_news).then(_news => {

                    //thêm tags news
                    for (let i = 0, l = req.body.list_tag.length; i < l; i++) {
                        db.tags_new.create({
                            fk_new: _news.id,
                            fk_tag: req.body.list_tag[i]
                        })
                    };
                    return res.status(200).json({
                        msg: 'Tạo bài viết thành công, vui lòng đợi duyệt.',
                        data: _news
                    })
                })
            })

        }
        else {
            return res.status(400).json({ msg: 'Không có avatar' })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.editNews = async (req, res) => {
    try {
        console.log('edit news')
        console.log(req.body)
        db.news.findOne({
            where: {
                id: req.params.id,
                fk_writer: req.writerData.id
            }
        }).then(async _news => {
            if (_news) {
                if (typeof req.body.title !== 'undefined') {
                    _news.title = req.body.title;
                }
                if (typeof req.body.content !== 'undefined') {
                    _news.content = req.body.content;
                }
                if (typeof req.body.abstract !== 'undefined') {
                    _news.abstract = req.body.abstract;
                }
                if (typeof req.body.sub_category !== 'undefined') {
                    _news.fk_sub_category = parseInt(req.body.sub_category);
                }

                if (typeof req.body.list_tag !== 'undefined') {
                    if (Array.isArray(req.body.list_tag)) {
                        //xóa list tags cũ đi
                        await db.tags_new.destroy({
                            where: {
                                fk_new: _news.id
                            }
                        });

                        //sau khi xóa xong, thêm list tags mới vào
                        //thêm tags news
                        for (let i = 0, l = req.body.list_tag.length; i < l; i++) {
                            await db.tags_new.create({
                                fk_new: _news.id,
                                fk_tag: req.body.list_tag[i]
                            })
                        };
                    }
                    else {
                        await db.tags_new.destroy({
                            where: {
                                fk_new: _news.id
                            }
                        });
                        await db.tags_new.create({
                            fk_new: _news.id,
                            fk_tag: req.body.list_tag
                        })

                    }

                }

                if (req.file) {
                    //có cập nhập avt mới
                    var date = new Date();
                    var timestamp = date.getTime();
                    //ghi file avatar thư mục 
                    fs.writeFile('public/img/news_avatar/' + _news.id + '-' + timestamp + '.jpg', req.file.buffer, async (err) => {
                        if (err) {
                            console.error(err)
                        } else {
                            if (_news.avatar !== null) {
                                //xóa file cũ đi
                                fs.unlink('public/img/news_avatar/' + _news.avatar, (err) => {
                                    if (err) {
                                        console.error(err)
                                    }

                                    _news.avatar = _news.id + '-' + timestamp + '.jpg';
                                    _news.save();

                                });
                            }
                        }
                    })
                }

                _news.status = "draft";
                await _news.save();

                return res.status(200).json({
                    msg: 'Cập nhật thành công',
                    data: _news
                })
            }
            else {
                return res.status(400).json({ msg: "Lỗi ở đâu đó rồi" })
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}
