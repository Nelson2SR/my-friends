"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onClick(e) {
      console.log("The card value:" + e);
      common_vendor.index.navigateTo({
        url: "/pages/group/group-view?id=" + e._id
      });
    }
  },
  onLoad: function() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.item.imgUrl,
    b: common_vendor.t($props.item.type.name),
    c: common_vendor.t($props.item.description),
    d: `url(${$props.item.owner.avatarUrl})`,
    e: common_vendor.t($props.item.name),
    f: common_vendor.t($props.item.read),
    g: common_vendor.t($props.item.vote),
    h: common_vendor.t($props.item.comment),
    i: common_vendor.n(_ctx.isCard ? "no-card" : ""),
    j: common_vendor.o(($event) => $options.onClick($props.item))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
