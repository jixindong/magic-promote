let industryInfoFunc = (() => {
    // 事件绑定
    function eventBind() {
        // 资讯tab切换
        let infoTabs = document.querySelectorAll('#info-tabs .item');
        for (let i = 0; i < infoTabs.length; i++) {
            infoTabs[i].onclick = () => {
                if (i === 0) {
                    fetchAllInfos(); // 获取全部资讯
                } else if (i === 1) {
                    fetchNewInfos(); // 获取热点资讯
                }

                for (let j = 0; j < infoTabs.length; j++) {
                    infoTabs[j].classList.remove('active');
                };
                infoTabs[i].classList.add('active');
            };
        };

        // 搜索资讯
        $('#search-btn').click(() => {
            let searchContent = $('#search-info').val();
            if (searchContent === '') {
                alert('请输入搜索内容！');
            } else {
                fetchInfos(searchContent);
            }
        });
    };

    // 获取网站基本信息
    function fetchWebBasicInfo() {
        // 网站基本信息
        $.ajax({
            url: baseURL + 'home/commonList',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: res => {
                if (res.code !== 200) {
                    return false;
                }

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
        // 热点资讯
        $.ajax({
            url: baseURL + 'notice/list',
            type: 'POST',
            data: {
                'classfiy': 5
            },
            dataType: 'json',
            success: (res) => {
                for (let i = 0; i < res.page.list.length; i++) {
                    let item = `<li><a href="javascript:void(0)" onclick="industryInfoFunc.navigateToInfoDtl(${res.page.list[i].id})">${res.page.list[i].title}</a></li>`;
                    $('#news-hot-list').append(item);
                }
            }
        });
    };

    // 获取全部资讯
    function fetchAllInfos() {
        $.ajax({
            url: baseURL + 'notice/list',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
                $('#info-list').empty();
                for (let i = 0; i < res.page.list.length; i++) {
                    // let item = `<div class="item" onclick="industryInfoFunc.navigateToInfoDtl(${res.page.list[i].id})"><img src="${res.page.list[i].path}"><div class="info"><div class="title">${res.page.list[i].title}</div><div class="text">${res.page.list[i].content_text}</div><div>${res.page.list[i].release_time}</div></div></div>`;
                    let item = `<div class="item"><img src="${res.page.list[i].path}" onclick="industryInfoFunc.navigateToInfoDtl(${res.page.list[i].id})"><div class="info"><div class="title">${res.page.list[i].title}</div><div class="text">${res.page.list[i].content_text}</div><div>${res.page.list[i].release_time}</div></div></div>`;
                    $('#info-list').append(item);
                }
            }
        });
    };

    // 获取热点资讯
    function fetchNewInfos() {
        $.ajax({
            url: baseURL + 'notice/list',
            type: 'POST',
            data: {
                'classfiy': 5
            },
            dataType: 'json',
            success: (res) => {
                $('#info-list').empty();
                for (let i = 0; i < res.page.list.length; i++) {
                    // let item = `<div class="item" onclick="industryInfoFunc.navigateToInfoDtl(${res.page.list[i].id})"><img src="${res.page.list[i].path}"><div class="info"><div class="title">${res.page.list[i].title}</div><div class="text">${res.page.list[i].content_text}</div><div>${res.page.list[i].release_time}</div></div></div>`;
                    let item = `<div class="item"><img src="${res.page.list[i].path}" onclick="industryInfoFunc.navigateToInfoDtl(${res.page.list[i].id})"><div class="info"><div class="title">${res.page.list[i].title}</div><div class="text">${res.page.list[i].content_text}</div><div>${res.page.list[i].release_time}</div></div></div>`;
                    $('#info-list').append(item);
                }
            }
        });
    };

    // 搜索资讯
    function fetchInfos(content) {
        $.ajax({
            url: baseURL + 'notice/list',
            type: 'POST',
            data: {
                content
            },
            dataType: 'json',
            success: (res) => {
                let infoTabs = document.querySelectorAll('#info-tabs .item');
                infoTabs[0].classList.add('active');
                infoTabs[1].classList.remove('active');

                $('#info-list').empty();
                for (let i = 0; i < res.page.list.length; i++) {
                    // let item = `<div class="item"><img src="${res.page.list[i].path}"><div class="info"><div class="title">${res.page.list[i].title}</div><div class="text">${res.page.list[i].content_text}</div><div>${res.page.list[i].release_time}</div></div></div>`;
                    let item = `<div class="item"><img src="${res.page.list[i].path}" onclick="industryInfoFunc.navigateToInfoDtl(${res.page.list[i].id})"><div class="info"><div class="title">${res.page.list[i].title}</div><div class="text">${res.page.list[i].content_text}</div><div>${res.page.list[i].release_time}</div></div></div>`;
                    $('#info-list').append(item);
                }
            }
        });
    };

    // 跳转资讯详情页面
    function navigateToInfoDtl(id) {
        window.location.href = `industry-info-detail.html?id=${id}`;
    };

    return {
        eventBind,
        fetchWebBasicInfo,
        fetchAllInfos,
        fetchNewInfos,
        navigateToInfoDtl
    }
})();

$(() => {
    industryInfoFunc.eventBind(); // 事件绑定
    industryInfoFunc.fetchWebBasicInfo(); // 获取网站基本信息
    industryInfoFunc.fetchAllInfos(); // 获取全部资讯
});