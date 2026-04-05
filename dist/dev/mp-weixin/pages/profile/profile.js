"use strict";
const common_vendor = require("../../common/vendor.js");
const cuSwiper = () => "../../colorui/components/cu-swiper.js";
const _sfc_main = {
  data() {
    return {
      avatar: [
        "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
      ],
      provider: "",
      myGroups: [],
      myOtherGroups: []
    };
  },
  components: {
    cuSwiper
  },
  computed: common_vendor.mapState(["forcedLogin", "hasLogin", "userName", "avatarUrl", "gender", "openId"]),
  methods: {
    ...common_vendor.mapActions(["login"]),
    login_weixin() {
      console.log("login as wechat");
      let self = this;
      common_vendor.wx$1.login({
        success(res) {
          console.log("login response: %s", JSON.stringify(res));
          if (res.code) {
            common_vendor.er.callFunction({
              name: "oauth-login",
              data: {
                code: res.code,
                appId: "wx95bd5dc2182e3ad4",
                appSecret: "f51b12f21d601c68fb1fbc3bb1aea1ac"
              }
            }).then((res2) => {
              console.log("OAuth Response: %s", JSON.stringify(res2));
              const openId = res2.result.openId;
              common_vendor.index.setStorage({
                "sessionId": res2.result.sessionId,
                "openId": openId
              });
              self.getUser(openId);
              common_vendor.index.getUserInfo({
                provider: "weixin",
                success(infoRes) {
                  console.log("User Info: %s", JSON.stringify(infoRes));
                  infoRes.userInfo.openId = openId;
                  self.toMain(infoRes.userInfo);
                },
                fail() {
                  common_vendor.index.showToast({
                    icon: "none",
                    position: "bottom",
                    title: "登陆失败"
                  });
                }
              });
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    },
    toMain(userInfo) {
      this.login(userInfo);
      if (this.forcedLogin) {
        common_vendor.index.reLaunch({
          url: "/pages/tabBar/home/home"
        });
      } else {
        common_vendor.index.redirectTo({
          url: "/pages/profile/profile"
        });
      }
    },
    getUser(openId) {
      let self = this;
      console.log("Check if user registered with openId %s", openId);
      common_vendor.er.callFunction({
        name: "user-get-by-openId",
        data: {
          openId
        }
      }).then((res) => {
        console.log("get user successfully: %s", JSON.stringify(res));
        if (res.result.data.length === 0) {
          console.log("User not found");
          const user = self.createUser(openId);
          return user;
        } else {
          console.log("User is retrieved: %s", JSON.stringify(res.result.data[0]));
          return res.result.data[0];
        }
      });
    },
    createUser(openId) {
      let user = {};
      user.name = this.userName;
      user.provider = this.provider;
      user.gender = this.gender;
      user.open_id = openId;
      common_vendor.er.callFunction({
        name: "user-create",
        data: user
      }).then((res) => {
        console.log("create user successully: %s", JSON.stringify(res));
        return res.result.id;
      });
    }
  },
  onLoad() {
    console.log("Page onLoad" + this.openId);
    if (this.openId !== "") {
      common_vendor.er.callFunction({
        name: "group-get-by-openId",
        data: {
          openId: this.openId
        }
      }).then((res) => {
        console.log("My Groups: %s", JSON.stringify(res));
        this.myGroups = res.result.data;
      });
      common_vendor.er.callFunction({
        name: "group-get-by-member-openId",
        data: {
          openId: this.openId
        }
      }).then((res) => {
        console.log("My Other Groups: %s", JSON.stringify(res));
        this.myOtherGroups = res.result.data;
      }).catch((err) => {
        console.error("Error retriving my other group: %s", JSON.stringify(err));
      });
    }
  }
};
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  const _component_cu_custom = common_vendor.resolveComponent("cu-custom");
  const _component_cu_swiper = common_vendor.resolveComponent("cu-swiper");
  const _component_cu_bar = common_vendor.resolveComponent("cu-bar");
  (_component_template + _component_cu_custom + _component_cu_swiper + _component_cu_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      bgColor: "bg-white",
      isBack: false
    }),
    b: _ctx.hasLogin
  }, _ctx.hasLogin ? {
    c: common_vendor.n(_ctx.gender % 2 == 0 ? "cuIcon-female bg-pink" : "cuIcon-male bg-blue"),
    d: "url(" + _ctx.avatarUrl + ")",
    e: common_vendor.t(_ctx.userName),
    f: _ctx.userName
  } : {
    g: common_vendor.f($data.avatar, (item, index, i0) => {
      return {
        a: common_vendor.n(index % 2 == 0 ? "cuIcon-female bg-pink" : "cuIcon-male bg-blue"),
        b: index,
        c: common_vendor.s({
          backgroundImage: "url(" + $data.avatar[index] + ")"
        })
      };
    }),
    h: common_vendor.o((...args) => $options.login_weixin && $options.login_weixin(...args))
  }, {
    i: common_vendor.o((...args) => _ctx.createInterest && _ctx.createInterest(...args)),
    j: $data.myGroups.length > 0
  }, $data.myGroups.length > 0 ? {
    k: common_vendor.p({
      swiperList: $data.myGroups
    })
  } : {}, {
    l: $data.myOtherGroups.length > 0
  }, $data.myOtherGroups.length > 0 ? {
    m: common_vendor.p({
      swiperList: $data.myOtherGroups
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
