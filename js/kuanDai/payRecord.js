/**
 * Created by Administrator on 2017/11/16.
 */
(function(mui, doc){
    mui.init();
    mui.plusReady(function() {});
    var userId = new Uri(location.href).getQueryParamValue('userId');
    var userName = new Uri(location.href).getQueryParamValue('userName');
    $('#userId').text(userId);
    $('#userName').text(userName);

}(mui, document));
