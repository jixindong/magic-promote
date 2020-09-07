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

    // 初始化swiper
    function handleSwiper() {
        let swiperCase = new Swiper('#swiper-case .swiper-container', {
            loop: true,
            effect: 'coverflow',
            slidesPerView: 3,
            centeredSlides: true,
            coverflowEffect: {
                rotate: 0,
                stretch: -24,
                depth: 100,
                modifier: 2,
                slideShadows: true
            },
            pagination: {
                el: '#swiper-case .swiper-pagination',
            }
        });

        let swiperStar = new Swiper('#swiper-star .swiper-container', {
            loop: true,
            navigation: {
                nextEl: '#swiper-star .swiper-button-next',
                prevEl: '#swiper-star .swiper-button-prev',
            }
        });
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
        handleSwiper,
        fetchWebBasicInfo
    }
})(window);

$(() => {
    starCoopFunc.eventBind(); // 事件绑定
    starCoopFunc.handleSwiper(); // 初始化swiper
    starCoopFunc.fetchWebBasicInfo(); // 获取网站基本信息
});