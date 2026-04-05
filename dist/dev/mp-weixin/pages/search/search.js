"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      CustomBar: this.CustomBar,
      groups: []
    };
  },
  methods: {
    searchIcon() {
      let keyword = "游戏";
      common_vendor.er.callFunction({
        name: "group-search",
        data: {
          "keyword": keyword
        }
      }).then((res) => {
        console.info("search result: %s", JSON.stringify(res));
        this.groups = res.result.data;
      }).catch((err) => {
        console.error("error while searching: %s", JSON.stringify(err));
      });
    }
  },
  mounted: function() {
  }
};
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  const _component_cu_custom = common_vendor.resolveComponent("cu-custom");
  const _component_cu_card = common_vendor.resolveComponent("cu-card");
  (_component_template + _component_cu_custom + _component_cu_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      bgColor: "bg-white",
      isBack: true
    }),
    b: common_vendor.o((...args) => $options.searchIcon && $options.searchIcon(...args)),
    c: common_vendor.s({
      top: $data.CustomBar + "px"
    }),
    d: common_vendor.f($data.groups, (group, key, i0) => {
      return {
        a: "0c5bb1da-1-" + i0,
        b: common_vendor.p({
          item: group
        }),
        c: key
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
