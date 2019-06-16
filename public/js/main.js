(function ($) {
    "use strict"
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }

    const toStringDate = (date) => {
        // return arr_days_of_week[date.getDay()] + ', ' + date.getDate() + ' Thg ' + (date.getMonth() + 1) + ' ' + date.getFullYear();
        return date.getDate() + ' Thg ' + (date.getMonth() + 1) + ' ' + date.getFullYear();
    }


    // Fixed Nav
    var lastScrollTop = 0;
    $(window).on('scroll', function () {
        var wScroll = $(this).scrollTop();
        if (wScroll > $('#nav').height()) {
            if (wScroll < lastScrollTop) {
                $('#nav-fixed').removeClass('slide-up').addClass('slide-down');
            } else {
                $('#nav-fixed').removeClass('slide-down').addClass('slide-up');
            }
        }
        lastScrollTop = wScroll
    });

    // Search Nav
    $('.search-btn').on('click', function () {
        $('.search-form').addClass('active');
    });

    $('.search-close').on('click', function () {
        $('.search-form').removeClass('active');
    });

    // Aside Nav
    $(document).click(function (event) {
        if (!$(event.target).closest($('#nav-aside')).length) {
            if ($('#nav-aside').hasClass('active')) {
                $('#nav-aside').removeClass('active');
                $('#nav').removeClass('shadow-active');
            } else {
                if ($(event.target).closest('.aside-btn').length) {
                    $('#nav-aside').addClass('active');
                    $('#nav').addClass('shadow-active');
                }
            }
        }
    });

    $('.nav-aside-close').on('click', function () {
        $('#nav-aside').removeClass('active');
        $('#nav').removeClass('shadow-active');
    });

    // Sticky Shares
    var $shares = $('.sticky-container .sticky-shares'),
        $sharesHeight = $shares.height(),
        $sharesTop,
        $sharesCon = $('.sticky-container'),
        $sharesConTop,
        $sharesConleft,
        $sharesConHeight,
        $sharesConBottom,
        $offsetTop = 80;

    function setStickyPos() {
        if ($shares.length > 0) {
            $sharesTop = $shares.offset().top
            $sharesConTop = $sharesCon.offset().top;
            $sharesConleft = $sharesCon.offset().left;
            $sharesConHeight = $sharesCon.height();
            $sharesConBottom = $sharesConHeight + $sharesConTop;
        }
    }

    function stickyShares(wScroll) {
        if ($shares.length > 0) {
            if ($sharesConBottom - $sharesHeight - $offsetTop < wScroll) {
                $shares.css({ position: 'absolute', top: $sharesConHeight - $sharesHeight, left: 0 });
            } else if ($sharesTop < wScroll + $offsetTop) {
                $shares.css({ position: 'fixed', top: $offsetTop, left: $sharesConleft });
            } else {
                $shares.css({ position: 'absolute', top: 0, left: 0 });
            }
        }
    }

    $(window).on('scroll', function () {
        stickyShares($(this).scrollTop());
    });

    $(window).resize(function () {
        setStickyPos();
        stickyShares($(this).scrollTop());
    });

    setStickyPos();

    function search_click() {
        const key_search = $(".search-input").val();
        console.log(key_search);
        if (key_search.length !== 0) {
            window.location.href = "/search?key=" + key_search;
        }
    }

    $(".search-click").click(search_click);

    function show_dropdown_logged() {
        $("#check-login").append(`
        <button class="drop-login"><img src="/img/avatar.png" alt="Avatar" style="width:50px;">${localStorage.getItem('user:name')}</button>
        <div class="dropdown-content">
            <a href="/profile">Profile</a>
            <a href="/change-password">Đổi mật khẩu</a>
            <p id="log-out" href="#">Đăng xuất</p>
        </div>`)
        $("#log-out").on('click', function (e) {
            e.preventDefault();
            localStorage.setItem('isUserLogin', false);
            localStorage.removeItem('user:name');
            localStorage.removeItem('user:email');
            localStorage.removeItem('user:birthdate');
            document.cookie = "token=thisistoken; expires = Thu, 01 Jan 1970 00:00:00 GMT" //delete cookie
            location.reload();
        })
    }

    function show_dropdown_not_logged() {
        $("#check-login").append(`
        <a id="go-log-in" class="drop-login" href="/log-in">Đăng nhập</a>
        `)
    }

    function post_comment(name, content) {
        $.ajax("/api/news/comment", {
            type: 'post',
            data: {
                name: name,
                content: content,
                idNews: $("#comment-form-container").attr('idNews')
            }
        }).done((coments) => {
            document.getElementById("comment-form").reset(); //reset lại form
            $("#post-comments").append(` <div class="media">
                            <div class="media-left">
                                <img class="media-object" src="/img/avatar.png" alt="">
                            </div>
                            <div class="media-body">
                                <div class="media-heading">
                                    <h4>${coments.data.name}</h4>
                                    <span class="time">${coments.data.createdAt}</span>
                                </div>
                                <p>${coments.data.content}</p>
                            </div>
                        </div>`)
            $("#submit-comment").show(); //show button submit
            $("#loading-submit-comment-container").hide();
        }).fail(function (xhr, status, error) {
            var err = JSON.parse(xhr.responseText);
            alert(err.msg);
            $("#submit-comment").show(); //show button submit
            $("#loading-submit-comment-container").hide();
        })
    }

    function show_comment_form_logged() {
        if (location.pathname.includes("/news/")) {
            $("#comment-form-container").append(`<form id="comment-form" class="post-reply">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <textarea class="input" name="message" placeholder="Nội dung bình luận" required></textarea>
                </div>
                <input id="submit-comment" type="submit" class="primary-button" value="Gởi bình luận"></input>
                <div id="loading-submit-comment-container" class="loading-comment pull-left" hidden>
                    <img src="/img/loading_comment.gif" alt=""></img>
                </div>
            </div>
        </div>
    </form>`)
        }

        $("#comment-form").submit(function (e) {
            e.preventDefault();
            //đã đăng nhập
            $("#submit-comment").hide(); //khóa button submit
            $("#loading-submit-comment-container").show();
            const dataArray = $(this).serializeArray();
            const data = {};
            for (var i = 0; i < dataArray.length; i++) {
                data[dataArray[i].name] = dataArray[i].value;
            }
            post_comment(localStorage.getItem('user:name'), data['message']);
        })
    }

    function show_comment_form_not_logged() {
        if (location.pathname.includes("/news/")) {
            $("#comment-form-container").append(`
        <form id="comment-form" class="post-reply">
            <div class="row">
                <div class="col-md-7">
                    <div class="form-group">
                        <span>Tên *</span>
                        <input class="input" type="text" name="name" required>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <textarea class="input" name="message" placeholder="Nội dung bình luận" required></textarea>
                    </div>
                    <input id="submit-comment" type="submit" class="primary-button" value="Gởi bình luận"></input>
                    <div id="loading-submit-comment-container" class="loading-comment pull-left" hidden>
                        <img src="/img/loading_comment.gif" alt=""></img>
                    </div>
                </div>
            </div>
        </form>`)

            $("#comment-form").submit(function (e) {
                e.preventDefault();
                //chưa đăng nhập
                $("#submit-comment").hide(); //khóa button submit
                $("#loading-submit-comment-container").show();
                const dataArray = $(this).serializeArray();
                const data = {};
                for (var i = 0; i < dataArray.length; i++) {
                    data[dataArray[i].name] = dataArray[i].value;
                }
                post_comment(data['name'], data['message']);
            })
        }
    }

    function check_login_user() {
        if (localStorage.getItem('isUserLogin') == 'true') {
            $.ajax("/api/users/me", {
                type: 'GET',
                dataType: 'json'
            }).done(res => {
                localStorage.setItem('isUserLogin', true);
                localStorage.setItem('user:name', res.profile.name);
                localStorage.setItem('user:email', res.profile.email);
                localStorage.setItem('user:birthdate', res.profile.birthdate);
                show_dropdown_logged(); //đã đăng nhập
                show_comment_form_logged();
            }).fail(function (xhr, status, error) {
                show_dropdown_not_logged(); //chưa đăng nhập
                show_comment_form_not_logged();
            })
        }
        else {
            show_dropdown_not_logged(); //chưa đăng nhập
            show_comment_form_not_logged();
        }
    }

    if (!location.pathname.includes("/writers") && !location.pathname.includes("/editor")) {
        //không phải trang writers
        check_login_user();
    }
    const post_widget = $("#post-widget");
    if (post_widget.length > 0) {
        $.ajax("/api/news/getLatestNews?num_news=5", {
            type: 'GET',
            dataType: 'json',
        }).done((_news) => {
            for (let i = 0, l = _news.data.length; i < l; i++) {
                post_widget.append(`<div class="post post-widget">
                    <a class="post-img" href="${_news.data[i].link}"><img src="${_news.data[i].avatar}" alt=""></a>
                    <div class="post-body">
                        <h3 class="post-title"><a href="${_news.data[i].link}">${_news.data[i].title}</a></h3>
                    </div>
                    </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });;
    }

    const ul_category_widget = $("#ul-category-widget");
    if (ul_category_widget.length > 0) {
        $.ajax("/api/categories/getCategoriesAndNumNews", {
            type: 'GET',
            dataType: 'json',
        }).done((categories) => {

            for (let i = 0, l = categories.data.length; i < l; i++) {
                ul_category_widget.append(`<li><a href="${categories.data[i].link}" class="cat-2">${categories.data[i].name}<span>${categories.data[i].num_news}</span></a></li>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    if (location.pathname.includes("/category/") || location.pathname.includes("/news/") || location.pathname.includes("/tag/")) {

        const load_more_button_category = $("#load-more-category");
        load_more_button_category.click(function () {
            $("#load-more-category-container").hide();
            $("#loading-container").show();
            if (load_more_button_category.attr('isSubCategory') === 'true') { //trang đang hiển thị news của sub_category
                $.ajax("/api/news/getNewsBySubCategory/" + load_more_button_category.attr('idCategory') + "?per_page=7&page=" + load_more_button_category.attr('next_page'),
                    {
                        type: 'GET',
                        dataType: 'json',
                    }).done(function (news) {
                        if (parseInt(news.next_page) > 0) //còn trang tiếp
                        {
                            $("#load-more-category-container").show();
                            load_more_button_category.attr('next_page', news.next_page)
                            $("#loading-container").hide();
                        }
                        else { //hết data rồi
                            $("#loading-container").hide();
                        }
                        const post_list_category = $("#post-list-category")
                        for (let i = 0, l = news.data.length; i < l; i++) {
                            post_list_category.append(`<div class="col-md-12">
                            <div class="post post-row">
                                <a class="post-img" href=${news.data[i].link}><img src=${news.data[i].avatar} alt=""></a>
                                <div class="post-body">
                                    <div class="post-meta">
                                        <a class="post-category cat-4" href=${news.data[i].sub_category.link}>${news.data[i].sub_category.name}</a>
                                        <span class="post-date">${news.data[i].publicAt}</span>
                                    </div>
                                    <h3 class="post-title"><a href=${news.data[i].link}>${news.data[i].title}</a></h3>
                                    <p class="post-abstract">${news.data[i].abstract}</p>
                                </div>
                            </div>
                        </div>`)
                        }
                    }).fail(function (xhr, textStatus, errorThrown) {
                        alert(xhr.responseText);
                    });
            }
            else { //trang đang hiển thị news của category
                $.ajax("/api/news/getNewsByCategory/" + load_more_button_category.attr('idCategory') + "?per_page=7&page=" + load_more_button_category.attr('next_page'),
                    {
                        type: 'GET',
                        dataType: 'json',
                    }).done(function (news) {
                        if (parseInt(news.next_page) > 0) //còn trang tiếp
                        {
                            $("#load-more-category-container").show();
                            load_more_button_category.attr('next_page', news.next_page)
                            $("#loading-container").hide();
                        }
                        else { //hết data rồi
                            $("#loading-container").hide();
                        }
                        const post_list_category = $("#post-list-category")
                        for (let i = 0, l = news.data.length; i < l; i++) {
                            post_list_category.append(`<div class="col-md-12">
                            <div class="post post-row">
                                <a class="post-img" href=${news.data[i].link}><img src=${news.data[i].avatar} alt=""></a>
                                <div class="post-body">
                                    <div class="post-meta">
                                        <a class="post-category cat-4" href=${news.data[i].sub_category.link}>${news.data[i].sub_category.name}</a>
                                        <span class="post-date">${news.data[i].publicAt}</span>
                                    </div>
                                    <h3 class="post-title"><a href=${news.data[i].link}>${news.data[i].title}</a></h3>
                                    <p class="post-abstract">${news.data[i].abstract}</p>
                                </div>
                            </div>
                        </div>`)
                        }
                    }).fail(function (xhr, textStatus, errorThrown) {
                        alert(xhr.responseText);
                    });
            }
        });


        //pagination tag_page
        const load_more_button_tag = $("#load-more-tag");
        load_more_button_tag.click(function () {
            $("#load-more-tag-container").hide();
            $("#loading-container").show();
            $.ajax("/api/news/getNewsByTag/" + load_more_button_tag.attr("idTag") + "?per_page=" + load_more_button_tag.attr("per_page") + "&page=" + load_more_button_tag.attr("next_page"),
                {
                    type: 'GET',
                    dataType: 'json',
                }).done(function (news) {
                    if (parseInt(news.next_page) > 0) //còn trang tiếp
                    {
                        $("#load-more-tag-container").show();
                        load_more_button_category.attr('next_page', news.next_page)
                        $("#loading-container").hide();
                    }
                    else { //hết data rồi
                        $("#loading-container").hide();
                    }
                    const post_list_tag = $("#post-list-tag");
                    for (let i = 0, l = news.data.length; i < l; i++) {
                        post_list_tag.append(`<div class="col-md-12">
                        <div class="post post-row">
                            <a class="post-img" href=${news.data[i].link}><img src=${news.data[i].avatar} alt=""></a>
                            <div class="post-body">
                                <div class="post-meta">
                                    <a class="post-category cat-4" href=${news.data[i].sub_category.link}>${news.data[i].sub_category.name}</a>
                                    <span class="post-date">${news.data[i].publicAt}</span>
                                </div>
                                <h3 class="post-title"><a href=${news.data[i].link}>${news.data[i].title}</a></h3>
                                <p class="post-abstract">${news.data[i].abstract}</p>
                            </div>
                        </div>
                    </div>`)
                    }
                }).fail(function (xhr, textStatus, errorThrown) {
                    alert(xhr.responseText);
                });
        })


    }

})(jQuery);
