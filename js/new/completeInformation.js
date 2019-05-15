/**
 * Created by Administrator on 2018/2/1.
 */
(function(mui, doc) {
    mui.init();
    var phone,password,securityCode;
    var old_back = mui.back;
    mui.back = function(){
        mui.openWindow({
            url:'tabbarNew.html',
            id:'tabbarNew',
            extras:{}
        });
    }
    mui.plusReady(function() {
        plus.key.addEventListener('backbutton', function() {
            mui.currentWebview.opener().show('none');
            old_back();
        }, false);
    });
    var schoolArea,schoolText,yuanArea,yuanText,banArea,banText,realname;
    //sessionStorage.setItem("need-refresh", true);
    //获取学校
    getschool();
    function getschool(){
        mui.ajax(config.httpPath+'api/getSchool', {
            data: {},
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert(JSON.stringify(ajaxData));
                //如果没有区域则隐藏改选项及子选项
                if(ajaxData.meta.success == true){
                    var result= '<option value="mo"  selected="true">请选择学校</option>';
                    for(var i=0;i<ajaxData.data.lists.length;i++){
                        result += '<option value="'+i+'">'+ajaxData.data.lists[i].opText+'</option>';
                    }
                    $('#select_k1').html(result);
                    //select选择类型查询
                    $('#select_k1').change(function(e){
                        var schoolBig='';
                        var x=document.getElementById("select_k1");
                        //alert(x.options[x.selectedIndex].text);
                        var type= x.options[x.selectedIndex].value;
                        schoolBig = x.options[x.selectedIndex].text;
                        schoolArea = ajaxData.data.lists[type].opValue;
                        //alert(schoolArea);
                        schoolText = schoolBig;
                        if(schoolArea == 'fb9d10335b551d5a76d36df2bc961951' || schoolArea == '58e8599b9d19d34e386c899fbc4508bc' ){
                            $('#duixiang').attr('placeholder','请输入身份证号码并注意x小写');
                        }else{
                            $('#duixiang').attr('placeholder','请输入学号');
                        }
                        if(schoolArea != '' || schoolArea != null){
                            getyuan();
                        }
                    });
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
    //宽带用户名框失去焦点验证身份证号码
    $("#duixiang").blur(function(){
        if(schoolArea == 'fb9d10335b551d5a76d36df2bc961951') {
            //湘中幼师
            var phoneNum = $("#duixiang").val();
            //alert(phoneNum.length);
            //if (!phoneNum || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(phoneNum)) {
            if(phoneNum.length < 16 || phoneNum.length > 20){
                //alert('请输入正确的身份证号码');
                mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
            }
        }else if(schoolArea == '823ef78c7ed94e905156905798cbd175'){
            //长沙师范
            var phoneNum = $("#duixiang").val();
            if(phoneNum.length != 13){
                mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
            }
        }/*else if(schoolArea == '855198a37cac80fb60e76174cb254f2a'){
            //航空
            var phoneNum = $("#duixiang").val();
            if(phoneNum.length != 12){
                mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
            }
        }else if(schoolArea == '46c09d9f3b1876712717e870aef3c9ee'){
            //机电
            var phoneNum = $("#duixiang").val();
            if(phoneNum.length != 12){
                mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
            }
        }*/
    });
    //获取院系
    function getyuan(){
        mui.ajax(config.httpPath+'api/getDepartments', {
            data: {
                code:schoolArea
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert(JSON.stringify(ajaxData));
                //如果没有区域则隐藏改选项及子选项
                if(ajaxData.meta.success == true){
                    var result= '<option value="mo"  selected="true">请选择院系</option>';
                    for(var i=0;i<ajaxData.data.lists.length;i++){
                        result += '<option value="'+i+'">'+ajaxData.data.lists[i].opText+'</option>';
                    }
                    $('#select_k2').html(result);
                    //select选择类型查询
                    $('#select_k2').change(function(e){
                        var yuan='';
                        var x=document.getElementById("select_k2");
                        //alert(x.options[x.selectedIndex].text);
                        var type= x.options[x.selectedIndex].value;
                        yuan = x.options[x.selectedIndex].text;
                        yuanArea = ajaxData.data.lists[type].opValue;
                        yuanText = yuan;
                        //alert(yuanArea);
                        if(yuanArea != '' || yuanArea != null){
                            getban();
                        }
                    });
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
    //获取班级
    function getban(){
        mui.ajax(config.httpPath+'api/getClasssess', {
            data: {
                dept_code:yuanArea
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success == true){
                    var result= '<option value="mo"  selected="true">请选择班级</option>';
                    for(var i=0;i<ajaxData.data.lists.length;i++){
                        result += '<option value="'+i+'">'+ajaxData.data.lists[i].opText+'</option>';
                    }
                    $('#select_k3').html(result);
                    //select选择类型查询
                    $('#select_k3').change(function(e){
                        var ban='';
                        var x=document.getElementById("select_k3");
                        //alert(x.options[x.selectedIndex].text);
                        var type= x.options[x.selectedIndex].value;
                        ban = x.options[x.selectedIndex].text;
                        banArea = ajaxData.data.lists[type].opValue;
                        banText = ban;
                    });
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

    mui(".mui-content").on('tap','#submit',function(){
        var UserNum = $('#duixiang').val();
        realname = $('#realname').val();
        if(schoolArea == 'fb9d10335b551d5a76d36df2bc961951') {
            //湘中幼师
            if(UserNum.length < 16 || UserNum.length > 20){
                //alert('请输入正确的身份证号码');
                mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
            }else{
                tijiao();
            }
        }else if(schoolArea == '823ef78c7ed94e905156905798cbd175'){
            //长沙师范
            if(UserNum.length != 13){
                mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
            }else{
                tijiao();
            }
        }else{
            tijiao();
        }/*else if(schoolArea == '855198a37cac80fb60e76174cb254f2a'){
         //航空
         var phoneNum = $("#duixiang").val();
         if(phoneNum.length != 12){
         mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
         }
         }else if(schoolArea == '46c09d9f3b1876712717e870aef3c9ee'){
         //机电
         var phoneNum = $("#duixiang").val();
         if(phoneNum.length != 12){
         mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
         }
         }*/
        //提交用户完善的资料
        function tijiao(){
            //if(schoolArea !== '' && yuanText !== '' && banText !== '' && UserNum !== '' && schoolArea !== undefined && UserNum !== undefined){
            //if(schoolArea !== '' && UserNum !== '' && realname != '' && yuanText !='' && banText != '' && schoolArea !== undefined && UserNum !== undefined && realname != undefined && yuanText !=undefined && banText != undefined) {
            if(schoolArea !== '' && UserNum !== '' && realname != '' && schoolArea !== undefined && UserNum !== undefined && realname != undefined) {
                //alert(schoolArea+'--'+yuanText+'--'+banText+'--'+UserNum+'--'+localStorage.getItem('id'));
                mui.ajax(config.httpPath+'api/perfectInformation', {
                    data: {
                        id:localStorage.getItem('id'),
                        siteCode:schoolArea,
                        realname:realname,
                        deptName:typeof(yuanText)=="undefined"?"":yuanText,
                        className:typeof(banText)=="undefined"?"":banText,
                        workNumber:UserNum
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 10000, //超时时间设置为10秒；
                    beforeSend: function(request) {
                        request.setRequestHeader("X-Token",localStorage.getItem('token'));
                    },
                    success: function(ajaxData) {
                        //服务器返回响应,根据响应结果,分析是否成功；
                        //alert(JSON.stringify(ajaxData));
                        if(ajaxData.meta.success == true){
                            localStorage.setItem('realname',realname);
                            mui.openWindow({
                                url:'../new/tabbarNew.html',
                                id:'tabbarNew',
                                extras:{}
                            });
                            //mui.back();
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
            }else{
                mui.alert('请完善好个人资料再提交','提示','确定',null,'div');
            }
        }

    });
}(mui, document));

