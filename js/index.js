let homeFunc = ((win) => {
    // 改变导航栏背景色
    function handleHdBgc() {
        let hd = document.querySelector('#hd');
        let bannerHeight = document.querySelector('#banner-carousel').offSetHeight || 600;
        win.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop || win.pageYOffset || document.body.scrollTop;
            if (scrollTop >= bannerHeight) {
                hd.classList.add('hd-theme-color');
            } else {
                hd.classList.remove('hd-theme-color');
            }
        }
    };
    // 带货tab切换
    function sellGoodTab() {
        let sellGoodTabs = document.querySelectorAll('#sellGoodTabs .item');
        let sellGoddItems = document.querySelectorAll('#sellGoodItems .item');
        for (let i = 0; i < sellGoodTabs.length; i++) {
            sellGoodTabs[i].onclick = () => {
                for (let j = 0; j < sellGoddItems.length; j++) {
                    sellGoodTabs[j].classList.remove('active');
                    sellGoddItems[j].classList.remove('active');
                };
                sellGoodTabs[i].classList.add('active');
                sellGoddItems[i].classList.add('active');
            };
        };
    };

    return {
        handleHdBgc,
        sellGoodTab
    };
})(window);

$(function () {
    homeFunc.handleHdBgc(); // 改变导航栏背景色
    homeFunc.sellGoodTab(); // 带货tab切换
});