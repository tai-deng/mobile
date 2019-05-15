
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});

    mui(".mui-content").on('tap','#submit',function(){
        var realName = $('#realName').val();
        var cardNumber = $('#IDcard').val();
        if(cardNumber != '' && realName != ''){
            if (!cardNumber || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(cardNumber)) {
                $('#tips').removeClass("display-none");
            }else{
                //alert("next");
                var btn = ["取消","确定"];
                mui.confirm('确认提交？','温馨提示',btn,function(e){
                    if(e.index==1){
                        mui.ajax(config.httpPathHu+'api/sysUser/bindingCertificateNo', {
                            //mui.ajax(config.httpPathHu+'api/sysUser/{id}', {
                            data: {
                                id:localStorage.getItem('id'),
                                realName:realName,
                                certificateNo:cardNumber
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
                                if(ajaxData.meta.success=="true"){
                                    mui.toast(ajaxData.meta.message);
                                    mui.openWindow({
                                        url:'safeSeting.html',
                                        id:'safeSeting',
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
                    }
                });
            }
        }else{
            //mui.alert('姓名和身份证号码不能为空');
            mui.alert('姓名和身份证号码不能为空','提示','确定',null,'div');
        }
    });
}(mui, document));