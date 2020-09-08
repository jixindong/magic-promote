let baseURL = 'http://mtht.waszn.com:8001/';

let commonFunc = ((win) => {
    // 改变导航栏背景色
    function handleHdBgc() {
        let hd = document.querySelector('#hd');
        win.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop || win.pageYOffset || document.body.scrollTop;
            if (scrollTop >= 1) {
                hd.classList.add('hd-theme-color');
            } else {
                hd.classList.remove('hd-theme-color');
            }
        };
    };
    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/index',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
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
        handleHdBgc,
        fetchWebBasicInfo
    }
})(window);