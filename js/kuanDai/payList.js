/**
 * Created by Administrator on 2017/11/16.
 */
(function(mui, doc){
    mui.init();
    //修改返回跳转的页面
    mui.back = function(){
        mui.openWindow({
            url:'../new/tabbarNew.html',
            id:'tabbarNew.html'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    };
    var old_back = mui.back;
    mui.plusReady(function() {
        var curr = plus.webview.currentWebview();
        var wvs = plus.webview.all();
        for (var i = 0, len = wvs.length; i < len; i++) {
            //关闭除setting页面外的其他页面
            if (wvs[i].getURL() == curr.getURL())
                continue;
            plus.webview.close(wvs[i]);
        }
        plus.key.addEventListener('backbutton', function() {
            mui.currentWebview.opener().show('none');
            old_back();
        }, false);
    });
    var orderId = new Uri(location.href).getQueryParamValue('orderId');
    //alert('orderId='+orderId+'token='+localStorage.getItem('token'));

    //获取交易详情
    mui.ajax(config.httpPath+'api/Broadband/queryOrder', {
        data: {
            orderId:orderId
        },
        dataType: 'json', //服务器返回json格式数据
        type: 'post' , //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        beforeSend: function(request) {
            request.setRequestHeader("X-Token",localStorage.getItem('token'));
        },
        success: function(ajaxData) {
            //服务器返回响应，根据响应结果，分析是否成功；
            //alert(JSON.stringify(ajaxData));
            if(ajaxData.meta.success == true){
                //mui.toast(ajaxData.meta.message);
                if(ajaxData.meta.resultCode != 0){
                    $('#textType').text('套餐更换成功');
                }/*else{*/
                    $('#money').text(ajaxData.data.amount);
                    $('#stu_id').text(ajaxData.data.studentNo);
                    $('#username').text(ajaxData.data.studentName);
                    $('#createTime').text(formatDateTime(ajaxData.data.createTime/1000));
                    $('#buyId').text(orderId);
                /*}*/
            }else{
                if(ajaxData.meta.resultCode != 0){
                    $('#textType').text('套餐更换不成功');
                }
                mui.toast(ajaxData.meta.message);
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });
    //点击返回到缴费首页
    mui("body").on('tap','.back',function(){
        mui.openWindow({
            url:'schoolWifiPay.html',
            id:'schoolWifiPay.html',
            extras:{}
        });
    });
    //点击返回首页
    mui(".mui-content").on('tap','#backIndex',function(){
        mui.openWindow({
            url:'../new/tabbarNew.html',
            id:'tabbarNew',
            extras:{}
        });
    });
}(mui, document));