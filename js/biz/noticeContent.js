/**
 * Created by Administrator on 2017/7/28.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {});
    var infoId = new Uri(location.href).getQueryParamValue('id');
        mui.ajax(config.httpPath+'api/getSysNoticeDetail', {
            data: {
                id:localStorage.getItem('id'),
                infoId:infoId
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
                $('#title').text(ajaxData.data.sysInformation.title);
                $('#author').text(ajaxData.data.sysInformation.inscribe);
                $('#from').text(ajaxData.data.sysInformation.lastModifier);
                $('#time').text(formatDateTime(ajaxData.data.sysInformation.createTime/1000));
                if(ajaxData.data.sysInformation.isOutside == 1){
                    $('#content').append(ajaxData.data.sysInformation.url);
                    $('#content').css('color','deepskyblue');
                    mui(".mui-content").on('tap','#content',function(){
                        mui.openWindow({
                            url:'outsidePage.html?url='+ajaxData.data.sysInformation.url,
                            id:'outsidePage',
                            extras:{}
                        });
                    });
                }else{
                    $('#content').append(ajaxData.data.sysInformation.content);
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
            }
        });
}(mui, document));
