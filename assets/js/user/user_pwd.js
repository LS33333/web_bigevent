$(function() {
    // 为重置密码设置校验规则
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '新密码两次不一致';
            }
        }
    });

    // 发起请求，实现修改密码功能
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('重置密码失败');
                }
                layui.layer.msg('重置密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})