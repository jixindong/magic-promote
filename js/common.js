// baseURL
let baseURL = 'http://api.motui.com.cn:8001/';
// let baseURL = 'http://192.168.1.177:8001/';

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

	// 判断域名是否合法
	async function judgeDomainName() {
		let res = await $.ajax({
			url: baseURL + 'home/front',
			type: 'POST'
		});
		if (res.code !== 200) {
			return window.location.href = 'error.html';
		}

		handleMeta(res.map.name); // 设置meta
		handleBaiduBridge(res.map.baidu); // 设置百度商桥
	};

	// 设置meta
	function handleMeta(name) {
		let meta = document.createElement('meta');
		meta.name = 'description';
		meta.content = `${name}帮助商家有效的触达、获取海量网红资源，并通过“货源”与“网红”的优质匹配，快速布局短视频•直播渠道。`;
		document.getElementsByTagName('head')[0].appendChild(meta);
	};

	// 设置百度商桥
	function handleBaiduBridge(bridge) {
		if(!bridge){
			return false;
		}
		
		let baiduBridge = document.createElement("script");
		let s = document.getElementsByTagName("script")[0];
		baiduBridge.src = bridge;
		s.parentNode.insertBefore(baiduBridge, s);
	};

	// 商家入驻
	function handleMerchantEnter() {
		// 商家入驻弹窗关闭回调
		$('#merchantEnter').on('hide.bs.modal', () => {
			$('#merchant-enter-form')[0].reset(); // 重置商家入驻表单
		});
		commitMerchantEnter(); // 提交商家入驻
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

		if (!coName || !dpmc || !nxse || !lxr || !sjhm || !zylm || !sjlx || !dspt) {
			return alert('请填写完整');
		}
		if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(parseInt(sjhm)))) {
			return alert('手机号格式有误');
		}

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

	// 网红申请
	function handleStarApply() {
		// 商家入驻弹窗关闭回调
		$('#starApply').on('hide.bs.modal', () => {
			$('#star-apply-form')[0].reset(); // 重置商家入驻表单
		});
		commitStarApply(); // 提交网红申请
	};

	// 提交网红申请
	function commitStarApply() {
		let starName = $('#star-name').val(); // 姓名
		let starDyid = $('#star-dyid').val(); // 抖音ID
		let starDync = $('#star-dync').val(); // 抖音昵称
		let starFans = $('#star-fans').val(); // 粉丝数
		let starTel = $('#star-tel').val(); // 手机
		let starWx = $('#star-wx').val(); // 微信号

		if (!starName || !starDyid || !starDync || !starFans || !starTel || !starWx) {
			return alert('请填写完整');
		}
		if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(parseInt(starTel)))) {
			return alert('手机号格式有误');
		}

		$.ajax({
			url: baseURL + 'talentapplication/add',
			type: 'POST',
			data: {
				'username': starName,
				'dyId': starDyid,
				'dyName': starDync,
				'fans': starFans,
				'phone': starTel,
				'wx': starWx
			},
			dataType: 'json',
			success: (res) => {
				if (res.code === 200) {
					alert('提交成功！');
					$('#star-apply-form')[0].reset(); // 重置网红申请表单
					$('#starApply').modal('hide'); // 关闭网红申请弹窗
				} else {
					alert('提交失败，请重试！');
				}
			}
		});
	};

	return {
		handleHdBgc,
		handleHdVisibility,
		handleMerchantEnter,
		handleStarApply,
		judgeDomainName
	};
})(window);

$(() => {
	commonFunc.handleHdBgc(); // 改变导航栏背景色
	commonFunc.handleHdVisibility(); // 显示、隐藏导航栏
	commonFunc.judgeDomainName(); // 判断域名是否合法
});
