let agencyMerchantFunc = (() => {
    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/index',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
                // banner
                let imgs = res.dl.map(e => e.path);
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
        fetchWebBasicInfo
    }
})();

$(() => {
    commonFunc.handleHdBgc(); // 改变导航栏背景色
    agencyMerchantFunc.fetchWebBasicInfo(); // 获取网站基本信息
});