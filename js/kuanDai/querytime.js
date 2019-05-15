/**
 * Created by Administrator on 2017/11/16.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});
    //查询到期时间详情
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
    //点击我要缴费
    mui.openWindow({
     url: 'checkPhoneNum.html',
     id: 'checkPhoneNum',
     extras: {}
     });
}(mui, document));
