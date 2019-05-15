/**
 * Created by Administrator on 2017/6/29.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});
    var height = window.screen.availHeight;
    //$('#body').height(height);
    //$('.aa').height(height+360);
    $('.down-yindao').height(height);
    document.body.style.overflow='hidden';
    $("#iphone").on('click',function(){
        mui.alert('iphone版暂未开通，敬请期待');
    });
    $("#andriod").on('click',function(){
        window.location.href = "http://www.51hall.cn/upload/H5A975649_0420172720.apk";
    });

    var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
    if (is_weixin) {
        alert("weixin");
        $(".down-yindao").css('display','block');
        $(".down-yindao").on('click',function(){
            $(".down-yindao").css('display','none');
        });
    }else{
        alert("22");
        var ifr = document.createElement('iframe');
        ifr.src = 'hall51://';
        //ifr.style.display = 'none';
        document.body.appendChild(ifr);
        window.setTimeout(function(){
            //document.body.removeChild(ifr);
            alert("chaoshi");
        },3000)
    }
    $(".down-yindao").on('click',function(){
        $(".down-yindao").css('display','none');
    });
}(mui, document));