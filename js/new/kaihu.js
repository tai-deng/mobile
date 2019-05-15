
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {});
    var account,mimaOne,mimaTwo,realname;
    //用户名框失去焦点验证手机号码
    /*$("#account").blur(function(){
    });*/
    var siteFcode = localStorage.getItem('siteFcode');
    var UserNum = localStorage.getItem('UserNum');
    var packageName;
    kuandai();
    //查询当前学校套餐列表
    function kuandai(){
        mui.ajax(config.httpPath+'api/Broadband/querySerSets', {
            data: {
                siteFcode:siteFcode,
                packageName:packageName
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post' , //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                //alert(JSON.stringify(ajaxData));
                if(ajaxData.meta.success == true){
                    //mui.toast(ajaxData.meta.message);
                    var content='';
                    $.each(ajaxData.data,function(key,value){  //循环遍历后台传过来的json数据
                        var title = '<li id="title'+key+'" class="font12 gray-8color line25">'+value.name+'</li>';
                        $('#taocanContent').append(title);
                        var contentout = ' <li id="content'+key+'" class="mui-text-center"></li>';
                        $('#title'+key).after(contentout);
                        var border = 'grayborder1';
                        var color = 'gray-8color';
                        var mine = '';
                        var right = 'margin-right5per';
                        $.each(value.serSets,function(key,value){
                            if(value.setType == true){
                                border = 'orangeborder';
                                color = 'maincolor';
                                mine = '<div class="horbackground whitecolor position padding-left-right5px font10">当前套餐</div>';
                            }else{
                                border = 'grayborder1';
                                color = 'gray-8color';
                                mine = '';
                            }
                            //if(key % 2 == 0 && key != 0 ){
                            if((key+1) % 3 == 0 && (key+1) != 0 ){
                                right = '';
                            }else{
                                right = 'margin-right5per';
                            }
                            content += '<button data-id='+ value.id+' class="buy width30 '+color+' marginbottom-10px '+border+' padding-top-bottom5px '+right+' mui-text-center float-left">'
                                + '<div class="font12 padding-top10 line20">'+value.amount+'元</div>'
                                + '<div class="font10 line20 mui-ellipsis">'+value.setRemark+'</div>'
                                + mine
                                + '</button>';
                        });
                        $('#content'+key).append(content);
                        content = '';
                        $('#content'+key).after('<div style="clear: both;"></div>');
                    });
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
    var clickId;
    //alert(clickId);
    //点击套餐选项
    mui(".mui-content").on('tap','.buy',function(){
        //若果是当前的可选套餐和不可选套餐
        var click = $(this);
        clickId = $(this).data('id');
        //alert(clickId);
        /*if(click.hasClass('orangeborder')){
            $('.buy').removeClass('bacddd');
            click.addClass('bacddd');
            var btn = ["暂时不","续费"];
            mui.confirm('是否为套餐续费？','<span class="iconfont icon-gth maincolor font22"></span>',btn,function(e) {
                if (e.index == 1) {
                    //var totalPrice= $('#totalPrice').text();
                    mui('#sheet1').popover('toggle');
                    //购物车显示信息的及时更改
                    $('#buyPrice').text(price);
                }
            },'div');
        }else{*/
            $('.buy').removeClass('bacddd');
            click.addClass('bacddd');
            //mui.alert('<a class="maincolor">如需办理请携带有效证件去校园营业厅办理！</a>','<span class="font14 fontgray">暂时不支持套餐的变更</span>','知道了',null,'div');
        //}
    });
    //点击确定提交信息
    mui(".mui-content").on('tap','#submit',function(){
        //得到用户输入的信息
        account = $('#username').val();
        mimaOne = $('#mimaOne').val();
        mimaTwo = $('#mimaTwo').val();
        realname = $('#realname').val();
        if(account != "" && mimaOne != "" && mimaTwo != "" && realname != ''){
            //判断两次输入的密码是否一致
            if(mimaOne === mimaTwo){
                if(clickId != '' && clickId != undefined){
                    kaihu();
                }else{
                    mui.alert('请选择套餐','提示','确定',null,'div');
                }
                function kaihu(){
                    mui.ajax(config.httpPath+'api/Broadband/addUser  ', {
                        data: {
                            id:localStorage.getItem('id'),
                            siteFcode:siteFcode,
                            userId:account,
                            passWord:mimaTwo,
                            userName:realname,
                            serSetId:clickId
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
                                //mui.toast(ajaxData.meta.message);
                                /*localStorage.setItem('zanAccount',account);
                                localStorage.setItem('zanmimaOne',mimaOne);
                                localStorage.setItem('zanmimaTwo',mimaTwo);
                                localStorage.setItem('zanrealname',realname);*/
                                mui.openWindow({
                                    url:'tabbarNew.html',
                                    id:'tabbarNew',
                                    extras:{}
                                });
                            }else{
                                mui.toast(ajaxData.meta.message);
                            }
                        },
                        error: function(xhr, type, errorThrown) {
                            //异常处理；
                            mui.toast('网络异常',{ duration:'long', type:'div'});
                        }
                    });
                }
            }else{
                mui.alert('两次输入密码不一致，请重新输入','提示','确定',null,'div');
            }
        }else{
            mui.alert('资料填写都不能为空','提示','确定',null,'div');
        }
    });
}(mui, document));
