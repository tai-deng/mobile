/**
 * Created by Administrator on 2017/6/27.
 */
(function(mui, doc) {
    mui.init();
    var account,password;
/*   mui.plusReady(function() {
   });*/
    //weixin端隐藏第三方登录
    if(mui.os.wechat){
        $('#thirdLogin').addClass('display-none');
    }
   mui.plusReady(function() {
        //alert('alert'+plus.push.getClientInfo());
        //alert(123123);
        //获取个推需要的客户端ID
        clientid = plus.push.getClientInfo().clientid;
        //alert(clientid);
        plus.oauth.getServices(function(services) {
            auths = services;
        }, function(e) {
            alert("获取登录服务列表失败：" + e.message + " - " + e.code);
        });
        //plus.webview.currentWebview().setStyle( {statusbar:{background:'#dddddd'},top:0,bottom: 0} );
    });
  /*  document.addEventListener( "plusready", function(){
        alert(456456);
    });*/
    var height = window.screen.height;
    //document.getElementsByTagName('body')[0].style.minHeight = window.innerHeight+'px';
    document.getElementsByTagName('html')[0].style.minHeight = window.innerHeight+'px';
    //检测是否启用自动登录
    if (window.localStorage.getItem("autologin") == "true") {
        //调用登录方法
        account = window.localStorage.getItem("US_NAME");
        password = window.localStorage.getItem("US_PWD");
        load();
    }
    //如果本地有用户名密码直接填入输入框
    var strName = window.localStorage.getItem("US_NAME");
    var strPass = window.localStorage.getItem("US_PWD");
    if(strName){
        if(strPass){
            $('#account').val(strName);
            $('#password').val(strPass);
        }
    }
    mui(".mui-content").on('tap','#login',function(){
        //得到用户输入的信息
        account = $('#account').val();
        password = $('#password').val();
        //alert(account +"-----"+ password);
        if(account != "" && password != ""){
            load();
        }else{
            //mui.alert('用户名或者密码不能为空');
            mui.alert('用户名或者密码不能为空','提示','确定',null,'div');
        }
    });
    //登录接口
    function load(){
        /*account = $('#account').val();
        password = $('#password').val();*/
        mui.ajax(config.httpPath+'api/dologin', {
        //mui.ajax(config.httpPath+'api/Broadband/queryUsermsg', {
            data: {
                userName:encryptByDES(account,keyValue),
                passWord:encryptByDES(password,keyValue)
               /* userName:account,
                passWord:password*/
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success === false){
                    //mui.alert("用户名或者密码错误");
                    mui.alert('用户名或者密码错误','提示','确定',null,'div');
                }else{
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
                    localStorage.setItem("userName",account);
                    localStorage.setItem("passWord",password);
                    localStorage.setItem("token",ajaxData.data.xtoken);
                    /* localStorage.setItem("mobileno",ajaxData.data.mobileno);
                     localStorage.setItem("realname",ajaxData.data.realname,keyValue);
                     localStorage.setItem("fcode",ajaxData.data.fcode,keyValue);
                     localStorage.setItem("id",ajaxData.data.id,keyValue);
                     localStorage.setItem("userType",ajaxData.data.userType);*/
                    localStorage.setItem("token",decryptByDES(ajaxData.data.xtoken,keyValue));
                    localStorage.setItem("mobileno",decryptByDES(ajaxData.data.mobileno,keyValue));
                    localStorage.setItem("realname",decryptByDES(ajaxData.data.realname,keyValue));
                    //console.log(decryptByDES(ajaxData.data.realname,keyValue));
                    localStorage.setItem("fcode",decryptByDES(ajaxData.data.fcode,keyValue));
                    localStorage.setItem("id",decryptByDES(ajaxData.data.id,keyValue));
                    localStorage.setItem("userType",decryptByDES(ajaxData.data.userType,keyValue));
                    localStorage.setItem("juese",ajaxData.data.roles);
                    localStorage.setItem("clientid",clientid);
                    window.localStorage.setItem("autologin","true");
                    window.localStorage.setItem("US_NAME", account);
                    window.localStorage.setItem("US_PWD", password);
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
                                    url:'tabbar.html?time='+new Date().getTime(),
                                    id:'tabbar.html',
                                    extras:{}
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
                    //是否选中记住密码
                    var checked = $('#rememberPassword').is(':checked');
                    var checked = $('#autologin').is(':checked');
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                mui.toast('网络异常',{ duration:'long', type:'div'});
            }
        });
    }
    //忘记密码跳转
    document.getElementById("forgetPassword").addEventListener('tap',function(){
        //点击响应逻辑
        mui.openWindow({
            url:'html-personalCenter/forgetPassword.html',
            id:'forgetPassword',
            extras:{
            }
        });
    });
    mui(".mui-content").on('tap','#QQ',function(){
        loginType = 'qq';
        authLogout();
        authLogin('qq','login');
       /* mui.openWindow({
            url:config.httpPath+'api/QQLogin',
            id:'QQLogin',
            extras:{
            }
        });*/
    });
    mui(".mui-content").on('tap','#weichat',function(){
        loginType = 'weixin';
        authLogout();
        authLogin('weixin','login');
        /* mui.openWindow({
         url:config.httpPath+'api/QQLogin',
         id:'QQLogin',
         extras:{
         }
         });*/
    });

    mui(".mui-content").on('tap','#weibo',function(){
         mui.openWindow({
             //url:config.httpPath+'mobile/login',
             url:'aaaa.html',
             id:'',
             extras:{}
         });
    });
}(mui, document));
