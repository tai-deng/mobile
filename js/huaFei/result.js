
(function(mui, doc){
    mui.init({});
    var orderId;
    orderId = new Uri(location.href).getQueryParamValue('orderId');
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
                    url:'../new/tabbarNew.html'+"?time="+new Date().getTime(),
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
            url:'../new/tabbarNew.html'+"?time="+new Date().getTime(),
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

    //$('.sxTime').text(formatDateTime1(activeDate/1000));
    //点击返回首页
    mui(".mui-content").on('tap','#back',function(){
        mui.openWindow({
            url:'../new/tabbarNew.html',
            id:'tabbarNew'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    });
    detail();
    function detail(){
        mui.ajax(config.httpPath+'api/phoneRecharge/queryOrder', {
            data: {
                orderId:orderId
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
                    $('#result').text(ajaxData.data.fundType);
                    $('#phoneNum').text(ajaxData.data.phoneNum);
                    $('#moneyNum').text(ajaxData.data.amount+"元");
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
}(mui, document));