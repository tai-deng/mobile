/**
 * Created by Administrator on 2017/7/14.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function(){});
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
    mui(".mui-content").on('tap','#success',function(){
        var btn = ["取消","确定"];
        mui.confirm('确认设置？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                var codeNumber = $('#newpassword').val();
                if(codeNumber != ''){
                    var rule = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,}$/;
                    if(!rule.test(codeNumber)){
                        mui.alert('密码需字母和数字组合，至少6位组成，区分大小写！','提示','确定',null,'div');
                    }else{
                        mui.ajax(config.httpPath+'api/sysUser/setPassword', {
                            data: {
                                id:localStorage.getItem('forgetphoneNum'),
                                passWord:codeNumber
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
                                    mui.openWindow({
                                        url:'resetSuccessful.html',
                                        id:'resetSuccessful',
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
                    }
                }else{
                    //mui.alert('密码不能为空');
                    mui.alert('密码不能为空','提示','确定',null,'div');
                }
            }
        });
    });
}(mui, document));