let aboutUsFunc = (() => {
    // 事件绑定
    function eventBind() {
        // 关于我们tab切换
        let detailTabs = document.querySelectorAll('#detail-tabs .item');
        let detailContent = document.querySelectorAll('#detail-content .item');
        for (let i = 0; i < detailTabs.length; i++) {
            detailTabs[i].onclick = () => {
                for (let j = 0; j < detailContent.length; j++) {
                    detailTabs[j].classList.remove('active');
                    detailContent[j].classList.remove('active');
                };
                detailTabs[i].classList.add('active');
                detailContent[i].classList.add('active');
            };
        };
    };

    // 获取关于我们信息
    function fetchAboutUsInfo() {
        $.ajax({
            url: baseURL + 'aboutwe/list',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
                let coIntro = res.list.filter(e => e.type === 'gsjj')[0].content;
                let platformIntro = res.list.filter(e => e.type === 'ptjs')[0].content;
                let teamIntro = res.list.filter(e => e.type === 'tdjs')[0].content;
                $('#co-intro').html(coIntro);
                $('#platform-intro').html(platformIntro);
                $('#team-intro').html(teamIntro);
            }
        });
    };

    // 初始化百度地图
    function handleBaiduMap() {
        // 百度地图API功能
        let map = new BMap.Map("co-map");
        map.centerAndZoom(new BMap.Point(118.064662, 36.848908), 19);
        // 添加带有定位的导航控件
        let navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        map.addControl(navigationControl);
        // 添加定位控件
        let geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function (e) {
            // 定位成功事件
            let address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            alert("当前定位地址为：" + address);
        });
        geolocationControl.addEventListener("locationError", function (e) {
            // 定位失败事件
            alert(e.message);
        });
        map.addControl(geolocationControl);
    };

    return {
        eventBind,
        fetchAboutUsInfo,
        handleBaiduMap
    };
})();

$(() => {
    commonFunc.handleHdBgc(); // 改变导航栏背景色
    commonFunc.fetchWebBasicInfo(); // 获取网站基本信息
    aboutUsFunc.eventBind(); // 事件绑定
    aboutUsFunc.fetchAboutUsInfo(); // 获取关于我们信息
    aboutUsFunc.handleBaiduMap(); // 初始化百度地图
});