/**
 * Created by Administrator on 2018/5/4.
 */
function weixinPay(phoneNum,phoneAmountId,id,sitefcode,orderid,xtoken){
    mui.ajax(config.httpPath+'api/lifeRecharge/toPay_wx', {
        data: {
            phoneNum:phoneNum,
            phoneAmountId:phoneAmountId,
            id:id,
            siteFcode:sitefcode,
            orderId:orderid
        },
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        beforeSend: function(request) {
            request.setRequestHeader("X-Token",xtoken);
        },
        success: function(ajaxData) {
            //服务器返回响应，根据响应结果，分析是否成功；
            alert(JSON.stringify(ajaxData));
            if(ajaxData !== '' && ajaxData !== 'null'){
                //mui.toast(ajaxData.meta.message);
                mui.openWindow({
                    url:ajaxData.data,
                    id:ajaxData.data,
                    extras:{}
                });
            }else{
                mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });
};
function appPay(phoneNum,phoneAmountId,id,sitefcode,orderid,xtoken){
    //alert(sitefcode);
    startWXPAY();
    function startWXPAY()
    {
        //调用pay()方法 发起支付即可
        pay();
        //定义支付通道
        var channel = null;
        //获取支付通道
        getChannels();
        //获取支付通道的方法
        function getChannels() {
            if(window.plus){
                plus.payment.getChannels(function(channels) {
                    for (var i = 0; i < channels.length; i++) {
                        if (channels[i].id == "wxpay") {
                            channel = channels[i];
                            plus.ui.toast("等待微信支付中");
                        }
                    }
                }, function(e) {
                    plus.ui.toast("获取支付通道失败!");
                });
            }else{
                mui.toast('需安卓手机APP才能支付');
            }
        }
        //发起微信支付请求的方法
        function pay() {
            //获取微信支付参数的url
            mui.ajax(config.httpPath+'api/lifeRecharge/toPay', {
                data: {
                    phoneNum:phoneNum,
                    phoneAmountId:phoneAmountId,
                    id:id,
                    siteFcode:sitefcode ,
                    orderId:orderid
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                beforeSend: function(request) {
                    request.setRequestHeader("X-Token",xtoken);
                },
                success: ajax_success_callback,
                error: ajax_error_callback
            });
            //获取微信支付参数成功的回调函数
            function ajax_success_callback(resObj) {
                mui.toast(window.plus)
                if (window.plus){
                    var res_str = JSON.stringify(resObj);
                    //用返回参数 发起微信支付请求
                    plus.payment.request(channel, res_str, wxpay_success, wxpay_error);
                }else{
                    // mui.toast('需APP才能支付');
                    mui.alert(JSON.stringify(resObj))
                }
            }
            //获取微信支付参数失败的回调函数
            function ajax_error_callback(e) {
                plus.ui.alert("ajax获取参数失败");
            }
            //微信支付成功回调
            function wxpay_success(result) {
                var timestamp=new Date().getTime();
                //alert(location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp=');
//            window.location.href = location.origin+"/order/payFinish/"+${order.id}+"?timestamp="+timestamp;
//                        window.location.href = location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId;
                mui.openWindow({
                    url:location.origin+'/mobileApp/html-reshuijiaofei/result.html?timestamp='+timestamp+'&&orderId='+orderId,
                    id:'result.html'+"?time="+new Date().getTime(),
                    extras:{}
                });
            }
            //微信支付失败回调
            function wxpay_error(error) {
                plus.ui.alert("支付失败!");
            }
        }
    }
}