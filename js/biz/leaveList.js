(function(mui,doc){
    getdata()
    function getdata(){
        mui.ajax(config.httpPath+'api/messageList', {
            data: {
                id:localStorage.getItem('id')
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            beforeSend: function(request) {
                request.setRequestHeader("X-Token",localStorage.getItem('token'));
            },
            success: function(ajaxData) {
                if(ajaxData.meta.success == true){
                    let data = ajaxData.data.messageList;
                    let content = $('.mui-content');
                    let result = '';
                    for(var i =0;i<data.length;i++){
                        if(data[i].replyDate){
                            result = '<div class="leva">'+
                                        '<div class="leva-title">反馈时间：'+formatDateTime(data[i].messageDate/1000)+'</div>'+
                                        '<div class="leva-content">'+data[i].messageRemark+'</div>'+
                                        '<div class="reply">'+
                                            '<div class="reply-name">管理员回复：<span>'+formatDateTime(data[i].replyDate/1000)+'</span></div>'+
                                            '<div class="reply-content">'+data[i].replyRemark+'</div>'+
                                        '</div>'+
                                    '</div>'
                        }else{
                            result = '<div class="leva">'+
                                        '<div class="leva-title">反馈时间：'+formatDateTime(data[i].messageDate/1000)+'</div>'+
                                        '<div class="leva-content">'+data[i].messageRemark+'</div>'+
                                    '</div>'
                        }
                        console.log(data[i].replyDate)
                        content.append(result);
                    }
                }else{
                    mui.toast(ajaxData.meta.message);
                }
            },
            error: function(xhr, type, errorThrown) {
                console.log(type);
                mui.toast('网络异常,请稍后再试');
            }
        })
    }
}(mui,document))