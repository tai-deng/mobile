(function(mui,doc){
    // 跳转到列表页
    mui(".mui-content").on('tap','.feedback',function(){
        mui.openWindow({
            url:'leaveList.html',
            id:'leaveList',
            extras:{}
        });
    });
    // 提交内容
    mui(".mui-content").on('tap','.btn1',function(e){
        let leave = $('#textarea').val()
        leave = leave.trim()
        if(leave){
            mui.ajax(config.httpPath+'api/leaveComments', {
                data: {
                    id:localStorage.getItem('id'),
                    messageRemark:leave
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                beforeSend: function(request) {
                    request.setRequestHeader("X-Token",localStorage.getItem('token'));
                },
                success: function(ajaxData) {
                    if(ajaxData.meta.success == true){
                        mui.toast('提交成功');
                        setTimeout(function(){
                            mui.openWindow({
                                url:'../new/tabbarNew.html',
                                id:'tabbarNew',
                                extras:{}
                            });
                        },1500);
                    }else{
                        mui.toast(ajaxData.meta.message);
                    }
                },
                error: function(xhr, type, errorThrown) {
                    console.log(type);
                    mui.toast('网络异常,请稍后再试');
                }
            })
        }else{
            mui.toast('留言内容不能为空！');
        }
    });
}(mui,document))