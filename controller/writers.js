const db = require('../models');
const helper = require('../helper');


exports.renderListAll = async (req, res) => {
    try {
        // do something to get data
        res.render('list', {
            title: 'Home',
            nav: await helper.getNavWriter(),
            isWriter: true,
            isAll: true
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
            isDraft: true
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
            isApproved: true
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
            isRejected: true
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
            isPublished: true
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}
