"use strict";
const common_vendor = require("../../common/vendor.js");
const cuUploadFile = () => "../../colorui/components/cu-upload-file.js";
const _sfc_main = {
  data() {
    return {
      textareaValue: "",
      groupId: "",
      groupName: "",
      imgList: []
    };
  },
  components: {
    cuUploadFile
  },
  computed: common_vendor.mapState(["hasLogin", "userName", "avatarUrl", "gender", "openId"]),
  methods: {
    inputTextArea(e) {
      this.textareaValue = e.detail.value;
      console.log("Entered Text: %s", this.textareaValue);
    },
    uploadImgAndCreatePost(e) {
      console.log("Start creating post for group %s", this.groupName);
      let imgUrls = [];
      const data = {
        owner: {
          name: this.userName,
          openId: this.openId,
          gender: this.gender,
          avatarUrl: this.avatarUrl
        },
        groupId: this.groupId,
        content: this.textareaValue,
        imgUrls,
        likeCount: []
      };
      console.log("Post data: %s", JSON.stringify(data));
      let successUploadCount = 0;
      const totalCount = this.imgList.length;
      if (this.imgList.length === 0) {
        this.createPost(data);
      } else {
        const self = this;
        this.imgList.forEach((img) => {
          common_vendor.er.uploadFile({
            cloudPath: "/postPic/" + Date.now() + ".png",
            filePath: img,
            onUploadProgress: function(progressEvent) {
              Math.round(
                progressEvent.loaded * 100 / progressEvent.total
              );
            },
            success(res) {
              console.log("successfully upload img " + res.fileID);
              imgUrls.push(res.fileID);
              successUploadCount += 1;
              if (successUploadCount === totalCount) {
                self.createPost(data);
              }
            },
            fail(err) {
              console.error(err);
            },
            complete() {
              console.log("completed");
            }
          });
        });
      }
    },
    createPost(data) {
      console.log("Start to create post: %s", JSON.stringify(data));
      common_vendor.er.callFunction({
        name: "post-create",
        data
      }).then((res) => {
        console.log("Successfully create post: %s", JSON.stringify(res));
        common_vendor.index.navigateBack({
          delta: 1,
          animationType: "pop-out",
          animationDuration: 200
        });
      }).catch((err) => {
        console.error("Error occur while creating post: %s", JSON.stringify(err));
        common_vendor.index.showToast({
          title: "创建错误",
          icon: "none"
        });
      });
    },
    addImage(e) {
      console.log("Add image: %s", e);
      this.imgList = e;
    }
  },
  onLoad(options) {
    console.log("Options: %s", JSON.stringify(options));
    this.groupId = options.groupId, this.groupName = options.groupName;
  }
};
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  const _component_cu_custom = common_vendor.resolveComponent("cu-custom");
  const _component_cu_upload_file = common_vendor.resolveComponent("cu-upload-file");
  (_component_template + _component_cu_custom + _component_cu_upload_file)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      bgColor: "bg-white",
      isBack: true
    }),
    b: _ctx.hasLogin
  }, _ctx.hasLogin ? {
    c: common_vendor.n(_ctx.gender % 2 == 0 ? "cuIcon-female bg-pink" : "cuIcon-male bg-blue"),
    d: "url(" + _ctx.avatarUrl + ")",
    e: common_vendor.t(_ctx.userName),
    f: _ctx.userName
  } : {}, {
    g: common_vendor.o($options.addImage),
    h: _ctx.modalName != null,
    i: common_vendor.o((...args) => $options.inputTextArea && $options.inputTextArea(...args)),
    j: common_vendor.o((...args) => $options.uploadImgAndCreatePost && $options.uploadImgAndCreatePost(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
