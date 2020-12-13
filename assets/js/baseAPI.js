//调用jQuery中的ajaxPrefilter()这个函数，这是jQuery自己封装的一个函数，每次在进行Ajax，post或get请求的时候，在请求本身发起之前都会先调用这个函数，可以拿到Ajax的配置对象

$.ajaxPrefilter(function(option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;

    //判断请求的地址是否是以/my/开头的，是则调用，不是则不调用，这是有权限的意思
    if (option.url.indexOf("/my/") !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 直接输入登陆页面的地址也可以跳转到后台的页面，为解决这个问题，需要登录才跳转到后台，需要用到ajax请求中的complete函数
    option.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // (1)强制清空token
            localStorage.removeItem("token");
            // (2)强制跳转页面到登陆页面
            location.href = "/login.html";
        }
    }
})