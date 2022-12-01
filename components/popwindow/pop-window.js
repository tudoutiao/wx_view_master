// components/popwindow/pop-window.js
Component({
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
    }

})