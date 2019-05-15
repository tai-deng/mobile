/**
 * Created by Administrator on 2017/7/28.
 */
(function(mui, doc) {
    //mui.init();
    mui.plusReady(function() {});
    var guideId;
    var formid = new Uri(location.href).getQueryParamValue('id');
    //select默认字体为灰色，选择时为黑色
    var unSelected = "#999";
    var selected = "#000";
    $("select").css("color", unSelected);
    $("option").css("color", selected);
    $("select").change(function () {
        var selItem = $(this).val();
        if (selItem == $(this).find('option:first').val()) {
            $(this).css("color", unSelected);
        } else {
            $(this).css("color", selected);
        }
    });
    /*上传图片压缩*/
    function convertImgToBase64(url, callback, outputFormat){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var width = img.width;
            var height = img.height;
            // 按比例压缩4倍
            var rate = (width<height ? width/height : height/width)/4;
            canvas.width = width*rate;
            canvas.height = height*rate;
            ctx.drawImage(img,0,0,width,height,0,0,width*rate,height*rate);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    }

    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) {  // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) {       // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // web_kit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }

    /*//拍照或者相册选择图片
    var input = document.getElementById("file_input");
    var pngresult,pngdiv;
    var deleteFlag = true;
    var imgArr = new Array();

    if(typeof FileReader==='undefined'){
//            result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
        input.setAttribute('disabled','disabled');
    }else{
        input.addEventListener('change',readFile,false);
    }
    function readFile(){
        for(var i=0;i<this.files.length;i++){
            if (!input['value'].match(/.jpg|.gif|.png|.bmp/i)){　　//判断上传文件格式
                return alert("上传的图片格式不正确，请重新选择");
            }
            var reader = new FileReader();
            reader.readAsDataURL(this.files[i]);

            reader.onload = function(e){
                var pngsrc = this.result;
                //alert(pngsrc);
                //var imageUrl = getObjectURL(pngsrc);
                convertImgToBase64(pngsrc, function(base64Img){
                    // base64Img为转好的base64,放在img src直接前台展示(<img src="data:image/jpg;base64,/9j/4QMZRXh...." />)
                    //alert(base64Img);
                    // base64转图片不需要base64的前缀data:image/jpg;base64
                    //alert(base64Img.split(",")[1]);
                    pngresult = '<div class="z_addImg" data-id="'+imgArr.length+'" id="PicInput"><img src="'+base64Img+'"/><span class="DelInput"></span></div>';
                    //alert(imgArr.length > 3);
                    if(imgArr.length > 3){
                        $('.z_file').addClass('display-none');
                    }
                    pngdiv = document.createElement('div');
                    pngdiv.innerHTML = pngresult;
                    if(imgArr.length < 5){
                        imgArr.push(base64Img);
                        //alert(imgArr);
                        document.getElementById('PicUpload').appendChild(pngdiv);
                    }
                });
            }
        }
        event.preventDefault();
    }*/
    //点击图片删除
    mui("body").on('tap','.z_addImg',function(){
        var $this = $(this);
        if(deleteFlag == true){
            var btn = ["取消","确定"];
            mui.confirm('确认删除此照片？','温馨提示',btn,function(e) {
                if (e.index == 1) {
                    var pngXiabiao = $this.data('id');
                    //$this.addClass('display-none');
                    $this.remove();
                    imgArr.splice(pngXiabiao,1);
                    //alert(imgArr.length);
                    if(imgArr.length < 5){
                        $('.z_file').removeClass('display-none');
                    }
                }
            },'div');
        }
    });

    mui.ajax(config.httpPath+'api/getForm', {
        data: {
            id:localStorage.getItem('id'),
            proDefId:formid
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
            if(ajaxData.data.isWorkGuide != true){
                $('#guide').addClass('display-none');
            }else{
                guideId = ajaxData.data.attrId;
                //点击办事指南
                mui(".mui-content").on('tap','#zhinan',function(){
                    mui.openWindow({
                        url:'businessGuide.html?guideId='+guideId,
                        id:'businessGuide',
                        extras:{
                        }
                    });
                });
            }
            $('#formid').val(ajaxData.data.formid);
            $('#formname').val(ajaxData.data.formname);
            $('#fields').val(ajaxData.data.fields);
            $('#userid').val(ajaxData.data.userid);
            $('#userdept').val(ajaxData.data.userdept);
            $('#userrole').val(ajaxData.data.userrole);
            $('#formkey').val(ajaxData.data.formkey);
            $('#username').val(ajaxData.data.username);
            //$('form').attr('action',config.httpPath+'/api/submitForm');
            var html = ajaxData.data.content;
            //$('#table').html('');
            $('#table').append(html);
            //选择申请时间
            var btns = mui('.time');
            btns.each(function(i, btn) {
                btn.addEventListener('tap', function() {
                    var place = $("#"+$(this).attr("id"));
                    var optionsJson = this.getAttribute('data-options') || '{}';
                    var options = JSON.parse(optionsJson);
                    var id = this.getAttribute('id');
                    var picker = new mui.DtPicker(options);
                    picker.show(function(rs) {
                        picker.dispose();
                        //alert("您选择的时间是："+rs.text);
                        //显示筛选的条件
                        place.val(rs.text);
                    });
                }, false);
            });
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.toast('网络异常，请稍后再试');
        }
    });
    //返回按钮
    $('#back').on('click',function(){
        var btn = ["取消","确定"];
        mui.confirm('确认返回？','温馨提示',btn,function(e) {
            if (e.index == 1) {
                mui.back();
            }
        },'div');
    })
    //返回提交
    var first = null;
    $('#tijiao').on('click',function() {
            if(!first) {
                //if($("#table").onsubmit()==true){
                if($("#table").valid()) {//表单校验通过
                    $("#table").ajaxSubmit({
                        type: "post",  //提交方式
                        url: config.httpPath + "api/submitForm",
                        data: {'id': localStorage.getItem('id')},//请求url
                        async:false,
                        dataType: "json",//返回json数据类型
                        timeout: 10000, //超时时间设置为10秒；
                        beforeSend: function (request) {
                            request.setRequestHeader("X-Token", localStorage.getItem('token'));
                        },
                        success: function (ajaxData) { //提交成功的回调函数
                            //alert(JSON.stringify(ajaxData));
                            if (ajaxData.meta.success === true) {
                                mui.toast('提交成功');
                                setTimeout(function(){
                                    mui.openWindow({
                                        url:'html-application/businessHanding.html',
                                        id:'businessHanding',
                                        extras:{}
                                    });
                                },1000);
                            } else {
                                mui.toast(ajaxData.meta.message);
                            }
                        },
                        error: function (xhr, type, errorThrown) {
                            //异常处理；
                            console.log(type);
                            mui.toast('网络异常，请稍后再试');
                        }
                    })
                }
                first = '0909';
                setTimeout(function(){first = null}, 2000);
                return false;
            } else {
                mui.alert('请勿重复提交','提示','确定',null,'div');
            }

    });
}(mui, document));