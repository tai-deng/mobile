/**
 * Created by Administrator on 2017/7/28.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {});
    var pid,taskid,spyj,data;
    var banid = new Uri(location.href).getQueryParamValue('id');
    //alert(banid);

    mui.ajax(config.httpPath+'api/getApplyBusDetail', {
        data: {
            id:sessionStorage.getItem('id'),
            processInstanceId:banid
        },
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        beforeSend: function(request) {
            request.setRequestHeader("X-Token",sessionStorage.getItem('token'));
        },
        success: function(ajaxData) {
            //服务器返回响应，根据响应结果，分析是否成功；
            alert(JSON.stringify(ajaxData));
            pid = ajaxData.data.pid;
            taskid = ajaxData.data.taskInfoVo[1].id;
            $('#status').text(ajaxData.data.status);
            $('#step1-text').text(ajaxData.data.taskInfoVo[0].name);
            $('#step1-time').text(ajaxData.data.taskInfoVo[0].completeDate);
            $('#step2-text').text(ajaxData.data.taskInfoVo[1].name);
            //$('#step3-text').text(ajaxData.data.taskInfoVo[2].name);
            if(ajaxData.data.taskInfoVo[1].hasApprovalShiro !== "true"){
                $('#step2-message').css('display',"none");
            }
            var html = ajaxData.data.formInfo;
            $('#table').html(html);

            var flag = 'agree';
            //点击同意
            document.getElementById("step2-agree").addEventListener('tap',function(){
                flag = 'agree';
                $('#step2-agree').addClass('table-tr');
                $('#step2-disagree').removeClass('table-tr');
            });
            //点击不同意
            document.getElementById("step2-disagree").addEventListener('tap',function(){
                flag = 'disagree';
                $('#step2-agree').removeClass('table-tr');
                $('#step2-disagree').addClass('table-tr');
            });

            //提交部门负责人同意不同意意见
            mui(".mui-content").on('tap','#step2-submit',function(){
                //点击响应逻辑
                var btn = ["取消","确定"];
                mui.confirm('确认提交？','温馨提示',btn,function(e) {
                    if (e.index == 1) {
                        //点击响应逻辑
                        //需要上传同意或者不同意状态
                        if(flag === "agree"){
                            spyj = "审批通过"
                        }else{
                            spyj = "审批不通过"
                        }
                        data = $('#step2-textarea').val();
                        $('#step2-textarea').attr("readonly","true");
                        //alert('token'+sessionStorage.getItem('token')+'+++pid:'+pid+"+++++spyj:"+spyj+"+++data:"+data)
                        //上传审批意见
                        mui.ajax( config.httpPath+'api/approval', {
                            data: {
                                id:sessionStorage.getItem('id'),
                                pid:pid,
                                spyj:spyj,
                                data:data
                            },
                            dataType: 'json', //服务器返回json格式数据
                            type: 'post', //HTTP请求类型
                            timeout: 10000, //超时时间设置为10秒；
                            beforeSend: function(request) {
                                request.setRequestHeader("X-Token",sessionStorage.getItem('token'));
                            },
                            success: function(ajaxData) {
                                //服务器返回响应，根据响应结果，分析是否成功；
                                //alert(JSON.stringify(ajaxData));
                                if(ajaxData.meta.success === 'true'){
                                    mui.alert(ajaxData.meta.message+"啦啦啦啦");
                                }else{
                                    mui.alert(ajaxData.meta.message);
                                }
                            },
                            error: function(xhr, type, errorThrown) {
                                //异常处理；
                                console.log(type);
                                alert('网络异常，请稍后再试');
                            }
                        });
                    }
                });
            });

            //进来的时候先只显示申请详情表格的前四行，点击下拉箭头后展示所有，再点击就隐藏多余的
            var detailFlag = 'true';
            document.getElementById("xiala").addEventListener('tap',function(){
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
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            alert('网络异常，请稍后再试');
        }
    });

    //点击返回
    document.getElementById("back").addEventListener('tap',function(){
        //点击响应逻辑
        history.go(-1);
    });

}(mui, document));