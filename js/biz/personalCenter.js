/**
 * Created by Administrator on 2017/7/13.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {

    });
    //选择民族
    mui.ready(function() {
        //普通示例
        var userPicker = new mui.PopPicker();
        userPicker.setData([
            {text: '汉族'}, {text: '壮族'}, {text: '满族'}, {text: '回族'}, {text: '苗族'}, {text: '维吾尔族'},
            {text: '土家族'}, {text: '彝族'}, {text: '蒙古族'}, {text: '藏族'}, {text: '布依族'}, {text: '侗族'},
            {text: '瑶族'},{text: '朝鲜族'},{text: '白族'},{text: '哈尼族'},{text: '哈萨克族'},{text: '黎族'},
            {text: '傣族'},{text: '畲族'},{text: '傈僳族'},{text: '仡佬族'},{text: '东乡族'},{text: '高山族'},
            {text: '拉祜族'},{text: '水族'},{text: '佤族'},{text: '纳西族'},{text: '羌族'},{text: '土族'},{text: '仫佬族'},
            {text: '锡伯族'},{text: '柯尔克孜族'},{text: '达斡尔族'},{text: '景颇族'},{text: '毛南族'},{text: '撒拉族'},
            {text: '布朗族'}, {text: '塔吉克族'},{text: '阿昌族'},{text: '普米族'},{text: '鄂温克族'},{text: '怒族'},
            {text: '京族'},{text: '基诺族'}, {text: '德昂族'},{text: '保安族'},{text: '俄罗斯族'},{text: '裕固族'},
            {text: '乌孜别克族'},{text: '门巴族'},{text: '鄂伦春族'},{text: '独龙族'},{text: '塔塔尔族'},
            {text: '赫哲族'},{text: '珞巴族'},
        ]);
        var showUserPickerButton = document.getElementById('showUserPicker');
        var userResult = document.getElementById('userResult');
        showUserPickerButton.addEventListener('tap', function(event) {
            userPicker.show(function(items) {
                //userResult.innerText = items[0].text;
                var nation = items[0].text;
                //返回 false 可以阻止选择框的关闭
                //return false;
                mui(".mui-content").on('tap','#logout',function(){
                    /*var btn = ["取消","确定"];
                     mui.confirm('确定退出程序？','温馨提示',btn,function(e) {
                     if (e.index == 1) {*/
                    mui.ajax(config.httpPath+'api/sysUser/updateNation', {
                        data: {
                            id:localStorage.getItem('id'),
                            nation:nation
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post' , //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        //headers:{"X-Token": sessionStorage.getItem('token')},
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Token",localStorage.getItem('token'));
                        },
                        success: function(ajaxData) {
                            //服务器返回响应，根据响应结果，分析是否成功；
                            //alert(JSON.stringify(ajaxData));
                            if(ajaxData.meta.success == true){
                                userResult.innerText = nation;
                                mui.toast(ajaxData.meta.message);
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
                    /*}*/
                    //});
                });
            });
        }, false);
    });

    //点击消息
    mui("body").on('tap','#news',function(){
        mui.openWindow({
            url:'../notice/notice.html',
            id:'notice',
            extras:{
            }
        });
    });

    //查询个人信息
    personInfo();
    function personInfo(){
        mui.ajax(config.httpPath+'api/sysUser/123456', {
            data: {
                id:localStorage.getItem('id')
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                //alert(ajaxData.data.jobLevel);
                if(ajaxData.meta.success == true){
                    localStorage.setItem("realName",ajaxData.data.realname);
                    localStorage.setItem("IdCard",ajaxData.data.certificateNo);
                    var nameTag = '<span class="iconfont icon-tiwen whitecolor font12"></span>';
                    if(ajaxData.data.username == '' || ajaxData.data.username == null){
                        $('#username').html('点击设置用户名'+nameTag);
                    }else{
                        $('#username').html(ajaxData.data.username+nameTag);
                    }
                    if(ajaxData.data.workNumber){
                        $('#studyNumber').text(ajaxData.data.workNumber);
                    }else{
                        mui(".mui-content").on('tap','#studyNumber',function(){
                            mui.openWindow({
                                url:'setStu-workNumber.html',
                                id:'setStu-workNumber',
                                extras:{}
                            });
                        });
                    }
                    if(ajaxData.data.userType === 2){
                        //学生身份
                        $('#teacherYuan').addClass('display-none');
                        $('#work_phone').addClass('display-none');
                        $('#short_phone').addClass('display-none');
                    }else{
                        //非学生身份
                        $('#teacherYuan').removeClass('display-none');
                        $('#stuYuan').addClass('display-none');
                        $('#zhengzhi').addClass('display-none');
                        $('#minzu').addClass('display-none');
                    }
                    $('#yuanBu').text(ajaxData.data.deptName);
                    $('#zhiwu').text(ajaxData.data.jobLevel);
                    $('#zhuanYe').text(ajaxData.data.major);
                    //alert(ajaxData.data.workNumber);
                    $('#classNumber').text(ajaxData.data.classname);
                    $('#inYear').text(ajaxData.data.enrollmentYear);
                    $('#name').text(ajaxData.data.realname);
                    var sex = '男';
                    if(ajaxData.data.sex === 1){
                        sex = '女';
                    }else{
                        sex = '男';
                    }
                    $('#sex').text(sex);
                    var day = formatDateTime1(ajaxData.data.birthday/1000);
                    $('#birthday').text(day);
                    $('#political').text(ajaxData.data.politicalStatus);
                    $('#userResult').text(ajaxData.data.nation);
                    $('#bangong_num').text(ajaxData.data.officePhone);
                    $('#phone_short').text(ajaxData.data.mobileno);
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
    }
    //点击性别
    mui(".mui-content").on('tap','#xingbie',function(){
        mui.openWindow({
            url:'setSex.html?',
            id:'setSex',
            extras:{
            }
        });
    });
    //选择生日
    var btns = mui('#shengri');
    btns.each(function(i, btn) {
        btn.addEventListener('tap', function() {
            var optionsJson = this.getAttribute('data-options') || '{}';
            var options = JSON.parse(optionsJson);
            var id = this.getAttribute('id');
            /*
             * 首次显示时实例化组件
             * 示例为了简洁，将 options 放在了按钮的 dom 上
             * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
             */
            var picker = new mui.DtPicker(options);
            picker.show(function(rs) {
                picker.dispose();
                //alert("您选择的时间是："+rs.text);
                //显示筛选的条件
                //$('#text').css('display','block');
                //$('#birthday').text(rs.text);
                mui.ajax(config.httpPath+'api/sysUser/updateBirthday', {
                    data: {
                        id:localStorage.getItem('id'),
                        birthday:rs.text
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
                        if(ajaxData.meta.success == true){
                            $('#birthday').text(rs.text);
                            mui.toast(ajaxData.meta.message);
                        }else{
                            mui.toast(ajaxData.meta.message);
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                        mui.toast(ajaxData.meta.message);
                    }
                });
            });
        }, false);
    });
    //选择政治面貌
    $('.btn-sty').on("click",function(){
        //alert($(this).text());
        //显示筛选的条件
        //$('#political').text($(this).text());
        var politicalStatus = $(this).text();
        mui('#popover').popover('hide');
        //修改政治面貌的接口
        mui(".mui-content").on('tap','#logout',function(){
            /*var btn = ["取消","确定"];
            mui.confirm('确定退出程序？','温馨提示',btn,function(e) {
                if (e.index == 1) {*/
                    mui.ajax(config.httpPath+'api/sysUser/updatePoliticalStatus', {
                        data: {
                            id:localStorage.getItem('id'),
                            politicalStatus:politicalStatus
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post' , //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        //headers:{"X-Token": sessionStorage.getItem('token')},
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Token",localStorage.getItem('token'));
                        },
                        success: function(ajaxData) {
                            //服务器返回响应，根据响应结果，分析是否成功；
                            //alert(JSON.stringify(ajaxData));
                            if(ajaxData.meta.success == true){
                                mui.toast(ajaxData.meta.message);
                                $('#political').text(politicalStatus);
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
                /*}*/
            //});
        });
    })
    //点击账号与安全
    document.getElementById("safeSeting").addEventListener('tap',function(){
        //点击响应逻辑
        mui.openWindow({
            url:'safeSeting.html',
            id:'safeSeting',
            extras:{
            }
        });
    });
    //点击用户名修改名字
    mui(".mui-content").on('tap','#username',function(){
        //点击响应逻辑
        mui.openWindow({
            url:'setUsername.html',
            id:'setUsername',
            extras:{}
        });
    });
    //点击安全退出
    mui(".mui-content").on('tap','#logout',function(){
        //closeApp();
        function closeApp() {
            plus.nativeUI.actionSheet({
                cancel: "取消",
                buttons: [{
                    title: "注销当前账号"
                }, {
                    title: "直接关闭应用"
                }]
            }, function(e) {
                var index = e.index;
                switch (index) { //case 0: 取消
                    case 1: //
                        localStorage.clear();
                        plus.runtime.restart();
                        break;
                    case 2: //
                        plus.runtime.quit();
                        break;
                }
            });
        };

        var btn = ["取消","确定"];
         mui.confirm('确定退出此账号？','温馨提示',btn,function(e) {
         if (e.index == 1) {
             //先解绑在退出
             mui.ajax(config.httpPath+'api/unBindAlias', {
                 data: {
                     id:localStorage.getItem('id'),
                     cid:localStorage.getItem('clientid')
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
                         mui.toast(ajaxData.meta.message);
                         out();
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
             //alert(config.httpPath+'api/logout');
             //退出操作
             function out(){
                 mui.ajax(config.httpPath+'api/logout', {
                     data: {
                         id:localStorage.getItem('id'),
                         token:localStorage.getItem('token')
                     },
                     dataType: 'json', //服务器返回json格式数据
                     type: 'post' , //HTTP请求类型
                     timeout: 10000, //超时时间设置为10秒；
                     //headers:{"X-Token": sessionStorage.getItem('token')},
                     beforeSend: function(request) {
                         request.setRequestHeader("X-Token",localStorage.getItem('token'));
                     },
                     success: function(ajaxData) {
                         //服务器返回响应，根据响应结果，分析是否成功；
                         //alert(JSON.stringify(ajaxData));
                         if(ajaxData.meta.success === true){
                             localStorage.removeItem("userName");
                             localStorage.removeItem("passWord");
                             localStorage.removeItem("token");
                             localStorage.removeItem("mobileno");
                             localStorage.removeItem("realname");
                             localStorage.removeItem("fcode");
                             localStorage.removeItem("id");
                             window.localStorage.removeItem("US_NAME");
                             window.localStorage.removeItem("US_PWD");
                             window.localStorage.setItem("autologin", "false");

                             localStorage.clear();
                             //微信跳转登录页APP重新开始
                             if(mui.os.wechat){
                                 mui.openWindow({
                                     url:'../loading.html',
                                     id:'loading',
                                     extras:{}
                                 });
                             }else if(mui.os.android){
                                 //alert(plus);
                                 plus.runtime.restart();
                             }else{
                                 mui.openWindow({
                                     url:'../welcomeOld.html',
                                     id:'welcome',
                                     extras:{}
                                 });
                             }
                         }else{
                             mui.toast(ajaxData.meta.message);
                         }
                     },
                     error: function(xhr, type, errorThrown) {
                         //异常处理；
                         console.log(type);
                         alert(type+'====='+errorThrown);
                         mui.toast('网络异常，请稍后再试');
                     }
                 });
             }

            }
         },'div');
    });
}(mui, document));