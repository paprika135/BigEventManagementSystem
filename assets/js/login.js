$(function(){
    //点击去注册按钮切换表单
    var Aswitch = false;
    $('.loginAndRegBox').on('click','a',function(e){
        // e.preventDefault();
        if(Aswitch){
            $('.login-box').show();
            $('.reg-box').hide();
            Aswitch = false;
        }else{
            $('.login-box').hide();
            $('.reg-box').show();
            Aswitch = true;
        };
    });
});
