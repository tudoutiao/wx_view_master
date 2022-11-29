export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}
/**
 * 获取背景音频
 */
let audioContent = null;
export function getBackgroundAudioManager() {
    if (!audioContent) {
        audioContent = wx.getBackgroundAudioManager();
    }
    return audioContent;
}

/**
 * 获取页面高度和宽度
 */
const systemSize = () => {
    const windowInfo = wx.getWindowInfo()
    let screenWidth = windowInfo.windowWidth
    let screenHeight = windowInfo.windowHeight

    return {
        width: screenWidth,
        height: screenHeight
    }
}


/**
 * 节流函数
 * @param {Number} time 节流多长时间
 * @param {Function} callback 回调函数
 */
export class Throttler {
    constructor(time) {
        this.timer = null;
        this.time = time || 1000;
    }
    limit(callback) {
        if (!callback || typeof callback !== 'function' || this.timer) {
            return;
        }
        this.timer = setTimeout(() => {
            this.timer = null;
        }, this.time);
        callback();
    }
}
/** 根据地址修改跳转信息 */
const dealListData = (v) => {
    if (v.dayImgUrl) {
        v.jumpUrl = '/pages/canvaspage/index?url=' + v.dayImgUrl + '&title=' + encodeURIComponent(v.desc) + '&id=' + v.id;
    }
    return v;
}

const resizeHeight = (img) => {
    var width = img.width
    var height = img.height
    const windowInfo = wx.getWindowInfo()
    var screenWidth = windowInfo.windowWidth
    var screenHeight = windowInfo.windowHeight

    // console.log(windowInfo.pixelRatio)
    // console.log(windowInfo.screenWidth)
    // console.log(windowInfo.screenHeight)
    // console.log(windowInfo.windowWidth)
    // console.log(windowInfo.windowHeight)
    // console.log(windowInfo.statusBarHeight)
    // console.log(windowInfo.safeArea)
    // console.log(windowInfo.screenTop)
    //rpx
    let widthRpx = 650
    let heightRpx = widthRpx * height / width
    return {
        width: widthRpx,
        height: heightRpx
    }
}

module.exports = {
    systemSize: systemSize,
    dealListData:dealListData,
    resizeHeight:resizeHeight
}