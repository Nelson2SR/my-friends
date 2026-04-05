"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      show: true
    };
  },
  computed: {},
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    modalDetail: {
      type: Object,
      default: {
        "modalName": "",
        "modalTitle": "",
        "modalContent": ""
      }
    },
    confirmAction: Function
  },
  methods: {
    hideModal(e) {
      this.show = false;
    },
    doAction() {
      console.log("do action" + this.confirmAction);
      this.confirmAction();
    }
  },
  onLoad: function() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.doAction && $options.doAction(...args)),
    b: common_vendor.o((...args) => $options.hideModal && $options.hideModal(...args)),
    c: common_vendor.t($props.modalDetail.modalContent),
    d: common_vendor.n($data.show ? "show" : "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
