/**
 * Created by Administrator on 2018/2/6.
 */
(function(mui, doc){
    mui.init({});
    var amount,name,userId,activeDate,resultCode,accountFee,taocanAmount;
    amount = new Uri(location.href).getQueryParamValue('amount');
    name = new Uri(location.href).getQueryParamValue('name');
    userId = new Uri(location.href).getQueryParamValue('userId');
    activeDate = new Uri(location.href).getQueryParamValue('activeDate');
    resultCode = new Uri(location.href).getQueryParamValue('resultCode');
    accountFee = new Uri(location.href).getQueryParamValue('accountFee');
    taocanAmount = new Uri(location.href).getQueryParamValue('taocanAmount');
    //修改微信左上角或者安卓物理返回按钮
    if(mui.os.wechat || mui.os.android){
        pushHistory();
        function pushHistory() {
            var state = {
                title: 'tabbarNew.html'+"&&?time="+new Date().getTime(),
                url: 'tabbarNew.html'+"?time="+new Date().getTime()
            };
            window.history.pushState(state,'tabbarNew.html'+"&&?time="+new Date().getTime(), 'tabbarNew.html'+"?time="+new Date().getTime());
        }
        var bool=false;
        setTimeout(function(){
            bool=true;
        },1500);
        window.addEventListener("popstate", function(e) {
            //alert('我监听到了返回');
            if(bool)
            {
                mui.openWindow({
                    url:'new/tabbarNew.html'+"?time="+new Date().getTime(),
                    id:'tabbarNew.html'+"&&?time="+new Date().getTime(),
                    extras:{}
                });
            }
            pushHistory();
        }, false);
    }
    mui.init({});
    mui.back = function(){
        mui.openWindow({
            url:'new/tabbarNew.html'+"?time="+new Date().getTime(),
            id:'tabbarNew.html'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    };
    //修改返回跳转的页面
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

    $('.sxTime').text(formatDateTime1(activeDate/1000));
    //点击返回首页
    mui(".mui-content").on('tap','#back',function(){
        mui.openWindow({
            url:'new/tabbarNew.html',
            id:'tabbarNew'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    });
    //resultCode（0：用户余额不足，需要预付  1：不需要预付）
    if(resultCode == 0){
        $('#yujiao').removeClass('display-none');
        $('#buyTaocan').text(name);
        $('#buyName').text(userId);
        $('#buymoney').text(taocanAmount);//套餐资费
        $('#accountMoney').text(accountFee);//账户余额
        $('#buyPrice').text(amount);//付款金额
        //点击预缴费用
        mui(".mui-content").on('tap','#yujiao',function(){
            mui('#sheet1').popover('toggle');
        });

        //点击续费套餐
        var clickAble = false;
        var orderId;
        mui(".mui-content").on('tap','#submit',function(){
            if(!clickAble) {
                //按一次
                clickAble = true;
                // clickAble = new Date().getTime();
                // setTimeout(function(){clickAble = null}, 3000);
                var wxChannel = null; // 微信支付
                var aliChannel = null; // 支付宝支付
                var channel = null;   //支付通道
                //获取订单Id
                mui.ajax(config.httpPath+'api/Broadband/queryOrderId', {
                    data: {},
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post' , //HTTP请求类型
                    timeout: 10000, //超时时间设置为10秒；
                    beforeSend: function(request) {
                        request.setRequestHeader("X-Token",localStorage.getItem('token'));
                    },
                    success: function(ajaxData) {
                        //服务器返回响应，根据响应结果，分析是否成功；
                        //alert(JSON.stringify(ajaxData));
                        if(ajaxData !== ''){
                            //mui.toast(ajaxData.meta.message);
                            orderId = ajaxData;
                            if(mui.os.wechat){
                                //alert(amount+'--'+userId+'--'+localStorage.getItem('id')+'---'+siteFcode+'--'+orderId);
                                mui.ajax(config.httpPath+'api/Broadband/toPay_wx', {
                                    data: {
                                        amount:amount,
                                        userId:userId,
                                        id:localStorage.getItem('id'),
                                        siteCode:localStorage.getItem('siteFcode'),
                                        orderId:orderId
                                        /*foreignId: '',
                                        foreignType:'1'*/
                                    },
                                    dataType: 'json', //服务器返回json格式数据
                                    type: 'post', //HTTP请求类型
                                    timeout: 10000, //超时时间设置为10秒；
                                    beforeSend: function(request) {
                                        request.setRequestHeader("X-Token",localStorage.getItem('token'));
                                    },
                                    success: function(ajaxData) {
                                        //服务器返回响应，根据响应结果，分析是否成功；
                                        //alert(JSON.stringify(ajaxData));
                                        if(ajaxData !== '' && ajaxData !== 'null'){
                                            //mui.toast(ajaxData.meta.message);
                                            mui.openWindow({
                                                url:ajaxData.data,
                                                id:ajaxData.data,
                                                extras:{}
                                            });
                                        }else{
                                            //mui.toast(ajaxData.meta.message);
                                            mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
                                        }
                                        clickAble = false
                                    },
                                    error: function(xhr, type, errorThrown) {
                                        //异常处理；
                                        console.log(type);
                                        mui.toast('网络异常，请稍后再试');
                                        clickAble = false
                                    }
                                });
                            }else{
                                startWXPAY();
                            }
                        }else{
                            //mui.toast(ajaxData.meta.message);
                            mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
                            clickAble = false
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                        mui.toast('网络异常，请稍后再试');
                        clickAble = false
                    }
                });
                //startWXPAY();
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
                                clickAble = false
                                //console.log("获取支付通道失败!");
                            });
                        }else{
                            mui.toast('需手机APP才能支付');
                            clickAble = false
                        }
                    }
                    //发起微信支付请求的方法
                    function pay() {
                        //获取微信支付参数的url
                         mui.ajax(config.httpPath+'api/Broadband/toPay', {
                            data: {
                                amount:amount,
                                userId:userId,
                                id:localStorage.getItem('id'),
                                siteCode:localStorage.getItem('siteFcode'),
                                orderId:orderId
                                /*foreignId: '',
                                foreignType:'1'*/
                            },
                            dataType: 'json', //服务器返回json格式数据
                            type: 'post', //HTTP请求类型
                            timeout: 10000, //超时时间设置为10秒；
                            beforeSend: function(request) {
                                request.setRequestHeader("X-Token",localStorage.getItem('token'));
                            },
                            success: ajax_success_callback,
                            error: ajax_error_callback
                        });
                        //获取微信支付参数成功的回调函数
                        function ajax_success_callback(resObj) {
                            if (window.plus) {
                                var res_str = JSON.stringify(resObj);
                                //用返回参数 发起微信支付请求
                                //alert('1212'+res_str);
                                plus.payment.request(channel, res_str, wxpay_success, wxpay_error);
                            }else{
                                mui.toast('需手机APP才能支付，ajax');
                                clickAble = false
                                //document.addEventListener( "plusready", plusReady, false );
                            }
                        }
                        //获取微信支付参数失败的回调函数
                        function ajax_error_callback(e) {
                            plus.ui.alert("ajax获取参数失败");
                            clickAble = false
                        }
                        //微信支付成功回调
                        function wxpay_success(result) {
                            var timestamp=new Date().getTime();
//            window.location.href = location.origin+"/order/payFinish/"+${order.id}+"?timestamp="+timestamp;
                            mui.openWindow({
                                url:location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId,
                                id:'payList.html'+"?time="+new Date().getTime(),
                                extras:{}
                            });
                            clickAble = false
                        }
                        //微信支付失败回调
                        function wxpay_error(error) {
                            plus.ui.alert("支付失败!");
                            clickAble = false
                        }
                    }
                }
                return false;
            } else {
                //重复按了几次
                mui.toast('请求正在发送中，请勿重复点击');
                // return (new Date().getTime() - clickAble) < 3000;
            }
        });
    }
}(mui, document));