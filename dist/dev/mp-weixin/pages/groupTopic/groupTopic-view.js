"use strict";
const common_vendor = require("../../common/vendor.js");
const cuSwiper = () => "../../colorui/components/cu-swiper.js";
const _sfc_main = {
  components: {
    cuSwiper
  },
  data() {
    return {
      name: {},
      groupTypes: []
    };
  },
  methods: {},
  onLoad(options) {
    console.log("GroupTopic Id: %s", options.id);
    common_vendor.er.callFunction({
      name: "group-get-by-topicId",
      data: {
        id: options.id
      }
    }).then((res) => {
      const groupTopicData = res.result.data;
      console.log("Successfully retrieved groups by groupTopic: %s", JSON.stringify(groupTopicData));
      this.name = groupTopicData[0].name;
      groupTopicData.forEach((groupTopicRecord) => {
        let groupType = groupTopicRecord.groupTypes;
        groupType["groups"] = groupTopicRecord.groups;
        this.groupTypes.push(groupType);
      });
      console.log("groupTypes: %s", JSON.stringify(this.groupTypes));
    }).catch((err) => {
      console.log("Error occurs while retrieving groups by groupTopic: %s", JSON.stringify(err));
    });
  }
};
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  const _component_cu_custom = common_vendor.resolveComponent("cu-custom");
  const _component_cu_swiper = common_vendor.resolveComponent("cu-swiper");
  (_component_template + _component_cu_custom + _component_cu_swiper)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.name),
    b: common_vendor.p({
      bgColor: "bg-white",
      isBack: true
    }),
    c: common_vendor.f($data.groupTypes, (groupType, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(groupType.name),
        b: groupType.groups.length > 0
      }, groupType.groups.length > 0 ? {
        c: "cff84930-1-" + i0,
        d: common_vendor.p({
          swiperList: groupType.groups
        })
      } : {}, {
        e: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
