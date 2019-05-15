/**
 * Created by Administrator on 2017/8/16.
 */
(function(mui, doc) {
    //mui.init();
    mui.init({
        swipeBack:true //启用右滑关闭功能
    });
    mui.ajax(config.httpPath+'api/serviceHall', {
        data: {
            id:localStorage.getItem('id')
        },
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        beforeSend: function(request) {
            request.setRequestHeader("X-Token",localStorage.getItem('token'));
        },
        success: function(ajaxData) {
            //服务器返回响应，根据响应结果，分析是否成功；
            alert(JSON.stringify(ajaxData));
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            alert('失败le');
        }
    });
}(mui, document));
