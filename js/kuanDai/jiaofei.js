/**
 * Created by Administrator on 2018/1/16.
 */
(function(mui, doc){
    mui.init({});
    mui.plusReady(function() {});
    var siteFcode = new Uri(location.href).getQueryParamValue('siteFcode');
    var UserNum = new Uri(location.href).getQueryParamValue('UserNum');
    //alert(UserNum +'---'+localStorage.getItem('UserNum'));
    if(UserNum !== localStorage.getItem('UserNum')){
        $('#xiala').addClass('display-none');
    }
    //查询宽带用户个人信息
    var price,packageName,packageId,orderId,userId,userName;
    mui.ajax(config.httpPath+'api/Broadband/queryUsermsg', {
        data: {
            id:localStorage.getItem('id'),
            siteFcode:siteFcode,
            UserNum:UserNum
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
                $('#stu_id').text(ajaxData.data.userId);
                userId = ajaxData.data.userId;
                $('#name').text(ajaxData.data.userName);
                userName= ajaxData.data.userName;
                $('#phone').text(ajaxData.data.mobile);
                $('#IDCard').text(ajaxData.data.certNo);
                $('#taocan').text(ajaxData.data.packageName);
                packageName = ajaxData.data.packageName;
                packageId = ajaxData.data.packageId;
                $('#bizozhun').text(ajaxData.data.amount+'元');
                $('#yue').text(ajaxData.data.accountFee+'元');
                $('#begin_time').text(formatDateTime1(ajaxData.data.periodStartTime/1000));
                $('#end_time').text(formatDateTime1(ajaxData.data.periodLimitTime/1000));
                var sum = $('#sum').val();
                price = ajaxData.data.amount;
                $('#totalPrice').text(price*sum);
                //购物车的信息
                $('#buyTaocan').text(ajaxData.data.packageName);
                //$('#buyName').text(ajaxData.data.userName+'  学号：'+ajaxData.data.userId);
                $('#buyName').text(ajaxData.data.userId);
                //$('#buyChannel').text('微信');
                //在获取了用户套餐之后调取接口获取本校的所有套餐类型
                kuandai();
                //点击加
                mui(".mui-content").on('tap','#jia',function(){
                    var sum = $('#sum').val();
                    $('#sum').val(parseInt(sum) + 1);
                    sum = $('#sum').val();
                    $('#totalPrice').text(price*sum);
                });
                //点击减
                mui(".mui-content").on('tap','#jian',function(){
                    var sum = $('#sum').val();
                    //如果份数减为0，则删除该条数据
                    if(sum == 1){
                        mui.alert('购买数量不能少于1份','提示','确定',null,'div');
                    }else{
                        $('#sum').val(parseInt(sum) - 1);
                        sum = $('#sum').val();
                        $('#totalPrice').text(price*sum);
                    }
                });
                //点击续费从下往上弹出购物车详情
                mui("body").on('tap','#xufei',function(){
                    var totalPrice= $('#totalPrice').text();
                    mui('#sheet1').popover('toggle');
                    //购物车显示信息的及时更改
                    $('#buyPrice').text(totalPrice);
                });
            }else{
                //查询失败的时候返回上一页
                //mui.alert(ajaxData.meta.message,'提示','返回上一页',function(e) {mui.back();},'div');
                mui.openWindow({
                    url:'userInfo.html',
                    id:'userInfo.html',
                    extras:{}
                });
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });
    //查询当前学校套餐列表
    function kuandai(){
        mui.ajax(config.httpPath+'api/Broadband/querySerSets', {
            data: {
                siteFcode:siteFcode,
                packageName:packageName
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
                    var content='';
                    $.each(ajaxData.data,function(key,value){  //循环遍历后台传过来的json数据
                        var title = '<li id="title'+key+'" class="font12 gray-8color line25">'+value.name+'</li>';
                        $('#taocanContent').append(title);
                        var contentout = ' <li id="content'+key+'" class="mui-text-center"></li>';
                        $('#title'+key).after(contentout);
                        var border = 'grayborder1';
                        var color = 'gray-8color';
                        var mine = '';
                        var right = 'margin-right5per';
                        $.each(value.serSets,function(key,value){
                            if(value.setType == true){
                                border = 'orangeborder';
                                color = 'maincolor';
                                mine = '<div class="horbackground whitecolor position padding-left-right5px font10">当前套餐</div>';
                            }else{
                                border = 'grayborder1';
                                color = 'gray-8color';
                                mine = '';
                            }
                            //if(key % 2 == 0 && key != 0 ){
                            if((key+1) % 3 == 0 && (key+1) != 0 ){
                                right = '';
                            }else{
                                right = 'margin-right5per';
                            }
                            content += '<button data-id='+value.id+' class="buy width30 '+color+' marginbottom-10px '+border+' padding-top-bottom5px '+right+' mui-text-center float-left">'
                                + '<div class="font12 padding-top10 line20">'+value.amount+'元</div>'
                                + '<div class="font10 line20 mui-ellipsis">'+value.setRemark+'</div>'
                                + mine
                                + '</button>';
                        });
                        $('#content'+key).append(content);
                        content = '';
                        $('#content'+key).after('<div style="clear: both;"></div>');
                    });
                }else{
                    mui.toast(ajaxData.meta.message);
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
            }
        });
    }

    //进来的时候不显示套餐点击下拉箭头后展示所有，再点击就隐藏多余的
    var detailFlag = 'true';
    document.getElementById("xiala").addEventListener('tap',function(){
        //点击响应逻辑
        if(detailFlag ==="true"){
            //显示所有
            detailFlag = "false"
            $('.show').removeClass('display-none');
            $('#xia').addClass('rotate180');
            $("html, body").scrollTop(0).animate({scrollTop: $("#totalPrice").offset().top});
            //});
        }else{
            //显示部分
            detailFlag = 'true';
            $('.show').addClass('display-none');
            $('#xia').removeClass('rotate180');
        }
    });
    //点击资费说明
    mui(".mui-content").on('tap','#zfShuoming',function(){
        mui.openWindow({
            url:'zfShuoming.html',
            id:'zfShuoming.html',
            extras:{}
        });
    });
    //点击缴费记录
    mui(".mui-content").on('tap','#history',function(){
        if(userId == localStorage.getItem('UserNum')){
            mui.openWindow({
                url:'record.html?userId='+userId+'&&userName='+userName,
                id:'record.html',
                extras:{}
            });
        }else{
            mui.alert('不能查询登录用户以外的用户的缴费记录','提示','确定',null,'div');
        }

    });
    //点击套餐选项
    var clickId;
    mui(".mui-content").on('tap','.buy',function(){
        //若果是当前的可选套餐和不可选套餐
        var click = $(this);
        clickId = $(this).data('id');
        //alert(click.hasClass('orangeborder'));
        if(click.hasClass('orangeborder')){
            $('.buy').removeClass('bacddd');
            click.addClass('bacddd');
            var btn = ["暂时不","续费"];
            mui.confirm('是否为套餐续费？','<span class="iconfont icon-gth maincolor font22"></span>',btn,function(e) {
                if (e.index == 1) {
                    //var totalPrice= $('#totalPrice').text();
                    mui('#sheet1').popover('toggle');
                    //购物车显示信息的及时更改
                    $('#buyPrice').text(price);
                }
            },'div');
        }else{
            $('.buy').removeClass('bacddd');
            click.addClass('bacddd');
            //mui.alert('<a class="maincolor">如需办理请携带有效证件去校园营业厅办理！</a>','<span class="font14 fontgray">暂时不支持套餐的变更</span>','知道了',null,'div');
            var btn = ["再想想","确定"];
            mui.confirm('确定更换此套餐？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    mui.closePopup();
                    mui.openWindow({
                        url:'../new/changeTaocan.html?clickId='+clickId+'&&packageId='+packageId,
                        id:'changeTaocan'+"&&?time="+new Date().getTime(),
                        extras:{}
                    });
                }
            },'div');
        }
    });
    //点击续费套餐
    var clickAble = false;
    mui(".mui-content").on('tap','#submit',function(){
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
                                    amount:amount,
                                    userId:userId,
                                    id:localStorage.getItem('id'),
                                    siteCode:siteFcode,
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
                                    clickAble = false
                                    console.log(type);
                                    mui.toast('网络异常，请稍后再试');
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
                    clickAble = false;
                    console.log(type);
                    mui.toast('网络异常，请稍后再试');
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
                        });
                    }else{
                        mui.toast('需手机APP才能支付');
                        clickAble = false
                    }
                }
                function pay() {
                    //获取微信支付参数的url
                    //var basic_url ='http://www.51hall.com/wxDemo/wx/toAppPay?orderNo=123456&amount=0.01';
                    //mui.ajax('http://www.51hall.com/wxDemo/wx/toAppPay?orderNo='+orderId+'&&amount='+amount, {
                    //alert(amount+'--'+userId+'--'+localStorage.getItem('id')+'--'+siteFcode+'--'+orderId+"----"+client);
                    mui.ajax(config.httpPath+'api/Broadband/toPay', {
                        data: {
                            amount:amount,
                            userId:userId,
                            id:localStorage.getItem('id'),
                            siteCode:siteFcode,
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
                        if (window.plus){
                            var res_str = JSON.stringify(resObj);
                            //用返回参数 发起微信支付请求
                            //alert('1212'+res_str);
                            plus.payment.request(channel, res_str, wxpay_success, wxpay_error);
                        }else{
                            if(mui.os.ios){

                            }
                            mui.toast('需手机APP才能支付，ajax');
                            //document.addEventListener( "plusready", plusReady, false );
                            clickAble = false
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
                        //alert(location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp=');
//            window.location.href = location.origin+"/order/payFinish/"+${order.id}+"?timestamp="+timestamp;
//                        window.location.href = location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId;
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
}(mui, document));