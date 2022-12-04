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

    var form = layui.form;
    form.verify({
        username:function(value, item){
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符'
            };
        },
        pwd:[/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val();
            //判断两次密码是否一致
            if(pwd !== value){
                return '两次密码不一致！'
            };
        }
    });
    //点击注册按钮进行注册
    $('#form-reg').on('submit',function(e){
        e.preventDefault();
        //发起POST请求
        $.post('/api/reguser',{username:$('.reg-box [name=username]').val(),password:$('.reg-box [name=password]').val()},function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }

            layer.msg('注册成功，请登录！');
            $('#link_login').click();
        });
    });

    //实现登录
    $('#form_login').submit(function(e){
        e.preventDefault();
        console.log(11);
        $.ajax({
            url: '/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败！')
                }

                layer.msg('登录成功')

                localStorage.setItem('token',res.token);

                location.href = '/index.html'
            }
        });
    });
});
