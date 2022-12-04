//里面有个参数会接收$.ajax里的配置对象。
$.ajaxPrefilter((options) =>{
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    options.complete = function(options){
        // console.log(options.responseJSON);
        if(options.responseJSON.status === 1 && options.responseJSON.message === '身份认证失败！'){
            //  1. 强制清空 token
        localStorage.removeItem('token')
        // 2. 强制跳转到登录页面
        location.href = '/login.html'
        }
    };
});