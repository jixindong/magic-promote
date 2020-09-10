let agencyMerchantFunc = (() => {
    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/dlList',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
                // logo
                $('#logo').attr('src', res.content.logo);
                // banner
                let imgs = res.content.dl.map(e => e.path);
                imgs.forEach((e, i) => {
                    if (i === 0) {
                        $('#banner-carousel .carousel-indicators').append('<li data-target="#banner-carousel" data-slide-to="0" class="active"></li>');
                        $('#banner-carousel .carousel-inner').append(`<div class="carousel-item active"><img src="${e}" class="d-block w-100"></div>`);
                    } else {
                        $('#banner-carousel .carousel-indicators').append(`<li data-target="#banner-carousel" data-slide-to="${i}"></li>`);
                        $('#banner-carousel .carousel-inner').append(`<div class="carousel-item"><img src="${e}" class="d-block w-100"></div>`);
                    }
                });
                // 公司地址
                $('#coSite').text(res.content.contory_address);
                // 联系方式
                $('#coTel').text(res.content.hz_phone);
                // 公司邮箱
                $('#coEmail').text(res.content.email);
                // 版权所有
                $('#coCopyright').text(res.content.record_no);
                // 公司二维码
                $('#coQrcode').attr('src', res.content.gs_ewm);
                // 客服二维码
                $('#serviceQrcode').attr('src', res.content.cont_ewm);
            }
        });
    };

    return {
        fetchWebBasicInfo
    }
})();

$(() => {
    commonFunc.handleHdBgc(); // 改变导航栏背景色
    commonFunc.handleBaiduBridge(); // 设置百度商桥
    agencyMerchantFunc.fetchWebBasicInfo(); // 获取网站基本信息
});