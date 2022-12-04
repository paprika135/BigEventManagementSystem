$(function(){
    var form = layui.form;
    var layer = layui.layer;
    //表单验证
    form.verify({
        nickname:function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
              return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
              return '用户名不能全为数字';
            }}
    });




    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('请求数据失败');
                }

                form.val('renderUserInfo',res.data);
            }
        });
    };

    initUserInfo();

    //重置表单数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
      });


    //提交功能
    $('.layui-form').on('submit',function(e){
        e.preventDefault(); 
        
        $.ajax({
            url:'/my/userinfo',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("修改用户信息失败");                 
                }
                  //重新渲染头像等信息
                  layer.msg('更新用户信息成功！');
                  window.parent.getUserInfo();
            }
        });
        
    });
});