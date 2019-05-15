/**
 * Created by Administrator on 2017/11/16.
 */
(function(mui, doc){
    mui.init();
    mui.plusReady(function() {});

    mui(".mui-content").on('tap','#submit',function(){
        mui.openWindow({
            url:'schoolWifiPay.html',
            id:'schoolWifiPay.html',
            extras:{}
        });
    });
}(mui, document));
