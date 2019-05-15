/**
 * Created by Administrator on 2017/7/14.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {
        var self = plus.webview.currentWebview();
    });
    var result;

    document.getElementById("forget-next").addEventListener('tap',function(){
        //点击响应逻辑
        var phoneNumber = $('#phoneNumber').val();
        //alert("----"+phoneNumber);
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        //var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(phoneNumber == ''){
            //mui.alert("手机号码不能为空");
            mui.alert('手机号码不能为空','提示','确定',null,'div');
        }else if(phoneNumber.length !=11){
            //mui.alert("手机号码错误");
            mui.alert('请输入正确的手机号码','提示','确定',null,'div');
        }else if(!myreg.test(phoneNumber)){
            //mui.alert("手机号码错误");
            //alert(myreg.test(17673152690));
            mui.alert('请输入正确的手机号码','提示','确定',null,'div');
        }else{
            checkPhoneIsExist();
        }
    });

    function checkPhoneIsExist(){
        var phoneNumber = $('#phoneNumber').val();
        mui.ajax(config.httpPath+'api/checkByMobileNo', {
            data: {
                mobileno:phoneNumber
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success==true){
                    //mui.toast(ajaxData.meta.message);
                    mui.openWindow({
                        url:'setSecurityCode.html',
                        id:'setSecurityCode',
                        extras:{}
                    });
                    localStorage.setItem('forgetphoneNum',phoneNumber);
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
        return result;
    }
}(mui, document));