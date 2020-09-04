let homeFunc = ((win) => {
    // 事件绑定
    function eventBind() {
        // 改变导航栏背景色
        let hd = document.querySelector('#hd');
        let bannerHeight = document.querySelector('#banner-carousel').offSetHeight || 800;
        win.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop || win.pageYOffset || document.body.scrollTop;
            if (scrollTop >= bannerHeight) {
                hd.classList.add('hd-theme-color');
            } else {
                hd.classList.remove('hd-theme-color');
            }
        };

        // 显示、隐藏导航栏
        $('#dropdown').click(() => {
            $('#hd').addClass('hd-theme-color');
            $('#hide-nav').slideToggle();
        });

        // 服务体系鼠标悬浮事件
        $('#serviceSys .item').each(function () {
            $(this).hover(() => {
                let textHeight = $(this).height() - $(this).find('.title').height();
                $(this).find('.text').css('height', textHeight).slideToggle();
            });
        });

        // 公司动态tab切换
        let newsTabs = document.querySelectorAll('#newsTabs .item');
        let newsList = document.querySelectorAll('#newsList .item');
        for (let i = 0; i < newsTabs.length; i++) {
            newsTabs[i].onclick = () => {
                for (let j = 0; j < newsList.length; j++) {
                    newsTabs[j].classList.remove('active');
                    newsList[j].classList.remove('active');
                };
                newsTabs[i].classList.add('active');
                newsList[i].classList.add('active');
            };
        };
    };

    return {
        eventBind
    };
})(window);

$(() => {
    homeFunc.eventBind(); // 事件绑定
});