const db = require('../models');
const helper = require('../helper');


exports.renderListAll = async (req, res) => {
    try {
        // do something to get data
        res.render('list', {
            title: 'Home',
            nav: await helper.getNavWriter(),
            isWriter: true,
            isAll: true,
            post_type: "Tất cả bài viết"
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
            post_type: "Chờ duyệt"
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
            post_type: "Chờ xuất bản"
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
            post_type: "Bị từ chối"
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
            post_type: "Đã xuất bản"
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}
