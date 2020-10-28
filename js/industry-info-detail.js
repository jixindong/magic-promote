let industryInfoDtlFunc = (() => {
    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/commonList',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: res => {
                if (res.code !== 200) {
                    commonFunc.navigatorToError(); // 跳转错误页
                }

                // logo
                $('#logo').attr('src', res.content.logo);
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

    // 获取资讯详情
    function fetchInfoDetail() {
        let infoId = window.location.href.slice(window.location.href.indexOf('?') + 4);
        $.ajax({
            url: baseURL + 'notice/detail',
            type: 'POST',
            data: {
                'id': infoId
            },
            dataType: 'json',
            success: (res) => {
                document.title = res.title;
                $('#info-title').text(res.title);
                $('#info-date').text(res.release_time);
                // $('#info-poster img').attr('src', res.path);
                $('#info-content').html(res.content);
            }
        });
    };

    return {
        fetchWebBasicInfo,
        fetchInfoDetail
    };
})();

$(() => {
    industryInfoDtlFunc.fetchWebBasicInfo(); // 获取网站基本信息
    industryInfoDtlFunc.fetchInfoDetail(); // 获取资讯详情
});