(function(mui) {
    var height = window.innerHeight;
    $('.mui-control-content').css('height',height-110);
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
    var deal_status;
    var tips;
    var allFlag = 0, dclFlag = 0,clzFlag = 0,ywcFlag = 0,ygbFlag = 0;
    var personType;
    all();
    function all(){
        type = '';
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:allPageNo,
                pageSize:pageSize,
                orderState:type
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
                //alert(ajaxData.data.lists.result[0].img1);
                //console.log(ajaxData.data.lists.result[0].img1);
                //$('#op').text(ajaxData.data.lists.result[0].img1);
                var result = "";
                for(var i = 0; i < pageSize; i++){
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
                    var chehui = '';
                    if(ajaxData.data.lists.result[i].orderState ==1){ //1待处理  2处理中  3已完成  4已关闭
                        deal_status = '待处理';
                        tips = '订单已成功提交，请等待处理';
                        chehui ='<div class="float-right padding-top-right10" style="position: absolute;z-index: 99;right: 0px;">'
                                +'<button data-id="'+ajaxData.data.lists.result[i].id+'" type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                                +'</div>';
                    }else if(ajaxData.data.lists.result[i].orderState ==2){
                        deal_status = '处理中';
                        tips = '订单已被受理，维修师傅正在解决中';
                    }else if(ajaxData.data.lists.result[i].orderState ==3){
                        deal_status = '已完成';
                        tips = '订单已完成';
                    }else if(ajaxData.data.lists.result[i].orderState ==4){
                        deal_status = '已关闭';
                        tips = '您的订单已被关闭，具体原因请点击查看';
                    }
                    result += '<li data-id="'+ajaxData.data.lists.result[i].id+'" class="mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10">'
                        +'<span class="mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
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
                        +chehui
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
    daiChuli();
    function daiChuli(){
        type = 1;
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:dclPageNo,
                pageSize:pageSize,
                orderState:type
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
                var result = "";
                for(var i = 0; i < pageSize; i++){
                    if(ajaxData.data.lists.result.length == 0){
                        if( dclFlag == 0){
                            $("#myApplyTemp1").append('<li class="bacfff mui-text-center padding-10 graycolor">暂无数据</li>');
                            dclFlag = 1;
                            break;
                        }
                    }else{
                        dclFlag = 1;
                    }
                    if(i+1>ajaxData.data.lists.result.length){
                        break;
                    }
                    //没有图片放一张默认图片
                    var imgSrc = ''
                    if(ajaxData.data.lists.result[i].img1 == null){
                        imgSrc = '../img/img-wu.png'
                    }else{
                        imgSrc = config.httpPath+ajaxData.data.lists.result[i].img1;
                    }
                    if(ajaxData.data.lists.result[i].orderState ==1){ //1待处理  2处理中  3已完成  4已关闭
                        deal_status = '待处理';
                        tips = '订单已成功提交，请等待处理';
                    }else if(ajaxData.data.lists.result[i].orderState ==2){
                        deal_status = '处理中';
                        tips = '订单已被受理，维修师傅正在解决中';
                    }else if(ajaxData.data.lists.result[i].orderState ==3){
                        deal_status = '已完成';
                        tips = '订单已完成';
                    }else if(ajaxData.data.lists.result[i].orderState ==4){
                        deal_status = '已关闭';
                        tips = '您的订单已被关闭，具体原因请点击查看';
                    }

                    result += '<li data-id="'+ajaxData.data.lists.result[i].id+'" class="content_list mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10">'
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
                        +'<div class="float-right padding-top-right10">'
                        +'<button data-id="'+ajaxData.data.lists.result[i].id+'" type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
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
    chuliZhong();
    function chuliZhong(){
        type = 2;
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:clzPageNo,
                pageSize:pageSize,
                orderState:type
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
                var result = "";
                for(var i = 0; i < pageSize; i++){
                    if(ajaxData.data.lists.result.length == 0){
                        if(clzFlag == 0){
                            $("#myApplyTemp2").append('<li class="bacfff mui-text-center padding-10 graycolor">暂无数据</li>');
                            clzFlag = 1;
                            break;
                        }
                    }else{
                        clzFlag = 1;
                    }
                    if(i+1>ajaxData.data.lists.result.length){
                        break;
                    }
                    //没有图片放一张默认图片
                    var imgSrc = ''
                    if(ajaxData.data.lists.result[i].img1 == null){
                        imgSrc = '../img/img-wu.png'
                    }else{
                        imgSrc = config.httpPath+ajaxData.data.lists.result[i].img1;
                    }
                    if(ajaxData.data.lists.result[i].orderState ==1){ //1待处理  2处理中  3已完成  4已关闭
                        deal_status = '待处理';
                        tips = '订单已成功提交，请等待处理';
                    }else if(ajaxData.data.lists.result[i].orderState ==2){
                        deal_status = '处理中';
                        tips = '订单已被受理，维修师傅正在解决中';
                    }else if(ajaxData.data.lists.result[i].orderState ==3){
                        deal_status = '已完成';
                        tips = '订单已完成';
                    }else if(ajaxData.data.lists.result[i].orderState ==4){
                        deal_status = '已关闭';
                        tips = '您的订单已被关闭，具体原因请点击查看';
                    }

                    result += '<li data-id="'+ajaxData.data.lists.result[i].id+'" class="content_list mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10" >'
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
                        /*+'<div class="float-right padding-top-right10">'
                        +'<button type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                        +'</div>'*/
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
    yiwangCheng();
    function yiwangCheng(){
        type = 3;
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:ywcPageNo,
                pageSize:pageSize,
                orderState:type
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
                var result = "";
                for(var i = 0; i < pageSize; i++){
                    if(ajaxData.data.lists.result.length == 0){
                        if(ywcFlag == 0){
                            $("#myApplyTemp3").append('<li class="bacfff mui-text-center padding-10 graycolor">暂无数据</li>');
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
                    var imgSrc = ''
                    if(ajaxData.data.lists.result[i].img1 == null){
                        imgSrc = '../img/img-wu.png'
                    }else{
                        imgSrc = config.httpPath+ajaxData.data.lists.result[i].img1;
                    }
                    if(ajaxData.data.lists.result[i].orderState ==1){ //1待处理  2处理中  3已完成  4已关闭
                        deal_status = '待处理';
                        tips = '订单已成功提交，请等待处理';
                    }else if(ajaxData.data.lists.result[i].orderState ==2){
                        deal_status = '处理中';
                        tips = '订单已被受理，维修师傅正在解决中';
                    }else if(ajaxData.data.lists.result[i].orderState ==3){
                        deal_status = '已完成';
                        tips = '订单已完成';
                    }else if(ajaxData.data.lists.result[i].orderState ==4){
                        deal_status = '已关闭';
                        tips = '您的订单已被关闭，具体原因请点击查看';
                    }

                    result += '<li data-id="'+ajaxData.data.lists.result[i].id+'" class="content_list mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;">'
                        +'<div class="padding-10" >'
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
                        /*+'<div class="float-right padding-top-right10">'
                        +'<button  type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                        +'</div>'*/
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
    yiGuanbi();
    function yiGuanbi(){
        type = 4;
        mui.ajax(config.httpPath+'api/findOrderByStatus', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:ygbPageNo,
                pageSize:pageSize,
                orderState:type
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
                var result = "";
                for(var i = 0; i < pageSize; i++){
                    if(ajaxData.data.lists.result.length == 0){
                        if(ygbFlag == 0){
                            $("#myApplyTemp4").append('<li class="bacfff mui-text-center padding-10 graycolor">暂无数据</li>');
                            ygbFlag = 1;
                            break;
                        }
                    }else{
                        ygbFlag = 1;
                    }
                    if(i+1>ajaxData.data.lists.result.length){
                        break;
                    }
                    //没有图片放一张默认图片
                    var imgSrc = ''
                    if(ajaxData.data.lists.result[i].img1 == null){
                        imgSrc = '../img/img-wu.png'
                    }else{
                        imgSrc = config.httpPath+ajaxData.data.lists.result[i].img1;
                    }
                    if(ajaxData.data.lists.result[i].orderState ==1){ //1待处理  2处理中  3已完成  4已关闭
                        deal_status = '待处理';
                        tips = '订单已成功提交，请等待处理';
                    }else if(ajaxData.data.lists.result[i].orderState ==2){
                        deal_status = '处理中';
                        tips = '订单已被受理，维修师傅正在解决中';
                    }else if(ajaxData.data.lists.result[i].orderState ==3){
                        deal_status = '已完成';
                        tips = '订单已完成';
                    }else if(ajaxData.data.lists.result[i].orderState ==4){
                        deal_status = '已关闭';
                        tips = '您的订单已被关闭，具体原因请点击查看';
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
                        /*+'<div class="float-right padding-top-right10">'
                        +'<button data-id="123" type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
                        +'</div>'*/
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
                down: {
                     callback: function() {
                         var self = this;
                         allPageNo = 1;
                         dclPageNo = 1;
                         clzPageNo = 1;
                         ywcPageNo = 1;
                         ygbPageNo = 1;
                         if($('#item1mobile').hasClass("mui-active")){
                             //setTimeout(function() {
                             var ul = self.element.querySelector('#myApplyTemp');
                             $("#myApplyTemp").html('');
                             createFragment(ul, index, pageSize);
                             self.endPullUpToRefresh();
                             //}, 1000);
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
                         }else if($('#item5mobile').hasClass("mui-active")){
                             //setTimeout(function() {
                             var ul = self.element.querySelector('#myApplyTemp4');
                             $("#myApplyTemp4").html('');
                             createFragment4(ul, index, pageSize);
                             self.endPullUpToRefresh();
                             //}, 1000);
                         }
                     }
                 },
                up: {
                    callback: function() {
                        var self = this;
                        if($('#item1mobile').hasClass("mui-active")){
                            //setTimeout(function() {
                                var ul = self.element.querySelector('#myApplyTemp');
                                createFragment(ul, index, pageSize);
                                self.endPullUpToRefresh();
                            //}, 1000);
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
        // $.each([decryptByDES(localStorage.getItem('juese'),keyValue)],function(index,value){
            //alert('i+...'+value);
            //if(value === 'ff9ee11d80255b434cedf206a10dfcc9'){
            // if(value === '维修人员角色'){
            //     personType = value;
            //     $('#goRepair').css("display","none");
            // }else{
            //     $('#weixiuyuan').css('display','none');
            // }
        // });
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
                }, 500);
            }
        } else if (e.detail.slideNumber === 2) {
            if (item3.querySelector('.mui-loading')) {
                setTimeout(function() {
                    //item3.querySelector('.mui-scroll').innerHTML = html3;
                }, 500);
            }
        }else if (e.detail.slideNumber === 3) {
            if (item4.querySelector('.mui-loading')) {
                setTimeout(function() {
                    //item4.querySelector('.mui-scroll').innerHTML = html2;
                }, 500);
            }
        }else if (e.detail.slideNumber === 4) {
            if (item4.querySelector('.mui-loading')) {
                setTimeout(function() {
                    //item5.querySelector('.mui-scroll').innerHTML = html2;
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
    //点击list跳转详情页面
    mui(".mui-content").on('tap','.repair_list',function(){
        var id = $(this).data('id');
        var person = 'user';
        mui.openWindow({
            url:'repairDetail.html?id='+id+'&&person='+person,
            id:'repairDetail',
            extras:{}
        });
    });
    //点击我是维修员
    mui("body").on('tap','#weixiuyuan',function(){
        var aa = localStorage.getItem('juese');
       /* alert(aa);
        console.log(aa);
        alert(decryptByDES('2CE51F56AE3BED4B7A64C86AC48ACFEC',keyValue));*/
        // //alert(decryptByDES(localStorage.getItem('juese'),keyValue));
        // $.each([decryptByDES(localStorage.getItem('juese'),keyValue)],function(index,value){
        //     //alert('i+...'+value);
        //     //if(value === 'ff9ee11d80255b434cedf206a10dfcc9'){
        //     if(value === '维修人员角色'){
        //         personType = value;
        //     }
        // });
        //if( personType === 'ff9ee11d80255b434cedf206a10dfcc9'){
        // if( personType === '维修人员角色'){
        //     mui.openWindow({
        //         url:'repairRecordWorker.html',
        //         id:'repairRecordWorker',
        //         extras:{}
        //     });
        // }else{
        //     mui.alert('您不是维修员哦','提示','确定',null,'div');
        // }
    });
    //点击撤回
    mui(".mui-content").on('tap','.mui-btn',function(){
        var id = $(this).data('id');
        var btn = ["取消","确定"];
        mui.confirm('确认撤回？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                mui.ajax(config.httpPath+'api/recallOrder', {
                    data: {
                        id:localStorage.getItem('id'),
                        orderId:id
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
                            mui.toast(ajaxData.meta.message);
                            location.reload();
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
})(mui);