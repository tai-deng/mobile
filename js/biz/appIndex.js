
(function(mui, doc) {
    //mui.init();
    mui.init({
        //swipeBack:true //启用右滑关闭功能
    });

    mui.plusReady(function() {});
    //向上滚动替换的通知
    function startmarquee(lh,speed,delay) {
        var p=false;
        var t;
        var o=document.getElementById("marqueebox");
        o.innerHTML+=o.innerHTML;
        o.style.marginTop=0;
        o.onmouseover=function(){p=true;}
        o.onmouseout=function(){p=false;}
        function start(){
            t=setInterval(scrolling,speed);
            if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
        }
        function scrolling(){
            if(parseInt(o.style.marginTop)%lh!=0){
                o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
                if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) o.style.marginTop=0;
            }else{
                clearInterval(t);
                setTimeout(start,delay);
            }
        }
        setTimeout(start,delay);
    }
    startmarquee(20,20,1500);
    //alert(localStorage.getItem('id'));
//alert('进来了1');
    //首页的九宫格数据及服务进度
    /*yingyong();
    function yingyong(){*/
        mui.ajax(config.httpPath + "api/getMobileIndex",{
            data:{
                id:localStorage.getItem('id')
            },
            dataType:'json',//服务器返回json格式数据
            type:'post',//HTTP请求类型
            timeout:10000,//超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success:function(ajaxData){
                //alert('进来了2');
                //服务器返回响应，根据响应结果，分析是否登录成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success == true){
                    $('.noticeContainer').html(template('noticeTemp', ajaxData.data));
                    //$('.sliderContainer').html(template('sliderList', ajaxData.data));
                    //轮播   $('#serPng').attr('src',config.httpPath+'/api/tofindPic?id='+ajaxData.data.actReModelAttr.serProcess)
                    var sliderpng='';
                    var sliderlen = ajaxData.data.appBannerPic.length;
                    if(sliderlen > 0){
                        <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
                        var sliderpng1 = '<div class="mui-slider-item mui-slider-item-duplicate" data-type="'+ajaxData.data.appBannerPic[0].type+'" data-id="0">'
                            +'<a href="#">'
                            +'<img src="'+config.httpPath+'/api/tofindPic?id='+ajaxData.data.appBannerPic[0].picFcode+'">'
                            +'</a>'
                            +'</div>';
                        <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
                        var sliderpng2 = '<div class="mui-slider-item mui-slider-item-duplicate" data-type="'+ajaxData.data.appBannerPic[sliderlen-1].type+'" data-id="'+(sliderlen-1)+'">'
                            +'<a href="#">'
                            +'<img src="'+config.httpPath+'/api/tofindPic?id='+ajaxData.data.appBannerPic[sliderlen-1].picFcode+'">'
                            +'</a>'
                            +'</div>';
                        for( var i = 0;i <ajaxData.data.appBannerPic.length; i++){
                            <!-- 中间第n张 -->
                            sliderpng += '<div class="mui-slider-item mui-slider-item-duplicate" data-type="'+ajaxData.data.appBannerPic[i].type+'" data-id="'+i+'">'
                                +'<a href="#">'
                                +'<img src="'+config.httpPath+'/api/tofindPic?id='+ajaxData.data.appBannerPic[i].picFcode+'">'
                                +'</a>'
                                +'</div>';
                        }
                        //alert(sliderpng1+sliderpng+sliderpng2);
                        $('.sliderContainer').html(sliderpng2+sliderpng+sliderpng1);
                    }else{
                        //没有图片的时候默认三张图片轮播
                        //var morenpng +=
                        //$('#topSlider').addClass('display-none');
                        $('#sliderDiv').removeClass('display-none');
                    }

                    var slider = mui("#slider");
                    slider.slider({
                        interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
                    });

                    mui(".mui-content").on('tap','.mui-slider-item',function(){
                        var type = $(this).data('type');
                        var index = $(this).data('id');
                        //alert(ajaxData.data.appBannerPic[index].content);

                        // 0 : 纯图片无点击事件；
                        //1：站内通知链接  取infoFcode字段
                        //2 : 自定义消息   增加详情页面 内容取content字段
                        if(type == 1){
                            var id = ajaxData.data.appBannerPic[index].infoFcode;
                            mui.openWindow({
                                url:'notice/noticeContent.html?id='+id,
                                id:'noticeContent',
                                extras:{}
                            });
                        }else if(type == 2){
                            var content = ajaxData.data.appBannerPic[index].content
                            mui.openWindow({
                                 url:'content.html?con='+content,
                                 id:'content',
                                 extras:{}
                            });
                        }

                    });

                    var result="";
                    for(var i=0;i<ajaxData.data.procdef.length;i++){
                        var img;
                        var tubiao;
                        /*if(ajaxData.data.procdef[i].icon == ''){
                            tubiao = '<i class=" mui-icon iconfont icon whitecolor card-png"></i>';
                        }else{
                            tubiao = '<i class=" mui-icon iconfont '+ajaxData.data.procdef[i].icon+' whitecolor card-png"></i>';
                        }*/
                        if( i%2 == 0 && i%4 == 0){
                            img = '<div class="card-middle horbackblue">'
                                +'<i class=" mui-icon iconfont '+ajaxData.data.procdef[i].icon+' whitecolor card-png"></i>'
                                +'</div>'
                        }else if(i%3 == 0 && i%6 == 0){
                            img = '<div class="card-middle horbackred">'
                                +'<i class=" mui-icon iconfont '+ajaxData.data.procdef[i].icon+' whitecolor card-png"></i>'
                                +'</div>'
                        }else if( i%2 == 0){
                            img = '<div class="card-middle horbackpure">'
                                +'<i class=" mui-icon iconfont '+ajaxData.data.procdef[i].icon+' whitecolor card-png"></i>'
                                +'</div>'
                        }else if( i%5 == 0){
                            img = '<div class="card-middle horbackyellow">'
                                +'<i class=" mui-icon iconfont '+ajaxData.data.procdef[i].icon+' whitecolor card-png"></i>'
                                +'</div>'
                        }else if( i%3 == 0){
                            img = '<div class="card-middle horbackground">'
                                +'<i class=" mui-icon iconfont '+ajaxData.data.procdef[i].icon+' whitecolor card-png"></i>'
                                +'</div>'
                        }else{
                            img = '<div class="card-middle horbackgreen">'
                                +'<i class=" mui-icon iconfont '+ajaxData.data.procdef[i].icon+' whitecolor card-png"></i>'
                                +'</div>'
                        }
                        result +='<li data-id="'+ajaxData.data.procdef[i].modelkey+'" class="form mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3 padding-0-10px">'
                            +'<a>'
                            + img
                            +'<div class="mui-media-body font12">'+ajaxData.data.procdef[i].modelname+'</div>'
                            +'</a>'
                            +'</li>'
                    }
                    result +='<li data-id="more" class="form mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3 padding-0-10px">'
                        +'<a>'
                        +'<div class="card-middle horbackred">'
                        +'<i class=" mui-icon iconfont icon-gengduo whitecolor card-png"></i>'
                        +'</div>'
                        +'<div class="mui-media-body font12">更多</div>'
                        +'</a>'
                        +'</li>'
                    $('#procdefCLass').html(result);
                    //点击九宫格应用跳转
                    //$('.form').on('click',function(){
                    mui(".mui-content").on('tap','.form',function(){
                        var proDefId = $(this).data('id');
                        //alert(proDefId);
                        if(proDefId == 'more'){
                            mui.openWindow({
                                url: 'officeHall.html',
                                id: 'officeHall',
                                extras: {}
                            });
                            //mui.alert('更多功能正在上新……','提示','确定',null,'div');
                        }else{
                            mui.openWindow({
                                url: 'form.html?id=' + proDefId,
                                id: 'form',
                                extras: {}
                            });
                        }
                    });

                    //服务进度
                    var result ='';
                    //alert(ajaxData.data.activitiVo.length);
                    if(ajaxData.data.activitiVo.length == 0){
                        //隐藏服务进度模块
                        $('#index_jindu').addClass('display-none');
                    }else{
                        for(var i=0;i<ajaxData.data.activitiVo.length;i++){
                            var status,btn,content;
                            if(ajaxData.data.activitiVo[i].type === "apply"){
                                status = '状态';
                                content = ajaxData.data.activitiVo[i].status;
                                btn = '进度查询';
                            }else{
                                status = '申请人';
                                content = ajaxData.data.activitiVo[i].applyUserName;
                                btn = '快速办理';
                            }
                            var fuwuImg = '';
                            if( i == 1){
                                fuwuImg = '<div class="card-middle1 horbackred mui-pull-left margintop-10px">'
                                    +'<i class=" mui-icon iconfont '+ajaxData.data.activitiVo[i].icon+' whitecolor card-png1"></i>'
                                    +'</div>';
                            }else if( i == 2){
                                fuwuImg = '<div class="card-middle1 horbackground mui-pull-left margintop-10px">'
                                    +'<i class=" mui-icon iconfont '+ajaxData.data.activitiVo[i].icon+' whitecolor card-png1"></i>'
                                    +'</div>';
                            }else{
                                fuwuImg = '<div class="card-middle1 horbackyellow mui-pull-left margintop-10px">'
                                    +'<i class=" mui-icon iconfont '+ajaxData.data.activitiVo[i].icon+' whitecolor card-png1"></i>'
                                    +'</div>';
                            }
                            result +='<li class="mui-table-view-cell mui-media jindu" data-type="'+ajaxData.data.activitiVo[i].type+'" data-id="'+ajaxData.data.activitiVo[i].id+'">'
                                +' <a href="javascript:;">'
                                + fuwuImg
                                +'<div class="mui-media-body font14 paddingleft5px">'
                                +'<span id="servicetwo">'+ajaxData.data.activitiVo[i].name+'</span>'
                                +'<div style="clear: both;"></div>'
                                +'<div class="float-left ">'
                                +'<p class="mui-ellipsis font12"><span>'+status+'：</span><span>'+content+'</span></p>'
                                +'<p class="mui-ellipsis font12" id="time2">'+ajaxData.data.activitiVo[i].applyDate+'</p>'
                                +'</div>'
                                +'<div class="float-right">'
                                +'<button id="btn2" type="button" class="mui-btn ridus5 horbackground mui-btn-outlined whitecolor font14 btn float-right" style="line-height: 20px;">'
                                + btn
                                +'</button>'
                                +'</div>'
                                +'<div style="clear: both;"></div>'
                                +'</div>'
                                +'</a>'
                                +'</li>';
                        }
                        $('#fuwuJindu').html(result);
                        //点击服务进度的业务
                        $('.jindu').on('click',function(){
                            var jinId = $(this).data('id');
                            var type = $(this).data('type');
                            //根据类型判断进哪个页面
                            if(type === 'apply'){
                                mui.openWindow({
                                    url:'html-application/approval1212.html?id='+jinId,
                                    //url:'html-accept/accept-information-part.html?'+jinId,
                                    id:'approval',
                                    extras:{}
                                });
                            }else{
                                //还有状态的判断
                                mui.openWindow({
                                    url:'html-accept/accept1212.html?id='+jinId,
                                    id:'accept-information-part',
                                    extras:{}
                                });
                            }
                        });
                    }
                }else{
                    mui.toast('网络异常，请稍后再试');
                }
            },
            error:function(xhr,type,errorThrown){
                //异常处理；
                console.log(type);
                mui.toast('网络异常，请稍后再试');
                //alert('访问不成功');
            }
        });
    //}

    //点击通知公告
    mui(".mui-content").on('tap','#notice',function(){
        mui.openWindow({
            url:'notice/notice.html',
            id:'notice',
            extras:{}
        });
    });
    mui(".mui-content").on('tap','#noticeDetail',function(){
        var id = $(this).data('id');
        mui.openWindow({
            url:'notice/noticeContent.html?id='+id,
            id:'noticeContent',
            extras:{}
        });
    });
    //服务进度的更多
    document.getElementById("service_more").addEventListener('tap',function(){
        //点击响应逻辑
        mui.openWindow({
            url:'html-application/businessHanding.html',
            id:'businessHanding',
            extras:{}
        });
    });
    //个性化服务的更多
    document.getElementById("personal_more").addEventListener('tap',function(){
        //点击响应逻辑
        //mui.alert('更多服务上新中，敬请期待');
        mui.alert('更多服务上新中，敬请期待','提示','确定',null,'div');
    });
    //服务分类的更多
    document.getElementById("fenlei_more").addEventListener('tap',function(){
        //点击响应逻辑
        //mui.alert('更多服务上新中，敬请期待','提示','确定',null,'div');
        mui.openWindow({
            url: 'officeHall.html',
            id: 'officeHall',
            extras: {}
        });
    });
    //点击搜索
   /* mui(".mui-content").on('tap','.mui-search',function(){
        alert("点了搜索");
    });*/

    //点击报修报检
     mui(".mui-content").on('tap','#repair',function(){
         mui.openWindow({
             url:'html-repair/repairRecord.html',
             id:'repairRecord',
             extras:{}
         });
     });
    //点击考勤助理
    mui(".mui-content").on('tap','#kaoqin',function(){
        //mui.alert('新功能正在开发，即将上架');
        //mui.alert('新功能正在开发，即将上架','提示','确定',null,'div');
        mui.openWindow({
            url:'html-kuanDaiPay/schoolWifiPay.html',
            id:'schoolWifiPay.html',
            extras:{}
        });
    });
    //点击定岗实习
    mui(".mui-content").on('tap','#dinggang',function(){
        mui.alert('新功能正在开发，即将上架','提示','确定',null,'div');
       /* mui.openWindow({
         url:'aaaa.html?',
         id:'',
         extras:{}
         });*/
    });
    //ceshi
    mui(".mui-content").on('tap','.hall',function(){
        /*mui.openWindow({
            url:'ceshijiekou.html?',
            id:'ceshijiekou',
            extras:{}
        });*/
        mui.openWindow({
            url: 'officeHall.html',
            id: 'officeHall',
            extras: {}
        });
    });

}(mui, document));