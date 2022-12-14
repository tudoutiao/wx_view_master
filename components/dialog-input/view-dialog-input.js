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
    message: '',
    selector: '#cus-dialog',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    confirmCallback: null,
    cancelCallback: null,
};

let currentOptions = Object.assign({}, defaultOptions);

function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}

const Dialog = (options) => {
    options = Object.assign({}, currentOptions, options);
    const context = options.context || getContext();
    const dialog = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;
    if (dialog) {
        dialog.setData(options);
        wx.nextTick(() => {
            dialog.setData({ show: false });
        });
    }
    else {
        console.warn('未找到 cus-dialog 节点，请确认 selector 及 context 是否正确');
    }
};

Dialog.confirm = (options) => Dialog(Object.assign({ showCancelButton: true }, options));
export default Dialog;