/**
 * Created by Administrator on 2017/7/24.
 */
/*mui.init({
    swipeBack: false
});*/
(function(mui) {
    var height = window.innerHeight;
    $('.mui-control-content').css('height',height-85);
    mui('.mui-scroll-wrapper').scroll({
        indicators: true //是否显示滚动条
    });
    var allPageNo = 1;
    var djdPageNo = 1;
    var dqrPageNo = 1;
    var ywcPageNo = 1;
    var pageSize = 5;
    var type = "";
    var deal_status, tips;
    var allFlag = 0, djdFlag = 0,dqrFlag = 0,ywcFlag = 0;
    all();
    daijiedan();
    daiqueren();
    yiwangCheng();
    function all(){
        type = '';
        mui.ajax(config.httpPath+'api/findReceiveOrder', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:allPageNo,
                pageSize:pageSize,
                processState:type
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert('quanbu'+JSON.stringify(ajaxData));
                //alert(ajaxData.data.lists.result.length);
                if(ajaxData.meta.success == true){
                    mui.toast(ajaxData.meta.message);
                    var result = "";
                    for(var i = 0; i < ajaxData.data.lists.result.length; i++){
                        if(ajaxData.data.lists.result.length == 0){
                            if( allFlag == 0){
                                $("#myApplyTemp").append('<li class="bacfff mui-text-center padding-10 graycolor">暂无数据</li>');
                                allFlag = 1;
                                break;
                            }
                        }else{
                            allFlag = 1;
                        }
                        if(i+1>ajaxData.data.lists.result.length){
                            break;
                        }
                        //没有图片放一张默认图片
                        var imgSrc = '';
                        if(ajaxData.data.lists.result[i].img1 == null){
                            imgSrc = '../img/img-wu.png';
                        }else{
                            imgSrc = config.httpPath+ajaxData.data.lists.result[i].img1;
                        }
                        if(ajaxData.data.lists.result[i].processState ==1){ //1待接单  2待确认  3已完成
                            deal_status = '待接单';
                            tips = '等待您处理';
                        }else if(ajaxData.data.lists.result[i].processState ==2){
                            deal_status = '待确认';
                            tips = '维修完毕后，请确认订单！';
                        }else if(ajaxData.data.lists.result[i].processState ==3){
                            deal_status = '已完成';
                            tips = '维修完成';
                        }
                        result += '<li data-id="'+ajaxData.data.lists.result[i].id+'" class="content_list mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                            +'<div class=" padding-10" >'
                            +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                            +'<div class="mui-text-left float-left">订单编号：'+ajaxData.data.lists.result[i].orderNo+'</div>'
                            +'<div id="nation" class="mui-text-right graycolor" >'+deal_status+'</div>'
                            +'</div>'
                            +'<div class="repair_list baceee padding-10" data-id="'+ajaxData.data.lists.result[i].id+'">'
                            +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+imgSrc+'">'
                            +'<div class="mui-media-body font14 padding-top-bottom15px">'
                            +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                            +'<div style="clear: both;"></div>'
                            +'<div class="float-left margintop-5px" style="height: 41px;">'
                            +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                            +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                            +'</p></div> </div> </div>'
                            +'<div style="clear: both;"></div>'
                            +'<div class="float-left padding-top-left10 ">'
                            +'<p class="mui-ellipsis font12"><span >'+tips+'</span></p>'
                            +'<p class="mui-ellipsis font12">'+formatDateTime(ajaxData.data.lists.result[i].repairDate/1000)+'</p>'
                            +'</div>'
                            +'</li>';
                    };
                    $("#myApplyTemp").append(result);
                    if(ajaxData.data.lists.result.length > 0){
                        allPageNo += 1;
                    }else{
                        mui.toast('没有更多数据了');
                    }
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
    };
    function daijiedan(){
        type = 1;
        mui.ajax(config.httpPath+'api/findReceiveOrder', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:djdPageNo,
                pageSize:pageSize,
                processState:type
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                if(ajaxData.meta.success === true){
                    mui.toast(ajaxData.meta.message);
                    var result = "";
                    for(var i = 0; i < ajaxData.data.lists.result.length; i++){
                        if(ajaxData.data.lists.result.length == 0){
                            if( djdFlag == 0){
                                $("#myApplyTemp1").html('<li class="bacfff mui-text-center padding-10 graycolor">暂无数据</li>');
                                djdFlag = 1;
                                break;
                            }
                        }else{
                            djdFlag = 1;
                        }
                        if(i+1>ajaxData.data.lists.result.length){
                            break;
                        }
                        //没有图片放一张默认图片
                        var imgSrc = '';
                        if(ajaxData.data.lists.result[i].img1 == null){
                            imgSrc = '../img/img-wu.png';
                        }else{
                            imgSrc = config.httpPath+ajaxData.data.lists.result[i].img1;
                        }
                        if(ajaxData.data.lists.result[i].processState ==1){ //1待接单  2待确认  3已完成
                            deal_status = '待接单';
                            tips = '等待您处理';
                        }else if(ajaxData.data.lists.result[i].processState ==2){
                            deal_status = '待确认';
                            tips = '维修完毕后，请确认订单！';
                        }else if(ajaxData.data.lists.result[i].processState ==3){
                            deal_status = '已完成';
                            tips = '维修完成';
                        }
                        result += '<li data-id="'+ajaxData.data.lists.result[i].id+'" class="content_list mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                            +'<div class=" padding-10" >'
                            +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                            +'<div class="mui-text-left float-left">订单编号：'+ajaxData.data.lists.result[i].orderNo+'</div>'
                            +'<div id="nation" class="mui-text-right graycolor" >'+deal_status+'</div>'
                            +'</div>'
                            +'<div class="repair_list baceee padding-10" data-id="'+ajaxData.data.lists.result[i].id+'">'
                            +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+imgSrc+'">'
                            +'<div class="mui-media-body font14 padding-top-bottom15px">'
                            +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                            +'<div style="clear: both;"></div>'
                            +'<div class="float-left margintop-5px" style="height: 41px;">'
                            +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                            +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                            +'</p></div> </div> </div>'
                            +'<div style="clear: both;"></div>'
                            +'<div class="float-left padding-top-left10 ">'
                            +'<p class="mui-ellipsis font12"><span >'+tips+'</span></p>'
                            +'<p class="mui-ellipsis font12">'+formatDateTime(ajaxData.data.lists.result[i].repairDate/1000)+'</p>'
                            +'</div>'
                            +'</li>';
                    };
                    $("#myApplyTemp1").append(result);
                    if(ajaxData.data.lists.result.length > 0){
                        djdPageNo += 1;
                    }else{
                        mui.toast('没有更多数据了');
                    }
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
    function daiqueren(){
        type = 2;
        mui.ajax(config.httpPath+'api/findReceiveOrder', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:dqrPageNo,
                pageSize:pageSize,
                processState:type
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
                    var result = "";
                    for(var i = 0; i < ajaxData.data.lists.result.length; i++){
                        if(ajaxData.data.lists.result.length == 0){
                            if( dqrFlag == 0){
                                $("#myApplyTemp2").html('<li class="bacfff mui-text-center padding-10 graycolor">暂无数据</li>');
                                dqrFlag = 1;
                                break;
                            }
                        }else{
                            dqrFlag = 1;
                        }
                        if(i+1>ajaxData.data.lists.result.length){
                            break;
                        }
                        //没有图片放一张默认图片
                        var imgSrc = '';
                        if(ajaxData.data.lists.result[i].img1 == null){
                            imgSrc = '../img/img-wu.png';
                        }else{
                            imgSrc = config.httpPath+ajaxData.data.lists.result[i].img1;
                        }
                        if(ajaxData.data.lists.result[i].processState ==1){ //1待接单  2待确认  3已完成
                            deal_status = '待接单';
                            tips = '等待您处理';
                        }else if(ajaxData.data.lists.result[i].processState ==2){
                            deal_status = '待确认';
                            tips = '维修完毕后，请确认订单！';
                        }else if(ajaxData.data.lists.result[i].processState ==3){
                            deal_status = '已完成';
                            tips = '维修完成';
                        }
                        result += '<li data-id="'+ajaxData.data.lists.result[i].id+'" class="content_list mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                            +'<div class=" padding-10" >'
                            +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                            +'<div class="mui-text-left float-left">订单编号：'+ajaxData.data.lists.result[i].orderNo+'</div>'
                            +'<div id="nation" class="mui-text-right graycolor" >'+deal_status+'</div>'
                            +'</div>'
                            +'<div class="repair_list baceee padding-10"  data-id="'+ajaxData.data.lists.result[i].id+'">'
                            +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+imgSrc+'">'
                            +'<div class="mui-media-body font14 padding-top-bottom15px">'
                            +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                            +'<div style="clear: both;"></div>'
                            +'<div class="float-left margintop-5px" style="height: 41px;">'
                            +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                            +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                            +'</p></div> </div> </div>'
                            +'<div style="clear: both;"></div>'
                            +'<div class="float-left padding-top-left10 ">'
                            +'<p class="mui-ellipsis font12"><span >'+tips+'</span></p>'
                            +'<p class="mui-ellipsis font12">'+formatDateTime(ajaxData.data.lists.result[i].repairDate/1000)+'</p>'
                            +'</div>'
                            +'</li>';
                    };
                    $("#myApplyTemp2").append(result);
                    if(ajaxData.data.lists.result.length > 0){
                        dqrPageNo += 1;
                    }else{
                        mui.toast('没有更多数据了');
                    }
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
    function yiwangCheng(){
        type = 3;
        mui.ajax(config.httpPath+'api/findReceiveOrder', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:ywcPageNo,
                pageSize:pageSize,
                processState:type
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
                    var result = "";
                    for(var i = 0; i < ajaxData.data.lists.result.length; i++){
                        if(ajaxData.data.lists.result.length == 0){
                            if( ywcFlag == 0){
                                $("#myApplyTemp3").html('<li class="bacfff mui-text-center padding-10 graycolor">暂无数据</li>');
                                ywcFlag = 1;
                                break;
                            }
                        }else{
                            ywcFlag = 1;
                        }
                        if(i+1>ajaxData.data.lists.result.length){
                            break;
                        }
                        //没有图片放一张默认图片
                        var imgSrc = '';
                        if(ajaxData.data.lists.result[i].img1 == null){
                            imgSrc = '../img/img-wu.png';
                        }else{
                            imgSrc = config.httpPath+ajaxData.data.lists.result[i].img1;
                        }
                        if(ajaxData.data.lists.result[i].processState ==1){ //1待接单  2待确认  3已完成
                            deal_status = '待接单';
                            tips = '等待您处理';
                        }else if(ajaxData.data.lists.result[i].processState ==2){
                            deal_status = '待确认';
                            tips = '维修完毕后，请确认订单！';
                        }else if(ajaxData.data.lists.result[i].processState ==3){
                            deal_status = '已完成';
                            tips = '维修完成';
                        }
                        result += '<li data-id="'+ajaxData.data.lists.result[i].id+'" class="content_list mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                            +'<div class=" padding-10">'
                            +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                            +'<div class="mui-text-left float-left">订单编号：'+ajaxData.data.lists.result[i].orderNo+'</div>'
                            +'<div id="nation" class="mui-text-right graycolor" >'+deal_status+'</div>'
                            +'</div>'
                            +'<div class="repair_list baceee padding-10"  data-id="'+ajaxData.data.lists.result[i].id+'">'
                            +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+imgSrc+'">'
                            +'<div class="mui-media-body font14 padding-top-bottom15px">'
                            +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                            +'<div style="clear: both;"></div>'
                            +'<div class="float-left margintop-5px" style="height: 41px;">'
                            +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                            +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                            +'</p></div> </div> </div>'
                            +'<div style="clear: both;"></div>'
                            +'<div class="float-left padding-top-left10">'
                            +'<p class="mui-ellipsis font12"><span >'+tips+'</span></p>'
                            +'<p class="mui-ellipsis font12">'+formatDateTime(ajaxData.data.lists.result[i].repairDate/1000)+'</p>'
                            +'</div>'
                            +'</li>';
                    };
                    $("#myApplyTemp3").append(result);
                    if(ajaxData.data.lists.result.length > 0){
                        ywcPageNo += 1;
                    }else{
                        mui.toast('没有更多数据了');
                    }
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
    mui.ready(function() {
        //循环初始化所有下拉刷新，上拉加载。
        mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
            mui(pullRefreshEl).pullToRefresh({
                down: {
                    callback: function() {
                     var self = this;
                     allPageNo = 1;
                     djdPageNo = 1;
                     dqrPageNo = 1;
                     ywcPageNo = 1;
                     if($('#item1mobile').hasClass("mui-active")){
                         //setTimeout(function() {
                             var ul = self.element.querySelector('#myApplyTemp');
                             $("#myApplyTemp").html('');
                             createFragment(ul, index, pageSize);
                             self.endPullUpToRefresh();
                         //}, 0);
                     }else if($('#item2mobile').hasClass("mui-active")){
                         //setTimeout(function() {
                         var ul = self.element.querySelector('#myApplyTemp1');
                         $("#myApplyTemp1").html('');
                         createFragment1(ul, index, pageSize);
                         self.endPullUpToRefresh();
                         //}, 1000);
                     }else if($('#item3mobile').hasClass("mui-active")){
                         //setTimeout(function() {
                         var ul = self.element.querySelector('#myApplyTemp2');
                         $("#myApplyTemp2").html('');
                         createFragment2(ul, index, pageSize);
                         self.endPullUpToRefresh();
                         //}, 1000);
                     }else if($('#item4mobile').hasClass("mui-active")){
                         //setTimeout(function() {
                         var ul = self.element.querySelector('#myApplyTemp3');
                         $("#myApplyTemp3").html('');
                         createFragment3(ul, index, pageSize);
                         self.endPullUpToRefresh();
                         //}, 1000);
                     }
                     //self.endPullDownToRefresh();
                     }
                 },
                up: {
                    callback: function() {
                        var self = this;
                        if($('#item1mobile').hasClass("mui-active")){
                            setTimeout(function() {
                                var ul = self.element.querySelector('#myApplyTemp');
                                createFragment(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            }, 1000);
                        }else if($('#item2mobile').hasClass("mui-active")){
                            //setTimeout(function() {
                                var ul = self.element.querySelector('#myApplyTemp1');
                                createFragment1(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            //}, 1000);
                        }else if($('#item3mobile').hasClass("mui-active")){
                            //setTimeout(function() {
                            var ul = self.element.querySelector('#myApplyTemp2');
                            createFragment2(ul, index, pageSize);
                            self.endPullUpToRefresh();
                            //}, 1000);
                        }else if($('#item4mobile').hasClass("mui-active")){
                            //setTimeout(function() {
                            var ul = self.element.querySelector('#myApplyTemp3');
                            createFragment3(ul, index, pageSize);
                            self.endPullUpToRefresh();
                            //}, 1000);
                        }
                    }
                }
            });
        });
        var createFragment = function(ul, index, count, reverse) {
            all();
        };
        var createFragment1 = function(ul, index, count, reverse) {
            daijiedan();
        };
        var createFragment2 = function(ul, index, count, reverse) {
            daiqueren();
        };
        var createFragment3 = function(ul, index, count, reverse) {
            yiwangCheng();
        };
    });
    var item2 = document.getElementById('item2mobile');
    var item3 = document.getElementById('item3mobile');
    var item4 = document.getElementById('item4mobile');
    document.getElementById('slider').addEventListener('slide', function(e) {
        if (e.detail.slideNumber === 1) {
            // if (item2.querySelector('.mui-loading')) {
            //     setTimeout(function() {
            //     }, 500);
            // }
        } else if (e.detail.slideNumber === 2) {
            // if (item3.querySelector('.mui-loading')) {
            //     setTimeout(function() {
            //         //item3.querySelector('.mui-scroll').innerHTML = html3;
            //     }, 500);
            // }
        }else if (e.detail.slideNumber === 3) {
            // if (item4.querySelector('.mui-loading')) {
            //     setTimeout(function() {
            //         //item4.querySelector('.mui-scroll').innerHTML = html2;
            //     }, 500);
            // }
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
    //点击报修
    mui(".mui-content").on('tap','#goRepair',function(){
        mui.openWindow({
            url:'myRepair.html',
            id:'myRepair',
            extras:{}
        });
    });
    //点击list跳转详情页面
    mui(".mui-content").on('tap','.repair_list',function(){
        var id = $(this).data('id');
        var person = 'worker';
        mui.openWindow({
            url:'repairDetail.html?id='+id+'&&person='+person,
            id:'repairDetail',
            extras:{}
        });
    });
})(mui);