$(function() {
    // 点击去注册账号的链接
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show()
    })

    //点击去登录账号的链接
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide()
    })

    // 表单的正则验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("[A-Za-z0-9]{4,40}").test(value)) {
                return '用户名必须是6位数的英文或者数字';
            }
        },
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 两次密码的验证
        repwd: function(value) {
            var pwd = $('.reg-box [name="password"]').val();
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    })

    //发起请求，注册用户
    $("#form_reg").on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        var data = {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            }
            //发起post请求，注册用户
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功！');
            $("#link_login").click()
        })
    })

    // 发起请求，登录账号
    $("#form_login").on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();

        //发起请求，注册用户
        // $.ajax({
        //     method:'post',
        //     url:'/api/login',
        //     data:$(this).serialize(),
        //     success:function(res){
        //         if (res.status !== 0) {
        //             return layer.msg(res.message);
        //         }
        //         layer.msg('登录成功！');
        //         console.log(res.token); 
        //     }
        // })
        $.post('/api/login', $(this).serialize(), function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('登录成功！');

            //将登录成功得到的字符串保存子啊本地存储
            localStorage.setItem('token', res.token)
            location.href = 'index.html'
        })
    })



})