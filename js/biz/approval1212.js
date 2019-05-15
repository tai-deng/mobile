/**
 * Created by Administrator on 2017/7/28.
 */
(function(mui, doc) {
    mui.init({
       /* beforeback: function() {
            //获得父页面的webview
            var list = plus.webview.currentWebview().opener();
            alert(list);
            //触发父页面的自定义事件(refresh),从而进行刷新
            mui.fire(list, 'refresh');
            //返回true,继续页面关闭逻辑
            return true;
        }*/
    });
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
    var banid = new Uri(location.href).getQueryParamValue('id');
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
            pid = ajaxData.data.pid;
            $('#status').text(ajaxData.data.status);
            $('#hjbContainer').html(template('hjbItemTemp', ajaxData.data));
            if(ajaxData.data.status === '待审批'){
                $('#getBack').removeClass('display-none');
            }
            if(ajaxData.data.status === '已撤销'){
                $('#reapplyDiv').removeClass('display-none');
                chongxin();
            }

            //撤回申请
            mui(".mui-content").on('tap','#getBack',function(){
                var btn = ["取消","确定"];
                mui.confirm('确定撤回？','温馨提示',btn,function(e){
                    if(e.index==1){
                        mui.ajax(config.httpPath+'api/revoke', {
                            data: {
                                id:localStorage.getItem('id'),
                                pid:pid
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
                                    $('#reapplyDiv').removeClass('display-none');
                                    $('#getBack').addClass('display-none');
                                    chongxin();
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
                },'div');
            });
            var html = ajaxData.data.formInfo;
            $('#table').html(html);
            //第二部的下拉
            var Flag = 'true';
            mui(".mui-content").on('tap','.step-xiala',function(){
                var xialaId = $(this).data('id');
                //点击响应逻辑
                if(Flag ==="true"){
                    Flag = "false";
                    $('#'+xialaId+'-xiala-content').removeClass('display-none');
                    $('#'+xialaId+'-xiala').addClass('rotate180');
                }else{
                    Flag = 'true';
                    $('#'+xialaId+'-xiala-content').addClass('display-none');
                    $('#'+xialaId+'-xiala').removeClass('rotate180');
                }
            });

            //进来的时候先只显示申请详情表格的前四行，点击下拉箭头后展示所有，再点击就隐藏多余的
            var detailFlag = 'true';
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
            //第三部分评价
            var star ='';
            if((ajaxData.data.status == '审批通过' || ajaxData.data.status == '审批不通过') && ajaxData.data.isScore == null){
                $('#pingjia').removeClass('display-none');
                $('#back').text('提交');
                //点击星星评价
                mui(".mui-content").on('tap','.icon-xing',function(){
                    //alert($(this).attr('id'));
                    star = $(this).data('id');
                    $('.icon-xing').removeClass('maincolor');
                    $('.icon-xing').addClass('graycolor');
                    for(var i=0;i<star;i++){
                        $('#xing'+(i+1)).addClass('maincolor');
                        if(i==0){
                            $('#pingjiaText').text('1分,不满意');
                        }else if(i==1){
                            $('#pingjiaText').text('2分,不太满意');
                        }else if(i==2){
                            $('#pingjiaText').text('3分,还算满意');
                        }else if(i==3){
                            $('#pingjiaText').text('4分,满意');
                        }else if(i==4){
                            $('#pingjiaText').text('5分,非常满意');
                        }
                    }
                });
                mui("body").on('tap','#back',function(){
                    //点击响应逻辑
                    var pJcontent = $('#pjText').val();
                    //alert(star+pJcontent);
                    //mui.alert('评价功能正在升级，暂不能提交评价','提示','确定',null,'div');
                    if(star == ''){
                        mui.alert('请选择星级以及选择性填写评论内容','提示','确定',null,'div');
                    }else{
                        //提交评价
                        mui.ajax(config.httpPath+'api/submitScore', {
                            data: {
                                id:banid,
                                score:star,
                                remark:pJcontent
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
                                    //$('#pjText').attributes('readonly');
                                    $('#pjText').attr("readonly","true");
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
                });
            }else{
                //已经评价好了就做展示
                if(ajaxData.data.isScore != null){
                    $('#pingjia').removeClass('display-none');
                    if(ajaxData.data.scoreRemark == ''){
                        $('#pjText').text('暂无评价内容');
                    }else{
                        $('#pjText').text(ajaxData.data.scoreRemark);
                    }
                    $('#pjText').attr("readonly","true");
                    star = ajaxData.data.Score;
                    for(var i=0;i<star;i++){
                        $('#xing'+(i+1)).addClass('maincolor');
                        if(i==0){
                            $('#pingjiaText').text('1分,不满意');
                        }else if(i==1){
                            $('#pingjiaText').text('2分,不太满意');
                        }else if(i==2){
                            $('#pingjiaText').text('3分,还算满意');
                        }else if(i==3){
                            $('#pingjiaText').text('4分,满意');
                        }else if(i==4){
                            $('#pingjiaText').text('5分,非常满意');
                        }
                    }
                }
                //点击返回
                mui("body").on('tap','#back',function(){
                    //点击响应逻辑
                    mui.back();
                });
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });



    //重新申请之前删除原流程数据
    function chongxin(){
        mui(".mui-content").on('tap','#reapply',function(){
            mui.ajax(config.httpPath+'api/delProcess', {
                data: {
                    id:localStorage.getItem('id'),
                    pid:pid
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
                        //mui.toast(ajaxData.meta.message);
                        var id = ajaxData.data;
                        mui.openWindow({
                            url:'../form.html?id='+id,
                            id:'form',
                            extras:{
                            }
                        });
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
        });
    }
}(mui, document));