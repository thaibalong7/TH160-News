(function ($) {
    "use strict"

    const form_login = $("#login-form");
    form_login.submit(function (e) {
        e.preventDefault();
        $("#container-login-btn").hide();
        $("#login-loading-container").show();
        const dataArray = $(this).serializeArray();
        const data = {};
        for (var i = 0; i < dataArray.length; i++) {
            data[dataArray[i].name] = dataArray[i].value;
        }

        if (data.type === 'user') {
            //call api
            $.ajax("/api/users/login", {
                type: "post",
                data: {
                    username: data['username'],
                    password: data['pass']
                }
            }).done(res => {
                localStorage.setItem('isUserLogin', true);
                localStorage.setItem('user:name', res.profile.name);
                localStorage.setItem('user:email', res.profile.email);
                localStorage.setItem('user:birthdate', res.profile.birthdate);
                window.location.href = "/";
            }).fail(function (xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                alert(err.msg);
                $("#container-login-btn").show();
                $("#login-loading-container").hide();
            })
        }
        if (data.type === 'writer') {
            $.ajax("/api/writers/login", {
                type: "post",
                data: {
                    username: data['username'],
                    password: data['pass']
                }
            }).done(res => {
                localStorage.setItem('isWriterLogin', true);
                localStorage.setItem('user:name', res.profile.name);
                localStorage.setItem('user:email', res.profile.email);
                localStorage.setItem('user:birthdate', res.profile.birthdate);
                localStorage.setItem('user:pseudonym', res.profile.pseudonym);
                window.location.href = "/writers";
            }).fail(function (xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                alert(err.msg);
                $("#container-login-btn").show();
                $("#login-loading-container").hide();
            })
        }
        if (data.type === 'editor') {
            $.ajax("/api/editor/login", {
                type: "post",
                data: {
                    username: data['username'],
                    password: data['pass']
                }
            }).done(res => {
                localStorage.setItem('isEditorLogin', true);
                localStorage.setItem('user:name', res.profile.name);
                localStorage.setItem('user:email', res.profile.email);
                localStorage.setItem('user:birthdate', res.profile.birthdate);
                window.location.href = "/editor";
            }).fail(function (xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                alert(err.msg);
                $("#container-login-btn").show();
                $("#login-loading-container").hide();
            })
        }
        if (data.type === 'administrator') {
            $.ajax("/api/admins/login", {
                type: "post",
                data: {
                    username: data['username'],
                    password: data['pass']
                }
            }).done(res => {
                localStorage.setItem('isAdminsLogin', true);
                localStorage.setItem('user:name', res.profile.name);
                localStorage.setItem('user:email', res.profile.email);
                localStorage.setItem('user:birthdate', res.profile.birthdate);
                window.location.href = "/admins";
            }).fail(function (xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                alert(err.msg);
                $("#container-login-btn").show();
                $("#login-loading-container").hide();
            })
        }

    })

})(jQuery);
