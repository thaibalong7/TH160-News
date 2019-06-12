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
            post_type: "Tất cả bài viết",
            post_type_dev: "all"
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
            post_type: "Chờ duyệt",
            post_type_dev: "draft"
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
            post_type: "Chờ xuất bản",
            post_type_dev: "approved"
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
            post_type: "Bị từ chối",
            post_type_dev: "rejected"
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
            post_type: "Đã xuất bản",
            post_type_dev: "published"
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/');
    }
}
