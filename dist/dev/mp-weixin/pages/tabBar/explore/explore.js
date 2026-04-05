"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      groupTopics: []
    };
  },
  methods: {
    viewGroupTopic(e) {
      console.log("e: %s", JSON.stringify(e));
      common_vendor.index.navigateTo({
        url: "/pages/groupTopic/groupTopic-view?id=" + e.target.id
      });
    }
  },
  onLoad() {
    common_vendor.er.callFunction({
      name: "grouptopic-get"
    }).then((res) => {
      console.log("successfully retrieved groupTopics: %s", JSON.stringify(res.result.data));
      this.groupTopics = res.result.data;
    });
  }
};
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  const _component_cu_custom = common_vendor.resolveComponent("cu-custom");
  const _component_cu_bar = common_vendor.resolveComponent("cu-bar");
  (_component_template + _component_cu_custom + _component_cu_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      bgColor: "bg-white",
      isBack: false
    }),
    b: common_vendor.f($data.groupTopics, (groupTopic, index, i0) => {
      return {
        a: groupTopic._id,
        b: common_vendor.o((...args) => $options.viewGroupTopic && $options.viewGroupTopic(...args), index),
        c: common_vendor.t(groupTopic.name),
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
