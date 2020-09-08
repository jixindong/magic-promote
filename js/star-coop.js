let starCoopFunc = (() => {
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
            url: baseURL + 'home/index',
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
                // 合作电话
                $('#co-tel').text(res.hz_phone);
                // 咨询电话
                $('#ask-tel').text(res.zx_phone);
                // 公司邮箱
                $('#email').text(res.email);
                // 公司微博
                $('#micro-blog').text(res.wb);
                // 公司微信客服
                $('#WeChat-service').text(res.cont_name);
                // 公司二维码
                $('#qrcode-co').attr('src', res.gs_ewm);
            }
        });
    };

    return {
        handleSwiper,
        fetchWebBasicInfo
    }
})();

$(() => {
    commonFunc.handleHdBgc(); // 改变导航栏背景色
    starCoopFunc.handleSwiper(); // 初始化swiper
    starCoopFunc.fetchWebBasicInfo(); // 获取网站基本信息
});