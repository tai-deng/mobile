/**
 * Created by Administrator on 2017/7/5.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});
    var height = window.screen.availHeight;
    $(".mui-control-content").height(height-144);
    $('.down-yindao').height(height);
    $("#applyBusiness").addClass("mui-active");
   /* mui("#acceptBusiness").on('tap',function(){
        $("#applyBusiness").removeClass("mui-active");
    });*/
    var ApplypageNo = 1;
    var AcceptpageNo = 1;
    var pageSize = 5;
    var type = "";
    var recordNumber = 0;
    //select选择类型查询
    $('#select').change(function(e){
        //alert($("#select").find("option:selected").text());
        var x=document.getElementById("select")
        //alert(x.options[x.selectedIndex].text);
        type = x.options[x.selectedIndex].text;
        //alert(type);
        if($('#applyBusiness').hasClass("mui-active")){
            //我申请的业务
            $("#myApplyTemp").html('');
            recordNumber = 0;
            myApply();
        }else{
            //我受理的业务
            $("#myAcceptTemp").html('');
            recordNumber = 0;
            myAccept();
        }
    });
//http://localhost:8080/api/getApplylist?pageNo=2&&pageSize=5
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
                    if(i+1>ajaxData.data.activitiVo.length){
                        break;
                    }
                    result +='<ul class="apply mui-table-view margintop-10px" data-id="'+ajaxData.data.activitiVo[i].id+'" style="border-bottom: 1px solid #dddddd;">'
                        +'<li class="mui-table-view-cell font16" style="padding: 0px 10px;">'
                        +'<div class="mui-input-row mui-left">'
                        +'<label style="width: 100%;">'
                        +'<span class="float-left">申请的业务：'+ajaxData.data.activitiVo[i].name+'</span>'
                        +'</label>'
                        +'</div>'
                        +'</li>'
                        +'<li class="mui-table-view-cell graycolor font14" style="padding-left: 30px;">'
                        +'<div>当前审批部门：'+ajaxData.data.activitiVo[i].applyDate+'</div>'
                        +'<div>审批意见：'+ajaxData.data.activitiVo[i].todoDeptName+'</div>'
                        +'<div>审批时间：'+ajaxData.data.activitiVo[i].applyDate+'</div>'
                        +'</li>'
                        +'</ul>';
                }
                $("#myApplyTemp").append(result);
                if(ajaxData.data.activitiVo.length > 0){
                    ApplypageNo += 1;
                }else{
                    mui.toast('没有更多数据了');
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
                var result = "";
                for(var i = 0; i < pageSize; i++){
                    if(i+1>ajaxData.data.activitiVo.length){
                        break;
                    }
                    result +='<ul class="apply mui-table-view margintop-10px" data-id="'+ajaxData.data.activitiVo[i].id+'" style="border-bottom: 1px solid #dddddd;">'
                        +'<li class="mui-table-view-cell font16" style="padding: 0px 10px;">'
                        +'<div class="mui-input-row mui-left">'
                        +'<label style="width: 100%;">'
                        +'<span class="float-left">受理的业务：'+ajaxData.data.activitiVo[i].name+'</span>'
                        +'</label>'
                        +'</div>'
                        +'</li>'
                        +'<li class="mui-table-view-cell graycolor font14" style="padding-left: 30px;">'
                        +'<div>申请人：'+ajaxData.data.activitiVo[i].applyDate+'</div>'
                        +'<div>院(系)部：'+ajaxData.data.activitiVo[i].todoDeptName+'</div>'
                        +'<div>申请时间：'+ajaxData.data.activitiVo[i].applyDate+'</div>'
                        +'</li>'
                        +'</ul>';
                }
                $("#myAcceptTemp").append(result);
                if(ajaxData.data.activitiVo.length > 0){
                    AcceptpageNo += 1;
                }else{
                    mui.toast('没有更多数据了');
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
                /*down: {
                    callback: function() {
                        var self = this;
                        setTimeout(function() {
                            var ul = self.element.querySelector('.mui-table-view');
                            ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);
                            self.endPullDownToRefresh();
                        }, 1000);
                    }
                },*/
                up: {
                    callback: function() {
                        var self = this;
                        if($('#applyBusiness').hasClass("mui-active")){
                            //我申请的业务
                            setTimeout(function() {
                                var ul = self.element.querySelector('#myApplyTemp');
                                createFragment(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            }, 1000);
                        }else if($('#acceptBusiness').hasClass("mui-active")){
                            //我受理的业务
                            setTimeout(function() {
                                var ul = self.element.querySelector('#myAcceptTemp');
                                createFragment1(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            }, 1000);
                        }
                    }
                }
            });
        });
        var createFragment = function(ul, index, count, reverse) {
            myApply();
        };
        var createFragment1 = function(ul, index, count, reverse) {
            myAccept();
        };
    });

    //点击我申请的业务跳转
    mui(".mui-content").on('tap','.apply',function(){
        var applyid = $(this).data('id');
        //在有复选框的时候是不可以点击的
        if($('#checkAll').hasClass('display-none')){
            mui.openWindow({
                url:'../html-application/approval.html?id='+applyid,
                id:'approval',
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
                url:'../html-accept/accept.html?id='+acceptid,
                id:'accept',
                extras:{
                }
            });
        }
    });
}(mui, document));