   //发ajax请求
function getUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！');
            }
            //获取信息成功渲染头像
            renderAvatar(res.data)
        }
    });
   };


   function renderAvatar(user){
    //这里还要写欢迎文本
    var name = user.nickname || user.username;
    var frist = name[0].toUpperCase();
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if(user.user_pic === null){
        $('.layui-nav-img').hide();
        $('.text-avatar').html(frist);
    }else{
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    };
   };

$(function(){
   getUserInfo();
   //实现退出功能
   $('#quit').on('click',function(){
    layer.confirm('确定退出吗？', {icon: 3, title:'提示'}, function(index){
        //do something
        //点击过这个按钮后强制返回登录页面，并清除token值。
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
      });
   });
});

