// mui初始化
mui.init();
mui.plusReady(function(){
    var firstBackbutton = null;
    mui.back = function(){
        if(!firstBackbutton)
        {
            window.plus.nativeUI.toast('再按一次退出应用');
            firstBackbutton = new Date().getTime();
            //alert(firstBackbutton);
            setTimeout(function(){firstBackbutton = null}, 1000);
            return false;
        } else {
            mui.currentWebview.close();
            plus.runtime.quit();
            return (new Date().getTime() - firstBackbutton) < 1000;
        }
    }
});
var createIframe = function (el, opt) {
    //alert('jinlaile 32342');
    var elContainer = document.querySelector(el);
    var wrapper = document.querySelector(".mui-iframe-wrapper");
    if(!wrapper){
        // 创建wrapper 和 iframe
        wrapper = document.createElement('div');
        wrapper.className = 'mui-iframe-wrapper';
        for(var i in opt.style){
            wrapper.style[i] = opt.style[i];
        }
        var iframe = document.createElement('iframe');
        iframe.src = opt.url;
        iframe.id = opt.id || opt.url;
        iframe.name = opt.id;
        iframe.className = 'myPage';
        wrapper.appendChild(iframe);
        elContainer.appendChild(wrapper);
    }else{
        var iframe = wrapper.querySelector('iframe');
        iframe.src = opt.url;
        iframe.id = opt.id || opt.url;
        iframe.name = iframe.id;
    }
};
var subpages = ['indexNew.html','mine.html'];
var subpage_style = {
    top: '0px',
    bottom: '51px'
};
var aniShow = {};
// 当前激活选项
var activeTab = subpages[0];
//alert('activeTab='+activeTab);
//alert(mui.os.plus);
if(mui.os.plus){
    //alert('ios');
    // 创建子页面，首个选项卡页面显示，其它均隐藏；
    mui.plusReady(function() {
        //alert('手机');
        //status();
        var self = plus.webview.currentWebview();
        //for (var i = 0; i < 4; i++) {
        //alert('self');
        for (var i = 0; i < 3; i++) {
            var temp = {};
            var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
            if (i > 0) {
                sub.hide();
            }else{
                temp[subpages[i]] = "true";
                mui.extend(aniShow,temp);
            }
            self.append(sub);
        }
    });
}else{
    if(mui.os.android){
        // 创建iframe代替子页面
         createIframe('.mui-content',{
         url: activeTab,
         style: subpage_style
         });
    }else{
        var def = document.getElementById("defaultTab");
        def.classList.remove('mui-active');
        if(localStorage.getItem('tab') == 'mine.html'){
            activeTab = localStorage.getItem('tab');
            var defaultTab = document.getElementById("tab_mine");
            //模拟wode点击
            defaultTab.classList.add('mui-active');
            // 创建iframe代替子页面
            createIframe('.mui-content',{
                url: activeTab,
                style: subpage_style
            });
        }else{
            activeTab = 'indexNew.html';
            var defaultTab = document.getElementById("defaultTab");
            //模拟首页点击
            defaultTab.classList.add('mui-active');
            // 创建iframe代替子页面
            createIframe('.mui-content',{
                url: activeTab,
                style: subpage_style
            });
        }
    }
}

// 选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
    var targetTab = this.getAttribute('href');
    //alert(targetTab);
    //alert(window.location.pathname)
    if (targetTab == activeTab) {return;}
    //window.frames[targetTab].location.reload();
    //$('iframe').location.href= targetTab;
    //显示目标选项卡
    if(mui.os.plus){
        //若为iOS平台或非首次显示，则直接显示
        if(mui.os.ios||aniShow[targetTab]){
            plus.webview.show(targetTab);
        }else{
            //alert(JSON.stringify(plus.webview));
            //否则，使用fade-in动画，且保存变量
            var temp = {};
            temp[targetTab] = "true";
            mui.extend(aniShow,temp);
            plus.webview.show(targetTab,"fade-in",300);
        }
        //隐藏当前;
        plus.webview.hide(activeTab);
    }else{
        // 创建iframe代替子页面
        createIframe('.mui-content',{
            url: targetTab,
            style: subpage_style
        });
    }
    //更改当前活跃的选项卡
    activeTab = targetTab;
    localStorage.setItem('tab',targetTab);
});

// 自定义事件，模拟点击“首页选项卡”
document.addEventListener('gohome', function() {
    var defaultTab = document.getElementById("defaultTab");
    //模拟首页点击
    mui.trigger(defaultTab, 'tap');
    //切换选项卡高亮
    var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
    if (defaultTab !== current) {
        current.classList.remove('mui-active');
        defaultTab.classList.add('mui-active');
    }
});


