/**
 * Created by Administrator on 2018/7/24.
 */
(function(mui, doc){
    var siteCode =new Uri(location.href).getQueryParamValue('siteCode');
    mui.plusReady(function() {});
    mui.init();
    if(siteCode == 'e549afe0c944c2063687c514f2e658c8'){
        $("#receiveImg").attr("src","../img/kjxy.jpg");
    }else if(siteCode == '8884bc5fad4a6eefe36fcf6234cc36b1' || siteCode == 'f9cf1800983e1365175617c8a5c038f5'){
        $("#receiveImg").attr("src","../img/cslg.jpg");
    }else if(siteCode == '855198a37cac80fb60e76174cb254f2a'){
        $("#receiveImg").attr("src","../img/cshk.jpg");
    }else if(siteCode == '823ef78c7ed94e905156905798cbd175' || siteCode == '46c09d9f3b1876712717e870aef3c9ee'){
        $("#receiveImg").attr("src","../img/cssfdz.jpg");
	}else if(siteCode == 'f92f631b59331578ce787b753e999843'){
        $("#receiveImg").attr("src","../img/cssflt.jpg");
    }else if(siteCode == 'fb9d10335b551d5a76d36df2bc961951'){
        $("#receiveImg").attr("src","../img/xzys.jpg");
    }else if(siteCode == 'e26206d28b34d13effba5e0e05940338'){
        $("#receiveImg").attr("src","../img/znly.jpg");
    }else if(siteCode == '58e8599b9d19d34e386c899fbc4508bc'){
        $("#receiveImg").attr("src","../img/dzcm.jpg");
    }else if(siteCode == 'b3fcbdee1891fe15dab55ad601d57543'){
        $("#receiveImg").attr("src","../img/hnnd.jpg");
    }else{
        $("#receiveImg").attr("src","../img/receive.jpg");
    }
    var url='?siteCode='+siteCode +'&'+new Uri(location.href).uriParts.query;

    mui(".receive").on('tap','#receive',function(){
        mui.openWindow({
            url:'fillInformation.html'+url,
            id:'fillInformation',
            extras:{}
        });
    });
}(mui, document));