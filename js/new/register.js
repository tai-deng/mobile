
(function(mui, doc) {
    mui.init();
    var phone,account,password,securityCode,passw;
    mui.plusReady(function() {});
    /*var height = window.screen.height;
    document.getElementsByTagName('html')[0].style.minHeight = window.innerHeight+'px';*/
    //密码框失去焦点验证密码
    /*$("#password").keyup(function(){

    });*/
    $("#password").blur(function(){
        passw = $("#password").val();
        if(passw.length >= 6){
            //alert(11);
            //字母加数字的随意顺序组合
            var rule = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
            //字母加数字的组合
            //var rule = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            if(passw != ''){
                //alert(passw.length);
                if(passw.length >= 6){
                    regPassword(passw);
                }else{
                    mui.alert("密码需字母+数字组合，至少6位组成，区分大小写！",'提示','确定',null,'div');
                }
                function regPassword(num){
                    if(!rule.test(num)){
                        mui.alert("密码需字母+数字组合，至少6位组成，区分大小写！",'提示','确定',null,'div');
                        $("#password").val('').focus();
                        passw = '';
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        }
    });
    //用户名框失去焦点验证手机号码
    $("#account").blur(function(){
        //$("#account").css("background-color","#D6D6FF");
        var phoneNum = $("#account").val();
        if(phoneNum != ''){
            phoneExit();
        }
        //验证手机号码是否已经存在
        function phoneExit(){
            mui.ajax(config.httpPath+'api/verificationPhoneNum', {
                data: {
                    phoneNum:phoneNum
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function(ajaxData) {
                    //服务器返回响应，根据响应结果，分析是否成功；
                    //alert(JSON.stringify(ajaxData));
                    if(ajaxData.meta.success == true){
                        //如果input输入框的值发生变化
                        //mui.toast(ajaxData.meta.message);
                        //regPhone(phoneNum);
                        if(regPhone(phoneNum)){
                            //$('#getCode').addClass('horbackground');
                            $('#getCode').addClass('mui-btn-warning');
                            $('#getCode').removeClass('bacddd');
                            $('#getCode').removeClass('whitecolor');
                            $('#getCode').removeClass('grayborder');
                        }
                       /* $('#account').bind('input propertychange', function() {
                            console.log('cishu');
                        });*/

                    }else{
                        //mui.toast(ajaxData.meta.message);
                        mui.alert(ajaxData.meta.message,'提示','确定',null,'div');
                    }
                },
                error: function(xhr, type, errorThrown) {
                    //异常处理；
                    mui.toast('网络异常',{ duration:'long', type:'div'});
                }
            });
        }
    });
    var countdown=120;
    //var obj = $('#getcode');
    function settime(obj) {
        if (countdown == 0) {
            $('#getCode').addClass('mui-btn-warning');
            $('#getCode').removeClass('bacddd');
            $('#getCode').text("获取验证码");
            countdown = 120;
            return;
        } else {
            $('#getCode').removeClass('mui-btn-warning font14');
            $('#getCode').addClass('bacddd font12');
            $('#getCode').text("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
            settime(obj)
        },1000)
    }
    //点击获取验证码
    mui(".mui-content").on('tap','#getCode',function(){
        if($('#getCode').hasClass('mui-btn-warning')){
            account = $('#account').val();
            password = $('#password').val();
            //alert(account+'===='+password);
            if(account != "" && password != "" && password.length >= 6){
                //字母加数字的组合
                //var rule = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                //字母跟数字随意顺序组合
                var rule = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
                regPassword(password);
                function regPassword(num){
                    if(!rule.test(num)){
                        mui.alert("密码需字母+数字组合，至少6位组成，区分大小写！",'提示','确定',null,'div');
                        $("#password").val('').focus();
                        passw = '';
                        return false;
                    }else{
                        //进行倒计时并改变按钮颜色
                        settime('#getCode');
                        mui.ajax(config.httpPath+'api/sendVerificationCode', {
                            data: {
                                phoneNum:account,
                                type:2,
                                id:'',
                                activeTime:'120'
                            },
                            dataType: 'json', //服务器返回json格式数据
                            type: 'post', //HTTP请求类型
                            timeout: 10000, //超时时间设置为10秒；
                            success: function(ajaxData) {
                                //服务器返回响应，根据响应结果，分析是否成功；
                                //alert(JSON.stringify(ajaxData));
                                if(ajaxData.meta.success == true){
                                    mui.toast(ajaxData.meta.message);
                                }else{
                                    mui.toast(ajaxData.meta.message);
                                }
                            },
                            error: function(xhr, type, errorThrown) {
                                //异常处理；
                                mui.toast('网络异常',{ duration:'long', type:'div'});
                            }
                        });
                    }
                }
            }else{
                mui.alert('手机号、密码不能为空或者密码长度不能小于6位','提示','确定',null,'div');
            }
        }

    });
    var clickAble = null;
    mui(".mui-content").on('tap','#register',function(){
        //得到用户输入的信息
        account = $('#account').val();
        password = $('#password').val();
        securityCode = $('#password1').val();
        //alert(account +"-----"+ password +"-----"+ securityCode);
        if(account != "" && password != "" && securityCode != ""){
            var rule = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,}$/;
            if(!rule.test(password)){
                mui.alert('密码需字母+数字组合，至少6位组成，区分大小写！','提示','确定',null,'div');
            }else{
                if(!clickAble) {
                    //按一次
                    clickAble = new Date().getTime();
                    setTimeout(function(){clickAble = null}, 3000);
                    register();
                } else {
                    //重复按了几次
                    mui.toast('请求正在发送中，请勿重复点击');
                    return (new Date().getTime() - clickAble) < 3000;
                }

                //注册接口
                function register(){
                    mui.ajax(config.httpPath+'api/register', {
                        data: {
                            phoneNum:account,
                            password:password,
                            type:'2',
                            verificationCode:securityCode
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        success: function(ajaxData) {
                            //服务器返回响应，根据响应结果，分析是否成功；
                            //alert(JSON.stringify(ajaxData));
                            if(ajaxData.meta.success === false){
                                mui.alert(ajaxData.meta.message,'提示','确定',null,'div');
                            }else{
                                mui.alert('恭喜！注册成功','提示','马上登录',function(){
                                    mui.openWindow({
                                        url:'../welcome.html',
                                        id:'welcome',
                                        extras:{}
                                    });
                                },'div');
                            }
                        },
                        error: function(xhr, type, errorThrown) {
                            //异常处理；
                            mui.toast('网络异常',{ duration:'long', type:'div'});
                        }
                    });
                }
            }
        }else{
            mui.alert('手机号、密码或者验证码不能为空','提示','确定',null,'div');
        }
    });
    //点击立即登录跳转
    document.getElementById("loadNow").addEventListener('tap',function(){
        //点击响应逻辑
        mui.openWindow({
            url:'../welcome.html',
            id:'welcome',
            extras:{}
        });
    });

}(mui, document));
