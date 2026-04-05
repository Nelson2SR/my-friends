"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      "pickPic": "选择照片",
      imgList: [],
      textareaValue: ""
    };
  },
  props: {
    text: {
      type: String,
      default: "选择图片"
    },
    type: {
      type: String,
      default: "groupPic"
    }
  },
  methods: {
    ChooseImage() {
      common_vendor.index.chooseImage({
        count: 4,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"],
        //从相册选择
        success: (res) => {
          if (this.imgList.length != 0) {
            this.imgList = this.imgList.concat(res.tempFilePaths);
          } else {
            this.imgList = res.tempFilePaths;
          }
          if (this.type === "groupPic") {
            this.$emit("addImage", this.imgList);
          } else if (this.type === "qrCodePic") {
            this.$emit("addQRCode", this.imgList);
          }
        }
      });
    },
    ViewImage(e) {
      common_vendor.index.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
      common_vendor.index.showModal({
        title: "召唤师",
        content: "确定要删除这段回忆吗？",
        cancelText: "再看看",
        confirmText: "再见",
        success: (res) => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.text),
    b: common_vendor.t($data.imgList.length),
    c: common_vendor.f($data.imgList, (item, index, i0) => {
      return {
        a: $data.imgList[index],
        b: common_vendor.o((...args) => $options.DelImg && $options.DelImg(...args), index),
        c: index,
        d: index,
        e: common_vendor.o((...args) => $options.ViewImage && $options.ViewImage(...args), index),
        f: $data.imgList[index]
      };
    }),
    d: $data.imgList.length < 4
  }, $data.imgList.length < 4 ? {
    e: common_vendor.o((...args) => $options.ChooseImage && $options.ChooseImage(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
