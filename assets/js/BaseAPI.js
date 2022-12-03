//里面有个参数会接收$.ajax里的配置对象。
$.ajaxPrefilter((options) =>{
    console.log(options);
    options.url = 'http://www.liulongbin.top:3007' + options.url;
});