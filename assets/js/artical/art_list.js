//设置请求参数，发起ajax请求。

$(function(){
    var layer = layui.layer;
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    };
    //发起ajax请求利用模板字符串渲染页面
    
    initTable();
    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data: q,
            success:function(res){
                if(res.data !== 0){
                    return layer.msg('获取文章列表失败！');
                }
                //获取数据成功则需要使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table',res);
            }
        });
    };


    function initCate() {
        $.ajax({
          method: 'GET',
          url: '/my/article/cates',
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('获取分类数据失败！')
            }
            // 调用模板引擎渲染分类的可选项
            var htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            // 通过 layui 重新渲染表单区域的UI结构
            form.render();
          }
        })
      };


    //为筛选表单绑定submit事件
    $('#form-search').on('submit',function(e){
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();

        q.cate_id = cate_id
        q.state = state

         initTable()
    });
});