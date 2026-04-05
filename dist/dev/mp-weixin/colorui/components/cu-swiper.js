"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      cardCur: 0
    };
  },
  props: {
    swiperList: {
      type: Array,
      default: []
    }
  },
  methods: {
    viewGroup(item) {
      console.log("The card value:" + item);
      common_vendor.index.navigateTo({
        url: "/pages/group/group-view?id=" + item._id
      });
    },
    DotStyle(e) {
      this.dotStyle = e.detail.value;
    },
    // cardSwiper
    cardSwiper(e) {
      this.cardCur = e.detail.current;
    },
    // towerSwiper
    // 初始化towerSwiper
    TowerSwiper(name) {
      let list = this[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2));
        list[i].mLeft = i - parseInt(list.length / 2);
      }
      this.swiperList = list;
    },
    // towerSwiper触摸开始
    TowerStart(e) {
      this.towerStart = e.touches[0].pageX;
    },
    // towerSwiper计算方向
    TowerMove(e) {
      this.direction = e.touches[0].pageX - this.towerStart > 0 ? "right" : "left";
    },
    // towerSwiper计算滚动
    TowerEnd(e) {
      let direction = this.direction;
      let list = this.swiperList;
      if (direction == "right") {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < this.swiperList.length; i++) {
          this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft;
          this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex;
        }
        this.swiperList[list.length - 1].mLeft = mLeft;
        this.swiperList[list.length - 1].zIndex = zIndex;
      } else {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = this.swiperList.length - 1; i > 0; i--) {
          this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft;
          this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex;
        }
        this.swiperList[0].mLeft = mLeft;
        this.swiperList[0].zIndex = zIndex;
      }
      this.direction = "";
      this.swiperList = this.swiperList;
    }
  },
  onLoad: function() {
    this.TowerSwiper("swiperList");
  }
};
if (!Array) {
  const _component_cu_card = common_vendor.resolveComponent("cu-card");
  _component_cu_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.swiperList, (item, index, i0) => {
      return {
        a: "1f9db34c-0-" + i0,
        b: common_vendor.p({
          item
        }),
        c: common_vendor.o(($event) => $options.viewGroup(item), index),
        d: index,
        e: common_vendor.n($data.cardCur == index ? "cur" : "")
      };
    }),
    b: common_vendor.n(_ctx.dotStyle ? "square-dot" : "round-dot"),
    c: common_vendor.o((...args) => $options.cardSwiper && $options.cardSwiper(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
