const db = require('../../models');
const editors = db.editors;
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
            const check_user = await editors.findOne({
                where: {
                    email: email
                }
            });
            if (!check_user) {
                let id_user = await helper.generateIDUser(4);

                let check_id_user = await editors.findAll({ where: { id: id_user } })

                while (!check_id_user) {
                    id_user = await helper.generateIDUser(4);
                    check_id_user = await editors.findAll({ where: { id: id_user } })
                }
                const new_user = {
                    id: id_user,
                    email: req.body.email,
                    name: req.body.name,
                    birthdate: new Date(req.body.birthdate),
                    password: bcrypt.hashSync(req.body.password, null, null).toString()
                }
                editors.create(new_user).then(_subcriber => {
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
        const check_user = await editors.findOne({
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
                        editor: true
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
        const _user = req.editorData;
        _user.password = undefined;
        const token = jwt.sign(
            {
                email: _user.email,
                id: _user.id,
                name: _user.name,
                editor: true
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

exports.getNewsByEditor = async (req, res) => {
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
            const list_sub_category_editor = await db.sub_categories_editor.findAll({
                where: {
                    fk_editor: req.editorData.id
                }
            });
            const list_promise_id_sub_category = list_sub_category_editor.map(async (val) => {
                return val.fk_sub_category;
            })
            const list_id_sub_category = await Promise.all(list_promise_id_sub_category);

            const query = {
                attributes: {
                    exclude: ['content']
                },
                where: {
                    fk_sub_category: {
                        [db.Sequelize.Op.or]: list_id_sub_category
                    },
                    status: "draft"
                },
                order: [['createdAt', 'DESC']],
                limit: per_page,
                offset: (page - 1) * per_page,
                include: [{
                    model: db.sub_categories,
                    include: [{
                        model: db.categories
                    }]
                }]
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
                await helper.fixEditorNews(_news.rows);
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

exports.getCategoryAndTagOfNews = async (req, res) => {
    try {
        const query = {
            where: {
                id: req.params.id,
            },
            include: [{
                model: db.sub_categories,
                include: [{
                    model: db.categories
                }]
            },
            {
                model: db.tags_new,
                include: [{
                    model: db.tags
                }]
            }]
        }
        db.news.findOne(query).then(_news => {
            return res.status(200).json({
                data: {
                    tags: _news.tags_news,
                    sub_category: _news.sub_category
                },
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.approve_news = async (req, res) => {
    try {
        const _news = await db.news.findOne({
            where: {
                id: req.body.idNews
            }
        });
        if (_news) {
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
                    return res.status(400).json({ msg: "Lỗi danh sách tag :((" })
                }
            }
            if (req.body.isPublicNow) {
                _news.publicAt = new Date();
                _news.status = "published";
            }
            else {
                if (typeof req.body.publicAt !== 'undefined') {
                    _news.publicAt = new Date(req.body.publicAt);
                }
                else {
                    return res.status(400).json({ msg: "Không có ngày xuất bản" })
                }
                _news.status = "approved";
            }
            
            await _news.save();

            return res.status(200).json({
                msg: 'Cập nhật thành công',
                data: _news
            })
        }
        else {
            return res.status(400).json({ msg: "Sai id bài viết rồi :((" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}