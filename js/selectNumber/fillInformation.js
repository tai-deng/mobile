/**
 * Created by Administrator on 2018/7/24.
 */
(function(mui, doc) {
    /* var tag = new Uri(location.href).getQueryParamValue('tag');
     alert(tag);*/
    var pageNo = 1;
    var pageSize = 8;
    var yesData = false;
    mui.plusReady(function() {});
    mui.init();
    var siteCode =new Uri(location.href).getQueryParamValue('siteCode');
    var type = 2;
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var q = window.location.pathname.substr(1).match(reg_rewrite);
        if(r != null){
            return unescape(r[2]);
        }else if(q != null){
            return unescape(q[2]);
        }else{
            return null;
        }
    }
    var flag= 1;
    var payFlag= 0;
    var backUrl= getQueryString('backUrl');
    $('.tip').text(ad(siteCode))
    if(getQueryString('flag')!=''){
        flag= getQueryString('flag');
    };
    if(getQueryString('payFlag')!=''){
        payFlag= getQueryString('payFlag');
    };
    // 传参获取
    $('#submit').text("线下领取");
    if(flag=='0'){
        $('.tip').addClass('display-none');
        $('.isFlag').addClass('display-none');
        $('#detailedAddress').addClass('display-none');
        $('#sgpi').addClass('display-none');
        $('#dizhi').addClass('display-none');
        if(payFlag=='1'){
            $('#submit').text("立即支付");
        }
    // 原来的样子获取
    }else if(flag=='1'){
        $('.tip').removeClass('display-none');
        $('.isFlag').removeClass('display-none');
        $('#detailedAddress').removeClass('display-none');
        if(payFlag=='0'){
            $('#dizhi').addClass('display-none');
            $('#sgpi').addClass('display-none');
        }else{
            $('#submit').text("立即支付");
            $('#dizhi').removeClass('display-none');
            $('#sgpi').removeClass('display-none');
        }
    }
	/*
	if(siteCode == 'e549afe0c944c2063687c514f2e658c8' || siteCode == 'fb9d10335b551d5a76d36df2bc961951' || 
	   siteCode == '58e8599b9d19d34e386c899fbc4508bc'){
       
        $('#haoma1').text('选择虚拟卡');
        
    }
	

    if(siteCode == 'e549afe0c944c2063687c514f2e658c8'){
        type = 1;
        $('#serNumbermoney').val('0.00');
        $('.hide').addClass('display-none');
    }

    if(siteCode == '46c09d9f3b1876712717e870aef3c9ee' || siteCode == '823ef78c7ed94e905156905798cbd175'
        || siteCode == 'f92f631b59331578ce787b753e999843'){
        type = 2;*/
        // $('#serNumbermoney').val('0.00');
        // $('.hide').addClass('display-none');
        // var dizhi = document.getElementById("dizhi");
        // if(dizhi != null){
        //     dizhi.parentNode.removeChild(dizhi);
        // }
        // var showCityPicker3 = document.getElementById("showCityPicker3");
        // if(showCityPicker3 != null){
        //     showCityPicker3.parentNode.removeChild(showCityPicker3);
        // }

        // $('#detailedAddress').attr("placeholder","请填写备注");
        // $('#submit').text("线下领取");
  //  }
    /**
     * 选择号码业务实现
     */
    var timer=null;
    $(".mui-table-view-cell").click(function(){
        $(".changeone,.changebox").show();
        if($(this).hasClass('haoma')){
            $('.all').addClass('display-none');
            $('.huan').removeClass('display-none');
            $('#keyWord').removeClass('display-none');
            $('#first').removeClass('display-none');
            timer= setTimeout(function() {
                getData();
            }, 300);
        }else if($(this).hasClass('taocan')){
            $('.changeone ul').html('');
            $('.all').addClass('display-none');
            $('.huan').addClass('display-none');
            $('#keyWord').addClass('display-none');
            $('#second').removeClass('display-none');
            timer= setTimeout(function() {
                getTaocan();
            }, 300);
        }else{
            $(".changeone,.changebox").hide();
            $('.all').addClass('display-none');
            $('.huan').addClass('display-none');
            $('#keyWord').addClass('display-none');
            $('#third').removeClass('display-none');
            if(siteCode == 'e549afe0c944c2063687c514f2e658c8'){
                $('.xianshimoney').text('该区域暂未开通支付');
            }
        }
    });
    $(".huan").click(function(){
        timer= setTimeout(function() {
            getData();
        }, 300);
     /*   $(".changeone,.changebox").show();*/
    });

    mui(".mui-input-clear")[0].addEventListener('input',function(){
        timer= setTimeout(function() {
            pageNo = 1;
            getData();
        }, 300);
    });

    mui(".mui-icon-close")[0].addEventListener('tap',function(){
        //alert(111);
        if(pageNo > 1){
            pageNo-=1;
        }
        $(".changeone,.changebox").hide();
    });
    /**/
    /*mui(".mui-tab-item")[0].addEventListener('tap',function(){
        $(".mui-tab-item").removeClass("mui-active");
        $(this).addClass("mui-active");
    });
*/

    function getData(){
        if(typeof timer != null){
            clearTimeout(timer)
        }
        mui('#change').pullRefresh().endPullupToRefresh((yesData)); //参数为true代表没有更多数据了。
        var table = document.body.querySelector('.changeone ul');
        var keyWord = $('#keyWord').val();
        //alert(pageNo);
        //alert(keyWord);
        mui.ajax(config.httpPath+'api/serNumberOrder/getSerNumberList', {
            data: {
                pageNo:pageNo,
                pageSize:pageSize,
                keyWord:keyWord,
                siteCode:siteCode
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(ajaxData) {
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.data.length > 0){
                    pageNo += 1;
                }else{
                    yesData = true;
                    pageNo = 1;
                    mui.toast('没有更多数据了');
                    // getData();
                }
                if(ajaxData.meta.success == true){
                    for(var i = 0; i < pageSize; i++){
                        if(i>=ajaxData.data.length){
                            if (table.childNodes[i]) {
                                table.removeChild(table.childNodes[i]);
                            }
                        }else{
                            var li = document.createElement('li');
                            li.className = 'change1';
                            li.innerHTML = '<a href="#" data-id="'+ajaxData.data[i].id+'" data-mobileno="'+ajaxData.data[i].mobileno+'" class="dataId">'
                                +'<span class="mui-tab-item ">'+ajaxData.data[i].mobileno+'</span>'
                                +'</a>';
                            if (table.childNodes[i]) {
                                table.replaceChild(li,table.childNodes[i]);
                            }else{
                                table.appendChild(li);
                            }

                        }
                    }
                    while(table.childElementCount > ajaxData.data.length){
                        if (table.childNodes[ajaxData.data.length]) {
                            table.removeChild(table.childNodes[ajaxData.data.length]);
                        }
                    }
                }else{
                    mui.toast(ajaxData.meta.message);
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常,请稍后再试');
            }
        });
    }

    //选择套餐

    function getTaocan(){
        if(typeof timer != null){
        // console.log(timer,typeof timer)
            clearTimeout(timer)
        }
        var table = document.body.querySelector('.changeone ul');
        //alert(pageNo);
        //alert(keyWord);
        mui.ajax(config.httpPath+'api/serNumberOrder/getSerNumberTypeList', {
            data: {
                siteCode:siteCode
                //siteCode:'823ef78c7ed94e905156905798cbd175',
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(ajaxData) {
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert(keyWord);
                // alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success == true){
                    for(var i = 0; i < ajaxData.data.length; i++) {
                        var li = document.createElement('li');
                        li.className = 'change1 margintop-20px';
                        li.innerHTML = '<a href="#" data-id="' + ajaxData.data[i].id + '" data-taocan="' + ajaxData.data[i].name + '" class="choosetaocan">'
                            + '<span class="mui-tab-item ">' + ajaxData.data[i].name + '</span>'
                            + '</a>';
                        if (table.childNodes[i]) {
                            table.replaceChild(li, table.childNodes[i]);
                         } else {
                            table.appendChild(li);
                         }
                        //table.appendChild(li);
                    }
                }else{
                    mui.toast(ajaxData.meta.message);
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常,请稍后再试');
            }
        });
    }
    var taocanid,taocanname;
    mui(".changeone").on('tap','.choosetaocan',function(){
        //若果是当前的可选套餐和不可选套餐
        var click = $(this);
        taocanid = $(this).data('id');
        taocanname = $(this).data('taocan');
        //$("#phoneNum").each(function() {
        //    $('#serNumbertaocan').attr("value",taocanname);
            $('#serNumbertaocan').val(taocanname);
            $(".changeone,.changebox").hide();
        //});
    });

    var clickId;
    var mobile;
    mui(".changeone").on('tap','.dataId',function(){
        //若果是当前的可选套餐和不可选套餐
        var click = $(this);
        clickId = $(this).data('id');
        mobile=($(this).data('mobileno'));
        $("#phoneNum").each(function() {
            $('#serNumberId').attr("value",clickId);
            $('#phoneNum').text(mobile);
            $(".changeone,.changebox").hide();
        });
    });
/**/

    function information(){
        var name,mobileno,cardNumber,detailedAddress,serNumberId;
        if(flag=='0'){
            serNumberId= $("#serNumberId").val();
            name= getQueryString('name');
            mobileno= getQueryString('mobileno');
            detailedAddress= getQueryString('detailedAddress');
            cardNumber= getQueryString('cerId');
        }else if(flag == '1'){
            name = $('#name').val();
            mobileno = $('#mobileno').val();
            cardNumber = $('#cerId').val();
            detailedAddress = $('#detailedAddress').val();
            serNumberId = $('#serNumberId').val();
        }
        if(serNumberId != ''&& serNumberId != undefined ) {
        }else{
            mui.alert('选择号码不能为空','提示','确定',null,'div');
            return false;
        }
        if(name != ''&& name != undefined ) {
        }else{
            mui.alert('姓名不能为空','提示','确定',null,'div');
            return false;
        }
        console.log(name,mobileno,cardNumber,detailedAddress,serNumberId)
        /*身份证号码*/
        if(cardNumber != '' ){
            if (!cardNumber || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(cardNumber)) {
                $('#tips').removeClass("display-none");
                mui.alert('身份证号码无效','提示','确定',null,'div');
                return false;
            }else{
                $('#tips').addClass("display-none");
            }
        }else{
            mui.alert('身份证号码不能为空','提示','确定',null,'div');
            return false;
        }
        /*手机号码*/
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        //alert('0000'+myreg.test(mobileno));
        if(mobileno == ''){
            mui.alert('手机号码不能为空','提示','确定',null,'div');
            return false;
        }else if(mobileno.length !=11){
            //mui.alert("手机号码错误");
            $('#tipsmobileno').removeClass("display-none");
            return false;
        }else if(myreg.test(mobileno)){
            //mui.alert("手机号码错误");
            $('#tipsmobileno').addClass("display-none");
        }else if(!myreg.test(mobileno)){
            //mui.alert("手机号码错误");
            $('#tipsmobileno').removeClass("display-none");
            return false;
        }else{
/*
            checkPhoneIsExist();
*/
        }

        if(type != 2) {
            if (detailedAddress != '' && detailedAddress != undefined) {
            } else {
                mui.alert('地址不能为空', '提示', '确定', null, 'div');
                return false;
            }
        }

    }
    $("#name").blur(function(){
        var name = $('#name').val();
        if(name != ''&& name != undefined ) {
        }else{
            mui.alert('姓名不能为空','提示','确定',null,'div');
        }
    });
    $("#cerId").blur(function(){
        var cardNumber = $('#cerId').val();
        if(cardNumber != '' ){
            if (!cardNumber || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(cardNumber)) {
                $('#tips').removeClass("display-none");
                return false;
            }else{
                $('#tips').addClass("display-none");
            }
        }else{
            mui.alert('身份证号码不能为空','提示','确定',null,'div');
            return false;
        }
        mui.ajax(config.httpPath+'api/serNumberOrder/checkcerIdIsExit', {
            //mui.ajax(config.httpPathHu+'api/sysUser/{id}', {
            data: {
                cerId:cardNumber
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                if(ajaxData.meta.success == false){
                    mui.toast(ajaxData.meta.message);
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
            }
        });

    });
    $("#mobileno").blur(function(){
        var mobileno = $('#mobileno').val();
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        if(mobileno == ''){
            mui.alert('手机号码不能为空','提示','确定',null,'div');
        }else if(mobileno.length !=11){
            //mui.alert("手机号码错误");
            $('#tipsmobileno').removeClass("display-none");
        }else if(myreg.test(mobileno)){
            //mui.alert("手机号码错误");
            $('#tipsmobileno').addClass("display-none");
        }else if(!myreg.test(mobileno)){
            //mui.alert("手机号码错误");
            $('#tipsmobileno').removeClass("display-none");
        }else{
            /*checkPhoneIsExist();*/
        }
    });
    mui(".mui-content").on('tap','#submit',function(){
        if(false != information()){
            checkcerId()
        }
        if(flag== '0'){
            siteCode= getQueryString('siteCode');
            serNumberId= $("#serNumberId").val();
            name= getQueryString('name');
            mobileno= getQueryString('mobileno');
            cerId= getQueryString('cerId');
            province= getQueryString('province');
            city= getQueryString('city');
            county= getQueryString('county');
            detailedAddress= getQueryString('detailedAddress');
            setName= taocanname;
            amount= getQueryString('amount');
        }else if(flag== '1'){
            siteCode= siteCode,
            serNumberId= $("#serNumberId").val(),
            name= $("#name").val(),
            mobileno= $("#mobileno").val(),
            cerId= $("#cerId").val(),
            province= typeof($("#province").val())=='undefined'?'':$("#province").val(),
            city= typeof($("#city").val())=='undefined'?'':$("#city").val(),
            county= typeof($("#county").val())=='undefined'?'':$("#county").val(),
            detailedAddress= $("#detailedAddress").val(),
            setName= taocanname,
            //amount:$('#serNumbermoney').val()
            amount= getQueryString('amount');
        }
        /*验证身份证接口*/
        function checkcerId(){
            //alert(1313);
            var cerId = $('#cerId').val();
            if(flag=='0'){
                cerId= getQueryString('cerId');
            }
            mui.ajax(config.httpPath+'api/serNumberOrder/checkcerIdIsExit', {
                //mui.ajax(config.httpPathHu+'api/sysUser/{id}', {
                data: {
                    cerId:cerId
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function(ajaxData) {
                    //服务器返回响应，根据响应结果，分析是否成功；
                    //alert(JSON.stringify(ajaxData));
                    if(ajaxData.meta.success == false){
                        mui.toast(ajaxData.meta.message);
                    }else{
                        SerNumber();
                    }
                },
                error: function(xhr, type, errorThrown) {
                    //异常处理；
                    console.log(type);
                    mui.toast('网络异常，请稍后再试');
                }
            });
        }
        /**/
        function SerNumber(){
            //alert(1414);
            if(serNumberId==''){
                mui.alert('请选择号码')
                return;
            }else if(setName==''){
                mui.alert('请选择套餐')
                return;
            }
            mui.ajax(config.httpPath+'api/serNumberOrder/addSerNumberOrder', {
                data: {
                    siteCode,
                    serNumberId,
                    name,
                    mobileno,
                    cerId,
                    province,
                    city,
                    county,
                    detailedAddress,
                    setName,
                    //amount:$('#serNumbermoney').val()
                    amount,
                    remark:flag,
                    payFlag,
                    backUrl
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function(ajaxData) {
                    //服务器返回响应，根据响应结果，分析是否成功；
                    // alert(JSON.stringify(ajaxData));
                    if(ajaxData.meta.success == false){
                        mui.alert(ajaxData.meta.message,'提示','确定',null,'div');
                    }else{
                        if(ajaxData.meta.resultCode == '0'){
                            if(flag== '0'){
                                mui.openWindow({
                                    url:backUrl,
                                    id:'selectSuccess'+"&&?time="+new Date().getTime(),
                                    extras:{}
                                });
                            }else if(flag== '1'){
                                mui.openWindow({
                                    url:'selectSuccess.html',
                                    id:'selectSuccess'+"&&?time="+new Date().getTime(),
                                    extras:{}
                                })
                            }
                        }else if(ajaxData.meta.resultCode == '1'){
                            //alert(1212);
                            mui.openWindow({
                                url:ajaxData.data,
                                id:ajaxData.data,
                                extras:{}
                            });
                        }else{
                            mui.alert('提交失败','提示','确定',null,'div');
                        }

                    }
                },
                error: function(xhr, type, errorThrown) {
                    //异常处理；
                    mui.toast('网络异常',{ duration:'long', type:'div'});
                }
            });
        }
    });
   /* if (mui.os.plus) {
        mui.plusReady(function() {
            setTimeout(function() {
                mui('#pullrefresh').pullRefresh().pullupLoading();
            }, 500);
        });
    } else {
        mui.ready(function() {
            mui('#pullrefresh').pullRefresh().pullupLoading();
        });
    }*/
    function ad(siteCode){
        let str = '校园网服务中心';
        if(siteCode == 'e549afe0c944c2063687c514f2e658c8'){

        }else if(siteCode == '8884bc5fad4a6eefe36fcf6234cc36b1' || siteCode == 'f9cf1800983e1365175617c8a5c038f5'){

        }else if(siteCode == '855198a37cac80fb60e76174cb254f2a'){

        }else if(siteCode == '823ef78c7ed94e905156905798cbd175' || siteCode == '46c09d9f3b1876712717e870aef3c9ee'){

        }else if(siteCode == 'f92f631b59331578ce787b753e999843'){

        }else if(siteCode == 'fb9d10335b551d5a76d36df2bc961951'){

        }else if(siteCode == 'e26206d28b34d13effba5e0e05940338'){

        }else if(siteCode == '58e8599b9d19d34e386c899fbc4508bc'){

        }else if(siteCode == 'b3fcbdee1891fe15dab55ad601d57543'){
            str= '金岸联通校园网营业厅'
        }
        return `温馨提示：${str}领取,寒暑假9元/月。`
    }
}(mui, document));

