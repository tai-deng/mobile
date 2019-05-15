/**
 * Created by Administrator on 2017/8/12.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {
        var self=plus.webview.currentWebview();
        var opener = self.opener();
        //alert(opener.id);
//              console.log(JSON.stringify(self));
        var old_back = mui.back;
        mui.back = function() {
            var wobj = plus.webview.getWebviewById(opener.id);
            wobj.reload(true);
            old_back();
        }
    });
    var pid,taskid,spyj,data;
    var banid = new Uri(location.href).getQueryParamValue('id');
    //alert(banid);
    var pid;
    mui.ajax(config.httpPath+'api/getApplyBusDetail', {
        data: {
            id:localStorage.getItem('id'),
            processInstanceId:banid
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
            //alert(ajaxData.data.taskInfoVo[1].completeDate);
            //alert(formatDateTime(1508264065000/1000));
            if(ajaxData.meta.success == true){
                pid = ajaxData.data.pid;
                $('#status').text(ajaxData.data.status);
                $('#hjbContainer').html(template('hjbItemTemp', ajaxData.data));
                var html = ajaxData.data.formInfo;
                $('#table').html(html);
                //第二部的下拉
                //var Flag = 'true';
                mui(".mui-content").on('tap','.step-xiala',function(){
                    var xialaId = $(this).data('id');
                    if($(this).hasClass('rotate180')){
                        $('#'+xialaId+'-xiala-content').addClass('display-none');
                        $('#'+xialaId+'-xiala').removeClass('rotate180');
                    }else{
                        $('#'+xialaId+'-xiala-content').removeClass('display-none');
                        $('#'+xialaId+'-xiala').addClass('rotate180');
                    }
                    /*//点击响应逻辑
                    if(Flag ==="true"){
                        Flag = "false";
                        $('#'+xialaId+'-xiala-content').removeClass('display-none');
                        $('#'+xialaId+'-xiala').addClass('rotate180');
                    }else{
                        Flag = 'true';
                        $('#'+xialaId+'-xiala-content').addClass('display-none');
                        $('#'+xialaId+'-xiala').removeClass('rotate180');
                    }*/
                });
                taskid = $('#message').data('id');
                var flag = 'agree';
                //点击同意
                mui(".mui-content").on('tap','#agree',function(){
                    flag = 'agree';
                    $('#agree').addClass('table-tr');
                    $('#disagree').removeClass('table-tr');
                });
                //点击不同意
                mui(".mui-content").on('tap','#disagree',function(){
                    flag = 'disagree';
                    $('#agree').removeClass('table-tr');
                    $('#disagree').addClass('table-tr');
                });
                //提交部门负责人同意不同意意见
                mui(".mui-content").on('tap','#submit',function(){
                    //点击响应逻辑
                    var btn = ["取消","确定"];
                    mui.confirm('确认提交？','温馨提示',btn,function(e) {
                    //mui.confirm('确认提交申请？','提示',['取消','确定'],function(e) {
                        if (e.index == 1) {
                            //点击响应逻辑
                            //需要上传同意或者不同意状态
                            if(flag === "agree"){
                                spyj = "审批通过"
                            }else{
                                spyj = "审批不通过"
                            }
                            data = $('#textarea').val();
                            //alert('token'+sessionStorage.getItem('token')+'+++pid:'+pid+"+++++spyj:"+spyj+"+++data:"+data)
                            //上传审批意见
                            mui.ajax( config.httpPath+'api/approval', {
                                data: {
                                    id:localStorage.getItem('id'),
                                    pid:pid,
                                    spyj:spyj,
                                    data:data,
                                    taskid:taskid
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
                                        //mui.alert(ajaxData.meta.message);
                                        mui.toast(ajaxData.meta.message);
                                        $('#textarea').attr("readonly","true");
                                        setTimeout(function(){
                                            mui.openWindow({
                                                url:'../html-application/businessHanding.html',
                                                id:'businessHanding',
                                                extras:{
                                                }
                                            });
                                        },1000);
                                        //location.reload();
                                    }else{
                                        //mui.alert(ajaxData.meta.message);
                                        mui.alert(ajaxData.meta.message,'提示','确定',null,'div');
                                    }
                                },
                                error: function(xhr, type, errorThrown) {
                                    //异常处理；
                                    console.log(type);
                                    mui.toast('网络异常，请稍后再试');
                                }
                            });
                        }
                    });
                });

                //进来的时候先只显示申请详情表格的前四行，点击下拉箭头后展示所有，再点击就隐藏多余的
                var detailFlag = 'false';
                //document.getElementById("xiala").addEventListener('tap',function(){
                mui(".mui-content").on('tap','#xiala',function(){
                    //点击响应逻辑
                    if(detailFlag ==="true"){
                        //显示所有
                        detailFlag = "false"
                        $('.table-display-none').removeClass('display-none');
                        $('#xiala').addClass('rotate180');
                    }else{
                        //显示部分
                        detailFlag = 'true';
                        $('.table-display-none').addClass('display-none');
                        $('#xiala').removeClass('rotate180');
                    }
                });
            }else{
                mui.toast('网络异常，请稍后再试');
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });
    //点击返回
    mui("body").on('tap','#back',function(){
        //点击响应逻辑
        mui.back();
    });
}(mui, document));