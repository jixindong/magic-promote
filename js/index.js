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

        // 商家入驻弹窗关闭回调
        $('#merchantEnter').on('hide.bs.modal', () => {
            $('#merchant-enter-form')[0].reset(); // 重置商家入驻表单
        });

        // 商家入驻表单验证
        $('#merchant-enter-form').submit((event) => {
            let merchantEnterForm = $(this);
            event.preventDefault();
            if (merchantEnterForm[0].checkValidity() === false) {
                event.stopPropagation();
            } else {
                commitMerchantEnter(); // 提交商家入驻
            }
        });
    };

    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/syList',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
                // title
                document.title = res.content.bas_site_name;
                // logo
                $('#logo').attr('src', res.content.logo);
                // 下载APP
                $('#app-download').attr('href', res.content.app);
                // banner
                let imgs = res.content.sy.map(e => e.path);
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

    // 提交商家入驻
    function commitMerchantEnter() {
        let coName = $('#coName').val(); // 公司名称
        let dpmc = $('#dpmc').val(); // 店铺名称
        let nxse = $('#nxse').val(); // 年销售额
        let lxr = $('#lxr').val(); // 联系人
        let sjhm = $('#sjhm').val(); // 手机号码
        // 主营类目
        let zylm = '';
        let zylmObj = document.getElementsByName('zylm');
        for (i in zylmObj) {
            if (zylmObj[i].checked) {
                zylm += `${zylmObj[i].value},`;
            }
        }
        zylm = zylm.slice(0, -1);
        // 商家类型
        let sjlx = '';
        let sjlxObj = document.getElementsByName('sjlx');
        for (i in sjlxObj) {
            if (sjlxObj[i].checked) {
                sjlx = sjlxObj[i].value;
            }
        }
        // 电商平台
        let dspt = '';
        let dsptObj = document.getElementsByName('dspt');
        for (i in dsptObj) {
            if (dsptObj[i].checked) {
                dspt += `${dsptObj[i].value},`;
            }
        }
        dspt = dspt.slice(0, -1);

        $.ajax({
            url: baseURL + 'businessapplication/add',
            type: 'POST',
            data: {
                'company': coName,
                'shop': dpmc,
                'salesVolume': nxse,
                'username': lxr,
                'phone': sjhm,
                'main': zylm,
                'type': sjlx,
                'isopen': dspt
            },
            dataType: 'json',
            success: (res) => {
                if (res.code === 200) {
                    alert('提交成功！');
                    $('#merchant-enter-form')[0].reset(); // 重置商家入驻表单
                    $('#merchantEnter').modal('hide'); // 关闭商家入驻弹窗
                } else {
                    alert('提交失败，请重试！');
                }
            }
        });
    };

    return {
        eventBind,
        fetchWebBasicInfo,
        commitMerchantEnter
    };
})();

$(() => {
    commonFunc.handleHdBgc(); // 改变导航栏背景色
    commonFunc.handleBaiduBridge(); // 设置百度商桥
    homeFunc.eventBind(); // 事件绑定
    homeFunc.fetchWebBasicInfo(); // 获取网站基本信息
});