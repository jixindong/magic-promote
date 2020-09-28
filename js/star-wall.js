let starWallFunc = (() => {
    // 获取网红列表
    function fetchStarList(data) {
        $.ajax({
            url: baseURL + 'photowall/listWeb',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify(data),
            dataType: 'json',
            success: res => {
                if (res.code !== 200) {
                    return false;
                }

                // 创建分页按钮
                createPageBtns(res.page);
                // 网红列表
                $('#star-list').empty();
                res.page.list.forEach(value => {
                    $('#star-list').append(`<div class="star card"><div class="baseMsg"><img src="${value.path}"><div class="msg"><div class="name"><span>${value.name}</span><img src="${value.sex === 0 ? 'images/icon-male.png' : 'images/icon-female.png'}"></div><span>抖音号：${value.douyin}</span></div></div><div class="fans"><div class="fans-detail"><div class="num">${value.fans}W</div><div>粉丝数</div></div><div class="fans-detail"><div class="num">${value.num}8W</div><div>点赞数</div></div><div class="fans-detail"><div class="num">${value.video}</div><div>种草视频数</div></div></div></div>`);
                });
            }
        });
    };

    // 创建分页按钮
    function createPageBtns(page) {
        let {
            totalCount,
            pageSize,
            totalPage,
            currPage: currentPage
        } = page;
        let listPage = {
            totalCount,
            pageSize,
            totalPage,
            currentPage
        };

        // 清空分页元素
        $('#pagination').empty();

        // 上一页
        if (listPage.currentPage !== 1) {
            if (listPage.currentPage > 1) {
                $('#pagination').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${listPage.currentPage - 1},limit: ${listPage.pageSize}})"><span>&lt;</span>`);
            } else {
                $('#pagination').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)"><span>&lt;</span>`);
            }
        }

        // 中间页
        if (listPage.totalPage <= 5) { // 总页数小于等于5
            // 普通页
            for (let i = 1; i <= listPage.totalPage; i++) {
                $('#pagination').append(`<li class="page-item ${i === listPage.currentPage ? 'active' : ''}"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${i},limit: ${listPage.pageSize}})">${i}</a></li>`);
            };
        } else { // 总页数大于5
            if (listPage.currentPage <= 5) { // 当前页是前5页
                // 普通页
                for (let i = 1; i <= 5; i++) {
                    $('#pagination').append(`<li class="page-item ${i === listPage.currentPage ? 'active' : ''}"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${i},limit: ${listPage.pageSize}})">${i}</a></li>`);
                };
                // 跳页
                $('#pagination').append(`<li class="page-item"><a class="page-link next" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${listPage.currentPage + 5},limit: ${listPage.pageSize}})"><span>...</span></a></li>`);
                // 末页
                $('#pagination').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${listPage.totalPage},limit: ${listPage.pageSize}})">${listPage.totalPage}</a></li>`);
            } else if (listPage.currentPage > 5 && listPage.currentPage < listPage.totalPage - 4) { // 当前页非前5页且非后5页
                // 首页
                $('#pagination').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: 1,limit: ${listPage.pageSize}})">1</a></li>`);
                // 跳页
                $('#pagination').append(`<li class="page-item"><a class="page-link previous" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${listPage.currentPage - 5},limit: ${listPage.pageSize}})"><span>...</span></a></li>`);
                // 普通页
                for (let i = listPage.currentPage - 2; i < listPage.currentPage + 3; i++) {
                    $('#pagination').append(`<li class="page-item ${i === listPage.currentPage ? 'active' : ''}"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${i},limit: ${listPage.pageSize}})">${i}</a></li>`);
                };
                // 跳页
                $('#pagination').append(`<li class="page-item"><a class="page-link next" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${listPage.currentPage + 5},limit: ${listPage.pageSize}})"><span>...</span></a></li>`);
                // 末页
                $('#pagination').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${listPage.totalPage},limit: ${listPage.pageSize}})">${listPage.totalPage}</a></li>`);
            } else { // 当前页是后5页
                // 首页
                $('#pagination').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: 1,limit: ${listPage.pageSize}})">1</a></li>`);
                // 跳页
                $('#pagination').append(`<li class="page-item"><a class="page-link previous" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${listPage.currentPage - 5},limit: ${listPage.pageSize}})"><span>...</span></a></li>`);
                // 普通页
                for (let i = listPage.totalPage - 4; i <= listPage.totalPage; i++) {
                    $('#pagination').append(`<li class="page-item ${i === listPage.currentPage ? 'active' : ''}"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${i},limit: ${listPage.pageSize}})">${i}</a></li>`);
                };
            }
        }

        // 下一页
        if (listPage.currentPage !== 1) {
            if (listPage.currentPage < listPage.totalPage) {
                $('#pagination').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="starWallFunc.fetchStarList({page: ${listPage.currentPage + 1},limit: ${listPage.pageSize}})"><span>&gt;</span>`);
            } else {
                $('#pagination').append(`<li class="page-item"><a class="page-link" href="javascript:void(0)"><span>&gt;</span>`);
            }
        }
    };

    // 获取网站基本信息
    function fetchWebBasicInfo() {
        $.ajax({
            url: baseURL + 'home/syList',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: (res) => {
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
    };

    return {
        fetchStarList,
        fetchWebBasicInfo
    };
})();

$(() => {
    starWallFunc.fetchStarList({
        page: 1,
        limit: 16
    }); // 获取网红列表
    starWallFunc.fetchWebBasicInfo(); // 获取网站基本信息
});