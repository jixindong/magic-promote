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

	// 获取网站基本信息
	async function fetchWebBasicInfo() {
		let res = await $.ajax({
			url: baseURL + 'home/commonList',
			type: 'POST',
			data: {},
			dataType: 'json'
		});
		if (res.code !== 200) {
			return false;
		}

		handleBaiduMap(res.content.jw, res.content.wd); // 初始化百度地图
		// 联系方式 - 公司名称
		$('#company').text(res.content.bas_site_name || '');
		// 联系方式 - 联系电话
		$('#tel').text(res.content.hz_phone || '');
		// 联系方式 - 公司地址
		$('#location').text(res.content.contory_address || '');
		// 联系方式 - 联系邮箱
		$('#email').text(res.content.email || '');
		// 底部栏 - logo
		$('#logo').attr('src', res.content.logo || '');
		// 底部栏 - 公司地址
		$('#coSite').text(res.content.contory_address || '');
		// 底部栏 - 联系方式
		$('#coTel').text(res.content.hz_phone || '');
		// 底部栏 - 公司邮箱
		$('#coEmail').text(res.content.email || '');
		// 底部栏 - 版权所有
		$('#coCopyright').text(res.content.record_no || '');
		// 底部栏 - 公司二维码
		$('#coQrcode').attr('src', res.content.gs_ewm || '');
		// 底部栏 - 客服二维码
		$('#serviceQrcode').attr('src', res.content.cont_ewm || '');
	};

	// 获取关于我们信息
	function fetchAboutUsInfo() {
		$.ajax({
			url: baseURL + 'aboutwe/list',
			type: 'POST',
			data: {},
			dataType: 'json',
			success: (res) => {
				let coIntro = res.page.filter(e => e.type === 'gsjj')[0].content;
				let platformIntro = res.page.filter(e => e.type === 'ptjs')[0].content;
				let teamIntro = res.page.filter(e => e.type === 'tdjs')[0].content;
				$('#co-intro').html(coIntro);
				$('#platform-intro').html(platformIntro);
				$('#team-intro').html(teamIntro);
			}
		});
	};

	// 初始化百度地图
	function handleBaiduMap(longitude, latitude) {
		let longitude = longitude || 118.064662;
		let latitude = latitude || 36.848908;
		// 百度地图API功能
		let map = new BMap.Map('co-map');
		map.centerAndZoom(new BMap.Point(longitude, latitude), 19);
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
		geolocationControl.addEventListener('locationSuccess', function(e) {
			// 定位成功事件
			let address = '';
			address += e.addressComponent.province;
			address += e.addressComponent.city;
			address += e.addressComponent.district;
			address += e.addressComponent.street;
			address += e.addressComponent.streetNumber;
			alert("当前定位地址为：" + address);
		});
		geolocationControl.addEventListener('locationError', function(e) {
			// 定位失败事件
			alert(e.message);
		});
		map.addControl(geolocationControl);
	};

	return {
		eventBind,
		fetchWebBasicInfo,
		fetchAboutUsInfo,
		handleBaiduMap
	};
})();

$(() => {
	aboutUsFunc.eventBind(); // 事件绑定
	aboutUsFunc.fetchWebBasicInfo(); // 获取网站基本信息
	aboutUsFunc.fetchAboutUsInfo(); // 获取关于我们信息
	aboutUsFunc.handleBaiduMap(); // 初始化百度地图
});
