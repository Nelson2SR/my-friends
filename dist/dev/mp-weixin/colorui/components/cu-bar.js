"use strict";
const common_vendor = require("../../common/vendor.js");
const cuDialog = () => "./cu-dialog.js";
const _sfc_main = {
  components: {
    cuDialog
  },
  data() {
    return {
      showModal: false,
      modalDetail: {},
      confirmAction: function() {
        common_vendor.index.redirectTo({
          url: "/pages/profile/profile"
        });
      }
    };
  },
  computed: common_vendor.mapState(["hasLogin"]),
  methods: {
    onCreateGroup() {
      console.log("HasLogin: %s", this.hasLogin);
      if (!this.hasLogin) {
        this.showModal = true;
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/group/group-create"
        });
      }
    },
    exploreGroup() {
      common_vendor.index.redirectTo({
        url: "/pages/tabBar/explore/explore"
      });
    },
    viewProfile() {
      common_vendor.index.redirectTo({
        url: "/pages/profile/profile"
      });
    },
    viewHome() {
      common_vendor.index.redirectTo({
        url: "/pages/tabBar/home/home"
      });
    },
    hideModal(e) {
      this.showModal = false;
    },
    doAction() {
      common_vendor.index.redirectTo({
        url: "/pages/profile/profile"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.viewHome && $options.viewHome(...args)),
    b: common_vendor.o((...args) => $options.exploreGroup && $options.exploreGroup(...args)),
    c: common_vendor.o((...args) => $options.onCreateGroup && $options.onCreateGroup(...args)),
    d: common_vendor.o((...args) => $options.viewProfile && $options.viewProfile(...args)),
    e: common_vendor.o((...args) => $options.doAction && $options.doAction(...args)),
    f: common_vendor.o((...args) => $options.hideModal && $options.hideModal(...args)),
    g: common_vendor.n($data.showModal ? "show" : "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
