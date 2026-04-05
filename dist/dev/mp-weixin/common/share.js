"use strict";
const share = {
  onShareAppMessage(res) {
    return {
      title: "MY同伴",
      path: "/pages/tabBar/home/home"
    };
  },
  onShareTimeline(res) {
    return {
      title: "MY同伴",
      path: "/pages/tabBar/home/home"
    };
  }
};
exports.share = share;
