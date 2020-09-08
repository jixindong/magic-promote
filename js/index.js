let homeFunc = (() => {
    // 事件绑定
    function eventBind() {
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

    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/index',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
                // title
                document.title = res.bas_site_name;
                // 下载APP
                $('#app-download').attr('href', res.gs_ewm);
                // banner
                let imgs = res.sy.map(e => e.path);
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
        eventBind,
        fetchWebBasicInfo
    };
})();

$(() => {
    commonFunc.handleHdBgc(); // 改变导航栏背景色
    homeFunc.eventBind(); // 事件绑定
    homeFunc.fetchWebBasicInfo(); // 获取网站基本信息
});