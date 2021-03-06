let merchantEnterFunc = (() => {
	// 获取网站基本信息
	async function fetchWebBasicInfo() {
		let res = await $.ajax({
			url: baseURL + 'home/sjList',
			type: 'POST',
			data: {},
			dataType: 'json'
		});
		if (res.code !== 200) {
			return false;
		}

		// logo
		$('#logo').attr('src', res.content.logo);
		// banner
		let imgs = res.content.sj;
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
						`<div class="carousel-item active"><img src="${e.path}" class="d-block w-100" onclick="window.open(${e.link})"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#merchantEnter">商家入驻</button></div>`
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

	// 获取套餐费用
	function fetchSeatmealFee() {
		$.ajax({
			url: baseURL + 'setmeallinformation/listByGw',
			type: 'POST',
			data: {},
			dataType: 'json',
			success: res => {
				if (res.code !== 200) {
					return false;
				}

				res.list.forEach((value, index) => {
					if (index === 1) {
						$('#mealFee').append(
							`<div class="card card-blue"><div class="card-hd"><div class="stars"><img src="images/icon-star.png"><img src="images/icon-star.png"><img src="images/icon-star.png"><img src="images/icon-star.png"></div><div class="price"><span>￥</span><span class="num">${value.price}</span><span>/年</span></div><div>${value.name}</div></div><div class="card-content"><span>${value.video}个达人推广</span><span>${value.shot}条视频</span><span>${value.live}场直播</span><span>${value.content}</span></div><a href="manage/index.html#/setmeal-open" class="purchase-btn">立即购买</a></div>`
						);
					} else {
						$('#mealFee').append(
							`<div class="card"><div class="card-hd"><div class="price"><span>￥</span><span class="num">${value.price}</span><span>/年</span></div><div>${value.name}</div></div><div class="card-content"><span>${value.video}个达人推广</span><span>${value.shot}条视频</span><span>${value.live}场直播</span><span>${value.content}</span></div><a href="manage/index.html#/setmeal-open" class="purchase-btn">立即购买</a></div>`
						);
					}
				});
			}
		});
	};

	return {
		fetchWebBasicInfo,
		fetchSeatmealFee
	}
})();

$(() => {
	merchantEnterFunc.fetchWebBasicInfo(); // 获取网站基本信息
	merchantEnterFunc.fetchSeatmealFee(); // 获取套餐费用
});
