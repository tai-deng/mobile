/**
 * Created by Administrator on 2017/8/29.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {});
    var guideId;
    var guideId = new Uri(location.href).getQueryParamValue('guideId');
    //指南接口
    mui.ajax(config.httpPath+'api/getGuide', {
        data: {
            id:localStorage.getItem('id'),
            attrId:guideId
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
                //mui.toast(ajaxData.meta.message);
                //alert(ajaxData.data.actReModelAttr.serObject);
                if(ajaxData.data.actReModelAttr.serObject == 0){
                    $('#serUser').text('全校师生');
                }else if(ajaxData.data.actReModelAttr.serObject == 1){
                    $('#serUser').text('在校学生');
                }else if(ajaxData.data.actReModelAttr.serObject == 2){
                    $('#serUser').text('教职工');
                }if(ajaxData.data.actReModelAttr.serObject == 3){
                    $('#serUser').text('其它');
                }
                $('#serName').text(ajaxData.data.actReModelAttr.serName);
                $('#serDept').text(ajaxData.data.actReModelAttr.serDept);
                $('#serPhone').text(ajaxData.data.actReModelAttr.serPhone);
                $('#serPlace').text(ajaxData.data.actReModelAttr.serPlace);
                $('#serTime').text(ajaxData.data.actReModelAttr.serTime);
                $('#serContent').html(ajaxData.data.actReModelAttr.serContent);
                $('#serPng').attr('src',config.httpPath+'/api/tofindPic?id='+ajaxData.data.actReModelAttr.serProcess)
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

    mui("body").on('tap','#banli',function(){
        mui.back();
    });

}(mui, document));