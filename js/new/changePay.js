/**
 * Created by Administrator on 2018/2/1.
 */
(function(mui, doc) {
    mui.init();
    var phone,password,securityCode;
    mui.plusReady(function() {});
    var siteFcode,UserNum;
    //查询宽带用户个人信息
    var price,packageName,orderId,userId,userName;
    mui.ajax(config.httpPath+'api/Broadband/queryUsermsg ', {
        data: {
            id:localStorage.getItem('id'),
            siteFcode:localStorage.getItem('siteFcode'),
            UserNum:localStorage.getItem('UserNum')
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
                userId = ajaxData.data.userId;
                userName= ajaxData.data.userName;
                packageName = ajaxData.data.packageName;
                //购物车的信息
                $('#buyTaocan').text(ajaxData.data.packageName);
                $('#buyPrice').text(ajaxData.data.amount);
                //$('#buyName').text(ajaxData.data.userName+'  学号：'+ajaxData.data.userId);
                $('#buyName').text(ajaxData.data.userId);
            }else{
                mui.toast(ajaxData.meta.message);
               /* //查询失败的时候返回上一页
                mui.openWindow({
                    url:'userInfo.html',
                    id:'userInfo.html',
                    extras:{}
                });*/
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });
    //点击续费套餐
    var clickAble = false;
    mui(".mui-content").on('tap','#xufei',function(){
        if(!clickAble) {
            //按一次
            clickAble = true;
            // clickAble = new Date().getTime();
            // setTimeout(function(){clickAble = null}, 3000);
            //var buyPrice = $('#buyPrice').text();
            var amount = $('#buyPrice').text();
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
                                    id:localStorage.getItem('id'),
                                    amount:amount,
                                    userId:userId,
                                    siteCode:localStorage.getItem('siteFcode'),
                                    orderId:orderId,
                                    foreignId: '',
                                    foreignType:''
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
                        clickAble = false
                        //mui.toast(ajaxData.meta.message);
                        mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
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
                            //console.log("获取支付通道失败!");
                            clickAble = false
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
                            siteCode:localStorage.getItem('siteFcode') ,
                            orderId:orderId,
                            foreignId: '',
                            foreignType:''
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
                        }
                    }
                    //获取微信支付参数失败的回调函数
                    function ajax_error_callback(e) {
                        plus.ui.alert("ajax获取参数失败");
                        clickAble = false
                    }
                    //微信支付成功回调
                    function wxpay_success(result){
                        //var timestamp=new Date().getTime();
//            window.location.href = location.origin+"/order/payFinish/"+${order.id}+"?timestamp="+timestamp;
//                        window.location.href = location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId;
                        mui.openWindow({
                            url:location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId,
                            id:'payList.html',
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

}(mui, document));
