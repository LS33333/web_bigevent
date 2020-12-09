//调用jQuery中的ajaxPrefilter()这个函数，这是jQuery自己封装的一个函数，每次在进行Ajax，post或get请求的时候，在请求本身发起之前都会先调用这个函数，可以拿到Ajax的配置对象

$.ajaxPrefilter(function(option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
})