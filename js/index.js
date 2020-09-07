let homeFunc = ((win) => {
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

    // 获取轮播图
    function fetchCarousel() {
        $.ajax({
            url: baseURL + 'picture/list',
            type: 'POST',
            data: {
                'type': 'web',
                'position': 'sy'
            },
            dataType: 'json',
            success: (res) => {
                let imgs = res.page.list.map(e => e.path);
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

    // 获取网站信息
    function fetchHomeInfo() {
        $.ajax({
            url: baseURL + 'setting/listByGroup',
            type: 'POST',
            data: {
                'sort': 'bas'
            },
            dataType: 'json',
            success: (res) => {
                // title
                let homeTitle = res.data.filter(e => e.name === 'bas_site_name');
                document.title = homeTitle[0].value;
                // 下载APP
                let appDownload = res.data.filter(e => e.name === 'app');
                $('#app-download').attr('href', appDownload[0].value);
                // 公司二维码
                let qrcodeCo = res.data.filter(e => e.name === 'gs_ewm');
                $('#qrcode-co').attr('src', qrcodeCo[0].value);
            }
        });
    };

    return {
        eventBind,
        fetchCarousel,
        fetchHomeInfo
    };
})(window);

$(() => {
    homeFunc.eventBind(); // 事件绑定
    homeFunc.fetchCarousel(); // 获取轮播图
    homeFunc.fetchHomeInfo(); // 获取网站信息
});