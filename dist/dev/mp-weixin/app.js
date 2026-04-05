"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_share = require("./common/share.js");
if (!Math) {
  "./pages/tabBar/home/home.js";
  "./pages/tabBar/explore/explore.js";
  "./pages/tabBar/notification/notification.js";
  "./pages/tabBar/messages/messages.js";
  "./pages/index/index.js";
  "./pages/group/group-create.js";
  "./pages/group/group-view.js";
  "./test/uploadFile/uploadFile.js";
  "./pages/profile/profile.js";
  "./pages/post/post-create.js";
  "./pages/groupTopic/groupTopic-view.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const cuCustom = () => "./colorui/components/cu-custom.js";
const cuBar = () => "./colorui/components/cu-bar.js";
const cuCard = () => "./colorui/components/cu-card.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  app.mixin(common_share.share);
  app.component("cu-custom", cuCustom);
  app.component("cu-bar", cuBar);
  app.component("cu-card", cuCard);
  try {
    const e = common_vendor.index.getSystemInfoSync();
    app.config.globalProperties.StatusBar = e.statusBarHeight;
    const custom = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    app.config.globalProperties.Custom = custom;
    app.config.globalProperties.CustomBar = custom.bottom + custom.top - e.statusBarHeight + 50;
  } catch (e) {
    console.error("System info sync failed", e);
  }
  return {
    app,
    pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
