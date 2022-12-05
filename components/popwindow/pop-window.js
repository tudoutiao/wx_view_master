// components/popwindow/pop-window.js

import splishApi from '../../api/splash';

Component({

    options: {
        addGlobalClass: true,
        multipleSlots: true,
        styleIsolation: 'isolated'
    },

    /**
     * 组件的属性列表
     */
    properties: {

        show: {
            type: Boolean,
            value: false
        },
        confirmCallback: null,
        cancelCallback: null,
    },

    /**
     * 组件的初始数据
     */
    data: {
        originList: splishApi.bulletlist,


        /**
         * 导航数据
         */
        tabs: [],
        /**
         * 当前激活的当航索引
         */
        currentActiveNavIndex: 0,
        /**
         * 上一个激活的当航索引
         */
        prevActiveNavIndex: -1,
        /**
         * scroll-view 横向滚动条位置
         */
        scrollLeft: 0

    },

    ready: function () {
        const tabs = [{
                title: '文本',
                position:0,
                img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg',
                desc: '本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。',
            },
            {
                title: '颜色',
                position:1,
                img: 'http://mmbiz.qpic.cn/sz_mmbiz_png/GEWVeJPFkSHALb0g5rCc4Jf5IqDfdwhWJ43I1IvriaV5uFr9fLAuv3uxHR7DQstbIxhNXFoQEcxGzWwzQUDBd6Q/0?wx_fmt=png',
                desc: '微信小程序直播系列课程持续更新中，帮助大家更好地理解、应用微信小程序直播功能。',
            },
        ]
        this.setData({
            tabs
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onConfirm() {
            if (this.properties.confirmCallback) {
                this.properties.confirmCallback();
            }
            this.setData({
                show: false
            });
        },
        onCancel() {
            if (this.properties.cancelCallback) {
                this.properties.cancelCallback();
            }
            this.setData({
                show: false
            });
        },

        /**
         * 顶部导航改变事件，即被点击了
         * 1、如果2次点击同一个当航，则不做处理
         * 2、需要记录本次点击和上次点击的位置
         */
        topNavChange: function (e) {
            var nextActiveIndex = e.currentTarget.dataset.currentIndex,
                currentIndex = this.data.currentActiveNavIndex;
            if (currentIndex != nextActiveIndex) {
                this.setData({
                    currentActiveNavIndex: nextActiveIndex,
                    prevActiveNavIndex: currentIndex
                });
            }
        },
        /**
         * swiper滑动时触发
         * 1、prevIndex != currentIndex 表示的是用手滑动 swiper组件
         * 2、prevIndex = currentIndex  表示的是通过点击顶部的导航触发的
         */
        swiperChange: function (e) {
            var prevIndex = this.data.currentActiveNavIndex,
                currentIndex = e.detail.current;
            this.setData({
                currentActiveNavIndex: currentIndex
            });
            if (prevIndex != currentIndex) {
                this.setData({
                    prevActiveNavIndex: prevIndex
                });
            }
            this.scrollTopNav();
        },
        /**
         * 滚动顶部的导航栏
         * 1、这个地方是大致估算的
         */
        scrollTopNav: function () {
            /**
             * 当激活的当航小于4个时，不滚动
             */
            if (this.data.currentActiveNavIndex <= 3 && this.data.scrollLeft >= 0) {
                this.setData({
                    scrollLeft: 0
                });
            } else {
                /**
                 * 当超过4个时，需要判断是向左还是向右滚动，然后做相应的处理
                 */
                var plus = this.data.currentActiveNavIndex > this.data.prevActiveNavIndex ? 60 : -60;
                this.setData({
                    scrollLeft: this.data.scrollLeft + plus
                });
            }
            console.info(this.data.currentActiveNavIndex, this.data.prevActiveNavIndex, this.data.scrollLeft);
        }
    }

})