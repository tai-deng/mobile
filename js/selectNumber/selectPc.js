
(function (mui, doc, layer) {
    var pageNo = 1;
    var pageSize = 50;
    var keyWord = '';
    var serNumberId = '';
    var payFlag = '1';
    var amount = 200;
    var backUrl = getQueryString('backUrl');
    var siteCode = getQueryString('siteCode');
    var islast = false;

    var name = getQueryString('name');
    var cerId = getQueryString('cerId');
    var mobileno = getQueryString('mobileno');
    var province = getQueryString('province');
    var city = getQueryString('city');
    var county = getQueryString('county');
    var detailedAddress = getQueryString('detailedAddress');
    var flag = getQueryString('flag');

    if (getQueryString('amount') != '') {
        amount = getQueryString('amount');
    };
    if (getQueryString('payFlag') != '') {
        payFlag = getQueryString('payFlag');
    };
    // 传参获取
    if (payFlag == '0') {
        $('.next').text("线下领取");
    } else {
        $('.next').text("立即支付");
    }
    getData();
    function getData() {
        var table = document.body.querySelector('#content');
        mui.ajax(config.httpPath + 'api/serNumberOrder/getSerNumberList', {
            data: {
                pageNo: pageNo,
                pageSize: pageSize,
                keyWord: keyWord,
                siteCode: siteCode
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function (ajaxData) {
                if (ajaxData.meta.success == true) {
                    if (ajaxData.data.length < pageSize) {
                        islast = true;
                    } else { islast = false }
                    $('#content').empty();
                    for (var i = 0; i < ajaxData.data.length; i++) {
                        var li = document.createElement('li');
                        li.className = 'isok item';
                        li.id = ajaxData.data[i].id;
                        li.innerHTML = ajaxData.data[i].mobileno;
                        if (table.childNodes[i]) {
                            table.replaceChild(li, table.childNodes[i]);
                        } else {
                            table.appendChild(li);
                        }
                        //table.appendChild(li);
                    }
                } else {
                    mui.toast(ajaxData.meta.message);
                }
                judge()
            },
            error: function (xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
                mui.toast('网络异常,请稍后再试');
            }
        });
    }
    judge()
    // 上一页
    mui(".mui-content").on('tap', '.lastPage', function (e) {
        if (pageNo > 1) {
            pageNo -= 1;
            getData();
        } else {
            mui.alert("没有上一页！");
        }
    });
    // 下一页
    mui(".mui-content").on('tap', '.nextPage', function (e) {
        if (!islast) {
            pageNo += 1;
            getData();
        } else {
            mui.alert("没有下一页！");
        }
    });
    // 模糊搜索
    mui(".mui-content").on('tap', '.serchBnt', function (e) {
        keyWord = $('#keyWord').val();
        pageNo = 1;
        getData();
    });
    // 选中
    mui(".mui-content").on('tap', '.item', function (e) {
        serNumberId = e.target.id;
        // if ($(this).hasClass('isok')) {
        $(".item").each(function () {
            if ($(this).hasClass('issel')) {
                $(this).removeClass('issel')
            }
        })
        $(this).addClass('issel')
        // }
    });
    // 取消
    mui(".mui-content").on('tap', '.cancel', function (e) {
        history.go(-1);
    });
    // 提交
    mui(".mui-content").on('tap', '.next', function (e) {
        SerNumber()
    });
    // 获取支付结果
    function getQrcode() {
        console.log('set')
        let timer = setInterval(() => {
            mui.ajax(config.httpPath + 'api/serNumberOrder/hadPay.do', {
                data: {},
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function (res) {
                    console.log(res)
                    if (res.data == '支付成功！') {
                        clearInterval(timer)
                    } else {
                        clearInterval(timer)
                        mui.alert("支付失败！");
                        history.go(-1);
                    }
                },
            });
        }, 1500)
    }
    // 提交选中内容
    function SerNumber() {
        if (serNumberId == '') {
            mui.alert('请选择号码')
            return;
        }
        alert(serNumberId + " , " + amount + " , " + name + " , " + mobileno + " , " + cerId + " , " + province + " , " + city + " , " +
            county + " , " + detailedAddress + " , " + payFlag + " , " + backUrl);
        mui.ajax(config.httpPath + 'api/serNumberOrder/addSerNumberOrderPc', {
            data: {
                siteCode: siteCode,
                serNumberId: serNumberId,
                name: name,
                mobileno: mobileno,
                cerId: cerId,
                province: province,
                city: city,
                county: county,
                detailedAddress: detailedAddress,
                setName: '校园网融合套餐',
                amount: amount,
                remark: flag,
                payFlag: payFlag,
                backUrl: backUrl
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function (ajaxData) {
                //服务器返回响应，根据响应结果，分析是否成功；
                // alert(JSON.stringify(ajaxData));
                if (ajaxData.meta.success == false) {
                    mui.alert(ajaxData.meta.message, '提示', '确定', null, 'div');
                } else {
                    layer.open({
                        area: ['300px', '300px'],
                        type: 2,
                        closeBtn: 2,
                        title: false,
                        shift: 2,
                        shadeClose: false,
                        time:120000,
                        content: config.httpPath + 'api/serNumberOrder/qrcode.do' + '?result=' + ajaxData.data
                    });
                    getQrcode();
                }
            },
            error: function (xhr, type, errorThrown) {
                //异常处理；
                mui.toast('网络异常', { duration: 'long', type: 'div' });
            }
        });
    }
    // 学校代码
    function ad(siteCode) {
        let str = '校园网服务中心';
        if (siteCode == 'e549afe0c944c2063687c514f2e658c8') {

        } else if (siteCode == '8884bc5fad4a6eefe36fcf6234cc36b1' || siteCode == 'f9cf1800983e1365175617c8a5c038f5') {

        } else if (siteCode == '855198a37cac80fb60e76174cb254f2a') {

        } else if (siteCode == '823ef78c7ed94e905156905798cbd175' || siteCode == '46c09d9f3b1876712717e870aef3c9ee') {

        } else if (siteCode == 'f92f631b59331578ce787b753e999843') {

        } else if (siteCode == 'fb9d10335b551d5a76d36df2bc961951') {

        } else if (siteCode == 'e26206d28b34d13effba5e0e05940338') {

        } else if (siteCode == '58e8599b9d19d34e386c899fbc4508bc') {

        } else if (siteCode == 'b3fcbdee1891fe15dab55ad601d57543') {
            str = '金岸联通校园网营业厅'
        }
        return `温馨提示：${str}领取,寒暑假9元/月。`
    }
    // 截取url
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
        // var r = '?siteCode=58e8599b9d19d34e386c899fbc4508bc&flag=0&payFlag=1&amount=0.01&backUrl=http://szxy.worldve.com/zhmh/weixin/togyxz&name=111&cerId=430721699002154613&mobileno=15116149838&province=123&city=123&county=123&detailedAddress=123'.substr(1).match(reg);
        var r = window.location.search.substr(1).match(reg);
        // var q = 'mobile/html-selectNumber/selectPc.html'.substr(1).match(reg_rewrite);
        var q = window.location.pathname.substr(1).match(reg_rewrite);
        if (r != null) {
            return unescape(r[2]);
        } else if (q != null) {
            return unescape(q[2]);
        } else {
            return null;
        }
    }
    // 分页判断
    function judge() {
        if (pageNo == 1) {
            $('.lastPage').attr('disabled', true);
        } else {
            $('.lastPage').attr('disabled', false);
        }
        if (islast) {
            $('.nextPage').attr('disabled', true);
        } else {
            $('.nextPage').attr('disabled', false);
        }
    }
}(mui, document, layer))