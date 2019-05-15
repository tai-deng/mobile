/**
 * Created by Administrator on 2017/7/12.
 */
//var _51HallProtocol = "http://192.168.10.10:8080";//旷宁的主机IP
// var _51HallProtocol = "http://51hall.natapp1.cc";//测试服务器主机IP
//var _51HallProtocol = "http://42.48.60.68:7800";//测试服务器外网主机IP
var _51HallProtocol = "http://www.51hall.com";//正式服务器
// var _51HallProtocol = "http://192.168.17.10:80";//彪哥的主机IP
//var _51HallProtocol = "http://192.168.10.18:8080/cloud";//陈检的主机IP
//var _51HallProtocol = "http://192.168.34.48:8080";//手提的主机IP
//var _51HallProtocolhu = "http://192.168.10.36:8080/cloud";//胡哥的主机IP

var openALProgress = false;
var debug = false;
var config = {
    httpPath : _51HallProtocol + '/',
    //httpPathHu : _51HallProtocolhu + '/',
    statichttpPath : '',
    cdnFiletime : '?v='+'20170626',
    timeout : '15000',
    pic:'http://qiniu.51hall.com/'
};
//var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
function regPhone(num){
    if(!myreg.test(num)){
        mui.alert("请输入有效的手机号码！",'提示','确定',null,'div');
        return false;
    }else{
        return true;
    }
}
//var nwaiting = plus.nativeUI.showWaiting();
var clientid;
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function (){
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
/*function status(){
    var topoffset = '45px';
    // 兼容immersed状态栏模式
    if(plus.navigator.isImmersedStatusbar()){
        var immersed = 0;
        var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
        // 当前环境为沉浸式状态栏模式
        if(ms&&ms.length>=3){
            immersed = parseFloat(ms[2]);// 获取状态栏的高度
        }
        topoffset = (immersed + 45)+'px';
        /!*调整高度*!/
        document.querySelector(".mui-bar-nav").style.paddingTop = immersed+'px';
        document.querySelector(".mui-bar-nav").style.height = topoffset;
        document.querySelector(".mui-content").style.marginTop = topoffset;
    }
}*/
function formatDateTime(timeStamp) {
    if(timeStamp == '' || timeStamp == 0){
        return '暂未生效';
    }else {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
};
/*function formatDateTime(timeStamp){
    var datetime = new Date();
    datetime.setTime(timeStamp);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}*/
function formatDateTime1(timeStamp) {
    if(timeStamp == '' || timeStamp == 0){
        return '暂未生效';
    }else{
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d;
    }
};
template.helper('formatDateTime',function(timeStamp){
    var date = new Date();
    date.setTime(timeStamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
});
template.helper('formatDateTime1',function(timeStamp){
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d;
});
if(mui.os.wechat){
    $('header').addClass('display-none');
    $('.mui-content').css('margin-top','0px');
}else{
    //iOS下解决页面title与状态栏重叠的问题
    if(mui.os.ios){
        $('header').css('height','55px');
        $('header').addClass('padding-top15px');
        //alert($("body").find("header").length>0);
        if($("body").find("header").length>0){
            $('.mui-content').css('margin-top','55px');
        }
        $('mui-title').css('top','15px');
    }
}
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {
        //下面这行代码会导致底部tabbar消失
        //plus.webview.currentWebview().setStyle( {statusbar:{background:'#dddddd'},top:0,bottom: 0} );
        //监听点击推送事件
        plus.push.addEventListener('click', function(msg) {
            try {
                var payload = JSON.parse(msg.payload);
                /*alert(payload.type);
                alert(payload.pid);*/
                if(payload.type == 'accept'){
                    mui.openWindow({
                        url:'http://'+window.location.host+'/mobile/html-accept/accept1212.html?id='+payload.pid,
                        id:'accept1212',
                        extras:{
                        }
                    });
                }else{
                    mui.openWindow({
                        url:'http://'+window.location.host+'/mobile/html-application/approval1212.html?id='+payload.pid,
                        id:'approval1212',
                        extras:{
                        }
                    });
                }
            } catch(e) {
                mui.alert(e.message,'提示','确定',null,'div');
            }
        });
    });
}(mui, document));


function authLogout() {
    //alert('authLogout');
    //alert(auths);
    for (var i in auths) {
        var s = auths[i];
        if (s.authResult) {
            s.logout(function(e) {
                //console.log("注销登录认证成功！");
            }, function(e) {
                //console.log("注销登录认证失败！");
            });
        }
    }
}
var thirdType = 0;
var loginType = '';
// 登录操作
function authLogin(type , parameter) {
    //alert('authLogin');
    //alert(auths.length);
    var s;
    for (var i = 0; i < auths.length; i++) {
        if (auths[i].id == type) {
            s = auths[i];
            break;
        }
    }
    if (!s.authResult) {
        //alert(JSON.stringify(s));
        s.login(function(e) {
            if( parameter == 'login'){
                //alert('parameter='+parameter);
                mui.ajax(config.httpPath+'api/thirdLogin', {
                    data: {
                        openId: s.authResult.openid,
                        type:type
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 10000, //超时时间设置为10秒；
                    beforeSend: function(request) {
                        //request.setRequestHeader("X-Token",localStorage.getItem('token'));
                    },
                    success: function(ajaxData) {
                        //服务器返回响应，根据响应结果，分析是否成功；
                        //alert(JSON.stringify(ajaxData));
                        if(ajaxData.meta.success === false){
                            //mui.alert("用户名或者密码错误");
                            //mui.alert('暂未绑定该应用','提示','确定',null,'div');
                            var btn = ["取消","确定"];
                            mui.confirm('暂未绑定该应用,是否绑定？','温馨提示',btn,function(e){
                                if(e.index==1){
                                    mui.openWindow({
                                        url:'thirdLoading.html?type='+type,
                                        id:'thirdLoading',
                                        extras:{}
                                    });
                                }
                            },'div');
                        }else{
                            localStorage.setItem("userName",ajaxData.data.username);
                            //localStorage.setItem("passWord",ajaxData.data.password);
                            localStorage.setItem("token",ajaxData.data.xtoken);
                            localStorage.setItem("mobileno",ajaxData.data.mobileno);
                            localStorage.setItem("realname",ajaxData.data.realname);
                            localStorage.setItem("fcode",ajaxData.data.fcode);
                            var qq,weixin,weibo;
                            if(ajaxData.data.qqOpenID == null){
                                qq = 'false';
                            }else{
                                qq = 'true';
                            }
                            if(ajaxData.data.weChatOpenID == null){
                                weixin = 'false';
                            }else{
                                weixin = 'true';
                            }
                            if(ajaxData.data.blogOpenID == null){
                                weibo = 'false';
                            }else{
                                weibo = 'true';
                            }
                            localStorage.setItem("qq",qq);
                            localStorage.setItem("weixin",weixin);
                            localStorage.setItem("weibo",weibo);
                            localStorage.setItem("id",ajaxData.data.id);
                            localStorage.setItem("userType",ajaxData.data.userType);
                            localStorage.setItem("clientid",clientid);
                            //alert('clientid='+clientid);
                            window.localStorage.setItem("autologin","false");
                            window.localStorage.setItem("US_NAME", ajaxData.data.username);
                            //window.localStorage.setItem("US_PWD", password);
                            mui.ajax(config.httpPath+'api/bindAlias', {
                                data: {
                                    id:localStorage.getItem('id'),
                                    cid:clientid
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
                                    if(ajaxData.meta.success === true){
                                        //mui.toast(ajaxData.meta.message);
                                        //location.href = 'tabbar.html';
                                        mui.openWindow({
                                            url:'new/tabbarNew.html',
                                            id:'tabbarNew',
                                            extras:{
                                            }
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
                           /* //是否选中记住密码
                            var checked = $('#rememberPassword').is(':checked');
                            var checked = $('#autologin').is(':checked');*/
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                        mui.toast('网络异常，请稍后再试');
                    }
                });
            }else{
                mui.ajax(config.httpPath+'api/thirdBind', {
                    data: {
                        id:localStorage.getItem('id'),
                        openId: s.authResult.openid,
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
                            //修改第三方的缓存状态
                            localStorage.setItem(type,'true');
                            //根据thirdType判断跳转不同页面
                            if(thirdType == 0){
                                //location.href = 'safeSeting.html';
                                mui.openWindow({
                                    url:'safeSeting.html',
                                    id:'safeSeting',
                                    extras:{}
                                });
                            }else{
                                //location.href = 'tabbar.html';
                                mui.openWindow({
                                    url:'new/tabbarNew.html',
                                    id:'tabbarNew',
                                    extras:{}
                                });
                            }
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
            //alert(JSON.stringify(s));
            authUserInfo(type);
        }, function(e) {
            mui.toast("登录认证失败！");
            //alert(e.message+ e.code);
        });
    } else {
        mui.toast("已经登录认证！");
    }
}
// 微信登录认证信息
function authUserInfo(type) {
    var s;
    for (var i = 0; i < auths.length; i++) {
        if (auths[i].id == type) {
            s = auths[i];
            break;
        }
    }
    if (!s.authResult) {
        mui.toast("未授权登录！");
    } else {
        s.getUserInfo(function(e) {
            var josnStr = JSON.stringify(s.userInfo);
            var jsonObj = s.userInfo;
            console.log("获取用户信息成功：" + josnStr);
            showData(type,jsonObj);
            authLogout();
        }, function(e) {
            mui.alert("获取用户信息失败：" + e.message + " - " + e.code,'提示','确定',null,'div');
        });
    }
}

//加解密
var keyValue = '1234bx5678zh8765fw4321pt';
//DES加密
function encryptByDES(message, key) {
    if(message == '' || message == null){

    }else{
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
}
//DES  ECB模式解密
function decryptByDES(ciphertext,key) {
    if(ciphertext == '' || ciphertext == null){

    }else{
        //把私钥转换成16进制的字符串
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        //把需要解密的数据从16进制字符串转换成字符byte数组
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        //以utf-8的形式输出解密过后内容
        var result_value = decrypted.toString(CryptoJS.enc.Utf8);
        return result_value;
    }
}
