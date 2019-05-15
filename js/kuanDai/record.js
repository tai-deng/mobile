/**
 * Created by Administrator on 2018/2/9.
 */
(function(mui, doc) {
   /* var tag = new Uri(location.href).getQueryParamValue('tag');
    alert(tag);*/
    var pageNo = 1;
    var pageSize = 10;
    var yesData = false;
    mui.plusReady(function() {});
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
    /**
     * 下拉刷新具体业务实现
     */
    function pulldownRefresh() {
        setTimeout(function() {
            var table = document.body.querySelector('.mui-table-view');
            //var cells = document.body.querySelectorAll('.mui-table-view-cell');
            /*for (var i = cells.length, len = i + 3; i < len; i++) {
             var li = document.createElement('li');
             li.className = 'mui-table-view-cell';
             li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
             //下拉刷新，新纪录插到最前面；
             table.insertBefore(li, table.firstChild);
             }*/
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
        }, 500);
    }
    var count = 0;
    /**
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {
        setTimeout(function() {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh((yesData)); //参数为true代表没有更多数据了。
            var table = document.body.querySelector('.mui-table-view');
            //var cells = document.body.querySelectorAll('.mui-table-view-cell');
            /*for (var i = cells.length, len = i + 5; i < len; i++) {
                var li = document.createElement('li');
                li.className = 'mui-table-view-cell mui-media';
                li.innerHTML = '<span class="mui-media-object mui-pull-left iconfont icon-zichan font26 greencolor"></span>'
                    +'<span class=" money mui-media-object mui-pull-right font18 maincolor">30.00</span>'
                    + '<div class="mui-media-body">'
                    +'缴费<span class="price">30</span>元'
                    +'<p class="mui-ellipsis time">2017年10月31日  15:59:21</p>'
                    +'</div>';
                table.appendChild(li);
            }*/
            getData();
            function getData(){
                //alert(pageNo);
                mui.ajax(config.httpPath+'api/Broadband/getFundList', {
                    data: {
                        id:localStorage.getItem('id'),
                        pageNo:pageNo,
                        pageSize:pageSize,
                        siteFcode:localStorage.getItem('siteFcode')
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    timeout: 10000, //超时时间设置为10秒；
                    beforeSend: function(request) {
                        request.setRequestHeader("X-Token",localStorage.getItem('token'));
                    },
                    success: function(ajaxData) {
                        //服务器返回响应,根据响应结果,分析是否成功；
                        //alert(JSON.stringify(ajaxData));
                        if(ajaxData.data.length > 0){
                            pageNo += 1;
                        }else{
                            yesData = true;
                            mui.toast('没有更多数据了');
                        }
                        if(ajaxData.meta.success == true){
                            for(var i = 0; i < ajaxData.data.length; i++){
                                var li = document.createElement('li');
                                li.className = 'mui-table-view-cell mui-media';
                                li.innerHTML = '<span class="mui-media-object mui-pull-left iconfont icon-zichan font26 greencolor"></span>'
                                    +'<span class=" money mui-media-object mui-pull-right font18 maincolor">'+ajaxData.data[i].amount+'</span>'
                                    +'<div class="mui-media-body">'
                                    + ajaxData.data[i].userId+'&nbsp;&nbsp;&nbsp;&nbsp;'
                                    +'缴费<span class="price">'+ajaxData.data[i].amount+'</span>元'
                                    +'<p class="mui-ellipsis time">'+formatDateTime(ajaxData.data[i].crateDate/1000)+'</p>'
                                    +'</div>';
                                table.appendChild(li);
                            }
                        }else{
                            mui.toast(ajaxData.meta.message);
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                        mui.toast('网络异常,请稍后再试');
                    }
                });
            }
        }, 300);
    }
    if (mui.os.plus) {
        mui.plusReady(function() {
            setTimeout(function() {
                mui('#pullrefresh').pullRefresh().pullupLoading();
            }, 500);
        });
    } else {
        mui.ready(function() {
            mui('#pullrefresh').pullRefresh().pullupLoading();
        });
    }
    /*//打开日历选择时间
    mui('body').on('tap','#choose',function(){
        var dtpicker = new mui.DtPicker({
            "type": "month"
        });
        dtpicker.show(function(e) {
            alert(e);
        });
        // 暂时禁止滚动
        mui('#pullrefresh').pullRefresh().setStopped(true);
    });

    mui('body').on('tap','.mui-backdrop',function(){
        // 取消暂时禁止滚动
        mui('#pullrefresh').pullRefresh().setStopped(false);
    });
    mui('body').on('tap','.mui-dtpicker-header',function(e){
        var target = e.target;
        if(target.tagName === 'BUTTON'){
            // 取消暂时禁止滚动
            mui('#pullrefresh').pullRefresh().setStopped(false);
        }
    });*/
}(mui, document));