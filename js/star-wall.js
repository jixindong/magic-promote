let starWallFunc = (() => {
    // 事件绑定
    function eventBind() {
        // 网红列表tab切换
        let starTabs = document.querySelectorAll('#pagination .page-item');
        let starList = document.querySelectorAll('#star-list .item');
        for (let i = 0; i < starTabs.length; i++) {
            starTabs[i].onclick = () => {
                for (let j = 0; j < starList.length; j++) {
                    starTabs[j].classList.remove('active');
                    starList[j].classList.remove('active');
                };
                starTabs[i].classList.add('active');
                starList[i].classList.add('active');
            };
        };
    };

    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/syList',
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
        eventBind,
        fetchWebBasicInfo
    };
})();

$(() => {
    starWallFunc.eventBind(); // 事件绑定
    starWallFunc.fetchWebBasicInfo(); // 获取网站基本信息
});