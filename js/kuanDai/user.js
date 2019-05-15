/**
 * Created by Administrator on 2017/11/16.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});
    var type ;
    //点击选择套餐
    mui(".mui-content").on('tap','#manbox',function(){
        type = $('#manbox').data('id');
        $('#manGou').removeClass('display-none');
        $('#womanGou').addClass('display-none');
    });
    mui(".mui-content").on('tap','#womanbox',function(){
        type = $('#womanbox').data('id');
        $('#womanGou').removeClass('display-none');
        $('#manGou').addClass('display-none');
    });
    //点击下一步
    mui(".mui-content").on('tap','#next',function(){
        if(type != ''){
            /*var flag;
            if( type ==='男'){
                flag = 0;
            }else if( type ==='女'){
                flag = 1;
            }*/
            mui.ajax(config.httpPath+'', {
                data: {
                    id:localStorage.getItem('id'),
                    sex:type
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
                        /*mui.openWindow({
                            url: 'personalCenter.html',
                            id: 'personalCenter',
                            extras: {}
                        });*/
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
            mui.alert('请选择套餐','提示','确定',null,'div');
        }
    });
}(mui, document));

