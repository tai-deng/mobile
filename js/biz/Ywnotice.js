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
    var readType = 1;
    read();
    mui(".mui-content").on('tap','#applyBusiness',function(){
        //$("#applyBusiness").removeClass("mui-active");
        $('#applyNum').addClass('newswhite');
         $('#acceptNum').addClass('newsorange');
        $('#applyNum').removeClass('newsorange');
        $('#acceptNum').removeClass('newswhite');
    });
    mui(".mui-content").on('tap','#acceptBusiness',function(){
        //$("#applyBusiness").removeClass("mui-active");
        $('#applyNum').addClass('newsorange');
        $('#acceptNum').addClass('newswhite');
        $('#applyNum').removeClass('newswhite');
        $('#acceptNum').removeClass('newsorange');
        readType = 2;
        read();
    });
    var ApplypageNo = 1;
    var AcceptpageNo = 1;
    var pageSize = 5;
    var type = "";
    var recordNumber = 0;
    myApply();
    //我申请的业务
    function myApply(){
        mui.ajax(config.httpPath+'api/getApplyBusinessNotice', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:ApplypageNo ,
                pageSize:pageSize
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
                $('#applyNum').text(ajaxData.data.num);
                var result = ""
                for(var i = 0; i < pageSize; i++){
                    if(i+1>ajaxData.data.applyNotice.length){
                        break;
                    }
                    result +='<ul class="apply mui-table-view margintop-10px" style="border-bottom: 1px solid #dddddd;">'
                        +'<li class="mui-table-view-cell font16" style="padding: 0px 10px;">'
                        +'<div class="mui-input-row mui-left">'
                        +'<input class="display-none" style="width: auto;margin-top: 13px; float: left;position: absolute;" name="checkbox" value="Item1" type="checkbox" >'
                        +'<label style="width: 100%;">'
                        +'<span class="float-left">申请的业务：'+ajaxData.data.applyNotice[i].proName+'</span>'
                        //+'<span id="applyStatus" class="float-right maincolor">'+ajaxData.data.activitiVo[i].status+'</span>'
                        +'</label>'
                        +'</div>'
                        +'</li>'
                        +'<li class="mui-table-view-cell graycolor font14" style="padding-left: 30px;">'
                        +'<div>当前审批部门：'+ajaxData.data.applyNotice[i].deptment+'</div>'
                        +'<div>审批意见：'+ajaxData.data.applyNotice[i].content+'</div>'
                        +'<div>审批时间：'+formatDateTime(ajaxData.data.applyNotice[i].time/1000)+'</div>'
                        +'<div></div>'
                        +'</li>'
                        +'</ul>';
                }
                $("#myApplyTemp").append(result);
                if(ajaxData.data.applyNotice.length > 0){
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
        mui.ajax(config.httpPath+'api/getAcceptBusinessNotice', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:AcceptpageNo,
                pageSize:pageSize
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
                $('#acceptNum').text(ajaxData.data.num);
                var result = "";
                for(var i = 0; i < pageSize; i++){
                    if(i+1>ajaxData.data.acceptNotice.length){
                        break;
                    }
                    result +='<ul class="accept mui-table-view margintop-10px" style="border-bottom: 1px solid #dddddd;">'
                        +'<li class="mui-table-view-cell font16" style="padding: 0px 10px;">'
                        +'<div class="mui-input-row mui-left">'
                        +'<input class="display-none" style="width: auto;margin-top: 13px; float: left;position: absolute;" name="checkbox" value="Item1" type="checkbox" >'
                        +'<label style="width: 100%;">'
                        +'<span class="float-left">受理的业务：'+ajaxData.data.acceptNotice[i].proName+'</span>'
                        //+'<span id="acceptStatus" class="float-right maincolor">'+ajaxData.data.activitiVo[i].status+'</span>'
                        +'</label>'
                        +'</div>'
                        +'</li>'
                        +'<li class="mui-table-view-cell graycolor font14" style="padding-left: 30px;">'
                        +'<div>申请人：'+ajaxData.data.acceptNotice[i].owner+'</div>'
                        +'<div>院(系)部：'+ajaxData.data.acceptNotice[i].deptment+'</div>'
                        +'<div>申请时间：'+formatDateTime(ajaxData.data.acceptNotice[i].time/1000)+'</div>'
                        +'<div></div>'
                        +'</li>'
                        +'</ul>';
                }
                $("#myAcceptTemp").append(result);
                if(ajaxData.data.acceptNotice.length > 0){
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
            //alert("ApplypageNo==="+ApplypageNo);
            myApply();
        };
        var createFragment1 = function(ul, index, count, reverse) {
            //alert("AcceptpageNo---"+AcceptpageNo);
            myAccept();
        };
    });

    //消息条数已阅
    function read(){
        mui.ajax(config.httpPath+'api/changeNoticeStatus', {
            data: {
                id:localStorage.getItem('id'),
                noType:'1',
                noBusType:readType
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
}(mui, document));