/**
 * Created by Administrator on 2018/7/24.
 */
(function(mui, doc) {
    /* var tag = new Uri(location.href).getQueryParamValue('tag');
     alert(tag);*/
    var yesData = false;
    mui.plusReady(function() {});
    mui.init();
    var siteCode =new Uri(location.href).getQueryParamValue('siteCode');

    /**
     * 选择号码业务实现
     */
    $(".mui-table-view-cell").click(function(){
        $(".changeone,.changebox").show();
            $('.changeone ul').html('');
            $('#second').removeClass('display-none');
            setTimeout(function() {
                getTaocan();
            }, 300);

    });


    mui(".mui-icon-close")[0].addEventListener('tap',function(){
        $(".changeone,.changebox").hide();
    });


    //选择套餐
    function getTaocan(){
        var table = document.body.querySelector('.changeone ul');
        //alert(pageNo);
        //alert(keyWord);
        mui.ajax(config.httpPath+'api/serPayCustomize/getSerPayCustomizeTypeList', {
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
						li.style = 'min-width : 50%';
                        li.innerHTML = '<a href="#" data-id="' + ajaxData.data[i].id + '" data-taocan="' + ajaxData.data[i].name + '" data-amount="' + ajaxData.data[i].amount + '" class="choosetaocan">'
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
var taocanid,taocanname,amount;
    mui(".changeone").on('tap','.choosetaocan',function(){
        //若果是当前的可选套餐和不可选套餐
        var click = $(this);
        taocanid = $(this).data('id');
        taocanname = $(this).data('taocan');
        amount = $(this).data('amount');
        //$("#phoneNum").each(function() {
        //    $('#serNumbertaocan').attr("value",taocanname);
            $('#setName').val(taocanname);
            $('#money').html(amount+" 元");
            $(".changeone,.changebox").hide();
        //});
    });

/**/

    function information(){
        var studentId = $('#studentId').val();
        var name = $('#name').val();
        var mobileno = $('#mobileno').val();
        var cardNumber = $('#cerId').val();
        var dormitoryAddress = $('#dormitoryAddress').val();
        var setName = $('#setName').val();
        if(setName != ''&& setName != undefined ) {
        }else{
            mui.alert('选择套餐不能为空','提示','确定',null,'div');
            return false;
        }
        if(amount != ''&& amount != undefined ) {
        }else{
            mui.alert('缴费金额不能为空','提示','确定',null,'div');
            return false;
        }
        if(studentId != ''&& studentId != undefined ) {
        }else{
            mui.alert('上网账号不能为空','提示','确定',null,'div');
            return false;
        }

        if(name != ''&& name != undefined ) {
        }else{
            mui.alert('姓名不能为空','提示','确定',null,'div');
            return false;
        }
        /*身份证号码*/
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
        if(dormitoryAddress != ''&& dormitoryAddress != undefined ) {
        }else{
            mui.alert('地址不能为空','提示','确定',null,'div');
            return false;
        }
    }

    $("#studentId").blur(function(){
        var name = $('#studentId').val();
        if(studentId != ''&& studentId != undefined ) {
        }else{
            mui.alert('上网账号不能为空','提示','确定',null,'div');
        }
    });

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
        //alert(false != information());
        if(false != information()){
            SerNumber();
        }
        /**/
        function SerNumber(){
            //alert(1414);
            mui.ajax(config.httpPath+'api/serPayCustomize/addSerPayCustomize', {
                data: {
                    studentId : $('#studentId').val(),
                    siteCode:siteCode,
                    serSetsId:taocanid,
                    name:$("#name").val(),
                    mobileno:$("#mobileno").val(),
                    cerId:$("#cerId").val(),
                    dormitoryAddress:$("#dormitoryAddress").val(),
                    setName:taocanname,
                    //amount:$('#serNumbermoney').val()
                    amount:amount
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function(ajaxData) {
                    //服务器返回响应，根据响应结果，分析是否成功；
                    //alert(JSON.stringify(ajaxData));
                    if(ajaxData.meta.success == false){
                        mui.alert(ajaxData.meta.message,'提示','确定',null,'div');
                    }else{
                        mui.openWindow({
                            url:ajaxData.data,
                            id:ajaxData.data,
                            extras:{}
                        });

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

}(mui, document));

