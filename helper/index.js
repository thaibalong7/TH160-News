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
        news[i].dataValues.publicAt = toStringDate(new Date(news[i].dataValues.createdAt));
        news[i].dataValues.avatar = '/img/news_avatar/' + news[i].avatar;
        news[i].dataValues.sub_category = news[i].dataValues.sub_category.dataValues;
        news[i].dataValues.sub_category.link = '/category/' + news[i].dataValues.sub_category.id + '/' + slugify(news[i].dataValues.sub_category.name) + '?isSubCategory=true'
        news[i] = news[i].dataValues;
    }
}

const fixListComments = async (comments) =>{
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

module.exports = {
    slugify,
    toStringDatetime,
    toStringDate,
    formatNumber,
    fixNews,
    addLinkTagToListTagNew,
    fixListComments,
    formatDate
}