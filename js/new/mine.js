/**
 * Created by Administrator on 2018/1/31.
 */
(function(mui, doc) {
    mui.init();
    var phone,password,securityCode;
    mui.plusReady(function() {});
    //查询个人信息
    personInfo();
    function personInfo(){
        mui.ajax(config.httpPath+'api/sysUser/123456', {
            data: {
                id:localStorage.getItem('id')
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                //alert(ajaxData.data.jobLevel);
                if(ajaxData.meta.success == true){
                    //localStorage.setItem("realName",ajaxData.data.realname);
                    localStorage.setItem("IdCard",ajaxData.data.certificateNo);

                    $('#mobileno').text(ajaxData.data.mobileno);
                    if(ajaxData.data.workNumber == undefined){
                        $('#classId').text('');
                    }else{
                        $('#classId').text(ajaxData.data.workNumber);
                    }
                    $('#name').text(ajaxData.data.realname);
                    /*院系*/
                    //alert(ajaxData.data.realname );
                    if(ajaxData.data.deptName == undefined){
                        $('#yuanxi').text('');
                    }else{
                        $('#yuanxi').text(ajaxData.data.deptName);
                    }
                    //$('#yuanxi').text(ajaxData.data.deptName);
                    /*班级*/
                    if(ajaxData.data.classname == undefined){
                        $('#class').text('');
                    }else{
                        $('#class').text(ajaxData.data.classname);
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
    //点击账号与安全
    mui(".mui-content").on('tap','#safeSeting',function(){
        //点击响应逻辑
        mui.openWindow({
            url:'../html-personalCenter/safeSeting.html',
            id:'safeSeting',
            extras:{}
        });
    });
    //点击版本号
    mui(".mui-content").on('tap','#banben',function(){
        //点击响应逻辑
        mui.openWindow({
            //url:'http://wxpay.wxutil.com/mch/pay/h5.v2.php?time='+new Date().getTime(),
            url:'../zhifu.html?time='+new Date().getTime(),
            id:'haha',
            extras:{}
        });
    });
    /*//点击用户名修改名字
    mui(".mui-content").on('tap','#username',function(){
        //点击响应逻辑
        mui.openWindow({
            url:'../html-personalCenter/setUsername.html',
            id:'setUsername',
            extras:{}
        });
    });*/
    //点击修改手机号码
    mui(".mui-content").on('tap','#setPhone',function(){
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
            //点击响应逻辑
            mui.openWindow({
                url:'../html-personalCenter/resetPhoneNumber.html',
                id:'resetPhoneNumber',
                extras:{}
            });
        }
    });
    //点击安全退出
    mui(".mui-content").on('tap','#logout',function(){
        //closeApp();
        function closeApp() {
            plus.nativeUI.actionSheet({
                cancel: "取消",
                buttons: [{
                    title: "注销当前账号"
                }, {
                    title: "直接关闭应用"
                }]
            }, function(e) {
                var index = e.index;
                switch (index) { //case 0: 取消
                    case 1: //
                        localStorage.clear();
                        plus.runtime.restart();
                        break;
                    case 2: //
                        plus.runtime.quit();
                        break;
                }
            });
        };

        var btn = ["取消","确定"];
        mui.confirm('确定退出此账号？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                //先解绑在退出
                mui.ajax(config.httpPath+'api/unBindAlias', {
                    data: {
                        id:localStorage.getItem('id'),
                        cid:localStorage.getItem('clientid')
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
                            mui.toast(ajaxData.meta.message);
                            out();
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
                //alert(config.httpPath+'api/logout');
                //退出操作
                function out(){
                    mui.ajax(config.httpPath+'api/logout', {
                        data: {
                            id:localStorage.getItem('id'),
                            token:localStorage.getItem('token')
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
                            if(ajaxData.meta.success === true){
                                localStorage.removeItem("userName");
                                localStorage.removeItem("passWord");
                                localStorage.removeItem("token");
                                localStorage.removeItem("mobileno");
                                localStorage.removeItem("realname");
                                localStorage.removeItem("fcode");
                                localStorage.removeItem("id");
                                localStorage.removeItem("loadFlag");
                                window.localStorage.removeItem("US_NAME");
                                window.localStorage.removeItem("US_PWD");
                                window.localStorage.setItem("autologin", "false");

                                localStorage.clear();
                                //微信跳转登录页APP重新开始
                                if(mui.os.wechat){
                                    mui.openWindow({
                                        url:'../welcome.html',
                                        id:'welcome',
                                        extras:{}
                                    });
                                }else if(mui.os.android){
                                    //alert(plus);
                                    plus.runtime.restart();
                                }else{
                                    mui.openWindow({
                                        url:'../welcome.html',
                                        id:'welcome',
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
                            //alert(type+'====='+errorThrown);
                            mui.toast('网络异常，请稍后再试');
                        }
                    });
                }
            }
        },'div');
    });
    // 咨询与留言
    mui('.mui-content').on('tap','#bindFeedback',function(){
        mui.openWindow({
            url:'../html-personalCenter/leave.html',
            id:'leave',
            extras:{}
        });
    })

}(mui, document));