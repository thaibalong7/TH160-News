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

    if (location.pathname.includes("/category/") || location.pathname.includes("/news/") || location.pathname.includes("/tag/")) {
        const post_widget = $("#post-widget");
        if (post_widget) {
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
        if (ul_category_widget) {
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
                            post_list_category.append(`
                                <div class="col-md-12">
                                    <div class="post post-row">
                                        <a class="post-img" href=${news.data[i].link}>
                                            <img src=${news.data[i].avatar} alt="">
                                        </a>
                                        <div class="post-body">
                                            <div class="post-meta">
                                                <a class="post-category cat-4" href=${news.data[i].sub_category.link}>${news.data[i].sub_category.name}</a>
                                                <span class="post-date">${news.data[i].publicAt}</span>
                                            </div>

                                            <h3 class="post-title"><a href=${news.data[i].link}>${news.data[i].title}</a></h3>
                                            
                                            <p class="post-abstract">${news.data[i].abstract}</p>

                                        </div>
                                    </div>
                                </div>`
                            )
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

    const home_topFeaturedNews = $("#home-topFeaturedNews");
    if (home_topFeaturedNews) {
        $.ajax("/api/news/getFeaturedNews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 0, l = news.data.length; i < l; i++) {
                home_topFeaturedNews.append(`
                <div class="col-md-3" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topMostViewNo1 = $("#home-topMostViewNo1");
    if (home_topMostViewNo1) {
        $.ajax("/api/news/getNewsMostViews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 0, l = news.data.length; i < l-7; i++) {
                home_topMostViewNo1.append(`
                <div class="col-md-3" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topMostViewNo2 = $("#home-topMostViewNo2");
    if (home_topMostViewNo2) {
        $.ajax("/api/news/getNewsMostViews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 3, l = news.data.length; i < 5; i++) {
                home_topMostViewNo2.append(`
                <div class="col-md-12" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topMostViewNo3 = $("#home-topMostViewNo3");
    if (home_topMostViewNo3) {
        $.ajax("/api/news/getNewsMostViews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 5, l = news.data.length; i < 7; i++) {
                home_topMostViewNo3.append(`
                <div class="col-md-12" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topMostViewNo4 = $("#home-topMostViewNo4");
    if (home_topMostViewNo4) {
        $.ajax("/api/news/getNewsMostViews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 7, l = news.data.length; i < l; i++) {
                home_topMostViewNo4.append(`
                <div class="col-md-3" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }



    
    const home_topLatestNewsNo1 = $("#home-topLatestNewsNo1");
    if (home_topLatestNewsNo1) {
        $.ajax("/api/news/getLatestNews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 0, l = news.data.length; i < l-7; i++) {
                home_topLatestNewsNo1.append(`
                <div class="col-md-4">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topLatestNewsNo2 = $("#home-topLatestNewsNo2");
    if (home_topLatestNewsNo2) {
        $.ajax("/api/news/getNewsMostViews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 3, l = news.data.length; i < 5; i++) {
                home_topLatestNewsNo2.append(`
                <div class="col-md-12">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topLatestNewsNo3 = $("#home-topLatestNewsNo3");
    if (home_topLatestNewsNo3) {
        $.ajax("/api/news/getNewsMostViews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 5, l = news.data.length; i < 7; i++) {
                home_topLatestNewsNo3.append(`
                <div class="col-md-12">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topLatestNewsNo4 = $("#home-topLatestNewsNo4");
    if (home_topLatestNewsNo4) {
        $.ajax("/api/news/getLatestNews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 7, l = news.data.length; i < l; i++) {
                home_topLatestNewsNo4.append(`
                <div class="col-md-4">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }




    
    const home_topOfCategoryNo1 = $("#home-topOfCategoryNo1");
    if (home_topOfCategoryNo1) {
        $.ajax("/api/news/getLatestNews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 0, l = news.data.length; i < l-7; i++) {
                home_topOfCategoryNo1.append(`
                <div class="col-md-4" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topOfCategoryNo2 = $("#home-topOfCategoryNo2");
    if (home_topOfCategoryNo2) {
        $.ajax("/api/news/getNewsMostViews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 3, l = news.data.length; i < 5; i++) {
                home_topOfCategoryNo2.append(`
                <div class="col-md-12" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topOfCategoryNo3 = $("#home-topOfCategoryNo3");
    if (home_topOfCategoryNo3) {
        $.ajax("/api/news/getNewsMostViews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 5, l = news.data.length; i < 7; i++) {
                home_topOfCategoryNo3.append(`
                <div class="col-md-12" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    const home_topOfCategoryNo4 = $("#home-topOfCategoryNo4");
    if (home_topOfCategoryNo4) {
        $.ajax("/api/news/getLatestNews", {
            type: 'GET',
            dataType: 'json',
        }).done((news) => {
            for (let i = 7, l = news.data.length; i < l; i++) {
                home_topOfCategoryNo4.append(`
                <div class="col-md-4" style="margin-right: 30px">
                    <div class="post">
                        <a class="post-img" href="${news.data[i].link}"><img src="${news.data[i].avatar}" alt=""></a>
                        <div class="post-body">
                            <div class="post-meta">
                                <a class="post-category cat-2" href="${news.data[i].sub_category.link}">${news.data[i].sub_category.name}</a>
                                <span class="post-date">${news.data[i].publicAt}</span>
                            </div>
                            <h3 class="post-title"><a href="${news.data[i].link}">${news.data[i].title}</a></h3>
                        </div>
                    </div>
                </div>`)
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);
        });
    }

    
})(jQuery);
