let baseURL = 'http://mtht.waszn.com:8001/'; // baseURL

// 公共方法
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

    // 显示、隐藏导航栏
    function handleHdVisibility() {
        $('#dropdown').click(() => {
            $('#hd').addClass('hd-theme-color');
            $('#hide-nav').slideToggle();
        });
    };

    // 设置百度商桥
    function handleBaiduBridge() {
        let baiduBridge = document.createElement("script");
        let s = document.getElementsByTagName("script")[0];
        baiduBridge.src = 'https://hm.baidu.com/hm.js?d0f59d0259dd9c3316d8700d0e5c8816';
        s.parentNode.insertBefore(baiduBridge, s);
    };

    // 商家入驻
    function handleMerchantEnter() {
        // 商家入驻弹窗关闭回调
        $('#merchantEnter').on('hide.bs.modal', () => {
            $('#merchant-enter-form')[0].reset(); // 重置商家入驻表单
        });
        // 商家入驻表单验证
        $('#merchant-enter-form').submit((event) => {
            let merchantEnterForm = $(this);
            event.preventDefault();
            commitMerchantEnter(); // 提交商家入驻
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
        handleHdBgc,
        handleHdVisibility,
        handleBaiduBridge,
        handleMerchantEnter,
        commitMerchantEnter
    };
})(window);

$(() => {
    commonFunc.handleHdBgc(); // 改变导航栏背景色
    commonFunc.handleHdVisibility(); // 显示、隐藏导航栏
    // commonFunc.handleBaiduBridge(); // 设置百度商桥
});