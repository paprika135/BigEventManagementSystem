$(function(){


    var layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
// 纵横比
aspectRatio: 1,
// 指定预览区域
preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)

//通过监听文件上传区域的change事件来实现文件的上传
$('#file').on('change',function(e){
    //识别用户是否传入图片
    var filelist = e.target.files;
    
    if(filelist.length === 0 ){
        return layer.msg('您没有选择图片！');
    };
    
    //拿到用户裁剪的图片
    var file = e.target.files[0];
    var imgURL = URL.createObjectURL(file);
    $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域
});
//模拟点击文件上传按钮实现文件的选择
$('#btnChooseImage').on('click',function(){
    //模拟点击事件
    $('#file').click();
});

//点击确定按钮上传头像
$('#btnUpload').on('click',function(){
    //首先需要获取裁剪过的图片
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    //向服务器传送数据
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
          avatar: dataURL
        },
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('更换头像失败！')
          }
          layer.msg('更换头像成功！')
          window.parent.getUserInfo()
        }
      });
})
});