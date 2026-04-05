"use strict";
const common_vendor = require("../common/vendor.js");
const useAppStore = common_vendor.defineStore("app", {
  state: () => ({
    forcedLogin: false,
    hasLogin: false,
    userName: "",
    avatarUrl: "",
    token: "",
    gender: 0,
    openId: ""
  }),
  actions: {
    login(provider) {
      console.log("provider: %s", JSON.stringify(provider));
      this.userName = provider.nickName || "新用户";
      this.hasLogin = true;
      this.avatarUrl = provider.avatarUrl;
      this.token = provider.token;
      this.gender = provider.gender;
      this.openId = provider.openId;
    },
    logout() {
      this.userName = "";
      this.hasLogin = false;
      this.token = "";
      this.avatarUrl = "";
      this.gender = 0;
      this.openId = "";
    }
  }
});
exports.useAppStore = useAppStore;
