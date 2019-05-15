/**
 * Created by Administrator on 2017/7/14.
 */
(function(mui, doc) {
    mui.init();
    //mui.plusReady(function() {});
    mui.plusReady(function() {
        //返回上级页面刷新
        var self=plus.webview.currentWebview();
        var opener = self.opener();
        //alert(opener.id);
//              console.log(JSON.stringify(self));
        var old_back = mui.back;
        mui.back = function() {
            var wobj = plus.webview.getWebviewById(opener.id);
            wobj.reload(true);
            old_back();
        };
        plus.oauth.getServices(function(services) {
            auths = services;
        }, function(e) {
            //alert("获取登录服务列表失败：" + e.message + " - " + e.code);
            mui.alert("获取登录服务列表失败：" + e.message + " - " + e.code,'提示','确定',null,'div');
        });
    });
    $('#name').text(localStorage.getItem('realName'));
    if(!localStorage.getItem('IdCard') || localStorage.getItem('IdCard') == 'null' || localStorage.getItem('IdCard') == 'undefined'){
        $('#idNumber').text('未绑定身份证');
    }else{
        var reg1 = /^(\d{4})(\d{10})(\d{4})$/;
        var cardreg = localStorage.getItem('IdCard');
        cardreg = cardreg.replace(reg1,'$1**** ****$3');
        $('#idNumber').text(cardreg);
    }
    var tel = localStorage.getItem('mobileno');
    if(!tel || tel == 'null' || tel == 'undefined'){
        $('#mobileNum').text('未绑定手机号码');
    }else{
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        tel = tel.replace(reg, "$1****$2");
        $('#mobileNum').text(tel);
    }
    var qqtext,weixintext,weibotext;
    if(localStorage.getItem('qq') === 'true' ){
        //alert(localStorage.getItem('qq'));
        qqtext = '已绑定';
    }else{
        qqtext = '未绑定';
    }
    if(localStorage.getItem('weixin') === 'true' ){
        weixintext = '已绑定';
    }else{
        weixintext = '未绑定';
    }
    if(localStorage.getItem('weibo') === 'true' ){
        weibotext = '已绑定';
    }else{
        weibotext = '未绑定';
    }
    $('#qqtext').text(qqtext);
    $('#weixintext').text(weixintext);
    $('#weibotext').text(weibotext);

    //点击身份证号码
    document.getElementById("IDCard").addEventListener('tap',function(){
        //点击响应逻辑
        if($('#idNumber').text() == '未绑定身份证'){
            mui.openWindow({
                url:'bindIDCard.html',
                id:'bindIDCard',
                extras:{
                }
            });
        }
    });
    //点击手机号
    document.getElementById("mobilephone").addEventListener('tap',function(){
        //点击响应逻辑
        if($('#mobileNum').text() != '未绑定手机号码' ){
            if(localStorage.getItem('IdCard') == '' || localStorage.getItem('IdCard') == 'null'){
                //mui.alert('您当前未绑定有效证件，请先绑定验证身份，认证成功即可修改手机号码','提示','确定',null,'div');
                var btn = ["返回","确定"];
                mui.confirm('请先绑定身份证号即可修改','温馨提示',btn,function(e) {
                    if (e.index == 1) {
                        mui.openWindow({
                            url:'../html-personalCenter/bindIDCard.html',
                            id:'bindIDCard',
                            extras:{
                            }
                        });
                    }
                },'div');
            }else{
                mui.openWindow({
                    url:'resetPhoneNumber.html',
                    id:'resetPhoneNumber',
                    extras:{
                    }
                });
            }
        }else {
            mui.openWindow({
                url:'bindPhoneNumber.html',
                id:'bindPhoneNumber',
                extras:{
                }
            });
        }

    });
    //点击QQ号
    document.getElementById("QQ").addEventListener('tap',function(){
        //点击响应逻辑
        if(localStorage.getItem('qq') == 'true'){
            //解绑
            var btn = ["取消","确定"];
            mui.confirm('确认取消绑定？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    jiebang('qq');
                }
            });
        }else{
            //绑定
            authLogout();
            authLogin('qq','bind');
        }
    });
    //点击微信号
    document.getElementById("weiNumber").addEventListener('tap',function(){
        //点击响应逻辑
        if(localStorage.getItem('weixin') == 'true'){
            //解绑
            var btn = ["取消","确定"];
            mui.confirm('确认取消绑定？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    jiebang('weixin');
                }
            });
        }else{
            //绑定
            authLogout();
            authLogin('weixin','bind');
        }
    });
    //点击weibo
    document.getElementById("weibo").addEventListener('tap',function(){
        //点击响应逻辑
        mui.alert('暂未开通微博绑定','提示','确定',null,'div');
    });
    function jiebang(type){
        mui.ajax(config.httpPath+'api/thirdRemoveBind', {
            data: {
                id:localStorage.getItem('id'),
                type:type
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
                if(ajaxData.meta.success == true){
                    mui.toast(ajaxData.meta.message);
                    localStorage.setItem(type,'false');
                    location.href = 'safeSeting.html';
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
    //点击修改登录密码
    document.getElementById("resetPassword").addEventListener('tap',function(){
        //点击响应逻辑
        mui.openWindow({
            url:'resetPassword.html',
            id:'resetPassword',
            extras:{
            }
        });
    });
}(mui, document));