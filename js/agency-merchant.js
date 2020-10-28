let agencyMerchantFunc = (() => {
    // 事件绑定
    function eventBind() {
        // 代理申请表单验证
        $('#agency-form').submit((event) => {
            let agencyForm = $(this);
            event.preventDefault();
            commitAgencyApply(); // 提交代理申请
        });
    };

    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/dlList',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: res => {
                if (res.code !== 200) {
                    commonFunc.navigatorToError(); // 跳转错误页
                }

                // logo
                $('#logo').attr('src', res.content.logo);
                // banner
                let imgs = res.content.dl.map(e => e.path);
                imgs.forEach((e, i) => {
                    if (i === 0) {
                        $('#banner-carousel .carousel-indicators').append(`<li data-target="#banner-carousel" data-slide-to="${i}" class="active"></li>`);
                        // $('#banner-carousel .carousel-inner').append(`<div class="carousel-item active"><img src="${e}" class="d-block w-100"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#starApply">立即开通</button><a href="${res.content.app}" class="btn link">下载APP</a></div>`);
                        $('#banner-carousel .carousel-inner').append(`<div class="carousel-item active"><img src="${e}" class="d-block w-100"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#starApply">立即开通</button></div>`);
                    } else if (i === 3) {
                        $('#banner-carousel .carousel-indicators').append(`<li data-target="#banner-carousel" data-slide-to="${i}"></li>`);
                        $('#banner-carousel .carousel-inner').append(`<div class="carousel-item"><img src="${e}" class="d-block w-100"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#merchantEnter">商家入驻</button></div>`);
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

    // 提交代理申请
    function commitAgencyApply() {
        let gsmc = $('#gsmc').val(); // 公司名称
        let gsjj = $('#gsjj').val(); // 公司简介
        let gsgmrs = $('#gsgmrs').val(); // 公司规模人数
        let szcs = $('#szcs').val(); // 所在城市
        let lxrxm = $('#lxrxm').val(); // 联系人姓名
        let lxrdh = $('#lxrdh').val(); // 联系人电话

        $.ajax({
            url: baseURL + 'agencyapplication/add',
            type: 'POST',
            data: {
                'company': gsmc,
                'introduce': gsjj,
                'people': gsgmrs,
                'city': szcs,
                'username': lxrxm,
                'phone': lxrdh,
            },
            dataType: 'json',
            success: (res) => {
                if (res.code === 200) {
                    alert('提交成功！');
                    $('#agency-form')[0].reset(); // 重置代理申请表单
                } else {
                    alert('提交失败，请重试！');
                }
            }
        });
    };

    return {
        eventBind,
        fetchWebBasicInfo
    }
})();

$(() => {
    agencyMerchantFunc.eventBind(); // 事件绑定
    agencyMerchantFunc.fetchWebBasicInfo(); // 获取网站基本信息
});