/**
 * Created by Administrator on 2018/2/2.
 */
/**
 * Created by Administrator on 2018/1/16.
 */
(function(mui, doc){
    mui.init({});
    mui.plusReady(function() {});
    var packageId = new Uri(location.href).getQueryParamValue('packageId');
    var siteFcode = localStorage.getItem('siteFcode');
    var UserNum = localStorage.getItem('UserNum');
    var packageName,nowSer;
    var userId,oldSerId,newSerId;
    //获取页面的套餐信息
    getInformation();
    //查询当前学校套餐列表
    function kuandai(){
        //alert(nowSer);
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
   /* var userId,oldSerId,newSerId;
    //获取页面的套餐信息
    //getInformation();*/
    function getInformation(){
        mui.ajax(config.httpPath+'api/Broadband/prepayChangeSerSet', {
            data: {
                id:localStorage.getItem('id'),
                siteFcode:localStorage.getItem('siteFcode'),
                userId:localStorage.getItem('UserNum'),
                oldSerId:packageId,
                newSerId:'',
                type:'1'
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success == true){
                    nowSer = ajaxData.data.oldSetSet.id;
                    packageName = ajaxData.data.oldSetSet.name;
                    $('#userName').text(localStorage.getItem('UserNum'));
                    $('#taocan').text(ajaxData.data.oldSetSet.name);
                    $('#bizozhun').text(ajaxData.data.oldSetSet.amount+'元/周期');
                    var timestamp = Date.parse(new Date());
                    //alert(timestamp +'===='+ajaxData.data.oldSetSet.expireTime);
                    if(timestamp > ajaxData.data.oldSetSet.expireTime || ajaxData.data.oldSetSet.expireTime == '' || ajaxData.data.oldSetSet.expireTime == null){
                        $('#end_time').text('暂未生效');
                    }else{
                        $('#end_time').text(formatDateTime1(ajaxData.data.oldSetSet.expireTime/1000));
                    }
                    if(ajaxData.data.isPrepare == true){
                        $('#yesTips').removeClass('display-none');
                        $('#noTips').addClass('display-none');
                        $('#taocanChange').text(ajaxData.data.prepareSetSet.name);
                        $('#bizozhunChange').text(ajaxData.data.prepareSetSet.amount+'元/周期');
                        $('#change_time').text(formatDateTime1(ajaxData.data.prepareSetSet.changeDate/1000));
                        $('#shengxiao_time').text(formatDateTime1(ajaxData.data.prepareSetSet.effectiveDate/1000));
                    }else{
                        $('#yesYuyue').addClass('display-none');
                    }
                    kuandai();
                }else{
                    mui.toast(ajaxData.meta.message);
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常,请稍后再试');
            }
        });
    }
    //根据不同学校显示不同的咨询地址
    var adress= localStorage.getItem('siteFcode');
    if(adress == '823ef78c7ed94e905156905798cbd175'){
        //长沙师范
        $('.schoolAdress').text('北校区阳光服务大厅；南校区南校门原招生就业处。');
    }else if(adress == 'fb9d10335b551d5a76d36df2bc961951'){
        //湘中幼师
        $('.schoolAdress').text('学生宿舍楼2栋101门面。');
    }else if(adress == '855198a37cac80fb60e76174cb254f2a'){
        //航空
        $('.schoolAdress').text('圭塘在女生宿舍旁，跳马在士官楼一楼。');
    }else if(adress == '58e8599b9d19d34e386c899fbc4508bc'){
        //大众传媒
        $('.schoolAdress').text('金岸学生公寓食堂进口右侧；后勤楼女生公寓A栋右侧。');
    }else if(adress == '7d106cd0235bd777138e75e07e1ab593'){
        //生物机电
        $('.schoolAdress').text('马坡校区:二教学楼一楼西侧智慧校园一卡通服务中心、东湖校区:6栋学生宿舍楼下智慧校园一卡通服务中心');
    }else if(adress == 'e26206d28b34d13effba5e0e05940338'){
        //中南林
        $('.schoolAdress').text('营业点地址是一食堂对面，林旺超市里面校园网服务中心。客服电话18075196557、18773178505、0731-89925707');
    }else{
        //其它学校
        $('.schoolAdress').text('待完善中。');
    }
    var clickId;
    //点击套餐选项
    mui(".mui-content").on('tap','.buy',function(){
        //若果是当前的可选套餐和不可选套餐
        var click = $(this);
        clickId = $(this).data('id');
        //alert(clickId);
        //alert(click.hasClass('orangeborder'));
        $('.buy').removeClass('bacddd');
        click.addClass('bacddd');
        if(click.hasClass('orangeborder')){
            mui.alert('更换套餐不能与当前套餐一致','温馨提示','知道了',null,'div');
            clickId = '';
        }
        /*if(click.hasClass('orangeborder')){
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
        }*/
    });
    //点击下一步
    mui("body").on('tap','#next',function(){
        //e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
        if(clickId == '' || clickId == undefined){
            mui.alert('请选择需要更换的宽带套餐','温馨提示','知道了',null,'div');
        }else{
            if(localStorage.getItem('siteType') == 1){
                mui.ajax(config.httpPath+'api/Broadband/changeSerSet', {
                    data: {
                        id:localStorage.getItem('id'),
                        siteFcode:localStorage.getItem('siteFcode'),
                        userId:localStorage.getItem('UserNum'),
                        passWord: '',
                        newSerId:clickId
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 10000, //超时时间设置为10秒；
                    beforeSend: function(request) {
                        request.setRequestHeader("X-Token",localStorage.getItem('token'));
                    },
                    success: function(ajaxData) {
                        //服务器返回响应,根据响应结果,分析是否成功；
                        //alert(JSON.stringify(ajaxData));
                        if(ajaxData.meta.success == true){
                            var amount,name,userId,activeDate,resultCode,accountFee,taocanAmount;
                            resultCode = ajaxData.meta.resultCode;
                            name = ajaxData.data.name;
                            amount = ajaxData.data.amount;
                            userId = ajaxData.data.userId;
                            activeDate = ajaxData.data.activeDate;
                            accountFee = ajaxData.data.accountFee;
                            taocanAmount = ajaxData.data.serSetAmount;
                            var foreignId = ajaxData.data.foreignId;
                            /*mui.openWindow({
                             url:'../success.html?amount='+amount+'&&accountFee='+accountFee+'&&taocanAmount='+taocanAmount+'&&name='+name+'&&userId='+userId+'&&activeDate='+activeDate+'&&resultCode='+resultCode,
                             id:'success',
                             extras:{}
                             });*/
                            //直接支付
                            //var amount = $('#buyPrice').text();
                            var wxChannel = null; // 微信支付
                            var aliChannel = null; // 支付宝支付
                            var channel = null;   //支付通道
                            var orderId;
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
                                                    orderId:orderId,
                                                    foreignId: foreignId,
                                                    foreignType:'1'
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
                                                },
                                                error: function(xhr, type, errorThrown) {
                                                    //异常处理；
                                                    console.log(type);
                                                    mui.toast('网络异常，请稍后再试');
                                                }
                                            });
                                        }else{
                                            startWXPAY();
                                        }
                                    }else{
                                        //mui.toast(ajaxData.meta.message);
                                        mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
                                    }
                                },
                                error: function(xhr, type, errorThrown) {
                                    //异常处理；
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
                                            //console.log("获取支付通道失败!");
                                        });
                                    }else{
                                        mui.toast('需手机APP才能支付');
                                        /*document.addEventListener( "plusready", plusReady, false );
                                         plusReady();*/
                                    }
                                }
                                //发起微信支付请求的方法
                                function pay() {
                                    //获取微信支付参数的url
                                    //alert(amount+'--'+userId+'--'+localStorage.getItem('id')+'--'+siteFcode+'--'+orderId+"----"+client);
                                    mui.ajax(config.httpPath+'api/Broadband/toPay', {
                                        data: {
                                            amount:amount,
                                            userId:userId,
                                            id:localStorage.getItem('id'),
                                            siteCode:localStorage.getItem('siteFcode'),
                                            orderId:orderId,
                                            foreignId: foreignId,
                                            foreignType:'1'
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
                                        //alert(JSON.stringify(resObj));
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
                                        }
                                    }
                                    //获取微信支付参数失败的回调函数
                                    function ajax_error_callback(e) {
                                        plus.ui.alert("ajax获取参数失败");
                                    }
                                    //微信支付成功回调
                                    function wxpay_success(result) {
                                        var timestamp=new Date().getTime();
//            window.location.href = location.origin+"/order/payFinish/"+${order.id}+"?timestamp="+timestamp;
//                                        window.location.href = location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId;
                                        mui.openWindow({
                                            url:location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId,
                                            id:'payList.html',
                                            extras:{}
                                        });
                                    }
                                    //微信支付失败回调
                                    function wxpay_error(error) {
                                        plus.ui.alert("支付失败!");
                                    }
                                }
                            }
                            return false;
                        }else{
                            //mui.toast(ajaxData.meta.message);
                            mui.alert(ajaxData.meta.message,'温馨提示','知道了',null,'div');
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                        mui.toast('网络异常,请稍后再试');
                    }
                });
            }else {
                var btnArray = ['取消', '确定'];
                mui.prompt('请输入您的宽带登录密码：<br/><br/>1、密码默认为身份证后六位（X小写），错误请前往营业厅找回。', '', '<span class="iconfont icon-gth maincolor font22"></span>', btnArray, function(e) {
                    if (e.index == 1) {
                        //alert(e.value);
                        //var pass = e.value;
                        if(e.value != '' && e.value != undefined){
                            mui.ajax(config.httpPath+'api/Broadband/changeSerSet', {
                                data: {
                                    id:localStorage.getItem('id'),
                                    siteFcode:localStorage.getItem('siteFcode'),
                                    userId:localStorage.getItem('UserNum'),
                                    passWord: e.value,
                                    newSerId:clickId
                                },
                                dataType: 'json', //服务器返回json格式数据
                                type: 'post', //HTTP请求类型
                                timeout: 10000, //超时时间设置为10秒；
                                beforeSend: function(request) {
                                    request.setRequestHeader("X-Token",localStorage.getItem('token'));
                                },
                                success: function(ajaxData) {
                                    //服务器返回响应,根据响应结果,分析是否成功；
                                    //alert(JSON.stringify(ajaxData));
                                    if(ajaxData.meta.success == true){
                                        var amount,name,userId,activeDate,resultCode,accountFee,taocanAmount;
                                        resultCode = ajaxData.meta.resultCode;
                                        name = ajaxData.data.name;
                                        amount = ajaxData.data.amount;
                                        userId = ajaxData.data.userId;
                                        activeDate = ajaxData.data.activeDate;
                                        accountFee = ajaxData.data.accountFee;
                                        taocanAmount = ajaxData.data.serSetAmount;
                                        mui.openWindow({
                                            url:'../success.html?amount='+amount+'&&accountFee='+accountFee+'&&taocanAmount='+taocanAmount+'&&name='+name+'&&userId='+userId+'&&activeDate='+activeDate+'&&resultCode='+resultCode,
                                            id:'success'+"?time="+new Date().getTime(),
                                            extras:{}
                                        });
                                    }else{
                                        //mui.toast(ajaxData.meta.message);
                                        //mui.alert('宽带登录密码错误','温馨提示','知道了',null,'div');
                                        mui.alert(ajaxData.meta.message,'温馨提示','知道了',null,'div');
                                    }
                                },
                                error: function(xhr, type, errorThrown) {
                                    //异常处理；
                                    console.log(type);
                                    mui.toast('网络异常,请稍后再试');
                                }
                            });
                        }else{
                            mui.alert('请输入您的宽带登录密码在尝试提交','提示','知道了',null,'div');
                        }
                    } else {}
                },'div');
            }
        }
    });
}(mui, document));