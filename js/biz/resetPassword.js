/**
 * Created by Administrator on 2017/7/18.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function(){});
    //显示密码
    var oldflag = 0;//0为不可见 1为可见
    mui(".mui-content").on('tap','#oldsee',function(){
        if(oldflag === 0){
            oldflag = 1;
            $('#oldsee').addClass('mui-active');
            $('#oldsee').addClass('icon-xianshi');
            $('#oldsee').removeClass('icon-buxianshi');
            $('#oldpassword').attr('type','text');
        }else{
            oldflag = 0;
            $('#oldsee').removeClass('mui-active');
            $('#oldsee').removeClass('icon-xianshi');
            $('#oldsee').addClass('icon-buxianshi');
            $('#oldpassword').attr('type','password');
        }
    });
    var newflag = 0;//0为不可见 1为可见
    mui(".mui-content").on('tap','#newsee',function(){
        if(newflag === 0){
            newflag = 1;
            $('#newsee').addClass('mui-active');
            $('#newsee').addClass('icon-xianshi');
            $('#newsee').removeClass('icon-buxianshi');
            $('#newpassword').attr('type','text');
        }else{
            newflag = 0;
            $('#newsee').removeClass('mui-active');
            $('#newsee').removeClass('icon-xianshi');
            $('#newsee').addClass('icon-buxianshi');
            $('#newpassword').attr('type','password');
        }
    });
    //判断用户是否已经绑定手机
    if(localStorage.getItem('mobileno') == '' || localStorage.getItem('mobileno') == 'null' || localStorage.getItem('mobileno') == 'undefined'){
        var btn = ["取消","确定"];
        mui.confirm('您当前未绑定手机不能修改密码，是否前往绑定？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                mui.openWindow({
                    url:'bindPhoneNumber.html',
                    id:'bindPhoneNumber',
                    extras:{}
                });
            }
        },'div');
    }
    //点击忘记密码
    document.getElementById("forgetPassword").addEventListener('tap',function(){
        //点击响应逻辑
        var codeNumber = $('#newpassword').val();
        mui.openWindow({
            url:'forgetPassword.html',
            id:'forgetPassword',
            extras:{}
        });
    });
    //确定修改
    mui(".mui-content").on('tap','#submit',function(){
        //判断用户是否已经绑定手机
        if(localStorage.getItem('mobileno') == '' || localStorage.getItem('mobileno') == 'null' || localStorage.getItem('mobileno') == 'undefined'){
            var btn = ["取消","确定"];
            mui.confirm('您当前未绑定手机不能修改密码，是否前往绑定？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    mui.openWindow({
                        url:'bindPhoneNumber.html',
                        id:'bindPhoneNumber',
                        extras:{}
                    });
                }
            },'div');
        }else{
            var btn = ["取消","确定"];
            mui.confirm('确认修改？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    var oldpassword = $('#oldpassword').val();
                    var newpassword = $('#newpassword').val();
                    if(oldpassword != '' && newpassword != '' ){
                        var rule = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,}$/;
                        if(!rule.test(newpassword)){
                            mui.alert('密码需字母和数字组合，至少6位组成，区分大小写！','提示','确定',null,'div');
                        }else{
                            mui.ajax(config.httpPath+'api/sysUser/modifypwd', {
                                data: {
                                    id:localStorage.getItem('id'),
                                    oldPassWord:oldpassword,
                                    passWord:newpassword
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
                                    if(ajaxData.meta.success==true){
                                        mui.toast(ajaxData.meta.message);
                                        window.localStorage.setItem("autologin","false");
                                        window.localStorage.setItem("passWord","");
                                        window.localStorage.setItem("US_PWD","");
                                        mui.openWindow({
                                            url:'resetSuccessful.html',
                                            id:'resetSuccessful',
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
                    }else{
                        //mui.alert('原密码、新密码都不能为空');
                        mui.alert('原密码、新密码都不能为空','提示','确定',null,'div');
                    }
                }
            },'div');
        }
    });

}(mui, document));



