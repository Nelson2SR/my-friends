"use strict";
const common_vendor = require("../../common/vendor.js");
const cuPost = () => "../../colorui/components/cu-post.js";
const _sfc_main = {
  components: {
    cuPost
  },
  data() {
    return {
      groupId: "",
      avatar: [],
      posts: [],
      item: {},
      TabCur: 0,
      scrollLeft: 0,
      menuBorder: false,
      menuArrow: false,
      menuCard: false,
      isMember: false,
      covers: []
    };
  },
  computed: common_vendor.mapState(["openId", "gender", "avatarUrl"]),
  onLoad: function(options) {
    console.log("Page loaded");
    common_vendor.index.showLoading({
      title: "加载中..."
    });
    self = this;
    console.log(options.id);
    console.log("OpenId : %s", self.openId);
    this.groupId = options.id;
    common_vendor.er.callFunction({
      name: "group-get-by-docId",
      data: {
        id: options.id,
        userId: self.openId
      }
    }).then((res) => {
      common_vendor.index.hideLoading();
      console.log("group detail: %s", JSON.stringify(res));
      self.item = res.result.data;
      console.log("result: %s", JSON.stringify(self.item));
      if (self.item.location != null) {
        self.getCovers(self.item.location);
      }
      self.item.members.forEach((member) => {
        self.avatar.push(member.avatarUrl);
        console.log("member openId: %s, this user openId: %s", member.openId, self.openId);
        if (member.openId === self.openId) {
          self.isMember = true;
        }
      });
    }).catch((err) => {
      common_vendor.index.hideLoading();
      console.error("Error occur while retriving group detail. %s", err);
    });
    if (this.isMember) {
      common_vendor.er.callFunction({
        name: "post-get-by-groupId",
        data: {
          groupId: options.id
        }
      }).then((res) => {
        console.log("posts detail: %s", JSON.stringify(res));
        this.posts = res.result.data;
      }).catch((err) => {
        console.error("Error retrieving posts");
      });
    }
  },
  onReady() {
    console.log("Page Ready");
  },
  onShow() {
    console.log("Page shown");
    common_vendor.er.callFunction({
      name: "post-get-by-groupId",
      data: {
        groupId: this.groupId
      }
    }).then((res) => {
      console.log("posts detail: %s", JSON.stringify(res));
      this.posts = res.result.data;
    }).catch((err) => {
      console.error("Error retrieving posts");
    });
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res);
    }
    return {
      title: this.item.name,
      path: "/pages/group/group-view?id=" + this.item._id,
      imageUrl: this.item.imgId,
      // desc: this.item.description,
      success: function() {
        console.log("share success");
      },
      fail: function() {
        console.log("share fail");
      },
      complete: function() {
        console.log("share complete");
      }
    };
  },
  methods: {
    inviteFriend(e) {
      console.log("start to invite friends to %s", e._id);
    },
    joinGroup(e) {
      console.log("start to join group %s", e._id);
      const currentMembers = this.item.members;
      const newMember = {
        "openId": this.openId,
        "gender": this.gender,
        "avatarUrl": this.avatarUrl
      };
      currentMembers.push(newMember);
      this.item.members = currentMembers;
      common_vendor.er.callFunction({
        name: "group-update",
        data: {
          "group": this.item
        }
      }).then((res) => {
        console.log("group detail: %s" + JSON.stringify(res));
      });
    },
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
    },
    writePost(e) {
      console.log("Navigate to write post");
      common_vendor.index.navigateTo({
        url: "/pages/post/post-create?groupId=" + this.item._id + "&groupName=" + this.item.name,
        animationType: "pop-in",
        animationDuration: 200
      });
    },
    getCovers(location) {
      const cover = {
        "longitude": location.longitude,
        "latitude": location.latitude,
        "iconPath": "../../static/location.png"
      };
      this.covers.push(cover);
    },
    updateViewGroup() {
    }
  }
};
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  const _component_cu_custom = common_vendor.resolveComponent("cu-custom");
  const _component_cu_post = common_vendor.resolveComponent("cu-post");
  (_component_template + _component_cu_custom + _component_cu_post)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      bgColor: "bg-gradual-pink",
      bgImage: $data.item.imgUrl,
      isBack: true
    }),
    b: common_vendor.t($data.item.name),
    c: common_vendor.t($data.item.visibility),
    d: common_vendor.t($data.item.members.length),
    e: common_vendor.f($data.avatar, (i, index, i0) => {
      return {
        a: index,
        b: common_vendor.s({
          backgroundImage: "url(" + $data.avatar[index] + ")"
        })
      };
    }),
    f: $data.isMember
  }, $data.isMember ? {
    g: common_vendor.o(($event) => $options.inviteFriend($data.item))
  } : {
    h: common_vendor.o(($event) => $options.joinGroup($data.item))
  }, {
    i: $data.isMember
  }, $data.isMember ? {
    j: $data.item.qrCodeUrl
  } : {}, {
    k: common_vendor.t($data.item.description),
    l: $data.item.place != null
  }, $data.item.place != null ? {
    m: $data.item.place.latitude,
    n: $data.item.place.longitude,
    o: $data.covers
  } : {}, {
    p: $data.isMember
  }, $data.isMember ? {
    q: `url(${_ctx.avatarUrl})`,
    r: common_vendor.o((...args) => $options.writePost && $options.writePost(...args))
  } : {}, {
    s: $data.isMember & $data.posts.length > 0
  }, $data.isMember & $data.posts.length > 0 ? {
    t: common_vendor.f($data.posts, (post, k0, i0) => {
      return {
        a: "4d37a7b0-1-" + i0,
        b: common_vendor.p({
          item: post
        })
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
