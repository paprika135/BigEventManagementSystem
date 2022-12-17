$(function(){
    var layer = layui.layer;
    var form = layui.form;
    
    initArtCateList();

    function initArtCateList(){
        
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取文章分类列表失败！');
                }
                 //调用模板字符传
                 var htmlStr = template('tpl-table',res);
                 $('tbody').html(htmlStr);
            }
        });
    };

    var indexAdd = null
    $('#btnAddCate').on('click',function(){
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          });     
    });

    //通过事件冒泡的方式监听lay弹出层的点击事件

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        // console.log($(this).serialize());
        
        $.ajax({
          method: 'POST',
          url: '/my/article/addcates',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg(res.message)
            }
            initArtCateList()
            layer.msg('新增分类成功！')
            // 根据索引，关闭对应的弹出层
            layer.close(indexAdd)
          }
        })
      });

      //通过事件监听的方式给编辑按钮添加点击事件
      var indexEdit = null;
      $('tbody').on('click','.btn-edit',function(){
        //修改类别的弹出层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        
        var id = $(this).attr('data-id');
        
        //根据id属性获取相应的分类数据。
        $.ajax({
            method:'GET',
            url:'/my/article/cates/' + id,
            success:function(res){
                form.val('form-edit',res.data)
            }
        });
      });

      //通过代理的形式，为修改分类的表单绑定 submit 事件
      $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新分类数据失败')
                }

                layer.msg('更新分类数据成功');
                layer.close(indexEdit);
                //重新渲染一下页面
                initArtCateList();
            }
        });
      });

      //通过代理的形式，为删除按钮绑定click事件
      $('tbody').on('click','.btn-delete',function(){
          var id = $(this).attr('data-id');
          console.log(id);
          
          layer.confirm('确认删除？',{icon:3,tittle:'提示'},function(index){
              $.ajax({
                  method:'GET',
                  url:'/my/article/deletecate/' + id,
                  success:function(res){
                      if(res.status !== 0){
                        return layer.msg('删除分类失败');
                      }
                      layer.msg('删除分类成功！');
                      layer.close(index);
                      initArtCateList();
                  }
              });
          });
      });
});
