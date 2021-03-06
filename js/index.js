let homeFunc = (() => {
	// 事件绑定
	function eventBind() {
		// 服务体系鼠标悬浮事件
		$('#serviceSys .item').each(function() {
			$(this).hover(() => {
				let textHeight = $(this).height() - $(this).find('.title').height();
				$(this).find('.text').css('height', textHeight).slideToggle();
			});
		});
	};

	// 公司动态tab切换
	function handleCompanyState() {
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
	async function fetchWebBasicInfo() {
		let res = await $.ajax({
			url: baseURL + 'home/syList',
			type: 'POST',
			data: {},
			dataType: 'json'
		});
		if (res.code !== 200) {
			return false;
		}

		// title
		document.title = res.content.bas_site_name;
		// logo
		$('#logo').attr('src', res.content.logo);
		// 下载APP
		$('#app-download').attr('href', res.content.app_path);
		// banner
		let imgs = res.content.sy;
		if (imgs.length === 0) {
			$('#banner-carousel .carousel-indicators').append(
				'<li data-target="#banner-carousel" data-slide-to="0" class="active"></li>');
			$('#banner-carousel .carousel-inner').append(
				`<div class="carousel-item active"><img src="./images/banner-default-1.jpg" class="d-block w-100"></div>`);
		} else {
			imgs.forEach((e, i) => {
				if (i === 0) {
					$('#banner-carousel .carousel-indicators').append(
						'<li data-target="#banner-carousel" data-slide-to="0" class="active"></li>');
					$('#banner-carousel .carousel-inner').append(
						`<div class="carousel-item active"><img src="${e.path}" class="d-block w-100" onclick="window.open(${e.link})"></div>`
					);
				} else if (i === 1) {
					$('#banner-carousel .carousel-indicators').append(
						`<li data-target="#banner-carousel" data-slide-to="${i}"></li>`);
					$('#banner-carousel .carousel-inner').append(
						`<div class="carousel-item"><img src="${e.path}" class="d-block w-100" onclick="window.open(${e.link})"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#merchantEnter">商家入驻</button></div>`
					);
				} else if (i === 2) {
					$('#banner-carousel .carousel-indicators').append(
						`<li data-target="#banner-carousel" data-slide-to="${i}"></li>`);
					$('#banner-carousel .carousel-inner').append(
						`<div class="carousel-item"><img src="${e.path}" class="d-block w-100" onclick="window.open(${e.link})"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#starApply">立即开通</button><a href="${res.content.app_path}" target="_blank" class="btn link">下载APP</a></div>`
					);
				} else {
					$('#banner-carousel .carousel-indicators').append(
						`<li data-target="#banner-carousel" data-slide-to="${i}"></li>`);
					$('#banner-carousel .carousel-inner').append(
						`<div class="carousel-item"><img src="${e.path}" class="d-block w-100" onclick="window.open(${e.link})"></div>`
					);
				}
			});
		}
		// 公司动态
		res.content.gsfl.forEach((e, i) => {
			if (i === 0) {
				$('#newsTabs').append(`<div class="item active">${e.name}</div>`);
				let infoList = '';
				e.info.forEach(v => {
					infoList +=
						`<div class="info-item"><div class="date"><span class="month-day">${v.release_time.substring(5,10)}</span><span>${v.release_time.substring(0,4)}</span></div><div class="msg" onclick="homeFunc.navigateToInfoDtl(${v.id})"><div class="title">${v.title}</div><div class="text">${v.content}</div></div></div>`;
				});
				$('#newsList').append(
					`<div class="item active"><div class="row"><div class="col-12 col-md-6"><img src="${e.path}"></div><div class="col-12 col-md-6"><div class="info-list">${infoList}</div></div></div></div>`
				);
			} else {
				$('#newsTabs').append(`<div class="item">${e.name}</div>`);
				let infoList = '';
				e.info.forEach(v => {
					infoList +=
						`<div class="info-item"><div class="date"><span class="month-day">${v.release_time.substring(5,10)}</span><span>${v.release_time.substring(0,4)}</span></div><div class="msg" onclick="homeFunc.navigateToInfoDtl(${v.id})"><div class="title">${v.title}</div><div class="text">${v.content}</div></div></div>`;
				});
				$('#newsList').append(
					`<div class="item"><div class="row"><div class="col-12 col-md-6"><img src="${e.path}"></div><div class="col-12 col-md-6"><div class="info-list">${infoList}</div></div></div></div>`
				);
			}
		});
		handleCompanyState(); // 公司动态tab切换
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
	};

	// 跳转资讯详情页面
	function navigateToInfoDtl(id) {
		window.location.href = `industry-info-detail.html?id=${id}`;
	};

	return {
		eventBind,
		fetchWebBasicInfo,
		navigateToInfoDtl
	};
})();

$(() => {
	homeFunc.eventBind(); // 事件绑定
	homeFunc.fetchWebBasicInfo(); // 获取网站基本信息
});
