let starCoopFunc = ((win) => {
    let baseURL = 'http://192.168.1.249:8080/';

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
    };

    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + '/home/index',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
                // banner
                let imgs = res.wh.map(e => e.path);
                imgs.forEach((e, i) => {
                    if (i === 0) {
                        $('#banner-carousel .carousel-indicators').append('<li data-target="#banner-carousel" data-slide-to="0" class="active"></li>');
                        $('#banner-carousel .carousel-inner').append(`<div class="carousel-item active"><img src="${e}" class="d-block w-100"></div>`);
                    } else {
                        $('#banner-carousel .carousel-indicators').append(`<li data-target="#banner-carousel" data-slide-to="${i}"></li>`);
                        $('#banner-carousel .carousel-inner').append(`<div class="carousel-item"><img src="${e}" class="d-block w-100"></div>`);
                    }
                });
            }
        });
    };

    return {
        eventBind,
        fetchWebBasicInfo
    }
})(window);

$(() => {
    starCoopFunc.eventBind(); // 事件绑定
    starCoopFunc.fetchWebBasicInfo(); // 获取网站基本信息
});