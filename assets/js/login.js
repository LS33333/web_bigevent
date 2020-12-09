$(function() {
    // 点击“去注册”的链接，隐藏本身，显示去登录
    $("#link-login").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    // 点击“去登录”的链接，隐藏本身，显示去注册
    $("#link-reg").on("click", function() {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    // 从layUI中获取form对象
    var form = layui.form;
    // 从layUI中获取layer事件
    var layer = layui.layer;
    form.verify({
        // 自定义一个叫做PWD的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 自定义一个两次密码输入对比的校验规则
        repwd: function(value) {
            //再次输入密码的值通过value可以获得
            // 需要再获取首次输入密码的值,通过属性选择器获取的
            var pwd = $(".reg-box [name=password]").val();
            // 对两次输入的密码进行比较
            if (pwd !== value) {
                return "两次输入的密码不相同"
            }
        }
    })

    // 为注册用户发起Ajax请求
    // 监听表单提交事件
    $("#form_reg").on("submit", function(e) {
        //1.阻止表单提交
        e.preventDefault();
        //2.发起Ajax请求
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        $.post("http://ajax.frontend.itheima.net/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            };
            layer.msg("注册成功，请去登录");
            //模拟手动点击事件，注册成功之后，自动跳转到登录页面
            $("#link-reg").click();
        })
    })

    //为登录用户发起Ajax请求
    //监听登录表单提交事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败");
                }
                layer.msg("登陆成功");
                // 将登录成功之后的字符串保存到：
                localStorage.setItem('token', res.token);
                // console.log(res.token);
                // 登录成功后跳转到后台的首页
                location.href = "/index.html"
            }
        })
    })
})