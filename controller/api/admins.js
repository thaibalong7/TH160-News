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