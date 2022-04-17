$.ajaxPrefilter(function(options) {
    // 在真正的调用接口之前，先拼接调用的接口地址
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 || res.responseJSON.message ===  '身份认证失败！') {
            // 1.清除本地存储的token值
            localStorage.removeItem('token')

            // 2.跳转页面到登录页
            location.href = 'login.html'
        }
    }
})