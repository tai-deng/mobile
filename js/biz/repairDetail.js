/**
 * Created by Administrator on 2017/7/28.
 */
(function(mui, doc) {
    mui.plusReady(function() {
        var self=plus.webview.currentWebview();
        var opener = self.opener();
        var old_back = mui.back;
        mui.back = function() {
            var wobj = plus.webview.getWebviewById(opener.id);
            wobj.reload(true);
            old_back();
        }
    });
    var listId = new Uri(location.href).getQueryParamValue('id');
    var person = new Uri(location.href).getQueryParamValue('person');
    var picker,data2;
    //点击我要留言
    var workerLiuyan;
    var liuyanFlag = 0;//留言次数为仅一次
    mui("body").on('tap','#leaveNote',function(){
        var btn = ["取消","确定"];
        mui.confirm('确认评价？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                var repairRemark = $('#repairRemark').val();
                if( repairRemark == ''){
                    // if(person == 'worker'){
                    //     repairRemark = '师傅已修理完毕，请您确认完成！';
                    //     //mui.alert('已给报修人留过言，不能再次留言','提示','确定',null,'div');
                    //     if(liuyanFlag != 0 || workerLiuyan == true){
                    //         mui.alert('已给报修人留过言，不能再次留言','提示','确定',null,'div');
                    //     }else{
                    //         leaveNote();
                    //     }
                    // }else{
                    //     mui.alert('请输入留言','提示','确定',null,'div');
                    // }
                    mui.alert('请输入评价','提示','确定',null,'div');
                }else{
                    if(person == 'worker'){
                        if(liuyanFlag != 0 || workerLiuyan == true){
                            mui.alert('已给报修人留过言，不能再次留言','提示','确定',null,'div');
                        }else{
                            leaveNote();
                        }
                    }else{
                        if(liuyanFlag != 0){
                            mui.alert('已评价1次，不能继续哦~','提示','确定',null,'div');
                        }else{
                            leaveNote();
                        }
                    }
                }
                function leaveNote(){
                    mui.ajax(config.httpPath+'/api/evaluation', {
                        data: {
                            id:localStorage.getItem('id'),
                            orderId:listId,
                            repairRemark:repairRemark
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Token",localStorage.getItem('token'));
                        },
                        success: function(ajaxData) {
                            //服务器返回响应，根据响应结果，分析是否成功；
                            if(ajaxData.meta.success == true){
                                liuyanFlag = 1;
                                mui.toast('评价成功');
                                $('#repairRemark').attr("readonly","true");
                                $('#leaveNote').addClass('display-none');
                                $('#back').removeClass('display-none');
                                scrollToEnd();

                                // if(person == 'worker'){
                                //     // $('#chuliyijian').removeClass('display-none');
                                //     // $('#deal_message').val(repairRemark);
                                // }else{
                                //     // $('#baoxiuliuyan').removeClass('display-none');
                                //     $('#message').removeClass('display-none');
                                //     $('#message').val(repairRemark);
                                // }
                            }else{
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
            }
        },'div');
    });

    //点击接单处理
    mui("body").on('tap','#receivOrder',function(){
        var btn = ["取消","确定"];
        mui.confirm('确认接单？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                mui.ajax(config.httpPath+'api/receiveOrder', {
                    data: {
                        id:localStorage.getItem('id'),
                        orderId:listId
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 10000, //超时时间设置为10秒；
                    beforeSend: function(request) {
                        request.setRequestHeader("X-Token",localStorage.getItem('token'));
                    },
                    success: function(ajaxData) {
                        //服务器返回响应，根据响应结果，分析是否成功；
                        if(ajaxData.meta.success == true){
                            mui.toast('接单成功');
                            //$('#prograss').css('width','66.666%');
                            setTimeout(function(){
                                //location.reload();
                                mui.openWindow({
                                    url:'repairRecordWorker.html',
                                    id:'repairRecordWorker',
                                    extras:{
                                    }
                                });
                            },1000);
                        }else{
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
        },'div');
    });

    //点击完成订单
    mui("body").on('tap','#completeOrder',function(){
        var btn = ["取消","确定"];
        if(data2 == '其它'){
            data2 = $('#fault_other').val();
        }
        if(!!data2){
            mui.confirm('确认师傅已完成订单？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    mui.ajax(config.httpPath+'api/completeOrder', {
                        data: {
                            id:localStorage.getItem('id'),
                            orderId:listId,
                            data2
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Token",localStorage.getItem('token'));
                        },
                        success: function(ajaxData) {
                            if(ajaxData.meta.success == true){
                                mui.openWindow({
                                    url:'repairComplete.html?id='+listId+'&&person='+person,
                                    id:'repairComplete',
                                    extras:{}
                                });
                            }else{
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
            },'div');
        }else{
            mui.toast('请选择故障类型！');
        }
    });

    // 返回一页
    mui('body').on('tap','#back',function(){
        window.history.back();
    })

    //查询详情接口
    detail();
    function detail(){
        mui.ajax(config.httpPath+'api/orderDetails', {
            data: {
                id:localStorage.getItem('id'),
                orderId:listId
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                if(ajaxData.meta.success == true){
                    let data = ajaxData.data.order;
                    $('#bottom').removeClass('display-none');
                    if(person == 'worker'){
                        worker_repair(data)
                    }
                    else{
                        user_repair(data)
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

    // worker 确认状态故障选择
    function pickerFn (){
        picker = new mui.PopPicker(); 
        mui.ajax(config.httpPath+'api/getRepairType', {
            data: {
                id:localStorage.getItem('id'),
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                if(ajaxData.meta.success == true){
                    let data = []
                    ajaxData.data.lists.forEach(element => {
                        let obj = {};
                        for (const key in element) {
                            if(key == 'opText'){
                                obj.text = element[key]
                            }
                            if(key == 'opValue'){
                                obj.value = element[key]
                            }
                            if(key == 'children'){
                                obj.children = element[key]
                            }
                        }
                        data.push(obj);
                    });
                    picker.setData(data);
                }else{
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
    $('#fault_type').bind('click',function(){
        picker.show(function (selectItems) {
            $('#fault_type_value').text(selectItems[0].text);
            data2 = selectItems[0].text;
            if(data2 == '其它'){
                $('#fault_other').removeClass('display-none');
                $('#fault_other').attr('placeholder','请输入故障具体内容！')
                scrollToEnd();
            }else{
                $('#fault_other').addClass('display-none');
            }
        })
    })

    // user 用户报修状态处理
    function user_repair(data){
        if(data.orderState == 1 || data.processState == 1){
            $('#back').removeClass('display-none');
            $('#state').text('待处理');
        }
        if(data.orderState == 2 || data.processState == 2){
            $('#state').text('处理中');
            $('#back').removeClass('display-none');
        }
        if(data.orderState == 3 || data.processState == 3){
            $('#state').text('已完成');
            $('#chuliren').removeClass('display-none');
            $('#deal_name').val(data.processPeople);
            $('#liuyan').removeClass('display-none');
            if(!data.repairRemark){
                $('#leaveNote').removeClass('display-none');
                $('#leaveNote').text('我要评论');
                scrollToEnd();
            }else{
                $('#repairRemark').attr("readonly","true");
                $('#repairRemark').val(data.repairRemark);
                $('#leaveNote').addClass('display-none');
                $('#back').removeClass('display-none');
            }
        }
        
        public_repair(data);
        $('#user_name').text('维修人：')
        $('#repair_people').val(data.processPeople ? data.processPeople : '待处理');
        if(!!data.data1){
            $('#repair_phone').val(data.data1);
            $('#repair_phone_call').attr('href','tel:'+data.data1);
        }
        else{
            $('#repair_phone').val('暂无');
        }
    }

    // worker 工人维修状态处理
    function worker_repair(data){
        if(data.orderState == 1 || data.processState == 1){
            $('#state').text('待接单');
            $('#receivOrder').removeClass('display-none');
            $('#receivOrder').text('接单处理');
        }
        if(data.orderState == 2 || data.processState == 2){
            $('#state').text('待确认');
            $('#fault_type').removeClass('display-none');
            $('#completeOrder').removeClass('display-none');
            $('#completeOrder').text('确认完成订单');
            $('#chuliren').removeClass('display-none');
            $('#deal_name').val(data.processPeople);
            pickerFn();
        }
        if(data.orderState == 3 || data.processState == 3){
            $('#state').text('已完成');
            $('#chuliren').removeClass('display-none');
            $('#deal_name').val(data.processPeople);
            $('#back').removeClass('display-none');
        }

        public_repair(data)
        $('#user_name').text('报修人：')
        $('#repair_people').val(data.repairPeople ? data.repairPeople :'待处理');
        if(!!data.repairPhone){
            $('#repair_phone_call').attr('href','tel:'+data.repairPhone);
            $('#repair_phone').val(data.repairPhone);
        }
        else{
            $('#repair_phone').val('暂无');
        }
    }
    
    // 共同使用的状态
    function public_repair(data){
        if(data.orderState == 1 || data.processState == 1){
            $('#deal_time').text(formatDateTime(data.createTime/1000));
            $('#prograss').css('width','33.333%');
            $('#description').attr("readonly","true");
        }
        if(data.orderState == 2 || data.processState == 2){
            $('#deal_time').text(formatDateTime(data.processDate/1000));
            $('#prograss').css('width','66.666%');
            $('#description').attr("readonly","true");
        }
        if(data.orderState == 3 || data.processState == 3){
            $('#deal_time').text(formatDateTime(data.processDate/1000));
            $('#prograss').css('width','100%');
            $('#description').attr("readonly","true");
        }
        if(data.orderState == 4){
            $('#deal_name').val(data.processPeople);
            $('#deal_time').text(formatDateTime(data.processDate/1000));
            $('#state').text('已关闭');
            $('#prograss').css('width','0%');
            $('#description').attr("readonly","true");
            $('.mui-content').removeClass('content');
            $('#back').removeClass('display-none');
        }

        $('#order_id').val(data.orderNo);
        $('#deal_message').val(data.remark);
        $('#message').val(data.repairRemark);
        $('#order_place').val(data.repairArea);
        $('#order_project').val(data.repairProject);
        $('#address').val(data.repairAddress);
        $('#description').val(data.description);
        $('.picture').removeClass('display-none')

        if(!!data.img1){
            $("#img1").removeClass('display-none');
            $("#img1").attr('src',config.pic+data.img1);
        }else{
            $('.z_photo').text('暂无图片')
        }
        if(!!data.img2){
            $("#img2").removeClass('display-none');
            $("#img2").attr('src',config.pic+data.img2);
        }
        if(!!data.img3){
            $("#img3").removeClass('display-none');
            $("#img3").attr('src',config.pic+data.img3);
        }
        if(!!data.img4){
            $("#img4").removeClass('display-none');
            $("#img4").attr('src',config.pic+data.img4);
        }
        if(!!data.img5){
            $("#img5").removeClass('display-none');
            $("#img5").attr('src',config.pic+data.img5);
        }
    }
    function scrollToEnd(){//滚动到底部
        var h = $(document).height()-$(window).height();
        $(document).scrollTop(h); 
    }

}(mui, document));

