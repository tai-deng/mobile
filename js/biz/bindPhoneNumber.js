/**
 * Created by Administrator on 2017/8/2.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function(){});
    //获取验证码
    mui(".mui-content").on('tap','#getcode',function(){
        if($('#getcode').hasClass('horbackground')){
            var phoneNumber = $('#phoneNumber').val();
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(phoneNumber == ''){
                //mui.alert("手机号码不能为空");
                mui.alert('请输入手机号码，用于接收短信验证码','提示','确定',null,'div');
            }else if(phoneNumber.length !=11){
                //mui.alert("手机号码错误");
                mui.alert('请输入正确的手机号码','提示','确定',null,'div');
            }else if(!myreg.test(phoneNumber)){
                //mui.alert("手机号码错误");
                mui.alert('请输入正确的手机号码','提示','确定',null,'div');
            }else {
                //进行倒计时并改变按钮颜色
                var countdown=60;
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
                    setTimeout(function() {
                        settime(obj)
                    },1000);
                }
                mui.ajax(config.httpPath+'api/sendVerificationCode', {
                    data: {
                        id:localStorage.getItem('id'),
                        phoneNum:phoneNumber,
                        type:'1',
                        activeTime:'120'
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
                        if(ajaxData.meta.success === true){
                            mui.toast(ajaxData.meta.message);
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
        }
    });
    //确定修改
    mui(".mui-content").on('tap','#submit',function(){
        var btn = ["取消","确定"];
        mui.confirm('确认修改？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                var phoneNumber = $('#phoneNumber').val();
                var verificationCode = $('#code').val();
                if(phoneNumber == '' || verificationCode == ''){
                    mui.alert('手机号码、验证码都不能为空','提示','确定',null,'div');
                }else if(phoneNumber.length !=11){
                    mui.alert('请输入正确的手机号码','提示','确定',null,'div');
                }else if(!myreg.test(phoneNumber)){
                    mui.alert('请输入正确的手机号码','提示','确定',null,'div');
                }else {
                    mui.ajax(config.httpPath+'api/sysUser/setMobileno', {
                        data: {
                            id:localStorage.getItem('id'),
                            mobileno:phoneNumber,
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
                                localStorage.setItem('mobileno',phoneNumber);
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
                }
            }
        },'div');
    });
}(mui, document));
