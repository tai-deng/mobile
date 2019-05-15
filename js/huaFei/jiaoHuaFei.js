/**
 * Created by Administrator on 2018/5/4.
 */
(function(mui, doc){
    mui.init({});
    mui.plusReady(function() {});
    var cz_name,cz_num;
    var siteFcode = localStorage.getItem('siteFcode');
    //alert(siteFcode);
    var userId = localStorage.getItem('id');
    var xtoken = localStorage.getItem('token');
    var chongzhiNum = new Uri(location.href).getQueryParamValue('name');
    var chongzhiphone = new Uri(location.href).getQueryParamValue('phone');
    //alert(chongzhiNum);
    //如果从地址里面获取到了联系人的信息则显示到页面上
    if(chongzhiNum !== null && chongzhiNum !== '' && chongzhiNum !== undefined && chongzhiphone !== null && chongzhiphone !== ''&& chongzhiphone !== undefined){
        //alert(11);
        $('#phoneNum').val(chongzhiphone);
        $('#tips').text(chongzhiNum);
        selectType($("#phoneNum").val());
    }
    //如果是微信或者ios则不显示获取联系人的按钮
    //alert(mui.os.wechat || mui.os.ios)
    if(mui.os.wechat || mui.os.ios){
        $('#lianxiren').addClass('display-none');
    }
    $("#phoneNum").keyup(function(){
        if($("#phoneNum").val().length == 11){
            if(regPhone($("#phoneNum").val())){
                selectType($("#phoneNum").val());
            }else{
                $("#phoneNum").val('').focus();
            }
        }else{
            $('.buy').addClass('grayborder1 gray-8color');
            $('.buy').removeClass('orangeborder maincolor');
            $('#type').text('');
        }
     });
    huafeiList();
    //获取话费列表信息
    function huafeiList(){
        mui.ajax(config.httpPath+'api/phoneRecharge/queryPhoneAmount', {
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
                            content += '<button data-id='+value.id+' class="buy ridus5 width30 '+right+' margintop-5px grayborder1 gray-8color padding-top-bottom5px mui-text-center float-left">'
                                + '<div class="font18 line20">'+value.displayAmount+'元</div>'
                                + '<div class="font10 line20 mui-ellipsis">售价'+value.payAmount+'元</div>'
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
    var clickId,clickAble = null;
    mui(".mui-content").on('tap','.buy',function() {
        cz_name = $('#phoneNum').val();
        cz_num = $('#tips').text();
        //若果是当前的可选套餐和不可选套餐
        var click = $(this);
        clickId = $(this).data('id');
        if(click.hasClass('orangeborder')){
            $('.buy').removeClass('bacddd');
            click.addClass('bacddd');
            if(!clickAble) {
                //按一次
                clickAble = new Date().getTime();
                setTimeout(function(){clickAble = null}, 3000);
                //获取订单Id
                mui.ajax(config.httpPath+'api/Broadband/queryOrderId', {
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
                        if(ajaxData !== ''){
                            orderId = ajaxData;
                            if(mui.os.wechat){
                                weixinPay(cz_name,clickId,userId,siteFcode,orderId,xtoken);
                            }else{
                                //alert(siteFcode);
                                appPay(cz_name,clickId,userId,siteFcode,orderId,xtoken);
                            }
                        }else{
                            //mui.toast(ajaxData.meta.message);
                            mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                        mui.toast('网络异常，请稍后再试');
                    }
                });
            } else {
                //重复按了几次
                mui.toast('请求正在发送中，请勿重复点击');
                return (new Date().getTime() - clickAble) < 3000;
            }
        }
    });
    //点击缴费历史
    mui(".mui-content").on('tap','#jiaofeiRecord',function() {
        /*mui.openWindow({
            url:'huaFeiList.html',
            id:'huaFeiList'+"&&?time="+new Date().getTime(),
            extras:{}
        });*/
        mui.openWindow({
            url:'pullrefresh_main.html?tag='+'huafei',
            id:'pullrefresh_main'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    });
    //点击联系人
    mui(".mui-content").on('tap','#lianxiren',function() {
        mui.openWindow({
            url:'../lianxiren.html',
            id:'lianxiren',
            extras:{}
        });
    });
    //查询电话号码类型
    function selectType(num){
        $.ajax({
            url: "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel="+num,
            type: "GET",
            dataType: "jsonp", //指定服务器返回的数据类型
            success: function (data) {
                //alert(JSON.stringify(data));//json对象转成字符串
                //$('#tips').removeClass('display-none');
                if(data.province == ""){
                    alert('输入的号码有误，请重新输入');
                    $("#phoneNum").val('').focus();
                }else{
                    $('#type').text(data.carrier);
                    $('.buy').removeClass('grayborder1 gray-8color');
                    $('.buy').addClass('orangeborder maincolor');
                }
            }
        });
    }
}(mui, document));