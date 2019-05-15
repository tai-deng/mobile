/**
 * Created by Administrator on 2017/7/5.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});
    var height = window.screen.availHeight;
    //$(".mui-control-content").height(height-144);
    //var height = window.innerHeight;
    //alert(height);
    $('.mui-control-content').css('height',height-145);
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });
    //$('.down-yindao').height(height);
    $("#applyBusiness").addClass("mui-active");
    var bulkManageFlag = 0;
    var temp=$(".shouli");
    var temp1=$(".shenqing");
    var acceptTips = $('#acceptNoData');
    var applyTips = $('#applyNoData');
    if($('#applyBusiness').hasClass("mui-active")){
        //我申请的业务
        $('#bulkManage').addClass('display-none');
        //$('.shenqing').removeClass('display-none');
        $('.shouli').remove();
    }
    mui(".mui-content").on('tap','#acceptBusiness',function(){
        if (bulkManageFlag == 0){
            $('#bulkManage').removeClass('display-none');
        }
        //$('.shenqing').addClass('display-none');
        $('.shenqing').remove();
        $("#select").append(temp);
        //$('.shouli').removeClass('display-none');
    });
    mui(".mui-content").on('tap','#applyBusiness',function(){
        $('#bulkManage').addClass('display-none');
        //$('.shenqing').removeClass('display-none');
        //$('.shouli').addClass('display-none');
        $('.shouli').remove();
        $("#select").append(temp1);
    });
    var ApplypageNo = 1;
    var AcceptpageNo = 1;
    var pageSize = 5;
    var type = "";
    var acceptNum;
    var applyFlag = 0;
    var acceptno = 0;
    /*if($('#applyBusiness').hasClass("mui-active")){
        type = '待审批';
    }else{
        type = '审批中';
    }*/
    var recordNumber = 0;
    var canshu = new Array();
    //select选择类型查询
    $('#select').change(function(e){
        var x=document.getElementById("select")
        //alert(x.options[x.selectedIndex].text);
        type = x.options[x.selectedIndex].value;
        if($('#applyBusiness').hasClass("mui-active")){
            //我申请的业务
            $("#myApplyTemp").html('');
            $("#myApplyTemp").append(applyTips);
            applyFlag = 0;
            recordNumber = 0;
            ApplypageNo=1;
            myApply();
        }else{
            //我受理的业务
            $("#myAcceptTemp").html('');
            $("#myAcceptTemp").append(acceptTips);
            recordNumber = 0;
            acceptno = 0;
            AcceptpageNo = 1;
            myAccept();
        }
    });

    myApply();
    //我申请的业务
    function myApply(){
        mui.ajax(config.httpPath+'api/getApplylist', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:ApplypageNo ,
                pageSize:pageSize,
                type:type
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
                $('#recordNumber').text(recordNumber+ajaxData.data.activitiVo.length);
                var result = "";
                for(var i = 0; i < pageSize; i++){
                    //alert(ajaxData.data.activitiVo.length);
                    if(ajaxData.data.activitiVo.length == 0){
                        $('#applyNoData').removeClass('display-none');
                        /*if( applyFlag == 0){
                            $("#myApplyTemp").append('<li class=" mui-text-center padding-10 graycolor">暂时无业务数据</li>');
                            //$('#buttons').addClass('display-none');
                            applyFlag = 1;
                            break;
                        }*/
                    }else{
                        applyFlag = 1;
                    }
                    if(i+1>ajaxData.data.activitiVo.length){
                        break;
                    }
                    var showStatus = ajaxData.data.activitiVo[i].status;
                    var evaluate = '';
                    if(ajaxData.data.activitiVo[i].status == '审批通过'){
                        showStatus = '已通过';
                        evaluate = '<span id="applyEvaluate" data-id="'+ajaxData.data.activitiVo[i].id+'" data-name="'+ajaxData.data.activitiVo[i].name+'" class="float-right horbackground ridus3 whitecolor font12 padding-left-right10px line20 margin-right10px">评价</span>';
                    }else if(ajaxData.data.activitiVo[i].status == '审批驳回'){
                        showStatus = '被驳回';
                    }
                    result +='<ul class="mui-table-view margintop-10px" style="border-bottom: 1px solid #dddddd;">'
                        +'<li class="mui-table-view-cell font16" style="padding: 0px 10px;">'
                        +'<div class="mui-input-row mui-left">'
                        +'<input class="display-none list" data-id="'+ajaxData.data.activitiVo[i].id+'" style="width: auto;margin-top: 13px; float: left;position: absolute;" name="checkbox" value="Item1" type="checkbox" >'
                        +'<label style="width: 100%;">'
                        +'<span class="float-left">'+ajaxData.data.activitiVo[i].name+'</span>'
                        +'<span id="applyStatus" class="float-right maincolor">'+showStatus+'</span>'
                        + evaluate
                        +'</label>'
                        +'</div>'
                        +'</li>'
                        +'<li data-id="'+ajaxData.data.activitiVo[i].id+'" class="apply mui-table-view-cell graycolor font14" style="padding-left: 30px;">'
                        +'<div>申请时间：'+ajaxData.data.activitiVo[i].applyDate+'</div>'
                        +'<div>办理部门：'+ajaxData.data.activitiVo[i].todoDeptName+'</div>'
                        +'<div></div>'
                        +'</li>'
                        +'</ul>';
                }
                $("#myApplyTemp").append(result);
                if(ajaxData.data.activitiVo.length > 0){
                    ApplypageNo += 1;
                }else{
                    if(ApplypageNo !=1){
                        mui.toast('没有更多数据了');
                    }
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
            }
        });
    }

    myAccept();
    //我受理的业务
    function myAccept(){
        mui.ajax(config.httpPath+'api/getAcceptlist', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:AcceptpageNo,
                pageSize:pageSize,
                type:type
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert("lalala:"+JSON.stringify(ajaxData));
                $('#recordNumber').text(recordNumber+ajaxData.data.activitiVo.length);
                acceptNum = ajaxData.data.activitiVo.length;
                var result = "";
                for(var i = 0; i < pageSize; i++){
                    if(ajaxData.data.activitiVo.length == 0){
                        $('#acceptNoData').removeClass('display-none');
                        /*if( acceptno== 0){
                            bulkManageFlag = 1;
                            acceptno = 1;
                            $("#myAcceptTemp").append('<li class=" mui-text-center padding-10 graycolor">暂时无业务数据</li>');
                            break;
                        }*/
                    }else{
                        acceptno = 1;
                    }
                    if(i+1>ajaxData.data.activitiVo.length){
                        break;
                    }
                    var showStatus ;
                    if(ajaxData.data.activitiVo[i].status == '审批通过'){
                        showStatus = '您已通过';
                    }else if(ajaxData.data.activitiVo[i].status == '审批不通过'){
                        showStatus = '您已驳回';
                    }else{
                        showStatus = '待您审批';
                    }
                    result +='<ul class=" mui-table-view margintop-10px" style="border-bottom: 1px solid #dddddd;">'
                        +'<li class="mui-table-view-cell font16" style="padding: 0px 10px;">'
                        +'<div class="mui-input-row mui-left">'
                        +'<input class="display-none list" data-id="'+ajaxData.data.activitiVo[i].id+'" data-taskid="'+ajaxData.data.activitiVo[i].taskId+'" style="width: auto;margin-top: 13px; float: left;position: absolute;" name="checkbox" value="Item1" type="checkbox" >'
                        +'<label style="width: 100%;">'
                        +'<span class="float-left">'+ajaxData.data.activitiVo[i].name+'</span>'
                        +'<span id="acceptStatus" class="float-right maincolor">'+showStatus+'</span>'
                        +'</label>'
                        +'</div>'
                        +'</li>'
                        +'<li data-id="'+ajaxData.data.activitiVo[i].id+'" class="accept mui-table-view-cell graycolor font14" style="padding-left: 30px;">'
                        +'<div>申请时间：'+ajaxData.data.activitiVo[i].applyDate+'</div>'
                        +'<div>申请人：'+ajaxData.data.activitiVo[i].applyUserName+'</div>'
                        +'<div></div>'
                        +'</li>'
                        +'</ul>';
                }
                $("#myAcceptTemp").append(result);
                if(ajaxData.data.activitiVo.length > 0){
                    AcceptpageNo += 1;
                }else{
                    if(AcceptpageNo != 1){
                        mui.toast('没有更多数据了');
                    }
                }
                if(acceptNum > 0){
                    //点击批量管理
                    //document.getElementById("bulkManage").addEventListener('tap',function(){
                    mui('.mui-content').on('tap','#bulkManage',function(){
                        //alert(2222);
                        $('#checkAll').removeClass("display-none");
                        $('#cancel').removeClass("display-none");
                        $('#check').removeClass("display-none");
                        $('.list').removeClass("display-none");
                        $('#selectArea').addClass("display-none");
                        $('.bulkdelete').removeClass("display-none");
                        //$('#scroll1').css('margin-bottom',"50px");
                        //$('#scroll2').css('margin-bottom',"50px");
                        //点击全选
                        var isCheckAll = false;
                        document.getElementById("checkAll").addEventListener('tap',function(){
                            //checkbox 全选/取消全选
                            swapCheck();
                            function swapCheck() {
                                if (isCheckAll) {
                                    $("input[type='checkbox']").each(function() {
                                        this.checked = false;
                                        //this.attribute('checked','false');
                                    });
                                    isCheckAll = false;
                                    $('#checkAll').addClass('blackfont');
                                    $('#checkAll').removeClass('maincolor');
                                } else {
                                    //$("#check").attr("checked", 'true');
                                    $('#checkAll').addClass('maincolor');
                                    $('#checkAll').removeClass('blackfont');
                                    $("input[type='checkbox']").each(function() {
                                        var value = $(this).data('taskid');
                                        if(value != null){
                                            this.checked = true;
                                            var pid = $(this).data('id');
                                            canshu.push(pid+"_"+value);
                                        }
                                    });
                                    isCheckAll = true;
                                }
                            }
                        });
                        mui(".mui-content").on('tap','#cancel',function(){
                            $('#scroll1').css('margin-bottom',"0px");
                            $('#scroll2').css('margin-bottom',"0px");
                            $('#checkAll').addClass("display-none");
                            $('#cancel').addClass("display-none");
                            $('#check').addClass("display-none");
                            $('.bulkdelete').addClass("display-none");
                            $('.list').addClass("display-none");
                            $('#selectArea').removeClass("display-none");
                        });
                        /*//我受理的批量删除
                         mui(".mui-content").on('tap','#apply_disagree',function(){
                         mui.alert("我申请的批量驳回");
                         });*/
                        mui(".mui-content").on('tap','#accept_agree',function(){
                            //上传审批意见
                            mui.ajax( config.httpPath+'api/batchApproval', {
                                data: {
                                    id:localStorage.getItem('id'),
                                    spyj:'审批通过',
                                    data:'同意',
                                    ptidList:canshu
                                },
                                dataType: 'json', //服务器返回json格式数据
                                type: 'post', //HTTP请求类型
                                timeout: 10000, //超时时间设置为10秒；
                                beforeSend: function(request) {
                                    request.setRequestHeader("X-Token",localStorage.getItem('token'));
                                },
                                success: function(ajaxData) {
                                    //服务器返回响应，根据响应结果，分析是否成功；
                                    //alert(canshu+"++++++++++"+JSON.stringify(ajaxData));
                                    if(ajaxData.meta.success === true){
                                        //mui.alert(ajaxData.meta.message);
                                        mui.alert(ajaxData.meta.message,'提示','确定',null,'div');
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
                        });
                        //我受理的批量操作
                        mui(".mui-content").on('tap','#accept_disagree',function(){
                            //mui.alert("我受理的批量驳回");
                            //上传审批意见
                            mui.ajax( config.httpPath+'api/batchApproval', {
                                data: {
                                    id:localStorage.getItem('id'),
                                    spyj:'审批不通过',
                                    data:'不同意',
                                    ptidList:canshu
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
                                        mui.alert(ajaxData.meta.message,'提示','确定',null,'div');
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
                        });
                    });
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
            }
        });
    }

    mui('.mui-scroll-wrapper').scroll({
        indicators: true //是否显示滚动条
    });
    var item2 = document.getElementById('item2mobile');
    document.getElementById('slider').addEventListener('slide', function(e) {
        if (e.detail.slideNumber === 1) {
            if (item2.querySelector('.mui-loading')) {
                setTimeout(function() {
//                        item2.querySelector('.mui-scroll').innerHTML = html2;
                    $('.mui-loading').addClass("display-none");
                }, 500);
            }
        }
    });
    var sliderSegmentedControl = document.getElementById('sliderSegmentedControl');
    mui('.mui-input-group').on('change', 'input', function() {
        if (this.checked) {
            sliderSegmentedControl.className = 'mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-segmented-control-' + this.value;
            //force repaint
            sliderProgressBar.setAttribute('style', sliderProgressBar.getAttribute('style'));
        }
    });
    mui.ready(function() {
        //循环初始化所有下拉刷新，上拉加载。
        mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
            mui(pullRefreshEl).pullToRefresh({
                down: {
                    callback: function() {
                        var self = this;
                        ApplypageNo = 1;
                        AcceptpageNo = 1;
                        applyFlag = 0;
                        acceptno = 0;
                        if($('#applyBusiness').hasClass("mui-active")){
                            //我申请的业务
                            //setTimeout(function() {
                                var ul = self.element.querySelector('#myApplyTemp');
                                $("#myApplyTemp").html('');
                                createFragment(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            //}, 1000);
                        }else if($('#acceptBusiness').hasClass("mui-active")){
                            //我受理的业务
                            //setTimeout(function() {
                                var ul = self.element.querySelector('#myAcceptTemp');
                                $("#myAcceptTemp").html('');
                                createFragment1(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            //}, 1000);
                        }
                    }
                },
                up: {
                    callback: function() {
                        var self = this;
                        if($('#applyBusiness').hasClass("mui-active")){
                            //我申请的业务
                            //setTimeout(function() {
                                var ul = self.element.querySelector('#myApplyTemp');
                                createFragment(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            //}, 1000);
                        }else if($('#acceptBusiness').hasClass("mui-active")){
                            //我受理的业务
                            //setTimeout(function() {
                                var ul = self.element.querySelector('#myAcceptTemp');
                                createFragment1(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            //}, 1000);
                        }
                    }
                }
            });
        });
        var createFragment = function(ul, index, count, reverse) {
            //alert("ApplypageNo==="+ApplypageNo);
            myApply();
        };
        var createFragment1 = function(ul, index, count, reverse) {
            //alert("AcceptpageNo---"+AcceptpageNo);
            myAccept();
        };
    });
    //点击我申请的业务跳转
    mui(".mui-content").on('tap','.apply',function(){
        var applyid = $(this).data('id');
        //在有复选框的时候是不可以点击的
        if($('#checkAll').hasClass('display-none')){
            mui.openWindow({
                url:'approval1212.html?id='+applyid,
                id:'approvalBack',
                extras:{
                }
            });
        }
    });
    //点击我受理的业务跳转
    mui(".mui-content").on('tap','.accept',function(){
        var acceptid = $(this).data('id');
        //在有复选框的时候是不可以点击的
        if($('#checkAll').hasClass('display-none')){
            mui.openWindow({
                url:'../html-accept/accept1212.html?id='+acceptid,
                id:'accept-information-part',
                extras:{
                }
            });
        }
    });
    //点击评价
    mui(".mui-content").on('tap','#applyEvaluate',function(){
        /*var title = $(this).data('name');
        mui.prompt('text','deftext',title,['true','false'],null,'div');*/
        /*document.querySelector('.mui-popup-input input').type='textarea';
        document.querySelector('.mui-popup-input input').setAttribute('rowspan','3');*/
        var applyid = $(this).data('id');
        //在有复选框的时候是不可以点击的
        if($('#checkAll').hasClass('display-none')){
            mui.openWindow({
                url:'approval1212.html?id='+applyid,
                id:'approvalBack',
                extras:{
                }
            });
        }
    });
}(mui, document));