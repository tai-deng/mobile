/**
 * Created by Administrator on 2017/7/28.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {});
    var banid = new Uri(location.href).getQueryParamValue('id');
    var pid;
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
            $('#status').text(ajaxData.data.status);
            /*$('#step1-text').text(ajaxData.data.taskInfoVo[0].name);
            $('#step1-time').text(ajaxData.data.taskInfoVo[0].completeDate);*/

            var result='<tr>'
                    +'<td class="com-stutas-submit">'
                    +'<div class="com-stutas-line1">qian</div>'
                    +'</td>'
                    +'<td style="width: 18px;">'
                    +'<div class="iconfont icon-wancheng com-stutas-img1 font18 maincolor"></div>'
                    +'</td>'
                    +'<td>'
                    +'<div class="comp-status-backg">'
                    +'<span id="step1-text">'+ajaxData.data.taskInfoVo[0].name+'</span>'
                    +'<div id="'+ajaxData.data.taskInfoVo[0].id+'-time">'+ajaxData.data.taskInfoVo[0].completeDate+'</div>'
                    +'</div>'
                    +'</td>'
                    +'</tr>';
            for(var i=1;i<ajaxData.data.taskInfoVo.length;i++){
                if(i == ajaxData.data.taskInfoVo.length-1){
                    //最后一个如果总长度为2时线条还是橙色
                    var xiantiao_l ='';
                    if(ajaxData.data.taskInfoVo[i].status == 0){
                        xiantiao_l = '<td class="xiaozhang">'
                            +'<div class="com-stutas-line3-gray">qian</div>'
                            +'</td>'
                    }else{
                        xiantiao_l = '<td class="xiaozhang">'
                            +'<div class="com-stutas-line3">qian</div>'
                            +'</td>'
                    }
                    if(ajaxData.data.taskInfoVo.length == 2){
                        xiantiao_l = '<td class="xiaozhang">'
                            +'<div class="com-stutas-line3">qian</div>'
                            +'</td>'
                    }
                    result +='<tr>'
                            + xiantiao_l
                            +'<td class="verticaltop">'
                            +'<div class="tu'+ajaxData.data.taskInfoVo[i].id+' iconfont icon-wancheng com-stutas-img3 font18 maincolor"></div>'
                            +'</td>'
                            +'<td>'
                            +'<div class="comp-status-backg margintop-20px">'
                            +'<span>'+ajaxData.data.taskInfoVo[i].name+'</span>'
                            +'<div id="'+ajaxData.data.taskInfoVo[i].id+'-time">'+ajaxData.data.taskInfoVo[i].completeDate+'</div>'
                            +'<span data-id="'+ajaxData.data.taskInfoVo[i].id+'" id="'+ajaxData.data.taskInfoVo[i].id+'-xiala" class="mui-icon mui-icon-arrowdown com-stutas-open step-xiala"></span>'
                            +'</div>'
                            +'<div id="'+ajaxData.data.taskInfoVo[i].id+'-xiala-content" class="comp-status-tips display-none">'
                            +ajaxData.data.taskInfoVo[i].content
                            +'</div>'
                            +'</td>'
                            +'</tr>'
                }else{
                    //alert('3');
                    var xiantiao_m = '';
                    if(ajaxData.data.taskInfoVo[i+1].status == 0){
                        if(!ajaxData.data.taskInfoVo[i].status === '0' || i==1){
                            xiantiao_m = '<td class="com-stutas-line2-gray verticaltop">'
                                +'<div class="com-stutas-line3">qian</div>'
                                +'</td>'
                        }else{
                            xiantiao_m = '<td class="com-stutas-line2-gray verticaltop">'
                                +'<div class="com-stutas-line3-gray">qian</div>'
                                +'</td>'
                        }
                    }else{
                        xiantiao_m = '<td class="com-stutas-line2"></td>'
                    }
                    result +='<tr>'
                        + xiantiao_m
                        +'<td class="verticaltop">'
                        +'<div class="tu'+ajaxData.data.taskInfoVo[i].id+' iconfont icon-wancheng com-stutas-img2 font18 maincolor"></div>'
                        +'</td>'
                        +'<td>'
                        +'<div class="comp-status-backg margintop-20px">'
                        +'<span>'+ajaxData.data.taskInfoVo[i].name+'</span>'
                        +'<div id="'+ajaxData.data.taskInfoVo[i].id+'-time">'+ajaxData.data.taskInfoVo[i].completeDate+'</div>'
                        +'<span data-id="'+ajaxData.data.taskInfoVo[i].id+'" id="'+ajaxData.data.taskInfoVo[i].id+'-xiala" class="mui-icon mui-icon-arrowdown com-stutas-open step-xiala"></span>'
                        +'</div>'
                        +'<div id="'+ajaxData.data.taskInfoVo[i].id+'-xiala-content" class="comp-status-tips display-none">'
                        + ajaxData.data.taskInfoVo[i].content
                        +'</div>'
                        +'</td>'
                        +'</tr>'
                }
                $('#statusContent').html(result);
                //是否显示下拉
                if(!ajaxData.data.taskInfoVo[i].content){
                    $('#'+ajaxData.data.taskInfoVo[i].id+'-xiala').addClass('display-none');
                }
                //如果时间为空，改变文字
                if($('#'+ajaxData.data.taskInfoVo[i].id+'-time').text() === 'null'){
                    $('#'+ajaxData.data.taskInfoVo[i].id+'-time').text("等待审批");
                }
                //判断状态，显示勾勾颜色
                if(ajaxData.data.taskInfoVo[i].status == 0){ // 0代表未完成 1驳回  2完成 3撤回
                    //alert('3434');
                    $('.tu'+ajaxData.data.taskInfoVo[i].id).removeClass('maincolor');
                    $('.tu'+ajaxData.data.taskInfoVo[i].id).addClass('backgroundcolor');
                }
                //撤回状态改变图标
                if(ajaxData.data.taskInfoVo[i].status == 3){
                    $('.tu'+ajaxData.data.taskInfoVo[i].id).removeClass('icon-wancheng');
                    $('.tu'+ajaxData.data.taskInfoVo[i].id).addClass('icon-quxiao1');
                }
                //驳回状态改变图标
                if(ajaxData.data.taskInfoVo[i].status == 1){
                    $('.tu'+ajaxData.data.taskInfoVo[i].id).removeClass('icon-wancheng');
                    $('.tu'+ajaxData.data.taskInfoVo[i].id).addClass('icon-gth');
                }
            }
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
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });

    //点击返回
    mui(".mui-content").on('tap','#back',function(){
        //点击响应逻辑
        history.go(-1);
    });

    //点击撤回
    mui(".mui-content").on('tap','#waitBack',function(){
        //点击响应逻辑
        var btn = ["取消","确定"];
        mui.confirm('确认撤销？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                mui.ajax( config.httpPath+'api/revoke', {
                    data: {
                        id:sessionStorage.getItem('token'),
                        pid:pid
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 10000, //超时时间设置为10秒；
                    success: function(ajaxData) {
                        //服务器返回响应，根据响应结果，分析是否成功；
                        //alert(JSON.stringify(ajaxData));
                        if(ajaxData.meta.success === true){
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
            }
        },'div');
    });
}(mui, document));