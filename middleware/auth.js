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

var middlewareAuthUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, publicKEY, verifyOptions);

        subscribers.findOne({
            where: {
                id: decode.id,
                email: decode.email
            }
        }).then(_user => {
            if (!_user) {
                res.status(401).json({ msg: 'Auth failed' });
            }
            else {
                req.userData = _user;
                next();
            }
        })
    } catch (error) {
        res.status(401).json({ msg: 'Auth failed' });
    }
}

var middlewareAuthWriter = (req, res, next) => {
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
                    res.status(401).json({ msg: 'Auth failed' });
                }
                else {
                    req.writerData = _user;
                    next();
                }
            })
        }
        else {
            res.status(401).json({ msg: 'Auth failed' });
        }
    } catch (error) {
        res.status(401).json({ msg: 'Auth failed' });
    }
}

var middlewareAuthEditor = (req, res, next) => {
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
                    res.status(401).json({ msg: 'Auth failed' });
                }
                else {
                    req.editorData = _user;
                    next();
                }
            })
        }
        else {
            res.status(401).json({ msg: 'Auth failed' });
        }
    } catch (error) {
        res.status(401).json({ msg: 'Auth failed' });
    }
}

var middlewareAuthAdmin = (req, res, next) => {
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
                    res.status(401).json({ msg: 'Auth failed' });
                }
                else {
                    req.administratorsData = _user;
                    next();
                }
            })
        }
        else {
            res.status(401).json({ msg: 'Auth failed' });
        }
    } catch (error) {
        res.status(401).json({ msg: 'Auth failed' });
    }
}


module.exports = {
    middlewareAuthUser,
    middlewareAuthWriter,
    middlewareAuthEditor,
    middlewareAuthAdmin
}