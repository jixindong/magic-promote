let industryInfoFunc = (() => {
    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/commonList',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
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

    return {
        fetchWebBasicInfo
    }
})();

$(() => {
    commonFunc.handleHdBgc(); // 改变导航栏背景色
    commonFunc.handleBaiduBridge(); // 设置百度商桥
    industryInfoFunc.fetchWebBasicInfo(); // 获取网站基本信息
});