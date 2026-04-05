"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      percent: 0,
      loading: false,
      disabled: false
    };
  },
  methods: {
    upload: function() {
      common_vendor.index.chooseImage({
        count: 1,
        // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        // sourceType: ['album'], //从相册选择
        success: function(res) {
          const tempFilePaths = res.tempFilePaths;
          common_vendor.er.uploadFile({
            filePath: tempFilePaths[0],
            onUploadProgress: function(progressEvent) {
              Math.round(
                progressEvent.loaded * 100 / progressEvent.total
              );
            },
            success() {
            },
            fail() {
            },
            complete() {
            }
          });
        }
      });
    }
  },
  onLoad: function() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.percent,
    b: $data.loading,
    c: $data.disabled,
    d: common_vendor.o((...args) => $options.upload && $options.upload(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
