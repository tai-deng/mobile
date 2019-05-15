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
    var dclPageNo = 1;
    var clzPageNo = 1;
    var ywcPageNo = 1;
    var ygbPageNo = 1;
    var pageSize = 5;
    var type = "";

    function all(){
        type = '';
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:sessionStorage.getItem('id'),
                pageNo:allPageNo,
                pageSize:pageSize,
                orderState:type
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
                for(var i = 0; i < pageSize; i++){
                    if(i+1>ajaxData.data.lists.result.length){
                        break;
                    }
                    var result = "";
                    result += '<li class="mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10">'
                        +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                        +'<div class="mui-text-left float-left">订单编号：</div>'
                        +'<div id="nation" class="mui-text-right graycolor" >'+ajaxData.data.lists.result[i].orderNo+'</div>'
                        +'</div>'
                        +'<div class="baceee padding-10">'
                        +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+ajaxData.data.lists.result[i].img1+'">'
                        +'<div class="mui-media-body font14 padding-top-bottom15px">'
                        +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left margintop-5px">'
                        +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                        +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                        +'</p></div> </div> </div>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left padding-top-left10 ">'
                        +'<p class="mui-ellipsis font12"><span >'+ajaxData.data.lists.result[i].orderState+'</span></p>'
                        +'<p class="mui-ellipsis font12">'+ajaxData.data.lists.result[i].repairDate+'</p>'
                        +'</div>'
                        +'<div class="float-right padding-top-right10">'
                        +'<button type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                        +'</div>'
                        +'</li>';
                };
                $("#myApplyTemp").append(result);
                if(ajaxData.data.lists.result.length > 0){
                    allPageNo += 1;
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
    };

    function daiChuli(){
        type = '待处理';
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:sessionStorage.getItem('id'),
                pageNo:dclPageNo,
                pageSize:pageSize,
                orderState:type
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
                for(var i = 0; i < pageSize; i++){
                    if(i+1>ajaxData.data.lists.result.length){
                        break;
                    }
                    var result = "";
                    result += '<li class="mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10">'
                        +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                        +'<div class="mui-text-left float-left">订单编号：</div>'
                        +'<div id="nation" class="mui-text-right graycolor" >'+ajaxData.data.lists.result[i].orderNo+'</div>'
                        +'</div>'
                        +'<div class="baceee padding-10">'
                        +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+ajaxData.data.lists.result[i].img1+'">'
                        +'<div class="mui-media-body font14 padding-top-bottom15px">'
                        +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left margintop-5px">'
                        +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                        +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                        +'</p></div> </div> </div>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left padding-top-left10 ">'
                        +'<p class="mui-ellipsis font12"><span >'+ajaxData.data.lists.result[i].orderState+'</span></p>'
                        +'<p class="mui-ellipsis font12">'+ajaxData.data.lists.result[i].repairDate+'</p>'
                        +'</div>'
                        +'<div class="float-right padding-top-right10">'
                        +'<button type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                        +'</div>'
                        +'</li>';
                };
                $("#myApplyTemp1").append(result);
                if(ajaxData.data.lists.result.length > 0){
                    dclPageNo += 1;
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
    function chuliZhong(){
        type = '';
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:sessionStorage.getItem('id'),
                pageNo:clzPageNo,
                pageSize:pageSize,
                orderState:type
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",sessionStorage.getItem('token'));
            },
            heardes:{'X-Token':'a606cb05-bc09-4e37-9af2-d5dba8d8711e'},
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                for(var i = 0; i < pageSize; i++){
                    if(i+1>ajaxData.data.lists.result.length){
                        break;
                    }
                    var result = "";
                    result += '<li class="mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10">'
                        +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                        +'<div class="mui-text-left float-left">订单编号：</div>'
                        +'<div id="nation" class="mui-text-right graycolor" >'+ajaxData.data.lists.result[i].orderNo+'</div>'
                        +'</div>'
                        +'<div class="baceee padding-10">'
                        +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+ajaxData.data.lists.result[i].img1+'">'
                        +'<div class="mui-media-body font14 padding-top-bottom15px">'
                        +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left margintop-5px">'
                        +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                        +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                        +'</p></div> </div> </div>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left padding-top-left10 ">'
                        +'<p class="mui-ellipsis font12"><span >'+ajaxData.data.lists.result[i].orderState+'</span></p>'
                        +'<p class="mui-ellipsis font12">'+ajaxData.data.lists.result[i].repairDate+'</p>'
                        +'</div>'
                        +'<div class="float-right padding-top-right10">'
                        +'<button type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                        +'</div>'
                        +'</li>';
                };
                $("#myApplyTemp2").append(result);
                if(ajaxData.data.lists.result.length > 0){
                    clzPageNo += 1;
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

    function yiwangCheng(){
        type = '已完成';
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:sessionStorage.getItem('id'),
                pageNo:ywcPageNo,
                pageSize:pageSize,
                orderState:type
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
                for(var i = 0; i < pageSize; i++){
                    if(i+1>ajaxData.data.lists.result.length){
                        break;
                    }
                    var result = "";
                    result += '<li class="mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10">'
                        +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                        +'<div class="mui-text-left float-left">订单编号：</div>'
                        +'<div id="nation" class="mui-text-right graycolor" >'+ajaxData.data.lists.result[i].orderNo+'</div>'
                        +'</div>'
                        +'<div class="baceee padding-10">'
                        +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+ajaxData.data.lists.result[i].img1+'">'
                        +'<div class="mui-media-body font14 padding-top-bottom15px">'
                        +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left margintop-5px">'
                        +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                        +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                        +'</p></div> </div> </div>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left padding-top-left10 ">'
                        +'<p class="mui-ellipsis font12"><span >'+ajaxData.data.lists.result[i].orderState+'</span></p>'
                        +'<p class="mui-ellipsis font12">'+ajaxData.data.lists.result[i].repairDate+'</p>'
                        +'</div>'
                        +'<div class="float-right padding-top-right10">'
                        +'<button type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                        +'</div>'
                        +'</li>';
                };
                $("#myApplyTemp3").append(result);
                if(ajaxData.data.lists.result.length > 0){
                    ywcPageNo += 1;
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

    function yiGuanbi(){
        type = '已关闭';
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:sessionStorage.getItem('id'),
                pageNo:ygbPageNo,
                pageSize:pageSize,
                orderState:type
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
                for(var i = 0; i < pageSize; i++){
                    if(i+1>ajaxData.data.lists.result.length){
                        break;
                    }
                    var result = "";
                    result += '<li class="mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10">'
                        +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
                        +'<div class="mui-text-left float-left">订单编号：</div>'
                        +'<div id="nation" class="mui-text-right graycolor" >'+ajaxData.data.lists.result[i].orderNo+'</div>'
                        +'</div>'
                        +'<div class="baceee padding-10">'
                        +'<img class="mui-media-object mui-pull-left margintop-5px" src="'+ajaxData.data.lists.result[i].img1+'">'
                        +'<div class="mui-media-body font14 padding-top-bottom15px">'
                        +'<span id="servicethree">故障物品：<span class="">'+ajaxData.data.lists.result[i].repairArea+'</span></span>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left margintop-5px">'
                        +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
                        +'<span >'+ajaxData.data.lists.result[i].description+'</span>'
                        +'</p></div> </div> </div>'
                        +'<div style="clear: both;"></div>'
                        +'<div class="float-left padding-top-left10 ">'
                        +'<p class="mui-ellipsis font12"><span >'+ajaxData.data.lists.result[i].orderState+'</span></p>'
                        +'<p class="mui-ellipsis font12">'+ajaxData.data.lists.result[i].repairDate+'</p>'
                        +'</div>'
                        +'<div class="float-right padding-top-right10">'
                        +'<button type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                        +'</div>'
                        +'</li>';
                };
                $("#myApplyTemp4").append(result);
                if(ajaxData.data.lists.result.length > 0){
                    ygbPageNo += 1;
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

    mui.ready(function() {
        //循环初始化所有下拉刷新，上拉加载。
        mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
            mui(pullRefreshEl).pullToRefresh({
                /*down: {
                 callback: function() {
                     var self = this;
                         setTimeout(function() {
                             var ul = self.element.querySelector('#myApplyTemp');
                             ul.insertBefore(createFragment(ul, index, pageSize), ul.firstChild);
                             //ul.insertBefore(createFragment(ul, index, pageSize), $('#myApplyTemp').firstChild);
                             self.endPullDownToRefresh();
                         }, 1000);
                     }
                 },*/
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
                        }else if($('#item5mobile').hasClass("mui-active")){
                            //setTimeout(function() {
                            var ul = self.element.querySelector('#myApplyTemp4');
                            createFragment4(ul, index, pageSize);
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
            daiChuli();
        };
        var createFragment2 = function(ul, index, count, reverse) {
            chuliZhong();
        };
        var createFragment3 = function(ul, index, count, reverse) {
            yiwangCheng();
        };
        var createFragment4 = function(ul, index, count, reverse) {
            yiGuanbi();
        };
    });

    var item2 = document.getElementById('item2mobile');
    var item3 = document.getElementById('item3mobile');
    var item4 = document.getElementById('item4mobile');
    var item5 = document.getElementById('item5mobile');
    document.getElementById('slider').addEventListener('slide', function(e) {
        if (e.detail.slideNumber === 1) {
            if (item2.querySelector('.mui-loading')) {
                setTimeout(function() {
                    item2.querySelector('.mui-scroll').innerHTML = html2;
                }, 500);
            }
        } else if (e.detail.slideNumber === 2) {
            if (item3.querySelector('.mui-loading')) {
                setTimeout(function() {
                    item3.querySelector('.mui-scroll').innerHTML = html3;
                }, 500);
            }
        }else if (e.detail.slideNumber === 3) {
            if (item4.querySelector('.mui-loading')) {
                setTimeout(function() {
                    item4.querySelector('.mui-scroll').innerHTML = html2;
                }, 500);
            }
        }else if (e.detail.slideNumber === 4) {
            if (item4.querySelector('.mui-loading')) {
                setTimeout(function() {
                    item5.querySelector('.mui-scroll').innerHTML = html2;
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

    //点击报修
    mui(".mui-content").on('tap','#goRepair',function(){
        mui.openWindow({
            url:'myRepair.html',
            id:'myRepair',
            extras:{}
        });
    });
})(mui);