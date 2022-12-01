// pages/canvaspage/index.js
import {
    getInstance
} from '../../components/canvas-drag/view-canvas-drag'
import utils from '../../utils/util';
import Dialog from '../../components/dialog-input/view-dialog-input';
import PopWindowView from '../../components/popwindow/view-pop-window'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rgb: 'rgb(100,193,7)',
        content: "3333",
        pick: false,
        graph: {},
        width: 0,
        height: 0,
        downloadScale: 2,
        draggableCanvas: null,
        downloadCanvas: null,
        exprotImgUrl: "",
        original: "",
        radarImg: "",
        tools: [{
                title: "添加图片",
                src: "/images/svg/icon_add_img.svg",
                type: "addImg",
            },
            {
                title: "添加文字",
                src: "/images/svg/icon_add_text.svg",
                type: "addText"
            },
            {
                title: "回退",
                src: "/images/svg/icon_back.svg",
                type: "back"
            },
            {
                title: "分享",
                src: "/images/svg/icon_share.svg",
                type: "download"
            },
        ],
        isShow: false,
        states: {
            isShowAddText: false,
            isExprot: "none",
        },

    },
    methods: {

    },

    /**
     * 生命周期函数--监听页面加载
     *  通过options接收跳转地址携带的参数
     */
    onLoad: function (options) {
        console.log("====onLoad====")
        console.log(options)
        let self = this;
        self.data.draggableCanvas = getInstance('#canvasview');
        self.data.downloadCanvas = getInstance('#canvasexport');

        var title = decodeURIComponent(options.title);
        wx.getImageInfo({
            src: options.url,
            success: img => {
                var result = utils.resizeHeight(img)
                // console.log(img.width+"=="+img)
                self.setData({
                    title: title,
                    width: result.width,
                    height: result.height,
                    original: options.url
                })
                self.data.draggableCanvas.changeBgImage(img.path);
            }
        })

        PopWindowView.confirm({
            selector: '#pop-window',
            confirmCallback: function () {
                self.setData({
                    isShow: !self.data.isShow
                })
            },
            cancelCallback:function(){
                self.setData({
                    isShow: !self.data.isShow
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("====onReady====")
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log("====onShow====")
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("====onHide====")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("====onUnload===")
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    addImg: function (item) {
        let self = this;
        wx.chooseMedia({
            mediaType: ['image'],
            sourceType: ['album'],
            success: (res) => {
                console.log(res)
                wx.getImageInfo({
                    src: res.tempFiles[0].tempFilePath,
                    success: (img) => {
                        console.log(" getImageInfo success")
                        self.setData({
                            graph: {
                                w: self.data.width * 0.3,
                                h: img.height * self.data.width * 0.3 / img.width,
                                x: self.data.width * 0.4,
                                y: img.height * self.data.width * 0.4 / img.width,
                                type: 'image',
                                url: res.tempFiles[0].tempFilePath,
                            }
                        })
                    },
                    fail: (res) => {
                        console.log(res)
                    }
                })

            },
            fail: (res) => {
                console.log(res)
            }
        })
    },

    addText: function () {
        this.setData({
            isShow: !this.data.isShow
        })

    },
    onHideBox() {
        this.setData({
            isShow: !this.data.isShow
        });
    },

    //添加文字+文字颜色
    bindContentInput: function (e) {
        console.log("bindcontentinput :" + e.detail.value)
        this.data.content = e.detail.value
    },
    addTextWithColor: function () {
        let it = this
        let color = it.data.rgb
        let content = it.data.content
        it.setData({
            graph: {
                type: 'text',
                text: content,
                color: color
            }
        })
    },

    back: function () {
        this.data.draggableCanvas.undo();
    },
    download: function () {

        wx.showLoading({
            title: '请稍后...',
        })

        this.data.states.isExprot = "block"
        const that = this;
        const scale = that.data.downloadScale;
        this.data.draggableCanvas.exportJson().then(results => {
            results.forEach(item => {
                if (item.type === 'text') {
                    item.x = item.x * scale;
                    item.y = item.y * scale;
                    item.w = item.w * scale;
                    item.h = item.h * scale;
                    item.fontSize = item.fontSize * scale
                } else if (item.type === 'image') {
                    item.x = item.x * scale;
                    item.y = item.y * scale;
                    item.w = item.w * scale;
                    item.h = item.h * scale
                }
            })
            this.data.downloadCanvas.initByArr(results);
            this.data.downloadCanvas.export()
                .then((filePath) => {
                    console.log(filePath);
                    // wx.previewImage({
                    //     urls: [filePath]
                    // })
                    wx.hideLoading({
                        success: (res) => {},
                    })
                    that.data.exprotImgUrl = filePath
                    console.log("filePath - " + filePath)
                    wx.showShareImageMenu({
                        path: filePath,
                    })
                })
                .catch((e) => {
                    console.error(e);
                })
        });

    },

    share: function () {
        let self = this
        console.log(self.data.original)
        wx.downloadFile({
            url: self.data.original,
            success: (res) => {
                wx.showShareImageMenu({
                    path: res.tempFilePath,
                })
            },
            fail: (res) => {
                console.log(res)
            }
        })
    },

    onItemClick: function (e) {
        console.log(e.mark.tool)
        var item = e.mark.tool
        //   this[item.type](item);
        switch (item.type) {
            case "addImg":
                this.addImg(item)
                break
            case "addText":
                this.addText(item)
                break
            case "back":
                this.back()
                break
            case "download":
                this.download()
                break
            case "share":
                this.share()
                break
        }
    },

    pickColor(e) {
        let rgb = e.detail.color;
        console.log("当前色值", rgb)
        this.setData({
            rgb
        })
    },

})