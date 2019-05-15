/**
 * Created by Administrator on 2017/7/24.
 */
/*mui.init({
    swipeBack: false
});*/
(function(mui) {
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
    var height = window.screen.availHeight;
    //$('#body').height(height);
    //$('.aa').height(height+360);
    $(".con").height(height-85);
    $(".con1").height(height-85);
    var result = "";
    result +='<li class="mui-table-view-cell mui-media bacfff marginbottom-10px" style="padding:0px 0px !important;margin-bottom: 10px;">'
        +'<div class="padding-10">'
        +'<span class=" mui-pull-left mui-icon iconfont icon-bianhao mui-active"></span>'
        +'<div class="mui-text-left float-left">订单编号：</div>'
        +'<div id="nation" class="mui-text-right graycolor" >已完成啦</div>'
        +'</div>'
        +'<div class="baceee padding-10">'
        +'<img class="mui-media-object mui-pull-left margintop-5px" src="../img/jiaoxue.png">'
        +'<div class="mui-media-body font14 padding-top-bottom15px">'
        +'<span id="servicethree">故障物品：<span class="">水龙头</span></span>'
        +'<div style="clear: both;"></div>'
        +'<div class="float-left margintop-5px">'
        +'<p class="mui-ellipsis-2 font14"><span id="1" class="blackfont">故障描述：</span>'
        +'<span >床板坏了，没法睡觉了。船板坏了，没法睡觉了床板坏了，没法睡觉了。船板坏了，没法睡觉了</span>'
        +'</p></div> </div> </div>'
        +'<div style="clear: both;"></div>'
        +'<div class="float-left padding-top-left10 ">'
        +'<p class="mui-ellipsis font12"><span >订单已完成</span></p>'
        +'<p class="mui-ellipsis font12">2017-06-25 17:56:05</p>'
        +'</div>'
        +'<div class="float-right padding-top-right10">'
        +'<button type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;"> 撤回 </button>'
        +'</div>';
    +'</li>';
    /**
     * 下拉刷新具体业务实现
     */
    function pulldownRefresh() {
        setTimeout(function() {
            //var li=document.createElement("li");
            // li.className ='mui-table-view-cell mui-media bacfff marginbottom-10px';
            // li.style = 'padding:0px 0px !important;';
            // var textnode=document.createTextNode("Water")
            /* li.appendChild(result)
            var list=document.getElementById("myList");
            list.insertBefore(li,list.childNodes[0]);*/
            $("#myList").html(result);
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
        }, 1500);
    };
    var count = 0;
    /**
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {
        setTimeout(function() {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 5)); //参数为true代表没有更多数据了。
            /* var table = document.body.querySelector('.mui-table-view');
             //            var cells = document.body.querySelectorAll('.mui-table-view-cell');
             //            for (var i = cells.length, len = i + 5; i < len; i++) {
             //                var li = document.createElement('li');
             //                li.className = 'mui-table-view-cell';
             li.innerHTML = result;
             table.appendChild(li);
             //            }*/
            $(".bbb").append(result);
        }, 1500);
    }
    if (mui.os.plus) {
        mui.plusReady(function() {
            setTimeout(function() {
                mui('#pullrefresh').pullRefresh().pullupLoading();

            }, 1000);

        });
    } else {
        mui.ready(function() {
            mui('#pullrefresh').pullRefresh().pullupLoading();
        });
    }
//    mui('#pullrefresh').pullRefresh().pullupLoading();

    /*   mui('.mui-table-view').on('tap','li',function(){
     var dtpicker = new mui.DtPicker({
     "type": "time",
     "customData": {
     "h": [
     {
     value: "am",
     text: "上午"
     }, {
     value: "pm",
     text: "下午"
     },
     ]
     }
     })
     dtpicker.show(function(e) {
     console.log(e);
     })
     // 暂时禁止滚动
     mui('#pullrefresh').pullRefresh().setStopped(true);
     })*/

    mui('body').on('tap','.mui-backdrop',function(){
        // 取消暂时禁止滚动
        mui('#pullrefresh').pullRefresh().setStopped(false);
    })
    mui('body').on('tap','.mui-dtpicker-header',function(e){
        var target = e.target;
        if(target.tagName === 'BUTTON'){
            // 取消暂时禁止滚动
            mui('#pullrefresh').pullRefresh().setStopped(false);
        }
    })
})(mui);