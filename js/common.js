let baseURL = 'http://mtht.waszn.com:8001/'; // baseURL

// 公共方法
let commonFunc = ((win) => {
    // 改变导航栏背景色
    function handleHdBgc() {
        let hd = document.querySelector('#hd');
        win.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop || win.pageYOffset || document.body.scrollTop;
            if (scrollTop >= 1) {
                hd.classList.add('hd-theme-color');
            } else {
                hd.classList.remove('hd-theme-color');
            }
        };
    };

    // 设置百度商桥
    function handleBaiduBridge() {
        let baiduBridge = document.createElement("script");
        let s = document.getElementsByTagName("script")[0];
        baiduBridge.src = 'https://hm.baidu.com/hm.js?d0f59d0259dd9c3316d8700d0e5c8816';
        s.parentNode.insertBefore(baiduBridge, s);
    };

    return {
        handleHdBgc,
        handleBaiduBridge
    };
})(window);