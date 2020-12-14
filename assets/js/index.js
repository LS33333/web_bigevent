$(function() {
    getUserInfo();

    // 给退出按钮添加弹窗
    $("#btnLogout").on("click", function() {
        var layer = layui.layer;
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 清空本地存储中的local
            localStorage.removeItem('token');
            //跳转页面的设置
            location.href = "/login.html"

            layer.close(index);
        });
    })
})

// 创建一个获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头的配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data);
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username;
    //2.设置欢迎的文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avator").hide();
    } else {
        //3.2渲染文本头像
        var first = name[0].toUpperCase();
        $(".text-avator").html(first).show();
        $(".layui-nav-img").hide();
    }
}