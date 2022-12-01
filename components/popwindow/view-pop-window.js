/**
 * 用法  onload
 *   Dialog.confirm({
            message: '弹框标题',
            selector: '#dialog-view',
            confirmCallback: function () {
                self.setData({
                    isShow: !self.data.isShow
                })
            }
        })

        <dialog-input id="dialog-view" show="{{isShow}}"></dialog-input>  置于xml最上层
 */

const defaultOptions = {
    show: false,
    selector: '#pop-window',
    confirmCallback: null,
    cancelCallback: null,
};

let currentOptions = Object.assign({}, defaultOptions);

function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}

const PopWindowView = (options) => {
    options = Object.assign({}, currentOptions, options);


    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];
    const pop= ctx.selectComponent(options.selector);

    // const context = options.context || getContext();
    // const pop = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;
    if (pop) {
        pop.setData(options);
        wx.nextTick(() => {
            pop.setData({ show: false });
        });
    }
    else {
        console.warn('未找到 cus-dialog 节点，请确认 selector 及 context 是否正确');
    }
};

PopWindowView.confirm = (options) => PopWindowView(Object.assign(options));
export default PopWindowView;