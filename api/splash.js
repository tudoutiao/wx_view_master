const customData = {
    /** 远程数据 */
    total: 0, //全部数量
    size_remote: 0, //当前页数量
    pages_remote: 0, // 总页数
    currentPage_remote: 1, //当前页
    all_splashs: [], //所有列表数据
    pagecount: 0, //总的页数

    /** 本地记录 */
    currentPage: 1, //请求数据的页码
    size: 20, //每页数据条数
    splashs: [],
}

/**获取接口数据 */
const getSplashList = (page = 1) => {
    return new Promise(reslove => {
        wx.request({
            url: 'https://www.lucky510.com/assets/splash/page-01.json',
            success(res) {
                let list = customData.all_splashs
                if (page == 1) {
                    list.splice(0, list.length)
                }
                // console.log(res.data)
                let result = res.data.resp
                list = list.concat(result.records)
                customData.all_splashs = list
                customData.total = result.total
                customData.size_remote = result.size
                customData.currentPage_remote = result.current
                customData.pages_remote = result.pages

                let totalPages = Math.floor(result.total / customData.size)
                if (result.total % customData.size != 0)
                    totalPages++
                customData.pagecount = totalPages
                if (page == 1)
                    refreshPageInfo()
                reslove(res.data)
            },
            fail(res) {

            }
        })
    })
}

const refreshPageInfo = (localPageIndex = 1) => {
    let list = customData.all_splashs.splice(0, localPageIndex * customData.size)
    customData.splashs = list
}

module.exports = {
    customData: customData,
    /**获取接口数据 */
    getSplashList: getSplashList,

    refreshPageInfo: refreshPageInfo,
    getCurrentPageList: (curPage) => { 
        return new Promise(reslove => {
            refreshPageInfo(curPage)
            reslove(customData.splashs)
        })
    }
}