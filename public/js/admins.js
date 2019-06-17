(function ($) {
    "use strict"


    function show_dropdown_admins_logged() {
        $("#check-login").append(`
        <button class="drop-login"><img src="/img/avatar.png" alt="Avatar" style="width:50px;">${localStorage.getItem('user:name')}</button>
        <div class="dropdown-content">
            <a href="/profile">Profile</a>
            <a href="/change-password">Đổi mật khẩu</a>
            <p id="log-out" href="#">Đăng xuất</p>
        </div>`)
        $("#log-out").on('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('isAdminsLogin');
            localStorage.removeItem('user:name');
            localStorage.removeItem('user:email');
            localStorage.removeItem('user:birthdate');
            document.cookie = "token=thisistoken; expires = Thu, 01 Jan 1970 00:00:00 GMT" //delete cookie
            window.location.href = "/admins/";
        })
    }

    function check_login_admins() {
        if (localStorage.getItem('isAdminsLogin') == 'true') {
            $.ajax("/api/admins/me", {
                type: 'GET',
                dataType: 'json'
            }).done(res => {
                localStorage.setItem('isAdminsLogin', true);
                localStorage.setItem('user:name', res.profile.name);
                localStorage.setItem('user:email', res.profile.email);
                localStorage.setItem('user:birthdate', res.profile.birthdate);
                show_dropdown_admins_logged(); //đã đăng nhập
            }).fail(function (xhr, status, error) {
                window.location.href = "/";
            })
        }
        else {
            window.location.href = "/";
        }
    }

    if (location.pathname.includes("/admins")) {
        console.log('check')
        check_login_admins();
    }

})(jQuery)