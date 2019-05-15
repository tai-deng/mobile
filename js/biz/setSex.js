/**
 * Created by Administrator on 2017/8/2.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});
    var sex ;
    //点击选择男女
    mui(".mui-content").on('tap','#manbox',function(){
        sex = $('#man').text();
        $('#manGou').removeClass('display-none');
        $('#womanGou').addClass('display-none');
    });
    mui(".mui-content").on('tap','#womanbox',function(){
        sex = $('#woman').text();
        $('#womanGou').removeClass('display-none');
        $('#manGou').addClass('display-none');
    });

    mui(".mui-content").on('tap','#submit',function(){
        if(sex != ''){
            var sexflag;
            if( sex ==='男'){
                sexflag = 0;
            }else if( sex ==='女'){
                sexflag = 1;
            }
            mui.ajax(config.httpPath+'api/sysUser/setSex', {
                data: {
                    id:localStorage.getItem('id'),
                    sex:sexflag
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                beforeSend: function(request) {
                    request.setRequestHeader("X-Token",localStorage.getItem('token'));
                },
                success: function (ajaxData) {
                    //服务器返回响应，根据响应结果，分析是否成功；
                    //alert(JSON.stringify(ajaxData));
                    if (ajaxData.meta.success == true) {
                        //mui.alert(ajaxData.meta.message);
                        mui.openWindow({
                            url: 'personalCenter.html',
                            id: 'personalCenter',
                            extras: {}
                        });
                    } else {
                        mui.toast(ajaxData.meta.message);
                    }
                },
                error: function (xhr, type, errorThrown) {
                    //异常处理；
                    console.log(type);
                    mui.toast('网络异常，请稍后再试');
                }
            });
        }else{
            //mui.alert('请选择性别');
            mui.alert('请选择性别','提示','确定',null,'div');
        }
    });
}(mui, document));
