/**
 * Created by Administrator on 2017/8/31.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});
    //办事大厅接口
    mui.ajax(config.httpPath+'api/serviceHall', {
        data: {
            id:localStorage.getItem('id')
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
                $("#classify_one").text('IT服务');
                $("#classify_two").text('教学教务');
                $("#classify_three").text('后勤生活');
                $("#classify_four").text('行政科研');
                $('#itServices').html(template('list1Temp', ajaxData.data));
                $('#jxServices').html(template('list2Temp', ajaxData.data));
                $('#hqServices').html(template('list3Temp', ajaxData.data));
                $('#xzServices').html(template('list4Temp', ajaxData.data));
                if(ajaxData.data.sortFcodeMap.IT服务 == null){
                    $('.list1').addClass('display-none');
                }
                if(ajaxData.data.sortFcodeMap.教学教务 == null){
                    $('.list2').addClass('display-none');
                }
                if(ajaxData.data.sortFcodeMap.后勤生活 == null){
                    $('.list3').addClass('display-none');
                }
                if(ajaxData.data.sortFcodeMap.行政科研 == null){
                    $('.list4').addClass('display-none');
                }

                //点击跳转form页面
                mui(".mui-content").on('tap','.office_list',function() {
                    var proDefId = $(this).data('id');
                    mui.openWindow({
                        url: 'form.html?id=' + proDefId,
                        id: 'form',
                        extras: {}
                    });
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
}(mui, document));