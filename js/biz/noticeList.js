/**
 * Created by Administrator on 2017/8/15.
 */
(function(mui, doc) {
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                callback: pulldownRefresh
            },
            up: {
                contentrefresh: '正在加载...',
                callback: pullupRefresh
            }
        }
    });
    //mui.init();
    mui.plusReady(function() {});
    var pageNo,pageSize;
    pageNo = 1;
    pageSize = 3;
    var listType = new Uri(location.href).getQueryParamValue('type');
//获取通知列表
//    content();
    function content(){
        mui.ajax(config.httpPath+'api/getSysNoticeList', {
            data: {
                id:localStorage.getItem('id'),
                pageNo:pageNo,
                pageSize:pageSize,
                type:listType
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
                    if(i+1>ajaxData.data.sysNotice.length){
                        break;
                    }
                    var content = '';
                    if(ajaxData.data.sysNotice[i].isOutside == 1){
                        content = '<a class="tiaozhuan" style="color: black;" data-id="'+ajaxData.data.sysNotice[i].url+'">详情请点击：'+ajaxData.data.sysNotice[i].url+'</a>'
                    }else{
                        content = ajaxData.data.sysNotice[i].content;
                    }
                    var time = formatDateTime(ajaxData.data.sysNotice[i].createTime/1000);
                    result += '<ul class="mui-table-view bacdan padding-10">'
                        +'<li class="mui-table-view-cell mui-media mui-text-center font12 graycolor">'
                        +time
                        +'</li>'
                        +'<li data-id="'+ajaxData.data.sysNotice[i].id+'" class="list bacfff padding-10 ridus5 shadow">'
                        +'<div class=" font16 paddingbottom5">'+ajaxData.data.sysNotice[i].title+'</div>'
                        +'<div class="font14 gray-8color mui-ellipsis-2">'
                        + content
                        +'</div>'
                        +'</li>'
                        +'</ul>';
                }
                $("#listTemp").append(result);
                //alert(ajaxData.data.sysNotice.length);
                if(ajaxData.data.sysNotice.length > 0){
                    pageNo += 1;
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

    /**
     * 下拉刷新具体业务实现
     */
    function pulldownRefresh() {
        //setTimeout(function() {
        //    var table = document.body.querySelector('.mui-table-view');
        //    var cells = document.body.querySelectorAll('.mui-table-view-cell');
        //        mui.ajax(config.httpPath+'api/getSysNoticeList', {
        //            data: {
        //                id:sessionStorage.getItem('id'),
        //                pageNo:1,
        //                pageSize:pageSize,
        //                type:listType
        //            },
        //            dataType: 'json', //服务器返回json格式数据
        //            type: 'post', //HTTP请求类型
        //            timeout: 10000, //超时时间设置为10秒；
        //            beforeSend: function(request) {
        //                request.setRequestHeader("X-Token",sessionStorage.getItem('token'));
        //            },
        //            success: function(ajaxData) {
        //                //服务器返回响应，根据响应结果，分析是否成功；
        //                //alert(JSON.stringify(ajaxData));
        //                var result = "<div></div>";
        //                for(var i = 0; i < pageSize; i++){
        //                    if(i+1>ajaxData.data.sysNotice.length){
        //                        break;
        //                    }
        //                    var content = '';
        //                    if(ajaxData.data.sysNotice[i].isOutside == 1){
        //                        content = '<a class="tiaozhuan" style="color: black;" data-id="'+ajaxData.data.sysNotice[i].url+'">详情请点击：'+ajaxData.data.sysNotice[i].url+'</a>'
        //                    }else{
        //                        content = ajaxData.data.sysNotice[i].content;
        //                    }
        //                    var ul = document.createElement('ul');
        //                    ul.className = 'mui-table-view bachui padding-10';
        //                    //ul.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
        //                    //result +='<ul class="mui-table-view bachui padding-10">'
        //                    ul.innerHTML =
        //                        //'<ul class="mui-table-view bachui padding-10">'
        //                        '<li class="mui-table-view-cell mui-media mui-text-center font12 graycolor">'
        //                        +'昨天 16:30'
        //                        +'</li>'
        //                        +'<li data-id="'+ajaxData.data.sysNotice[i].id+'" class="list bacfff padding-10 ridus5 shadow">'
        //                        +'<div class="font16 paddingbottom5">'+ajaxData.data.sysNotice[i].title+'</div>'
        //                        +'<div class="font14 gray-8color mui-ellipsis-2">'
        //                        + content
        //                        +'</div>'
        //                        +'</li>'
        //                        //+'</ul>';
        //                    //下拉刷新，新纪录插到最前面；
        //                    table.insertBefore(ul, table.firstChild);
        //                }
        //                //$("#listTemp").append(result);
        //                if(ajaxData.data.sysNotice.length > 0){
        //                    //pageNo += 1;
        //                }else{
        //                    mui.toast('已经刷新到最新了');
        //                }
        //            },
        //            error: function(xhr, type, errorThrown) {
        //                //异常处理；
        //                console.log(type);
        //                mui.toast('网络异常，请稍后再试');
        //            }
        //        });
        //
        //    mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
        //}, 1500);
       /* $("#listTemp").html('');
        pageNo = 1;
        content();*/
        location.reload();
    }
    var count = 0;
    /**
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {

        setTimeout(function() {
            //参数为true代表没有更多数据了。
            mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2));
            content();
        }, 10);

    }
    if (mui.os.plus) {
        mui.plusReady(function() {
            setTimeout(function() {
                mui('#pullrefresh').pullRefresh().pullupLoading();
            }, 0);

        });
    } else {
        mui.ready(function() {
            mui('#pullrefresh').pullRefresh().pullupLoading();
        });
    }
    //点击通知公告跳转列表页
    mui(".mui-content").on('tap','.list',function(){
        var id = $(this).data('id');
        mui.openWindow({
            url:'noticeContent.html?id='+id,
            id:'noticeContent',
            extras:{}
        });
    });
}(mui, document));