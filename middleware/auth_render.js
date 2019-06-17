const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models')

const subscribers = db.subscribers;
const writers = db.writers;
const editors = db.editors;
const administrators = db.administrators;

var publicKEY = fs.readFileSync('./middleware/public.key', 'utf8');
var verifyOptions = {
    expiresIn: '5d',
    algorithm: "RS256"
}


var middlewareAuthWriterRender = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, publicKEY, verifyOptions);
        if (decode.writer === true) {
            writers.findOne({
                where: {
                    id: decode.id,
                    email: decode.email
                }
            }).then(_user => {
                if (!_user) {
                    return res.redirect('/')
                }
                else {
                    req.writerData = _user;
                    next();
                }
            })
        }
        else {
            return res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

var middlewareAuthEditorRender = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, publicKEY, verifyOptions);
        if (decode.editor === true) {
            editors.findOne({
                where: {
                    id: decode.id,
                    email: decode.email
                }
            }).then(_user => {
                if (!_user) {
                    return res.redirect('/')
                }
                else {
                    req.editorData = _user;
                    next();
                }
            })
        }
        else {
            return res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

var middlewareAuthAdminsRender = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, publicKEY, verifyOptions);
        if (decode.administrators === true) {
            administrators.findOne({
                where: {
                    id: decode.id,
                    email: decode.email
                }
            }).then(_user => {
                if (!_user) {
                    return res.redirect('/')
                }
                else {
                    req.administratorsData = _user;
                    next();
                }
            })
        }
        else {
            return res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}

module.exports = {
    middlewareAuthWriterRender,
    middlewareAuthEditorRender,
    middlewareAuthAdminsRender
}

