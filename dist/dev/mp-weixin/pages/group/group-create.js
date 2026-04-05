"use strict";
const common_vendor = require("../../common/vendor.js");
var graceChecker = require("../../common/graceChecker.js");
var tempFilePaths;
const cuUploadFile = () => "../../colorui/components/cu-upload-file.js";
const _sfc_main = {
  components: {
    cuUploadFile
  },
  props: {
    showForm: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      "pickPic": "选择照片",
      "groupPicText": "群封面",
      "qrCodeText": "QR Code",
      "groupPicType": "groupPic",
      "qrCodeType": "qrCodePic",
      imgList: [],
      qrCodeList: [],
      region: ["广东省", "广州市", "海珠区"],
      joinMethod: "",
      visibility: "",
      description: "",
      showDialog: false,
      groupTopicsMap: {},
      multiArray: [],
      multiIndex: [0, 0],
      hasLocation: false,
      location: {},
      covers: [],
      cover: {}
    };
  },
  computed: common_vendor.mapState(["openId", "gender", "avatarUrl"]),
  onLoad: function(options) {
    console.log("landed on create-group page");
    console.log("OpenId: %s", this.openId);
    common_vendor.er.callFunction({
      name: "grouptopic-get",
      data: {}
    }).then((res) => {
      console.log("Successfully retrieved group topics: %s", JSON.stringify(res));
      const groupTopicsData = res.result.data;
      const groupTopicsMap = {};
      const groupTopicNames = [];
      groupTopicsData.forEach((groupTopic) => {
        groupTopicNames.push(groupTopic.name);
        const groupTypeNames = [];
        groupTopic.groupTypes.forEach((groupType) => {
          groupTypeNames.push(groupType.name);
        });
        groupTopicsMap[groupTopic.name] = groupTypeNames;
      });
      console.log("groupTopics name map: %s", JSON.stringify(groupTopicsMap));
      this.groupTopicsMap = groupTopicsMap;
      this.multiArray.push(groupTopicNames);
      this.multiArray.push(groupTopicsMap[groupTopicNames[0]]);
    }).catch((err) => {
      console.log("Error occurs while retrieving group topics: %s", JSON.stringify(err));
    });
  },
  methods: {
    createGroup: async function(e) {
      const rule = [
        {
          name: "name",
          checkType: "string",
          checkRule: "1,10",
          errorMsg: "姓名应为1-10个字符"
        },
        {
          name: "description",
          checkType: "string",
          checkRule: "1,50",
          errorMsg: "请控制为1-50个字符"
        }
      ];
      const formData = e.detail.value;
      console.log("form data:" + JSON.stringify(formData));
      const checkRes = graceChecker.check(formData, rule);
      if (checkRes && this.visibility !== void 0 && this.joinMethod !== void 0) {
        common_vendor.index.showToast({
          title: "验证通过!",
          icon: "none"
        });
        this.showForm = false;
        this.showLoading = true;
        let data = e.detail.value;
        data.createdAt = /* @__PURE__ */ new Date();
        data.createdBy = 1;
        data.visibility = this.visibility;
        data.joinMethod = this.joinMethod;
        data.type = {
          name: this.multiArray[1][this.multiIndex[1]],
          groupTopic: this.multiArray[0][this.multiIndex[1]]
        };
        if (this.location.length != 0) {
          data.location = {
            "longitude": this.location.longitude,
            "latitude": this.location.latitude,
            "name": this.location.name,
            "address": this.address
          };
        }
        data.read = 0;
        data.vote = 0;
        data.comment = 0;
        const owner = {
          openId: this.openId,
          gender: this.gender,
          avatarUrl: this.avatarUrl
        };
        data.owner = owner;
        data.members = [owner];
        data.admins = [owner];
        console.log("create group for data: " + JSON.stringify(data));
        let imgUploadResult = await common_vendor.er.uploadFile({
          filePath: this.imgList[0],
          cloudPath: "/groupPic/" + Date.now() + ".png",
          onUploadProgress: function(progressEvent) {
            Math.round(
              progressEvent.loaded * 100 / progressEvent.total
            );
          }
        });
        let qrCodeUploadResult = await common_vendor.er.uploadFile({
          filePath: this.qrCodeList[0],
          cloudPath: "/groupPic/" + Date.now() + ".png",
          onUploadProgress: function(progressEvent) {
            Math.round(
              progressEvent.loaded * 100 / progressEvent.total
            );
          }
        });
        data.imgUrl = imgUploadResult.fileID;
        data.qrCodeUrl = qrCodeUploadResult.fileID;
        common_vendor.er.callFunction({
          name: "group-create",
          data
        }).then((res) => {
          console.log("success with" + JSON.stringify(res));
          common_vendor.index.redirectTo({
            url: "group-view?id=" + res.result.id
          });
        });
      } else {
        common_vendor.index.showToast({
          title: graceChecker.error,
          icon: "none"
        });
      }
    },
    upload: function() {
      common_vendor.index.chooseImage({
        count: 1,
        // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        // sourceType: ['album'], //从相册选择
        success: function(res) {
          tempFilePaths = res.tempFilePaths;
          console.log("Have chose image in path:" + tempFilePaths);
        }
      });
    },
    // uploadFile (filePath, cloudPath) {
    // 		return await uniCloud.uploadFile({
    // 				filePath: filePath,
    // 				cloudPath: cloudPath,
    // 				onUploadProgress: function(progressEvent) {
    // 					// console.log(progressEvent);
    // 					var percentCompleted = Math.round(
    // 						(progressEvent.loaded * 100) / progressEvent.total
    // 					);
    // 				}
    // 			});
    // 		}
    // },
    clickVisibilityCard(e) {
      visibility = e;
      common_vendor.index.showToast({
        title: "点击卡片",
        icon: "none"
      });
    },
    clickJoinCard(e) {
      joinMethod = e;
      common_vendor.index.showToast({
        title: "点击卡片",
        icon: "none"
      });
    },
    addImage(e) {
      console.log("Add image: %s", e);
      this.imgList = e;
    },
    addQRCode(e) {
      console.log("Add QR Code: %s", e);
      this.qrCodeList = e;
    },
    RegionChange(e) {
      this.region = e.detail.value;
    },
    onVisibilityChange(e) {
      this.visibility = e.detail.value;
    },
    onJoinMethodChange(e) {
      this.joinMethod = e.detail.value;
    },
    onDescriptionInput(e) {
      this.description = e.detail.value;
    },
    MultiChange(e) {
      this.multiIndex = e.detail.value;
    },
    MultiColumnChange(e) {
      let data = {
        multiArray: this.multiArray,
        multiIndex: this.multiIndex
      };
      console.log("current picker data: %s - %s", JSON.stringify(data), JSON.stringify(e));
      data.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          let groupTopicName = this.multiArray[0][e.detail.value];
          let groupTypes = this.groupTopicsMap[groupTopicName];
          data.multiArray.pop();
          data.multiArray.push(groupTypes);
          data.multiIndex[1] = 0;
          break;
      }
      this.multiArray = data.multiArray;
      this.multiIndex = data.multiIndex;
    },
    chooseLocation() {
      console.log("start to choose location");
      let self = this;
      common_vendor.index.chooseLocation({
        success: (res) => {
          console.log("location response: %s", JSON.stringify(res));
          self.hasLocation = true, self.location["longitude"] = res.longitude, self.location["latitude"] = res.latitude, self.location["name"] = res.name, self.location["address"] = res.address, self.cover["longitude"] = res.longitude, self.cover["latitude"] = res.latitude, self.cover["iconPath"] = "../../static/location.png";
          self.covers.push(self.cover);
        },
        fail: (err) => {
          console.log("error: %s", JSON.stringify(err));
          common_vendor.index.authorize({
            scope: "scope.userLocation",
            success() {
              common_vendor.index.getLocation({
                type: "wgs84",
                success: function(res) {
                  console.log("location response: %s", JSON.stringify(res));
                  console.log("当前位置的经度：" + res.longitude);
                  console.log("当前位置的纬度：" + res.latitude);
                }
              });
            }
          });
        }
      });
      console.log("the location: %s", JSON.stringify(this.location));
    }
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
    b: _ctx.modalName != null,
    c: common_vendor.o((...args) => $options.onDescriptionInput && $options.onDescriptionInput(...args)),
    d: $data.hasLocation
  }, $data.hasLocation ? {
    e: $data.location.latitude,
    f: $data.location.longitude,
    g: $data.covers
  } : {
    h: common_vendor.o((...args) => $options.chooseLocation && $options.chooseLocation(...args))
  }, {
    i: common_vendor.t($data.multiArray[0][$data.multiIndex[0]]),
    j: common_vendor.t($data.multiArray[1][$data.multiIndex[1]]),
    k: common_vendor.o((...args) => $options.MultiChange && $options.MultiChange(...args)),
    l: common_vendor.o((...args) => $options.MultiColumnChange && $options.MultiColumnChange(...args)),
    m: $data.multiIndex,
    n: $data.multiArray,
    o: common_vendor.o($options.addImage),
    p: common_vendor.p({
      text: $data.groupPicText,
      type: $data.groupPicType
    }),
    q: common_vendor.o($options.addQRCode),
    r: common_vendor.p({
      text: $data.qrCodeText,
      type: $data.qrCodeType
    }),
    s: common_vendor.n($data.visibility == "public" ? "checked" : ""),
    t: $data.visibility == "public" ? true : false,
    v: common_vendor.n($data.visibility == "closed" ? "checked" : ""),
    w: $data.visibility == "closed" ? true : false,
    x: common_vendor.n($data.visibility == "hidden" ? "checked" : ""),
    y: $data.visibility == "hidden" ? true : false,
    z: common_vendor.o((...args) => $options.onVisibilityChange && $options.onVisibilityChange(...args)),
    A: common_vendor.n($data.joinMethod == "freeJoin" ? "checked" : ""),
    B: $data.joinMethod == "freeJoin" ? true : false,
    C: common_vendor.n($data.joinMethod == "requireApproval" ? "checked" : ""),
    D: $data.joinMethod == "requireApproval" ? true : false,
    E: common_vendor.o((...args) => $options.onJoinMethodChange && $options.onJoinMethodChange(...args)),
    F: common_vendor.o((...args) => $options.createGroup && $options.createGroup(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
