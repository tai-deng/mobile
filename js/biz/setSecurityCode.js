(function(mui, doc) {
    mui.init();
    mui.plusReady(function(){});
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    var tel = localStorage.getItem('forgetphoneNum');
    tel = tel.replace(reg, "$1****$2");
    $("#phoneNum").text(tel);
    //获取验证码
    mui(".mui-content").on('tap','#getcode',function(){
        if($('#getcode').hasClass('horbackground')){
            var phoneNumber = localStorage.getItem('forgetphoneNum');
            if(phoneNumber != ''){
                //进行倒计时并改变按钮颜色
                var countdown=120;
                //var obj = $('#getcode');
                settime('#getcode');
                function settime(obj) {
                    if (countdown == 0) {
                        $('#getcode').addClass('horbackground');
                        $('#getcode').removeClass('bacddd');
                        $('#getcode').text("获取验证码");
                        countdown = 120;
                        return;
                    } else {
                        $('#getcode').removeClass('horbackground');
                        $('#getcode').addClass('bacddd');
                        $('#getcode').text("重新发送(" + countdown + ")");
                        countdown--;
                    }
                    setTimeout(function() {
                        settime(obj)
                    },1000)
                }
                mui.ajax(config.httpPath+'api/sendVerificationCode', {
                    data: {
                        id:localStorage.getItem('id'),
                        phoneNum:phoneNumber,
                        type:'0',
                        activeTime:'120'
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
                //mui.alert('请输入手机号码，用于接收短信验证码')
                mui.alert('请输入手机号码，用于接收短信验证码','提示','确定',null,'div');
            }
        }
    });

    //验证手机号码获取的验证码
    mui(".mui-content").on('tap','#submit',function(){
        /*var btn = ["取消","确定"];
        mui.confirm('确认修改？','温馨提示',btn,function(e) {
            if (e.index == 1) {*/
                var phoneNumber = localStorage.getItem('forgetphoneNum');
                var verificationCode = $('#Code').val();
                if(phoneNumber != '' && verificationCode!= ''){
                    mui.ajax(config.httpPath+'api/erification', {
                        data: {
                            id:localStorage.getItem('id'),
                            phoneNum:phoneNumber,
                            verificationCode:verificationCode,
                            type:'0'
                         },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post' , //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        //headers:{"X-Token": sessionStorage.getItem('token')},
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Token",localStorage.getItem('token'));
                        },
                        success: function(ajaxData) {
                            //服务器返回响应，根据响应结果，分析是否成功；
                            //alert(JSON.stringify(ajaxData));
                            if(ajaxData.meta.success == true){
                                mui.toast(ajaxData.meta.message);
                                mui.openWindow({
                                    url:'setPassword.html',
                                    id:'setPassword',
                                    extras:{
                                    }
                                });
                            }else{
                                //mui.toast(ajaxData.meta.message);
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
                    //mui.alert('手机号码、验证码都不能为空');
                    mui.alert('手机号码、验证码都不能为空','提示','确定',null,'div');
                }
            /*}
        });*/
    });

}(mui, document));