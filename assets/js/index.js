$(function(){
   //发ajax请求
   function getUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        headers:{
            Authorization:localStorage.getItem('token') || ''
        },success:function(res){
            if(res.status !== 0){
                return latui.layer.msg('获取用户信息失败！');
            }
            //获取信息成功渲染头像
            renderAvatar(res.data)
        }
    });
   };

   getUserInfo();

   function renderAvatar(user){
    //这里还要写欢迎文本
    console.log(user);
    
    var name = user.nickname || user.username;
    var frist = name[0].toUpperCase();
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if(user.user_pic === null){
        $('.layui-nav-img').hide();
        $('.text-avatar').html(frist);
    }
   };
});