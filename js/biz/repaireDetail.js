/**
 * Created by Administrator on 2017/8/28.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {
    });
    //点击我要留言
    mui(".mui-content").on('tap','',function(){
        mui.openWindow({
            url:'../html-accept/accept-information-part.html?',
            id:'accept-information-part',
            extras:{
            }
        });
    });
    //点击接单处理
    //点击完成订单
}(mui, document));
