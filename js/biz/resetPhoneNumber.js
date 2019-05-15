/**
 * Created by Administrator on 2017/8/2.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function(){});
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    var tel = localStorage.getItem('mobileno');
    var tel1 = tel.replace(reg, "$1****$2");
    $("#phoneNum").text(tel1);
    //alert(localStorage.getItem('IdCard'));
    //如果用户没有绑定身份证号码提示需要先绑定
    if(localStorage.getItem('IdCard') == '' || localStorage.getItem('IdCard') == 'null'){
        //mui.alert('您当前未绑定有效证件，请先绑定验证身份，认证成功即可修改手机号码','提示','确定',null,'div');
        var btn = ["返回","确定"];
        mui.confirm('请先绑定身份证号即可修改','温馨提示',btn,function(e) {
            if (e.index == 1) {
                mui.openWindow({
                    url:'bindIDCard.html',
                    id:'bindIDCard',
                    extras:{
                    }
                });
            }
        },'div');
    }
    $("input:not(:last)").blur(function () {
        var value = $(this).val();
        //alert(regPhone(value) == true);
        if(regPhone(value) == true) {

        }else{
            $(this).val(this.defaultValue);
        }
    });
    $("input:last").keyup(function(){
        var value = $(this).val();
        if(value !== ''){
            $('#submit').addClass('horbackground');
            $('#submit').removeClass('bacddd');
        }else{
            $('#submit').removeClass('horbackground');
            $('#submit').addClass('bacddd');
        }
    });
    $("input:last").keyup(function(){
        var value = $(this).val();
        if(value !== ''){
            $('#jiaoyan').addClass('horbackground');
            $('#jiaoyan').removeClass('bacddd');
        }else{
            $('#jiaoyan').removeClass('horbackground');
            $('#jiaoyan').addClass('bacddd');
        }
    });
    //获取验证码
    mui(".mui-content").on('tap','#getcode',function(){
        if(localStorage.getItem('IdCard') == '' || localStorage.getItem('IdCard') == 'null'){
            //mui.alert('您当前未绑定有效证件，请先绑定验证身份，认证成功即可修改手机号码', '提示','确定', function() {},'div');
            var btn = ["返回","确定"];
            mui.confirm('请先绑定身份证号即可修改','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    mui.openWindow({
                        url:'bindIDCard.html',
                        id:'bindIDCard',
                        extras:{}
                    });
                }
            },'div');
        }else {
            if ($('#getcode').hasClass('horbackground')) {
                //var oldPhonenum = $('#oldPhonenum').val();
                //if (tel != '') {/**/
                //alert(tel);
                    mui.ajax(config.httpPath + 'api/sendVerificationCode', {
                        data: {
                            id: localStorage.getItem('id'),
                            phoneNum: tel,
                            type:'0',
                            activeTime:'120'
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        beforeSend: function (request) {
                            request.setRequestHeader("X-Token", localStorage.getItem('token'));
                        },
                        success: function (ajaxData) {
                            //服务器返回响应，根据响应结果，分析是否成功；
                            //alert(JSON.stringify(ajaxData));
                            if (ajaxData.meta.success == true) {
                                mui.toast(ajaxData.meta.message);
                                //进行倒计时并改变按钮颜色
                                var countdown = 60;
                                //var obj = $('#getcode');
                                settime('#getcode');
                                function settime(obj) {
                                    if (countdown == 0) {
                                        $('#getcode').addClass('horbackground');
                                        $('#getcode').removeClass('bacddd');
                                        $('#getcode').text("获取验证码");
                                        countdown = 60;
                                        return;
                                    } else {
                                        $('#getcode').removeClass('horbackground');
                                        $('#getcode').addClass('bacddd');
                                        $('#getcode').text("重新发送(" + countdown + ")");
                                        countdown--;
                                    }
                                    setTimeout(function () {
                                        settime(obj)
                                    }, 1000)
                                }
                            } else {
                                //mui.toast(ajaxData.meta.message);
                                mui.alert(ajaxData.meta.message, '提示', '确定', null, 'div');
                            }
                        },
                        error: function (xhr, type, errorThrown) {
                            //异常处理；
                            console.log(type);
                            mui.toast('网络异常，请稍后再试');
                        }
                    });
                /*} else {
                    //mui.alert('请输入原手机号码，用于接收短信验证码');
                    mui.alert('请输入原手机号码，用于接收短信验证码', '提示', '确定', null, 'div');
                }*/
            }
        }
    });
    mui(".mui-content").on('tap','#getcode1',function(){
        if(localStorage.getItem('IdCard') === '' || localStorage.getItem('IdCard') == 'null'){
            //mui.alert('您当前未绑定有效证件，请先绑定验证身份，认证成功即可修改手机号码', '提示','确定', function() {},'div');
            var btn = ["返回","确定"];
            mui.confirm('请先绑定身份证号即可修改','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    mui.openWindow({
                        url:'bindIDCard.html',
                        id:'bindIDCard',
                        extras:{
                        }
                    });
                }
            },'div');
        }else {
            if ($('#getcode1').hasClass('horbackground')) {
                var newPhonenum = $('#newPhonenum').val();
                if (newPhonenum != '') {
                    //进行倒计时并改变按钮颜色
                    var countdown = 60;
                    //var obj = $('#getcode');
                    settime('#getcode1');
                    function settime(obj) {
                        if (countdown == 0) {
                            $('#getcode1').addClass('horbackground');
                            $('#getcode1').removeClass('bacddd');
                            $('#getcode1').text("获取验证码");
                            countdown = 60;
                            return;
                        } else {
                            $('#getcode1').removeClass('horbackground');
                            $('#getcode1').addClass('bacddd');
                            $('#getcode1').text("重新发送(" + countdown + ")");
                            countdown--;
                        }
                        setTimeout(function () {
                            settime(obj)
                        }, 1000)
                    }
                    mui.ajax(config.httpPath + 'api/sendVerificationCode', {
                        data: {
                            id: localStorage.getItem('id'),
                            phoneNum: newPhonenum,
                            type:'1',
                            activeTime:'120'
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        beforeSend: function (request) {
                            request.setRequestHeader("X-Token", localStorage.getItem('token'));
                        },
                        success: function (ajaxData) {
                            //服务器返回响应，根据响应结果，分析是否成功；
                            //alert(JSON.stringify(ajaxData));
                            if (ajaxData.meta.success == true) {
                                mui.toast(ajaxData.meta.message);
                            } else {
                                //mui.toast(ajaxData.meta.message);
                                mui.alert(ajaxData.meta.message, '提示', '确定', null, 'div');
                            }
                        },
                        error: function (xhr, type, errorThrown) {
                            //异常处理；
                            console.log(type);
                            mui.toast('网络异常，请稍后再试');
                        }
                    });
                } else {
                    //mui.alert('请输入原手机号码，用于接收短信验证码');
                    mui.alert('请输入新手机号码，用于接收短信验证码', '提示', '确定', null, 'div');
                }
            }
        }
    });
    //点击验证
    mui(".mui-content").on('tap','#jiaoyan',function(){
        $('input').blur();
        if($('#jiaoyan').hasClass('horbackground')){
            if(localStorage.getItem('IdCard') == ''|| localStorage.getItem('IdCard') == 'null'){
                //mui.alert('您当前未绑定有效证件，请先绑定验证身份，认证成功即可修改手机号码','提示','确定',null,'div');
                mui.alert('请先绑定身份证号即可修改', '提示','确定', function() {
                    mui.openWindow({
                        url:'bindIDCard.html',
                        id:'bindIDCard',
                        extras:{
                        }
                    });
                },'div');
            }else{
                var btn = ["取消","确定"];
                mui.confirm('确认提交验证？','温馨提示',btn,function(e) {
                    if (e.index == 1) {
                        //var oldPhonenum = $('#oldPhonenum').val();
                        //var newPhonenum = $('#newPhonenum').val();
                        var verificationCode = $('#code').val();
                        if(verificationCode != ''){
                            mui.ajax(config.httpPath+'api/erification', {
                                data: {
                                    id:localStorage.getItem('id'),
                                    phoneNum:tel,
                                    verificationCode:verificationCode,
                                    type:'0'
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
                                    if(ajaxData.meta.success== true){
                                        mui.toast(ajaxData.meta.message);
                                        //localStorage.setItem('mobileno',newPhonenum);
                                        mui.openWindow({
                                            url:'changePhoneNum.html',
                                            id:'changePhoneNum',
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
                        }else{
                            mui.alert('验证码不能为空','提示','确定',null,'div');
                        }
                    }
                },'div');
            }
        }
    });
    //确定修改
    mui(".mui-content").on('tap','#submit',function(){
        $('input').blur();
        if($('#submit').hasClass('horbackground')){
            if(localStorage.getItem('IdCard') == '' || localStorage.getItem('IdCard') == 'null'){
                //mui.alert('您当前未绑定有效证件，请先绑定验证身份，认证成功即可修改手机号码','提示','确定',null,'div');
                mui.alert('请先绑定身份证号即可修改', '提示','确定', function() {
                    mui.openWindow({
                        url:'bindIDCard.html',
                        id:'bindIDCard',
                        extras:{
                        }
                    });
                },'div');
            }else{
                var btn = ["取消","确定"];
                mui.confirm('确认修改？','温馨提示',btn,function(e) {
                    if (e.index == 1) {
                        //var oldPhonenum = $('#oldPhonenum').val();
                        var newPhonenum = $('#newPhonenum').val();
                        var verificationCode = $('#code').val();
                        if( newPhonenum != '' && verificationCode != ''){
                            mui.ajax(config.httpPath+'api/sysUser/setMobileno', {
                                data: {
                                    id:localStorage.getItem('id'),
                                    mobileno:newPhonenum,
                                    verificationCode:verificationCode
                                },
                                dataType: 'json', //服务器返回json格式数据
                                type: 'post', //HTTP请求类型
                                timeout: 10000, //超时时间设置为10秒；
                                beforeSend: function(request) {
                                    request.setRequestHeader("X-Token", localStorage.getItem('token'));
                                },
                                success: function(ajaxData) {
                                    //服务器返回响应，根据响应结果，分析是否成功；
                                    //alert(JSON.stringify(ajaxData));
                                    if(ajaxData.meta.success==true){
                                        //mui.alert(ajaxData.meta.message);
                                        localStorage.setItem('mobileno',newPhonenum);
                                        mui.openWindow({
                                            url:'safeSeting.html',
                                            id:'safeSeting',
                                            extras:{
                                            }
                                        });
                                    }else{
                                        //mui.alert(ajaxData.meta.message);
                                        mui.alert(ajaxData.meta.message,'提示','确定',null,'div');
                                    }
                                },
                                error: function(xhr, type, errorThrown) {
                                    //异常处理；
                                    console.log(type);
                                    mui.toast('网络异常，请稍后再试');
                                }
                            });
                        }else{
                            mui.alert('新手机号码、验证码都不能为空','提示','确定',null,'div');
                        }
                    }
                },'div');
            }
        }
    });
}(mui, document));
