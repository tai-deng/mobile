/**
 * Created by Administrator on 2017/7/28.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {});
    var pid;

    mui.ajax(config.httpPath+'api/getApplyBusDetail', {
        data: {
            /*userName:'zhuyinyan2014963546',
             passWord:'123456'*/
            processInstanceId:'1020146'
        },
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        success: function(ajaxData) {
            //服务器返回响应，根据响应结果，分析是否成功；
            alert(JSON.stringify(ajaxData));
            pid = ajaxData.data.pid;
            $('#status').text(ajaxData.data.status);
            $('#step1-text').text(ajaxData.data.taskInfoVo[0].name);
            $('#step1-time').text(ajaxData.data.taskInfoVo[0].completeDate);
            $('#step2-text').text(ajaxData.data.taskInfoVo[1].name);
            $('#step2-time').text(ajaxData.data.taskInfoVo[1].completeDate);
            $('#step2-xiala-content').text(ajaxData.data.taskInfoVo[1].content);
           /* $('#step3-text').text(ajaxData.data.taskInfoVo[2].name);
            $('#step3-time').text(ajaxData.data.taskInfoVo[2].completeDate);
            $('#step3-xiala-content').text(ajaxData.data.taskInfoVo[2].content);*/
            var html = ajaxData.data.formInfo;
            //$('#table').html('');
            $('#table').html(html);
            //第二部的下拉
            var twoFlag = 'true';
            //mui("#step2-xiala").addEventListener('tap',function(){
            mui(".mui-content").on('tap','#step2-xiala',function(){
                //点击响应逻辑
                if(twoFlag ==="true"){
                    //显示所有
                    twoFlag = "false"
                    $('#step2-xiala-content').removeClass('display-none');
                    $('#step2-xiala').addClass('rotate180');
                }else{
                    //显示部分
                    twoFlag = 'true';
                    $('#step2-xiala-content').addClass('display-none');
                    $('#step2-xiala').removeClass('rotate180');
                }
            });

            //第三步的下拉
            var threeFlag = 'true';
            //document.getElementById("").addEventListener('tap',function(){
            mui(".mui-content").on('tap','#step3-xiala',function(){
                //点击响应逻辑
                if(threeFlag ==="true"){
                    //显示所有
                    threeFlag = "false"
                    $('#step3-xiala-content').removeClass('display-none');
                    $('#step3-xiala').addClass('rotate180');
                }else{
                    //显示部分
                    threeFlag = 'true';
                    $('#step3-xiala-content').addClass('display-none');
                    $('#step3-xiala').removeClass('rotate180');
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
            alert('网络异常，请稍后再试');
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
                        if(ajaxData.meta.success === 'true'){
                            mui.alert(ajaxData.meta.message+"啦啦啦啦");
                        }else{
                            mui.alert(ajaxData.meta.message);
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                        alert('失败！');
                    }
                });
            }
        });
    });

}(mui, document));