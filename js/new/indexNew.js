/**
 * Created by Administrator on 2018/1/30.
 */

(function(mui, doc) {
    document.oncontextmenu=function(e) {return false}
    mui.init();
    var phone,password,securityCode;
    mui.plusReady(function() {});
    var siteFcode,UserNum,ifUser,packageId;
    var schoolArea,yuanArea,banArea;
    var schoolText,xuehaoText,yuanText,banText,realname;
    var canClick;
    $('#userName').text(localStorage.getItem('US_NAME'));
    //查询是否填写完资料
    cando();
    function cando(){
        mui.ajax(config.httpPath+'api/isPerfect', {
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
                if(ajaxData.meta.success === false){
                    canClick = false;
                    //var yes = '<button class="mui-btn mui-btn-block whitecolor horbackground ridus30px font18" style="margin: 10px 0;">确定</button>';
                    //var no =  '<button class="mui-btn mui-btn-block gray-8color background ridus30px font18" style="margin: 10px 0;">先看看</button>';
                    var btnArray = ['再看看', '确定'];
                        // '<li class=" mui-input-row height-auto margin-top10">'+
                        // '<label class=" mui-text-right lineheight-25px">院系</label>'+
                        // '<select name="select" id="select_k2" class="width50 grayborder padding-left-right10px">'+
                        // '<option value="0" class="graycolor">请选择你所在的院系</option>'+
                        // '</select>'+
                        // '<span class="iconfont icon-xiala down-pull"></span>'+
                        // '</li>'+
                        // '<li class=" mui-input-row height-auto margin-top10 ">'+
                        // '<label class=" mui-text-right lineheight-25px">班级</label>'+
                        // '<select name="select" id="select_k3" class="width50 grayborder padding-left-right10px">'+
                        // '<option value="0" class="graycolor">请选择你所在的班级</option>'+
                        // '</select>'+
                        // '<span class="iconfont icon-xiala down-pull"></span>'+
                        // '</li>'+
                    mui.confirm('<div class="font12 maincolor">温馨提示：请准确填写您的真实资料！如未开通宽带账号，请记住您的宽带用户名<br/>湘中幼师和大众传媒：<span style="color: red;">宽带账号填写身份证号码</span></div>' +
                        '<hr class="gray-8color"/>' +
                        '<ul class="font14 gray-8color">'+
                        '<li class=" mui-input-row height-auto">'+
                        '<label class=" mui-text-right lineheight-25px" style="padding: 11px 0px;">学校名称</label>'+
                        '<select name="select" id="select_k1" class="width50 grayborder padding-left-right10px">'+
                        '<option value="0" class="graycolor">请选择你所在的学校</option>'+
                        '</select>'+
                        '<span class="iconfont icon-xiala down-pull"></span>'+
                        '</li>'+
                        '<li class=" mui-input-row height-auto margin-top10">'+
                        '<label class=" mui-text-right lineheight-25px" style="padding: 11px 0px;">宽带账号</label>'+
                        '<input id="duixiang" class="width50 lineheight-25px height-auto grayborder padding-left-right10px" style="font-size: 14px;" type="text" placeholder="请输入学号">'+
                        '</li>'+
                        '<li class=" mui-input-row height-auto margin-top10">'+
                        '<label class=" mui-text-right lineheight-25px" style="padding: 11px 0px;">真实姓名</label>'+
                        '<input id="realname" class="width50 lineheight-25px height-auto grayborder padding-left-right10px" style="font-size: 14px;" type="text" placeholder="请输入真实姓名">'+
                        '</li>'+
                        '</ul>',
                        '完善以下资料使用服务',
                        btnArray,function(e) {
                            //alert(JSON.stringify(e));
                            if (e.index == 1) {
                                UserNum = $('#duixiang').val();
                                realname = $('#realname').val();
                                if(schoolArea == 'fb9d10335b551d5a76d36df2bc961951') {
                                    //湘中幼师
                                    if(UserNum.length < 16 || UserNum.length > 20){
                                        //alert('请输入正确的身份证号码');
                                        mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
                                    }else{
                                        tijiao11();
                                    }
                                }else if(schoolArea == '823ef78c7ed94e905156905798cbd175'){
                                    //长沙师范
                                    if(UserNum.length != 13){
                                        mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
                                    }else{
                                        tijiao11();
                                    }
                                }else if(schoolArea == '7d106cd0235bd777138e75e07e1ab593'){
                                    if(UserNum.length > 12){
                                        mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
                                    }else{
                                        tijiao11();
                                    }
                                }else{
                                    tijiao11();
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
                                function tijiao11(){
                                    //alert(schoolArea+'--'+yuanText+'--'+banText+'--'+UserNum+'--'+localStorage.getItem('id'));
                                    //alert(schoolArea !== '' && UserNum !== '' && schoolArea !== undefined && UserNum !== undefined);
                                    //if(schoolArea !== '' && UserNum !== '' && realname != '' && yuanText !='' && banText != '' && schoolArea !== undefined && UserNum !== undefined && realname != undefined && yuanText !=undefined && banText != undefined) {
                                    if(schoolArea !== '' && UserNum !== '' && realname != ''  && schoolArea !== undefined && UserNum !== undefined && realname != undefined) {
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
                                                    cando();
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
                                        mui.alert('由于资料填写不完整，提交失败','提示','确定',null,'div');
                                    }
                                }
                            } else {}
                            },'div');

                    //获取学校
                    getschool((ajaxData)=>{
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
                            if(schoolArea == 'fb9d10335b551d5a76d36df2bc961951' || schoolArea == '58e8599b9d19d34e386c899fbc4508bc'){
                                $('#duixiang').attr('placeholder','请输入身份证号码');
                            }else{
                                $('#duixiang').attr('placeholder','请输入学号');
                            }
                            if(schoolArea != '' || schoolArea != null){
                                // getyuan();
                            }
                        });
                    });
                    //用户名框失去焦点验证身份证号码
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
                        }else if(schoolArea == '7d106cd0235bd777138e75e07e1ab593'){
                            var phoneNum = $("#duixiang").val();
                            if(phoneNum.length > 12){
                                mui.alert("请输入正确的宽带账号！",'提示','确定',null,'div');
                            }else{
                                tijiao11();
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
                }else{
                    canClick = true;
                    siteFcode = ajaxData.data.site.fcode;
                    UserNum = ajaxData.data.workNumber;
                    localStorage.setItem('siteFcode',ajaxData.data.site.fcode);
                    localStorage.setItem('UserNum',ajaxData.data.workNumber);
                    localStorage.setItem('siteType',ajaxData.data.site.remark);
                    $('#stu_id').val(ajaxData.data.workNumber);
                    //if(canClick == true){
                        $('.school').removeClass('display-none');
                        $('.taocan').removeClass('display-none');
                        $('.yuan').removeClass('lineHeight');
                        $('.jine').removeClass('display-none');
                        $('.loadadd').addClass('loadTop');
                        $('.school').text(ajaxData.data.site.sitename);
                        checkKuandai();
                    //}
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                mui.toast('网络异常',{ duration:'long', type:'div'});
            }
        });
    }
    // 获取学校
    function getschool(dispose){
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
                    if(typeof dispose == 'function'){
                        dispose(ajaxData)
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

    //查询宽带用户个人信息
    var price,packageName,orderId,userId,userName;
    function checkKuandai(){
        mui.ajax(config.httpPath+'api/Broadband/queryUsermsg ', {
            data: {
                id:localStorage.getItem('id'),
                siteFcode:siteFcode,
                UserNum:UserNum
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post' , //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success == true){
                    userId = ajaxData.data.userId;
                    packageId = ajaxData.data.packageId;
                    //alert(packageId);
                    //头部显示更换
                    $('.jine').text(ajaxData.data.accountFee+'元');
                    $('#taocanName').text(ajaxData.data.packageName);
                    if(userName !== '' || userName !== 'undefined'){
                        $('#userName').text(ajaxData.data.userId);
                    }else{
                        $('#userName').text(localStorage.getItem('US_NAME'));
                    }
                    $('#taocanTime').text(formatDateTime1(ajaxData.data.periodLimitTime/1000));

                    //购物车的信息
                    $('#buyTaocan').text(ajaxData.data.packageName);
                    //$('#buyName').text(ajaxData.data.userName+'  学号：'+ajaxData.data.userId);
                    $('#buyName').text(ajaxData.data.userId);
                    $('#buyPrice').text(ajaxData.data.amount);
                    //$('#buyChannel').text('微信');
                }else{
                    //查询失败的时候返回上一页
                    //mui.alert(ajaxData.meta.message,'提示','返回上一页',function(e) {mui.back();},'div');
                    /*mui.openWindow({
                     url:'userInfo.html',
                     id:'userInfo.html',
                     extras:{}
                     });*/
                    ifUser = false;
                    //mui.alert(ajaxData.meta.message+',无法进行宽带缴费，请先开户','提示','确定',null,'div');
                    var btn = ["取消","去开户"];
                    mui.confirm('您还未开通宽带业务，请先开户','',btn,function(e) {
                        if (e.index == 1) {
                            setTimeout(function(){
                                mui.closePopup();
                                mui.openWindow({
                                    url:'../new/chooseTaocan.html',
                                    id:'chooseTaocan'+"&&?time="+new Date().getTime(),
                                    extras:{}
                                });
                            },500);
                        }
                    },'div');
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
            }
        });
    }
    //点击充值服务
    mui(".mui-content").on('tap','#huafei',function(){
        // mui.alert('此服务正在开发，敬请期待','提示','确定',null,'div');

        $('#chongzhifuwuon').removeClass('display-none');
    });
    //报检报修
    mui(".mui-content").on('tap','#xiyifu',function(){
        var personType;
        $.each([decryptByDES(localStorage.getItem('juese'),keyValue)],function(index,value){
            personType = value;
        });
        if(personType == '维修人员角色'){
            mui.openWindow({
                url:'../html-repair/repairRecordWorker.html',
                id:'repairRecordWorker',
                extras:{}
            });
        }else{
            mui.openWindow({
                url:'../html-repair/repairRecord.html',
                id:'xiyifu'+"&&?time="+new Date().getTime(),
                extras:{}
            });
        }
    });
    //点击热水
    // mui(".mui-content").on('tap','#reshui',function(){
        // mui.alert('此服务正在开发，敬请期待','提示','确定',null,'div');
        // window.MyApp.openSDK('ok!!!!');
    // });
    //点击宽带快速续费
    function fastCharge(){
        if(canClick == true){
            if(ifUser == false){
                //mui.alert('无法使用宽带业务，请先开户','提示','确定',null,'div');
                var btn = ["取消","去开户"];
                mui.confirm('您还未开通宽带业务，请先开户','',btn,function(e) {
                    if (e.index == 1) {
                        setTimeout(function(){
                            mui.closePopup();
                            mui.openWindow({
                                url:'../new/chooseTaocan.html',
                                id:'chooseTaocan'+"&&?time="+new Date().getTime(),
                                extras:{}
                            });
                        },500);
                    }
                },'div');
            }else{
                mui('#sheet1').popover('toggle');
            }
        }else{
            var btn = ["我不要","好的"];
            mui.confirm('请完善资料使用此服务','',btn,function(e) {
                if (e.index == 1) {
                    setTimeout(function(){
                        mui.closePopup();
                        mui.openWindow({
                            url:'../new/completeInformation.html',
                            id:'completeInformation',
                            extras:{}
                        });
                    },500);
                }
            },'div');
        }

    }
    mui(".mui-content").on('tap','#hurryBuy',function(){
        fastCharge()
    });
    // 点击热水缴费
    mui(".mui-content").on('tap','#huanTaocan',function(){
        if(canClick == true){
            if(ifUser == false){
                //mui.alert('您还未开通宽带业务，请先开户','提示','确定',null,'div');
                var btn = ["取消","去开户"];
                mui.confirm('您还未开通宽带业务，请先开户','',btn,function(e) {
                    if (e.index == 1) {
                        setTimeout(function(){
                            mui.closePopup();
                            mui.openWindow({
                                url:'../new/chooseTaocan.html',
                                id:'chooseTaocan'+"&&?time="+new Date().getTime(),
                                extras:{}
                            });
                        },500);
                    }
                },'div');
            }else{
                setTimeout(function(){
                    mui.closePopup();
                    mui.openWindow({
                        url:'../new/changeDetail.html?packageId='+packageId,
                        id:'changeDetail'+"&&?time="+new Date().getTime(),
                        extras:{}
                    });
                },500);
            }
        }else{
            var btn = ["我不要","好的"];
            mui.confirm('请完善资料使用此服务','',btn,function(e) {
                if (e.index == 1) {
                    setTimeout(function(){
                        mui.closePopup();
                        mui.openWindow({
                            url:'../new/completeInformation.html',
                            id:'completeInformation',
                            extras:{}
                        });
                    },500);
                }
            },'div');
        }
    });
    //点击资费说明
    mui(".mui-content").on('tap','.yuan4',function(){
        if(canClick == true){
            mui.openWindow({
                url:'../html-kuanDaiPay/zfShuoming.html',
                id:'zfShuoming',
                extras:{}
            });
        }else{
            var btn = ["我不要","好的"];
            mui.confirm('请完善资料使用此服务','',btn,function(e) {
                if (e.index == 1) {
                    setTimeout(function(){
                        mui.closePopup();
                        mui.openWindow({
                            url:'../new/completeInformation.html',
                            id:'completeInformation',
                            extras:{}
                        });
                    },500);
                }
            },'div');
        }

    });
    //点击缴费历史
    mui(".mui-content").on('tap','.yuan2',function(){
        if(canClick == true){
            if(ifUser == false){
                //mui.alert('您还未开通宽带业务，请先开户','提示','确定',null,'div');
                var btn = ["取消","去开户"];
                mui.confirm('您还未开通宽带业务，请先开户','',btn,function(e) {
                    if (e.index == 1) {
                        setTimeout(function(){
                            mui.closePopup();
                            mui.openWindow({
                                url:'../new/chooseTaocan.html',
                                id:'chooseTaocan'+"&&?time="+new Date().getTime(),
                                extras:{}
                            });
                        },500);
                    }
                },'div');
            }else{
                setTimeout(function(){
                    mui.closePopup();
                    mui.openWindow({
                        url:'../html-kuanDaiPay/record.html',
                        id:'record',
                        extras:{}
                    });
                },500);
            }
        }else{
            var btn = ["我不要","好的"];
            mui.confirm('请完善资料使用此服务','',btn,function(e) {
                if (e.index == 1) {
                    setTimeout(function(){
                        mui.closePopup();
                        mui.openWindow({
                            url:'../new/completeInformation.html',
                            id:'completeInformation',
                            extras:{}
                        });
                    },500);
                }
            },'div');
        }
    });
    //点击宽带缴费
    mui(".mui-content").on('tap','.yuan3',function(){
        if(canClick == true){
            mui.openWindow({
                url:'../html-kuanDaiPay/schoolWifiPay.html',
                id:'schoolWifiPay'+"&&?time="+new Date().getTime(),
                extras:{}
            });
        }else{
            var btn = ["我不要","好的"];
            mui.confirm('请完善资料使用此服务','',btn,function(e) {
                if (e.index == 1) {
                    setTimeout(function(){
                        mui.closePopup();
                        mui.openWindow({
                            url:'../new/completeInformation.html',
                            id:'completeInformation'+"&&?time="+new Date().getTime(),
                            extras:{}
                        });
                    },500);
                }
            },'div');
        }
    });
    //点击续费套餐
    var clickAble = false;
    function renew(){
        
        if(!clickAble) {
            //按一次
            clickAble = true
            // clickAble = new Date().getTime();
            // setTimeout(function(){clickAble = null}, 3000);
            //var buyPrice = $('#buyPrice').text();
            var amount = $('#buyPrice').text();
            var wxChannel = null; // 微信支付
            var aliChannel = null; // 支付宝支付
            var channel = null;   //支付通道
            //获取订单Id
            mui.ajax(config.httpPath+'api/Broadband/queryOrderId', {
                data: {},
                dataType: 'json', //服务器返回json格式数据
                type: 'post' , //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                beforeSend: function(request) {
                    request.setRequestHeader("X-Token",localStorage.getItem('token'));
                },
                success: function(ajaxData) {
                    //服务器返回响应，根据响应结果，分析是否成功；
                    //alert(JSON.stringify(ajaxData));
                    if(ajaxData !== ''){
                        //mui.toast(ajaxData.meta.message);
                        orderId = ajaxData;
                        if(mui.os.wechat){
                            //alert(amount+'--'+userId+'--'+localStorage.getItem('id')+'---'+siteFcode+'--'+orderId);
                            mui.ajax(config.httpPath+'api/Broadband/toPay_wx', {
                                data: {
                                    amount:amount,
                                    userId:userId,
                                    id:localStorage.getItem('id'),
                                    siteCode:siteFcode,
                                    orderId:orderId,
                                    foreignId: '',
                                    foreignType:'0'
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
                                    if(ajaxData !== '' && ajaxData !== 'null'){
                                        //mui.toast(ajaxData.meta.message);
                                        mui.openWindow({
                                            url:ajaxData.data,
                                            id:ajaxData.data,
                                            extras:{}
                                        });
                                    }else{
                                        //mui.toast(ajaxData.meta.message);
                                        mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
                                    }
                                    clickAble = false
                                },
                                error: function(xhr, type, errorThrown) {
                                    //异常处理；
                                    console.log(type);
                                    mui.toast('网络异常，请稍后再试');
                                    clickAble = false
                                }
                            });
                        }else{
                            startWXPAY();
                        }
                    }else{
                        //mui.toast(ajaxData.meta.message);
                        clickAble = false
                        mui.alert('<a class="maincolor">支付请求不成功，请重试</a>','提示','知道了',null,'div');
                    }
                },
                error: function(xhr, type, errorThrown) {
                    //异常处理；
                    console.log(type);
                    mui.toast('网络异常，请稍后再试');
                    clickAble = false
                }
            });
            //startWXPAY();
            function startWXPAY()
            {
                //调用pay()方法 发起支付即可
                pay();
                //定义支付通道
                var channel = null;
                //获取支付通道
                getChannels();
                //获取支付通道的方法
                function getChannels() {
                    if(window.plus){
                        plus.payment.getChannels(function(channels) {
                            for (var i = 0; i < channels.length; i++) {
                                if (channels[i].id == "wxpay") {
                                    channel = channels[i];
                                    plus.ui.toast("等待微信支付中");
                                }
                            }
                        }, function(e) {
                            plus.ui.toast("获取支付通道失败!");
                            clickAble = false
                            //console.log("获取支付通道失败!");
                        });
                    }else{
                        mui.toast('需手机APP才能支付');
                        clickAble = false
                        /*document.addEventListener( "plusready", plusReady, false );
                         plusReady();*/
                    }
                }
                //发起微信支付请求的方法
                function pay() {
                    //获取微信支付参数的url
                    //alert(amount+'--'+userId+'--'+localStorage.getItem('id')+'--'+siteFcode+'--'+orderId+"----"+client);
                    console.log('amont~~~~~~~~~>',amount)
                    if (!amount){
                        mui.toast('请更换套餐！');
                        return false
                    }
                    mui.ajax(config.httpPath+'api/Broadband/toPay', {
                        data: {
                            amount:amount,
                            userId:userId,
                            id:localStorage.getItem('id'),
                            siteCode:siteFcode ,
                            orderId:orderId,
                            foreignId: '',
                            foreignType:'0'
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Token",localStorage.getItem('token'));
                        },
                        success: ajax_success_callback,
                        error: ajax_error_callback
                    });
                    //获取微信支付参数成功的回调函数
                    function ajax_success_callback(resObj) {
                        //alert(JSON.stringify(resObj));
                        if (window.plus){
                            var res_str = JSON.stringify(resObj);
                            //用返回参数 发起微信支付请求
                            //alert('1212'+res_str);
                            plus.payment.request(channel, res_str, wxpay_success, wxpay_error);
                        }else{
                           /* if(mui.os.ios){

                            }*/
                            mui.toast('需手机APP才能支付，ajax');
                            clickAble = false
                            //document.addEventListener( "plusready", plusReady, false );
                        }
                    }
                    //获取微信支付参数失败的回调函数
                    function ajax_error_callback(e) {
                        plus.ui.alert("ajax获取参数失败");
                        clickAble = false
                    }
                    //微信支付成功回调
                    function wxpay_success(result) {
                        var timestamp=new Date().getTime();
                        //alert(location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId);
            //window.location.href = location.origin+"mobile/html-kuanDaipay/PayList.html"+"?timestamp="+timestamp;
            //window.location.href = location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId;
                        mui.openWindow({
                            url:location.origin+'/mobileApp/html-kuanDaiPay/payList.html?timestamp='+timestamp+'&&orderId='+orderId,
                            id:'payList.html'+"?time="+new Date().getTime(),
                            extras:{}
                        });
                        clickAble = false
                    }
                    //微信支付失败回调
                    function wxpay_error(error) {
                        plus.ui.alert("支付失败!");
                        clickAble = false
                    }
                }
            }
            return false;
        } else {
            //重复按了几次
            mui.toast('请求正在发送中，请勿重复点击');
            // return (new Date().getTime() - clickAble) < 3000;
        }
    }
    var scGoalText,scArea=null; // 学校 text 和 id
    mui(".mui-content").on('tap','#submit',function(){
        renew()
    });
    // 关闭充值服务
    function closeCharge(){
        $('#chongzhicontent').removeClass('display-none')
        $('#dangqiantaocanxufei').removeClass('maincolor');
        $('#qitataocanxufei').removeClass('maincolor');

        $('#selectSc').html('<option value="0" class="graycolor">请选择学校</option>');
        $('#studentId').val('');
        scGoalText=null;
        scArea=null;

        $('#chongzhifuwuon').addClass('display-none')
        $('#kuandaichongzhi-d').addClass('display-none')
        $($('#dangqiantaocanxufei').children()[0]).addClass('display-none');
        $($('#qitataocanxufei').children()[0]).addClass('display-none');
        $('#qitataocanxufei-deatil').addClass('display-none')
        $('#available').addClass('display-none')

    }
    mui('.mui-content').on('tap','#chongzhifuwuoff',function(){
        closeCharge()
    });
    // 宽带充值
    mui('.mui-content').on('tap','#kuandaichongzhi',function(){
        $('#chongzhicontent').addClass('display-none')
        $('#kuandaichongzhi-d').removeClass('display-none')
    })
    // 生活充值
    mui('.mui-content').on('tap','#shenghuochongzhi',function(){
        mui.openWindow({
            url:'../html-reshuijiaofei/reshuijiaofei.html',
            id:'reshuijiaofei'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    })
    // 话费充值
    mui('.mui-content').on('tap','#huafeichongzhi',function(){
        mui.openWindow({
            url:'../html-huaFei/jiaoHuaFei.html',
            id:'jiaoHuaFei'+"&&?time="+new Date().getTime(),
            extras:{}
        });
    })
    // 点击当前套餐续费
    mui('.mui-content').on('tap','#dangqiantaocanxufei',function(){
        $($('#dangqiantaocanxufei').children()[0]).removeClass('display-none');
        $('#dangqiantaocanxufei').addClass('maincolor');
        $($('#qitataocanxufei').children()[0]).addClass('display-none');
        $('#qitataocanxufei').removeClass('maincolor');
        $('#qitataocanxufei-deatil').addClass('display-none')
        closeCharge();
        fastCharge();
    })
    // 点击其它套餐续费
    mui('.mui-content').on('tap','#qitataocanxufei',function(){
        $($('#qitataocanxufei').children()[0]).removeClass('display-none');
        $('#qitataocanxufei').addClass('maincolor');
        $($('#dangqiantaocanxufei').children()[0]).addClass('display-none');
        $('#dangqiantaocanxufei').removeClass('maincolor');
        $('#qitataocanxufei-deatil').removeClass('display-none')
        getschool((ajaxData)=>{
            var result= '<option value="mo"  selected="true">请选择学校</option>';
            for(var i=0;i<ajaxData.data.lists.length;i++){
                result += '<option value="'+i+'">'+ajaxData.data.lists[i].opText+'</option>';
            }
            $('#selectSc').html(result);
            //select选择类型查询
            $('#selectSc').change(function(e){
                var schoolGoal='';
                var x=document.getElementById("selectSc");
                var type= x.options[x.selectedIndex].value;
                schoolGoal = x.options[x.selectedIndex].text;
                scArea = ajaxData.data.lists[type].opValue;
                scGoalText = schoolGoal;
            });
        })
    })
    // 其它套餐上一步
    mui('.mui-content').on('tap','#btnup',function(){
        $($('#qitataocanxufei').children()[0]).addClass('display-none');
        $('#qitataocanxufei').removeClass('maincolor');
        $('#qitataocanxufei-deatil').addClass('display-none')
        $($('#dangqiantaocanxufei').children()[0]).addClass('display-none');
        $('#dangqiantaocanxufei').removeClass('maincolor');

        $('#selectSc').html('<option value="0" class="graycolor">请选择学校</option>');
        $('#studentId').val('');
        scGoalText=null;
        scArea=null;
    })
    // 其它套餐下一步
    mui('.mui-content').on('tap','#btndown',function(){
        var id = $('#studentId').val().trim();
        if(scGoalText && id){
            mui.ajax(config.httpPath+'api/Broadband/queryUserIsExist', {
                data: {
                    siteFcode:scArea,
                    UserNum:id
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post' , //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                beforeSend: function(request) {
                    request.setRequestHeader("X-Token",localStorage.getItem('token'));
                },
                success: function(ajaxData) {
                    //服务器返回响应，根据响应结果，分析是否成功；
                    if(ajaxData.meta.success == true){
                        mui.toast(ajaxData.meta.message);
                        $('#available').addClass('display-none')
                        mui.openWindow({
                            url:'../html-kuanDaiPay/jiaofei.html?siteFcode='+scArea+"&&UserNum="+id+"&&?time="+new Date().getTime(),
                            id:'jiaofei.html'+"&&?time="+new Date().getTime(),
                            extras:{}
                        });
                    }else{
                        $('#available').removeClass('display-none')
                    }
                },
                error: function(xhr, type, errorThrown) {
                    //异常处理；
                    console.log(type);
                    mui.toast('网络异常，请稍后再试');
                }
            });
        }else {
            if(!scGoalText){
                mui.toast('请选择学校！')
            }else if(!id){
                mui.toast('缴费账号不能为空！')
            }
        }
    })

}(mui, document));

