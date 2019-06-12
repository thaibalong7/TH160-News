(function ($) {
    "use strict"


    function show_dropdown_writer_logged() {
        $("#check-login").append(`
        <button class="drop-login"><img src="/img/avatar.png" alt="Avatar" style="width:50px;">${localStorage.getItem('user:name')}</button>
        <div class="dropdown-content">
            <a href="/profile">Profile</a>
            <a href="/change-password">Đổi mật khẩu</a>
            <p id="log-out" href="#">Đăng xuất</p>
        </div>`)
        $("#log-out").on('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('isWriterLogin');
            localStorage.removeItem('user:name');
            localStorage.removeItem('user:email');
            localStorage.removeItem('user:birthdate');
            localStorage.removeItem('user:pseudonym');
            document.cookie = "token=thisistoken; expires = Thu, 01 Jan 1970 00:00:00 GMT" //delete cookie
            window.location.href = "/writers/";
        })
    }

    function check_login_writers() {
        if (localStorage.getItem('isWriterLogin') == 'true') {
            $.ajax("/api/writers/me", {
                type: 'GET',
                dataType: 'json'
            }).done(res => {
                localStorage.setItem('isWriterLogin', true);
                localStorage.setItem('user:name', res.profile.name);
                localStorage.setItem('user:email', res.profile.email);
                localStorage.setItem('user:birthdate', res.profile.birthdate);
                localStorage.setItem('user:pseudonym', res.profile.pseudonym);
                show_dropdown_writer_logged(); //đã đăng nhập
            }).fail(function (xhr, status, error) {
                window.location.href = "/";
            })
        }
        else {
            window.location.href = "/";
        }
    }

    if (location.pathname.includes("/writers")) {
        check_login_writers();
    }

})(jQuery)