$.ajaxPrefilter(function(options) {
    // 在真正的调用接口之前，先拼接调用的接口地址
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // console.log(options.url);
})