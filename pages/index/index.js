import {
    getBackgroundAudioManager,
    Throttler
} from "../../utils/util.js";
const util = require('../../utils/util')
Page({
    data: {
        list: [
            //   {
            //     name: "radio,checkbox组件",
            //     icon: "🚓",
            //     type: "radio",
            //   },
            //   {
            //     name: "播放音乐组件",
            //     icon: "🚙",
            //     type: "audio",
            //   },
            //   {
            //     name: "文字跑马灯组件",
            //     icon: "🚌",
            //     type: "text",
            //   },
            //   {
            //     name: "vr全景图效果",
            //     icon: "🛺",
            //     type: "vr",
            //   },
            //   {
            //     name: "获取网络状态",
            //     icon: "🚑",
            //     type: "network",
            //   },
            {
                name: "弹幕滚动效果",
                icon: "🚎",
                type: "bullet",
            },
            {
                name: "动画",
                icon: "🚎",
                type: "animation",
            },
            {
                name: "滚动加载",
                icon: "🚎",
                type: "scroll_load",
            },
            {
                name: "图片编辑",
                icon: "🚜",
                type: "canvas_drag",
            },
            //   {
            //     name: "textarea与input的坑",
            //     icon: "🚑",
            //     type: "textareaBug",
            //   },
        ],
    },
    onLoad() {},

    bindNav(e) {
        const {
            type
        } = e.currentTarget.dataset;
        let url = "";
        switch (type) {
            case "canvas_drag": {
                let data = {
                    id: 2571,
                    title: "世界杯开幕",
                    dayImgUrl: "https://img3.chouti.com/CHOUTI_20221120/E21D2073E98F4366A280AD50DEDE3460_W1080H1920.jpg",
                    dayWidthHeight: "1080*1920",
                }
                data = util.dealListData(data)
                console.log(data)
                url = data.jumpUrl
                break;
            }

            case "radio":
                url = "/pages/radio-checkbox/index";
                break;
            case "audio":
                url = "/pages/audio/index";
                break;
            case "text":
                url = "/pages/text/index";
                break;
            case "vr":
                url = "/pages/vrImg/index";
                break;
            case "network":
                url = "/pages/network/index";
                break;
            case "bullet":
                url = "/pages/bullet-chat/index";
                break;
            case "chart":
                url = "/pages/charts/index";
                break;
            case "textareaBug":
                url = "/pages/textareaBug/index";
                break;
            case "animation":
                url = "/pages/animpage/index";
                break;
            case "scroll_load":
                url = "/pages/scroll-load/index";
                break;
            default:
                break;
        }
        wx.navigateTo({
            url,
        });
    },
});