/**
 * Created by Administrator on 2017/7/14.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function(){});
    mui(".mui-content").on('tap','#submit',function(){
        var username = $('#username').val();
        if(username != ''){
            var btn = ["取消","确定"];
            mui.confirm('确认设置？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    mui.ajax(config.httpPath+'api/sysUser/setUserName', {
                        data: {
                            id:localStorage.getItem('id'),
                            userName:username
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
                                    url:'personalCenter.html',
                                    id:'personalCenter',
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
            });
        }else {
            //mui.alert('请输入学工号');
            mui.alert('请输入学工号','提示','确定',null,'div');
        }
    });
}(mui, document));