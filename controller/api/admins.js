const db = require('../../models');
const administrators = db.administrators;
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
            const check_user = await administrators.findOne({
                where: {
                    email: email
                }
            });
            if (!check_user) {
                let id_user = await helper.generateIDUser(4);

                let check_id_user = await administrators.findAll({ where: { id: id_user } })

                while (!check_id_user) {
                    id_user = await helper.generateIDUser(4);
                    check_id_user = await administrators.findAll({ where: { id: id_user } })
                }
                const new_user = {
                    id: id_user,
                    email: req.body.email,
                    name: req.body.name,
                    birthdate: new Date(req.body.birthdate),
                    password: bcrypt.hashSync(req.body.password, null, null).toString()
                }
                administrators.create(new_user).then(_subcriber => {
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
        const check_user = await administrators.findOne({
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
                        administrators: true
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
        const _user = req.administratorsData;
        _user.password = undefined;
        const token = jwt.sign(
            {
                email: _user.email,
                id: _user.id,
                name: _user.name,
                administrators: true
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

// exports.getSubCategories = async (req, res) => {
//     try {
//         return res.status(200).json({
//             msg: 'Ok ok',
//             data: await db.sub_categories.findAll({
//                 include: [{
//                     model: db.categories,
//                     where: {
//                         id: req.params.id
//                     }
//                 }]
//             })
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ msg: error.toString() })
//     }
// }

exports.updateSubCategory = async (req, res) => {
    try {
        const sub_categories = await db.sub_categories.findByPk(req.params.id);
        if (sub_categories) {
            sub_categories.name = req.body.name;
            await sub_categories.save();
            return res.status(200).json({
                msg: 'Cập nhật thành công',
                data: sub_categories
            })
        }
        else {
            return res.status(400).json({ msg: "Sai id sub category" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.createCategory = async (req, res) => {
    try {
        db.categories.create({
            name: req.body.name
        }).then(data => {
            return res.status(200).json({
                msg: 'Tạo thành công',
                data: data
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.createSubCategory = async (req, res) => {
    try {
        db.sub_categories.create({
            name: req.body.name,
            fk_category: req.body.idCategory
        }).then(data => {
            return res.status(200).json({
                msg: 'Tạo thành công',
                data: data
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {
        const check_sub_category = await db.sub_categories.findByPk(req.params.id);
        if (check_sub_category) {
            await check_sub_category.destroy();
            return res.status(200).json({
                msg: 'Xóa thành công',
            })
        }
        else {
            return res.status(400).json({ msg: "Tiểu mục không tồn tại" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.createTag = async (req, res) => {
    try {
        db.tags.create({
            name: req.body.name,
        }).then(data => {
            return res.status(200).json({
                msg: 'Tạo thành công',
                data: data
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.updateTag = async (req, res) => {
    try {
        const check_tag = await db.tags.findByPk(req.params.id);
        if (check_tag) {
            check_tag.name = req.body.name;
            await check_tag.save();
            return res.status(200).json({
                msg: 'Cập nhật thành công',
                data: check_tag
            })
        }
        else {
            return res.status(400).json({ msg: "Sai id tag" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.deleteTag = async (req, res) => {
    try {
        const check_tag = await db.tags.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.tags_new
            }]
        });
        if (check_tag) {
            if (check_tag.tags_news.length > 0) {
                return res.status(400).json({ msg: "Tag này có nhiều bài viết liên quan" })
            }
            else {
                await check_tag.destroy();
                return res.status(200).json({
                    msg: 'Xóa thành công',
                })
            }
        }
        else {
            return res.status(400).json({ msg: "Sai id tag" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

// const sort_weight_value = {
//     draft: 1,
//     approved: 2,
//     rejected: 3,
//     published: 4
// }

// function sort_news_by_status(news1, news2){
//     return sort_weight_value[news1.status] - sort_news_by_status[news2.status];
// }

exports.getAllNews = async (req, res) => {
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
                limit: per_page,
                offset: (page - 1) * per_page,
                include: [{
                    model: db.sub_categories,
                    include: [{
                        model: db.categories
                    }]
                }],
                order: [['createdAt', 'DESC']]
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
                await helper.fixAdminNews(_news.rows);
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

exports.approveNews = async (req, res) => {
    try {
        const check_news = await db.news.findByPk(req.params.id);
        if (check_news) {
            if (check_news.status === 'approved') {
                check_news.status = 'published';
                check_news.publicAt = new Date();
                await check_news.save();
                return res.status(200).json({
                    msg: 'Xuất bản thành công',
                })
            }
            else {
                return res.status(400).json({ msg: "Không thể xuất bản bài viết này" })
            }
        }
        else {
            return res.status(400).json({ msg: "Sai id bài viết" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}

exports.adjustedAndApproveNewsNow = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.toString() })
    }
}