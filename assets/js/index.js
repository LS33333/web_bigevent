// 调用获取用户信息的函数
$(function() {
    getUserInfo()
})

function getUserInfo() {
    //发起请求，获取用户的信息，再渲染到页面上
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 此处需要配饰请求头，因为是有权限的接口
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}

//退出登录界面
$("#btnLogout").click(function() {
    layer.confirm('是否退出登录', { icon: 3, title: '提示' }, function(index) {
        // 退出登录的逻辑
        // 1.清除本地存储的token值
        localStorage.removeItem('token')

        // 2.跳转页面到登录页
        location.href = 'login.html'
        layer.close(index);
    });
})