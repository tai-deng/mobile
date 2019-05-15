/**
 * Created by Administrator on 2017/7/28.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {});
    var type = 0;   //type：0校内通知；1校内资讯；2系统通知
    //content(0);
    content();
    //content(2);
    function content(){
        mui.ajax(config.httpPath+'api/getSysNotice', {
            data: {
                id:localStorage.getItem('id'),
                //type:type
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
                if(ajaxData.data.SysInfoXNTZ){
                    $('#xiaoNum').text(ajaxData.data.SysInfoXWTZ);
                    $('#xiao_time').text(formatDateTime(ajaxData.data.SysInfoXNTZ.createTime/1000));
                    $('#xiao_content').text(ajaxData.data.SysInfoXNTZ.title);
                }
                if(ajaxData.data.SysInfoZNZX){
                    $('#jiaoNum').text(ajaxData.data.SysInfoXWTZ);
                    $('#xi_time').text(formatDateTime(ajaxData.data.SysInfoZNZX.createTime/1000));
                    $('#xi_content').text(ajaxData.data.SysInfoZNZX.title);
                }
                if(ajaxData.data.SysInfoXTTZ){
                    $('#xitongNum').text(ajaxData.data.SysInfoXWTZ);
                    $('#jiao_time').text(formatDateTime(ajaxData.data.SysInfoXTTZ.createTime/1000));
                    $('#jiao_content').text(ajaxData.data.SysInfoXTTZ.title);
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
            }
        });
    }

    //点击通知公告跳转列表页
    mui(".mui-content").on('tap','.tongzhi',function(){
        var type = $(this).data('id');
        if(type == 'yewu'){
            mui.openWindow({
                url:'YwnoticeList.html?type='+type,
                id:'YwnoticeList',
                extras:{}
            });
        }else{
            mui.openWindow({
                url:'noticeList.html?type='+type,
                id:'noticeList',
                extras:{}
            });
        }
    });
}(mui, document));