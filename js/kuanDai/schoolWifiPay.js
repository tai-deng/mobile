/**
 * Created by Administrator on 2017/11/16.
 */
(function(mui, doc){
    mui.init();
    //修改返回跳转的页面
    mui.back = function(){
        mui.openWindow({
            url:'../new/tabbarNew.html',
            id:'tabbarNew.html'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    };
    var old_back = mui.back;
    mui.plusReady(function() {
        var curr = plus.webview.currentWebview();
        var wvs = plus.webview.all();
        for (var i = 0, len = wvs.length; i < len; i++) {
            //关闭除本页面外的其他页面
            if (wvs[i].getURL() == curr.getURL())
                continue;
            plus.webview.close(wvs[i]);
        }
        plus.key.addEventListener('backbutton', function() {
            mui.currentWebview.opener().show('none');
            old_back();
        }, false);
    });
    var siteCode,school;
    //alert('id='+localStorage.getItem('id'));
    //获取用户学号或者身份证号
    mui.ajax(config.httpPath+'api/Broadband/queryUserWorkNumAndSiteCode', {
    //mui.ajax(config.httpPath+'api/sysUser/updateNation', {
        data: {
            id:localStorage.getItem('id')
            //id:'xs59915'
        },
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
                //mui.toast(ajaxData.meta.message);
                $('#duixiang').val(ajaxData.data.num);
                siteCode = ajaxData.data.siteFcode;
                getSchool();
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
    //获取学校
    function getSchool(){
        mui.ajax(config.httpPath+'api/Broadband/querySites', {
            //mui.ajax(config.httpPath+'api/sysUser/updateNation', {
            data: {
                /*id:localStorage.getItem('id')*/
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post' , //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success === true){
                    //mui.toast(ajaxData.meta.message);
                    var optionstring;
                    $.each(ajaxData.data,function(key,value){  //循环遍历后台传过来的json数据
                        optionstring += "<option class='graycolor' value=\"" + value.opValue + "\" >" + value.opText + "</option>";
                    });
                    $("#select_k1").append(optionstring);
                    $("#select_k1").find("option[value="+siteCode+"]").attr("selected",true);
                    school = siteCode;
                    $('#select_k1').change(function(e){
                        var x=document.getElementById("select_k1");
                        school = x.options[x.selectedIndex].value;
                        //school = x.options[x.selectedIndex].text;
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
    };

    //点击下一步
    mui(".mui-content").on('tap','#submit',function(){
        //得到用户输入的信息
        var duixiang = $('#duixiang').val();
        if(duixiang != ""){
            mui.ajax(config.httpPath+'api/Broadband/queryUserIsExist', {
                data: {
                    siteFcode:school,
                    UserNum:duixiang
                },
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
                        mui.toast(ajaxData.meta.message);
                        $('#errorTip').addClass('display-none');
                        mui.openWindow({
                            url:'jiaofei.html?siteFcode='+school+"&&UserNum="+duixiang+"&&?time="+new Date().getTime(),
                            id:'jiaofei.html'+"&&?time="+new Date().getTime(),
                            extras:{}
                        });
                    }else{
                        //mui.toast(ajaxData.meta.message);
                        mui.alert('此帐号还未开通宽带业务','提示','确定',function(e){
                            //mui.back();
                            mui.openWindow({
                                url:'../new/tabbarNew.html'+"?time="+new Date().getTime(),
                                id:'tabbarNew'+"&&?time="+new Date().getTime(),
                                extras:{}
                            });
                        },'div');
                    }
                },
                error: function(xhr, type, errorThrown) {
                    //异常处理；
                    console.log(type);
                    mui.toast('网络异常，请稍后再试');
                }
            });
        }else{
            $('#errorTip').removeClass('display-none');
            mui.alert('缴费对象不能为空','提示','确定',null,'div');
        }
    });






    /*//获取客户端的的IP
    grt_client_ip();
    function grt_client_ip(){
        $cip = 'unknown';
        if($_SERVER['REMOTE_ADDR']){
            $cip = $_SERVER['REMOTE-AOOR'];
        }else if(getenv('REMOTE_ADDR')){
            $cip = getenv('REMOTE_ADDR');
        }
        alert($cip)
        return $cip;
    }*/
    /*//获取openID
    https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN
        mui.ajax('https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN', {
            data: {},
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            /!*beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },*!/
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success === true){
                    //mui.toast(ajaxData.meta.message);
                    //location.href = 'tabbar.html';

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

    mui.ajax('https://api.mch.weixin.qq.com/pay/unifiedorder', {
        data: {
            appid:'wxb6261d62806da662',//公众账号ID
            mch_id:'1488015732',//商户号
            nonce_str:'123',//随机字符串
            sign:'123',//签名
            body:'123',//商品描述
            out_trade_no:'123',//商户订单号
            total_fee:'123',//总金额
            spbill_create_ip:'123',//终端ip
            notify_url:'123',//通知地址
            trade_type:'MWEB',//交易类型
            scene_info:{"h5_info": {"type":"Wap","wap_url": "https://pay.qq.com","wap_name": "腾讯充值"}}//场景信息
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
                //mui.toast(ajaxData.meta.message);
                //location.href = 'tabbar.html';

            }else{
                mui.toast(ajaxData.meta.message);
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });*/

}(mui, document));