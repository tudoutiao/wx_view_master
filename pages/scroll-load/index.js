// pages/scroll-load/index.js

const util = require('../../utils/util')
const splashApi = require('../../api/splash')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //默认（必须）
        currentPage: splashApi.customData.currentPage, //请求数据的页码
        size: splashApi.customData.size, //每页数据条数
        totalCount: 0, //总是数据条数
        pagecount: 0, //总的页数
        //页面设置
        winWidth: 0,
        winHeight: 0,
        list: [], //当前页数据源
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let it = this
        let info = util.systemSize()
        it.setData({
            winWidth: info.width,
            winHeight: info.height
        })

        splashApi.getSplashList().then(res => {

            splashApi.refreshPageInfo(it.data.currentPage)
            it.setData({
                totalCount: splashApi.customData.total,
                pagecount: splashApi.customData.pagecount,
                list: splashApi.customData.splashs,
            })
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    /**
     * 加载更多数据
     */
    bindscrolltolower() {
        if (this.data.currentPage < this.data.pagecount) {
            splashApi.customData.currentPage++
            this.data.currentPage++;
            this.get_list();
        } else {
            //没有更多数据
            this.nomore_showToast();
        }
    },

    /** 获取更多数据 */
    get_list() {
        let it = this
        splashApi.getCurrentPageList(it.data.currentPage)
            .then(res => {
                it.setData({
                    list: splashApi.customData.splashs
                })
                if(it.data.list.size==800){
                    splashApi.getSplashList(splashApi.customData.currentPage_remote+1)
                }
            })
    },
    /** 没有更多数据 */
    nomore_showToast() {
        wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1500,
            mask: true
        })
    }
})