/**
 * Created by Administrator on 2017/7/20.
 */
(function(mui, doc) {
    mui.init();
    mui.plusReady(function() {
        //alert(plus);
        var self=plus.webview.currentWebview();
        var opener = self.opener();
        //alert(opener.id);
        var old_back = mui.back;
        mui.back = function() {
            var wobj = plus.webview.getWebviewById(opener.id);
            wobj.reload(true);
            old_back();
        }
    });
    var repairArea = '未填写',repairProject= '未填写',repairAddress='',description,
    img1,img2,img3,img4,img5,reservationDate,repairPeople,
    repairPeopleCode,repairPhone;
    var imgArr = new Array();
    //select默认字体为灰色,选择时为黑色
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
    var btns = mui('.date');
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
    var pngresult,pngdiv;
    var deleteFlag = true;
    var input = document.getElementById("file_input");

    /*图片开始*/
    //安卓与非安卓显示的拍照按钮不再一样
    if (mui.os.plus && mui.os.android) {
        /*if(mui.os.wechat){
            alert('wechat');
            $('#Android').addClass('display-none');
            $('#notAndroid').removeClass('display-none');
        }else{*/
            //alert('android');
            $('#notAndroid').addClass('display-none');
            $('#Android').removeClass('display-none');
        //}
    }else{
        //alert('not android');
        //$('#Android').addClass('display-none');
        $('#notAndroid').removeClass('display-none');
    }
    mui("body").on('tap','.image-item',function(){
        if(mui.os.plus && mui.os.android){
            //alert('123');
             /*if(typeof FileReader==='undefined'){
             //result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
             alert("抱歉，你的浏览器不支持 FileReader");
             input.setAttribute('disabled','disabled');
             }else{
             input.click();
             input.addEventListener('change',readFile,false);
             }*/
            showActionSheet();
        }else{
            //alert('456');
            input.click();
        }
    });

    //点击事件，弹出选择摄像头和相册的选项
    function showActionSheet() {
        var bts = [{
            title: "拍照"
        }, {
            title: "从相册选择"
        }];
        plus.nativeUI.actionSheet({
                cancel: "取消",
                buttons: bts
            },
            function(e) {
                if (e.index == 1) {
                    getImage();
                } else if (e.index == 2) {
                    galleryImgs();
                }
            });
    }
    //图片显示
    function showPics(url,name){
        //根据路径读取到文件
        plus.io.resolveLocalFileSystemURL(url,function(entry){
            entry.file( function(file){
                var fileReader = new plus.io.FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onloadend = function(e) {
                    var picUrl = e.target.result.toString();
                    var picIndex = $("#picIndex").val();
                    var nowIndex = parseInt(picIndex)+1;
                    $("#picIndex").val(nowIndex);
                    var html = '';
                    html = '<div class="z_addImg" data-id="'+nowIndex+'" id="PicInput"><img src="'+picUrl+'"/><span class="DelInput"></span></div>';
                    //html += $("#PicUpload").html();
                    //$("#PicUpload").html(html);
                    //alert(imgArr.length);
                    if(imgArr.length > 3){
                        $('.image-item').addClass('display-none');
                    }
                    if(imgArr.length < 5){
                        imgArr.push(picUrl);
                        $('#PicUpload').append(html);
                    }
                    console.log('显示图片-->',imgArr)
                }
            });
        });
    }
//压缩图片
    function compressImage(url,filename){
        var name="_doc/upload/"+filename;
        plus.zip.compressImage({
                src:url,//src: (String 类型 )压缩转换原始图片的路径
                dst:name,//压缩转换目标图片的路径
                quality:40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
                overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件
            },
            function(zip) {
                //页面显示图片
                //alert(zip.target);
                showPics(zip.target,name);
            },function(error) {
                plus.nativeUI.toast("压缩图片失败，请稍候再试");
            });
    }
//调用手机摄像头并拍照
    function getImage() {
        var cmr = plus.camera.getCamera();
        cmr.captureImage(function(p) {
            plus.io.resolveLocalFileSystemURL(p, function(entry) {
                compressImage(entry.toLocalURL(),entry.name);
            }, function(e) {
                plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            });
        }, function(e) {
        }, {
            filter: 'image'
        });
    }
//从相册选择照片
    function galleryImgs() {
        plus.gallery.pick(function(e) {
            var name = e.substr(e.lastIndexOf('/') + 1);
            compressImage(e,name);
        }, function(e) {
        }, {
            filter: "image"
        });
    }

    /*-------------非安卓APP的拍照或者图片上传---------------*/
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
            var rate = (width<height ? width/height : height/width)/2;
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
    // 前端只需要给input file绑定这个change事件即可（上面两个方法不用管）
    $('#file_input').bind('change',function(event){
        for(var i=0;i<this.files.length;i++){
            var imageUrl = getObjectURL($(this)[0].files[i]);
            convertImgToBase64(imageUrl, function(base64Img){
                // base64Img为转好的base64,放在img src直接前台展示(<img src="data:image/jpg;base64,/9j/4QMZRXh...." />)
                //alert(base64Img);
                // base64转图片不需要base64的前缀data:image/jpg;base64
                //alert(base64Img.split(",")[1]);
                var result = '<div class="z_addImg " id="PicInput"><img src="'+base64Img+'"><span class="DelInput"></span></div>';
                var div = document.createElement('div');
                div.innerHTML = result;
                if(imgArr.length < 3){
                    imgArr.push(base64Img);
                    $('#PicUpload1').append(div);
                }
                if(imgArr.length >= 3){
                    $('.z_file').addClass('display-none')
                }
                console.log('change-->',imgArr)
            });
        }
        event.preventDefault();
    });
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
                    if(imgArr.length <= 3){
                        $('.z_file').removeClass('display-none');
                    }
                    console.log("del-->",imgArr)
                }
            },'div');
        }
    });

    user();
    //获取报修人和电话
    function user(){
        mui.ajax(config.httpPath+'api/applyRepair', {
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
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert(JSON.stringify(ajaxData));
                $('#repairPeople').val(ajaxData.data.sysUser.realname);
                $('#repairPhone').val(ajaxData.data.sysUser.mobileno);
                /*$('#repairPeople').attr("readonly","true");
                $('#repairPhone').attr("readonly","true");*/
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常,请稍后再试');
            }
        });
    }
    //获取报修区域
    area();
    function area(){
        mui.ajax(config.httpPath+'api/getAreaSetting', {
        //mui.ajax(config.httpPath+'api/getProjectSetting', {
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
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert('quyu:'+JSON.stringify(ajaxData));
                //如果没有区域则隐藏改选项及子选项
                if(ajaxData.meta.success == true){
                    var result= '<option value="mo"  selected="true">请选择报修区域</option>';
                    for(var i=0;i<ajaxData.data.lists.length;i++){
                        result += '<option value="'+i+'">'+ajaxData.data.lists[i].opText+'</option>';
                    }
                    $('#select_quyuBig').html(result);
                    //select选择类型查询
                    $('#select_quyuBig').change(function(e){
                        var repairAreaBig='';
                        var x=document.getElementById("select_quyuBig");
                        //alert(x.options[x.selectedIndex].text);
                        var type= x.options[x.selectedIndex].value;
                        repairAreaBig = x.options[x.selectedIndex].text;
                        repairArea = repairAreaBig;
                        //alert(repairArea);
                        //如果没有二级菜单，就不显示下面的select
                        if(ajaxData.data.lists[type].children == '' || ajaxData.data.lists[type].children == null){
                            //$('#select_quyuSmall_area').addClass('display-none');
                            $('#select_quyuSmall_area').remove();
                        }else{
                            var result1= '<option value="mo"  selected="true">请继续选择</option>';
                            for(var i=0;i<ajaxData.data.lists[type].children.length;i++){
                                result1 += '<option value="'+i+'">'+ajaxData.data.lists[type].children[i].opText+'</option>';
                            }
                            $('#select_quyuSmall').html(result1);
                            $('#select_quyuSmall').change(function(e){
                                var x=document.getElementById("select_quyuSmall");
                                //alert(x.options[x.selectedIndex].text);
                                var type1= x.options[x.selectedIndex].value;
                                repairArea = repairAreaBig+'-'+ x.options[x.selectedIndex].text;
                            });
                        }
                    });
                }else{
                    if(ajaxData.meta.message == '没有获取区域值！'){
                        $('#select_quyuBig_area').remove();
                        $('#select_quyuSmall_area').remove();
                    }
                    mui.toast(ajaxData.meta.message);
                }
               /* if(!ajaxData){
                    $('#select_quyuBig_area').remove();
                    $('#select_quyuSmall_area').remove();
                }*/
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常,请稍后再试');
            }
        });
    }
    //获取项目设置
    set();
    function set(){
        mui.ajax(config.httpPath+'api/getProjectSetting', {
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
                //服务器返回响应,根据响应结果,分析是否成功；
                //alert("设置的接口"+JSON.stringify(ajaxData));
                //如果没有项目可以设置，则隐藏
                if(ajaxData.meta.success == false){
                    if(ajaxData.meta.message == '没有获取区域值！'){
                        $('#select_xiangmu_area').remove();
                    }
                    mui.toast(ajaxData.meta.message);
                }else{
                    var result= '<option value="0"  selected="true">请选择报修的项目</option>';
                    for(var i=0;i<ajaxData.data.lists.length;i++){
                        result += '<option value="'+ajaxData.data.lists[i].opValue+'">'+ajaxData.data.lists[i].opText+'</option>';
                    }
                    $('#select_xiangmu').html(result);
                    $('#select_xiangmu').change(function(e){
                        var x=document.getElementById("select_xiangmu");
                        //alert(x.options[x.selectedIndex].text);
                        repairProject= x.options[x.selectedIndex].text;
                    });
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常,请稍后再试');
            }
        });
    }
    var first = null;
    var click = true;
    //点击立即报修
    mui(".mui-content").on('tap','#submit',function(){
        if(!first) {
            repairArea = repairArea;
            repairProject= repairProject;
            repairAddress = $('#adress').val();
            description = $('#description').val();
            if($('#date').val() != ''){
                reservationDate = $('#date').val()+':00';
            }else{
                getNowFormatDate();
                function getNowFormatDate() {
                    var date = new Date();
                    var seperator1 = "-";
                    var seperator2 = ":";
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                        + " " + date.getHours() + seperator2 + date.getMinutes()
                        + seperator2 + date.getSeconds();
                    //alert(currentdate);
                    reservationDate = currentdate;
                    //return currentdate;
                }
            }
            repairPeople = $('#repairPeople').val();
            repairPeopleCode = localStorage.getItem('fcode');
            repairPhone = $('#repairPhone').val();
            if($("#table").valid()) {
                console.log('upload-->',imgArr)
                mui.ajax(config.httpPath+'api/saveRepair',{
                    data: {
                        id:localStorage.getItem('id'),
                        repairArea:repairArea,
                        repairProject:repairProject,
                        repairAddress:repairAddress,
                        description:description,
                        img1:imgArr[0],
                        img2:imgArr[1],
                        img3:imgArr[2],
                        img4:imgArr[3],
                        img5:imgArr[4],
                        // reservationDate:reservationDate,
                        repairPeople:repairPeople,
                        repairPeopleCode:repairPeopleCode,
                        repairPhone:repairPhone
                    },
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型
                    async: false,
                    //xhrFields: { withCredentials: true },
                    timeout: 10000, //超时时间设置为10秒；
                    beforeSend: function(request) {
                        request.setRequestHeader("X-Token",localStorage.getItem('token'));
                    },
                    success: function(ajaxData) {
                        //服务器返回响应,根据响应结果,分析是否成功；
                        //alert(JSON.stringify(ajaxData));
                        if(ajaxData.meta.success == true){
                            //alert(reservationDate);
                            //mui.toast(ajaxData.meta.message);
                            first = '0909';
                            mui.toast('提交成功');
                            setTimeout(function(){
                                mui.openWindow({
                                    url:'repairRecord.html',
                                    id:'repairRecord',
                                    extras:{
                                    }
                                });
                            },1000);
                        }else{
                            first = null;
                            mui.toast(ajaxData.meta.message);
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                        first = null;
                        mui.toast('网络异常,请稍后再试');
                    }
                });
            }
        }else {
            mui.alert('请勿重复提交','提示','确定',null,'div');
        }

    });

}(mui, document));