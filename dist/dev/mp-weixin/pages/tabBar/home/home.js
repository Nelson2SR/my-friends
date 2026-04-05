"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_index = require("../../../store/index.js");
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  const _component_cu_custom = common_vendor.resolveComponent("cu-custom");
  const _component_cu_card = common_vendor.resolveComponent("cu-card");
  const _component_cu_bar = common_vendor.resolveComponent("cu-bar");
  (_component_template + _component_cu_custom + _component_cu_card + _component_cu_bar)();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const appStore = store_index.useAppStore();
    common_vendor.computed(() => appStore.forcedLogin);
    common_vendor.computed(() => appStore.hasLogin);
    common_vendor.computed(() => appStore.userName);
    common_vendor.computed(() => appStore.avatarUrl);
    common_vendor.computed(() => appStore.gender);
    const openId = common_vendor.computed(() => appStore.openId);
    const { proxy } = common_vendor.getCurrentInstance();
    const CustomBar = proxy.CustomBar || 50;
    const popularGroups = common_vendor.ref([]);
    common_vendor.ref([]);
    common_vendor.ref([]);
    const nearbyGroups = common_vendor.ref([]);
    common_vendor.ref(true);
    common_vendor.ref(true);
    common_vendor.ref(2e3);
    common_vendor.ref(500);
    common_vendor.ref([
      {
        value: "button",
        text: "按钮",
        checked: true
      },
      {
        value: "text",
        text: "文字"
      }
    ]);
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref("#007aff");
    common_vendor.ref("button");
    const searchIcon = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search",
        animationType: "pop-in",
        animationDuration: 200
      });
    };
    const getNearbyGroups = () => {
      return new Promise((resolve, reject) => {
        common_vendor.er.callFunction({
          name: "group-get-by-distance",
          data: {
            "longitude": 113,
            "latitude": 23,
            "radius": "100",
            "units": "km",
            "number": 100
          }
        }).then((res) => {
          console.log("My nearby Groups: %s", JSON.stringify(res));
          resolve(res.result.data);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      });
    };
    const getPopularGroups = () => {
      return new Promise((resolve, reject) => {
        common_vendor.er.callFunction({
          name: "groups-get-by-score",
          data: {
            maxNum: 20,
            minNum: 0
          }
        }).then((res) => {
          console.log("My Groups: %s", JSON.stringify(res));
          resolve(res.result.data);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      });
    };
    common_vendor.onLoad(() => {
      console.log("Page onLoad " + openId.value);
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let popularPromise = getPopularGroups().catch((e) => e);
      let nearbyPromise = getNearbyGroups().catch((e) => e);
      Promise.all([nearbyPromise, popularPromise]).then((value) => {
        common_vendor.index.hideLoading();
        console.log("Group data: %s", JSON.stringify(value));
        nearbyGroups.value = value[0];
        popularGroups.value = value[1];
      }).catch((err) => {
        common_vendor.index.hideLoading();
        console.log(err);
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          bgColor: "bg-white",
          isBack: false
        }),
        b: common_vendor.o(searchIcon),
        c: common_vendor.s({
          top: common_vendor.unref(CustomBar) + "px"
        }),
        d: common_vendor.f(popularGroups.value, (group, key, i0) => {
          return {
            a: "1843c763-1-" + i0,
            b: common_vendor.p({
              item: group
            }),
            c: key
          };
        }),
        e: nearbyGroups.value.length > 0
      }, nearbyGroups.value.length > 0 ? {
        f: common_vendor.f(nearbyGroups.value, (group, key, i0) => {
          return {
            a: "1843c763-2-" + i0,
            b: common_vendor.p({
              item: group
            }),
            c: key
          };
        })
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
