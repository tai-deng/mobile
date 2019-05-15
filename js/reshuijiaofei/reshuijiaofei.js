/**
 * Created by Administrator on 2018/5/4.
 */
(function(mui, doc){
    mui.init({});
    mui.plusReady(function() {});
    $('#phoneNum').val(localStorage.getItem('mobileno'))
    var cz_name,cz_num;
    var siteFcode = localStorage.getItem('siteFcode');
    var userId = localStorage.getItem('id');
    var xtoken = localStorage.getItem('token');
    //如果是微信或者ios则不显示获取联系人的按钮
    //alert(mui.os.wechat || mui.os.ios)
    if(mui.os.wechat || mui.os.ios){
        $('#lianxiren').addClass('display-none');
    }
    var clickId,clickAble,system,version = null;
    // $("#phoneNum").keyup(function(){
        if($("#phoneNum").val().length >= 5){
            clickAble = true;
        }else{
            clickAble = false;
        }
    //  });
     if(mui.os){
         if(mui.os.ios){
            system = 'ios';
         }else if(mui.os.android){
            system = 'android'
         }else if(mui.os.wechat){
            system = 'wechat'
         }
        version = mui.os.version;
     }else{
        system = 'web'
        version = 'web'
     }
     mui.toast(system,version)
    huafeiList();
    //获取话费列表信息 
    function huafeiList(){
        mui.ajax(config.httpPath+'api/lifeRecharge/querySerLifeAmount', {
            data: {},
            dataType: 'json', //服务器返回json格式数据
            type: 'post' , //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success == true){
                    var content='';
                    $.each(ajaxData.data,function(key,value){  //循环遍历后台传过来的json数据
                        var right = 'margin-right5per';
                        //$.each(value.serSets,function(key,value){
                            if((key+1) % 3 == 0 && (key+1) != 0 ){
                                right = 'margintop-5px';
                            }else{
                                right = 'margin-right5per';
                            }
                            content += '<button data-id='+value.id+' class="buy ridus5 width30 '+right+' margintop-5px grayborder1 gray-8color padding-top-bottom10px mui-text-center float-left">'
                                + '<div class="font18 line20">'+value.displayAmount+'元</div>'
                                // + '<div class="font10 line20 mui-ellipsis">售价'+value.payAmount+'元</div>'
                                + '</button>';
                        //});
                        $('#content').append(content);
                        content = '';
                        $('#content').after('<div style="clear: both;"></div>');
                    });
                }else{

                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
            }
        });
    }
    //点击套餐选项
    mui(".mui-content").on('tap','.buy',function() {
        cz_name = $('#phoneNum').val();
        //若果是当前的可选套餐和不可选套餐
        var click = $(this);
        clickId = $(this).data('id');
        var allel = $("#content").children();
        for(var i = 0;i< allel.length; i++){
            if($(allel[i]).hasClass('orangeborder')){
                $(allel[i]).removeClass('orangeborder maincolor');
                $(allel[i]).addClass('grayborder1 gray-8color');
            }
        }
        click.addClass('orangeborder maincolor')
        click.removeClass('grayborder1 gray-8color')
        if(clickAble){
            var btn = ["取消","确定"];
            mui.confirm('确认充值？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    mui.ajax(config.httpPath+'api/lifeRecharge/lifeLogin', {
                        data: {iphoneNum:cz_name,phoneSystem:system,version:version},
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post' , //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Token",localStorage.getItem('token'));
                        },
                        success: function(ajaxData) {
                            if(ajaxData.error_code == 0){
                                // 获取订单Id
                                mui.ajax(config.httpPath+'api/Broadband/queryOrderId', {
                                    data: {},
                                    dataType: 'json', //服务器返回json格式数据
                                    type: 'post' , //HTTP请求类型
                                    timeout: 10000, //超时时间设置为10秒；
                                    beforeSend: function(request) {
                                        request.setRequestHeader("X-Token",localStorage.getItem('token'));
                                    },
                                    success: function(ajaxData) {
                                        if(ajaxData !== ''){
                                            orderId = ajaxData;
                                            if(mui.os.wechat){
                                                weixinPay(cz_name,clickId,userId,siteFcode,orderId,xtoken);
                                            }else{
                                                appPay(cz_name,clickId,userId,siteFcode,orderId,xtoken);
                                            }
                                        }else{
                                            mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
                                        }
                                    },
                                    error: function(xhr, type, errorThrown) {
                                        //异常处理；
                                        console.log(type);
                                        mui.toast('网络异常，请稍后再试');
                                    }
                                });
                            }else{
                                if(ajaxData.message == '-1'){
                                    mui.toast('ajaxData.message');
                                }else{
                                    mui.toast(ajaxData.message);
                                }
                                // mui.toast('请先绑定');
                            }
                        },
                        error: function(xhr, type, errorThrown) {
                            //异常处理；
                            console.log(type);
                            mui.toast('网络异常，请稍后再试');
                        }
                    });
                }
                // 15116149838
            })
        }else{
            mui.toast("请输入趣智校园账户（手机号）")
        }
    });
    //点击缴费历史
    mui(".mui-content").on('tap','#jiaofeiRecord',function() {
        mui.openWindow({
            url:'reshuirecord.html?tag='+'huafei',
            id:'reshuirecord'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    });
}(mui, document));