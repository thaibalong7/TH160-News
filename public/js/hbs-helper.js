

$(document).ready(function () {
    // launch your function here
    Handlebars.registerHelper('link_avatar_new', function (context, option) {
        console.log(option.fn(this));
        console.log('asdasdasds')
        return '';
    })
});

