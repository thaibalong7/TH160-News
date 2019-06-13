const slugify = (str) => {
    if (!str || str == '') {
        return 'unknown'
    }
    str = str
        .toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '')
    if (!str || str == '') {
        return 'u';
    }
    return str;
}

const arr_days_of_week = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba',
    'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

const toStringDatetime = (date) => {
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour
    let min = date.getMinutes();
    if (min < 10) min = '0' + min
    return hour + ':' + min + ' ' + ampm + ' ' + arr_days_of_week[date.getDay()] + ', ' + date.getDate() + ' Thg ' + (date.getMonth() + 1) + ' ' + date.getFullYear();
}

const toStringDate = (date) => {
    // return arr_days_of_week[date.getDay()] + ', ' + date.getDate() + ' Thg ' + (date.getMonth() + 1) + ' ' + date.getFullYear();
    return date.getDate() + ' Thg ' + (date.getMonth() + 1) + ' ' + date.getFullYear();
}

const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const fixNews = async (news) => {
    for (let i = 0, l = news.length; i < l; i++) {
        news[i].dataValues.link = '/news/' + news[i].id + '/' + slugify(news[i].title);
        news[i].dataValues.publicAt = toStringDate(new Date(news[i].dataValues.publicAt));
        news[i].dataValues.avatar = '/img/news_avatar/' + news[i].avatar;
        news[i].dataValues.sub_category = news[i].dataValues.sub_category.dataValues;
        news[i].dataValues.sub_category.link = '/category/' + news[i].dataValues.sub_category.id + '/' + slugify(news[i].dataValues.sub_category.name) + '?isSubCategory=true'
        news[i] = news[i].dataValues;
    }
}

const fixWriterNews = async (news) => {
    for (let i = 0, l = news.length; i < l; i++) {
        news[i].dataValues.avatar = '/img/news_avatar/' + news[i].avatar;
        news[i].dataValues.createdAt = toStringDate(new Date(news[i].dataValues.createdAt));
        news[i].dataValues.link = '/writers/w_news/' + news[i].id + '/' + slugify(news[i].title);
        if (news[i].status === 'rejected') {
            news[i].dataValues.link_edit = '/writers/edit/' + news[i].id + '/' + slugify(news[i].title);
            news[i].dataValues.status_vi = 'Bị từ chối'
        }
        if (news[i].status === 'draft') {
            news[i].dataValues.link_edit = '/writers/edit/' + news[i].id + '/' + slugify(news[i].title);
            news[i].dataValues.status_vi = 'Chờ duyệt'
        }
        if (news[i].status === 'approved') {
            news[i].dataValues.status_vi = 'Chờ xuất bản'
            news[i].dataValues.publicAt = toStringDatetime(new Date(news[i].dataValues.publicAt));
        }
        if (news[i].status === 'published') {
            news[i].dataValues.status_vi = 'Đã xuất bản'
        }
    }
}

const fixListComments = async (comments) => {
    for (let i = 0, l = comments.length; i < l; i++) {
        comments[i] = comments[i].dataValues;
        comments[i].createdAt = toStringDatetime(comments[i].createdAt);
    }
}

const addLinkTagToListTagNew = async (tags_new) => {
    for (let i = 0, l = tags_new.length; i < l; i++) {
        tags_new[i].dataValues.tag = tags_new[i].dataValues.tag.dataValues;
        tags_new[i].dataValues.tag.link = '/tag/' + tags_new[i].dataValues.tag.id + '/' + slugify(tags_new[i].dataValues.tag.name)
    }
}

function formatDate(days) {
    const d = new Date();
    d.setDate(d.getDate() + days)
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// Random number from 0 to length
const randomNumber = (length) => {
    return Math.floor(Math.random() * length)
}

const generateIDUser = async (length) => {
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let text = "";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(randomNumber(possible.length));
    }
    return text;
}

const generateIDNews = async (length) => {
    const possible =
        "abcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(randomNumber(possible.length));
    }
    return text;
}

const validateEmail = async (email) => {
    var Regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/
    return Regex.test(email);
}

const getNav = async (db) => {
    const nav = [];
    const query = {
        include: [{
            model: db.sub_categories
        }]
    }
    const _categories = await db.categories.findAll(query);

    for (let i = 0, l = _categories.length; i < l; i++) {
        const sub = [];
        if (_categories[i].sub_categories.length === 0)
            continue;

        for (let j = 0, l = _categories[i].sub_categories.length; j < l; j++) {
            _categories[i].sub_categories[j].dataValues.link = '/category/' + _categories[i].sub_categories[j].id + '/' + slugify(_categories[i].sub_categories[j].dataValues.name) + '?isSubCategory=true';
            sub.push(_categories[i].sub_categories[j].dataValues);
        }
        nav.push({
            id: _categories[i].id,
            name: _categories[i].name,
            sub: sub,
            link: '/category/' + _categories[i].id + '/' + slugify(_categories[i].name) + '?isSubCategory=false'
        })
    }
    return nav;
}

const getNavWriter = async () => {
    const nav = [];
    nav.push({
        name: "Đăng bài",
        link: "/writers/new-post"
    });
    nav.push({
        name: 'Bài viết',
        link: '/writers/',
        sub: [{
            name: 'Bị từ chối',
            link: '/writers/list-rejected'
        },
        {
            name: 'Chờ duyệt',
            link: '/writers/list-draft'
        },
        {
            name: 'Chờ xuất bản',
            link: '/writers/list-approved'
        },
        {
            name: 'Đã xuất bản',
            link: '/writers/list-public'
        },]
    });
    return nav;
}

module.exports = {
    slugify,
    toStringDatetime,
    toStringDate,
    formatNumber,
    fixNews,
    fixWriterNews,
    addLinkTagToListTagNew,
    fixListComments,
    formatDate,
    generateIDUser,
    generateIDNews,
    validateEmail,
    getNav,
    getNavWriter
}