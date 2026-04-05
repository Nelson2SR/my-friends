"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      createdAt: "",
      imgCol: "",
      comments: [],
      showComment: true,
      textareaValue: "",
      sendOnComment: true,
      commentId: "",
      postLikeCount: 0,
      hasLikePost: false
    };
  },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...common_vendor.mapState(["hasLogin", "userName", "avatarUrl", "gender", "openId"]),
    formatCreatedAt() {
      common_vendor.hooks.now();
      this.item.createdAt;
      this.createdAt = common_vendor.hooks(this.item.createdAt).calendar({
        sameDay: "[Today at] hh:mm",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        lastDay: "[Yesterday at] hh:mm",
        lastWeek: "[Last] dddd [at] hh:mm",
        sameElse: "DD/MM/YYYY [at] hh:mm"
      });
    },
    getImgCol() {
      if (this.item.imgUrls.length === 1) {
        this.imgCol = "col-1";
      } else if (this.item.imgUrls.length % 3 === 0) {
        this.imgCol = "col-3 grid-square";
      } else if (this.item.imgUrls.length % 2 === 0) {
        this.imgCol = "col-2 grid-square";
      } else {
        this.imgCol = "col-3 grid-square";
      }
    },
    getPostLikeCount() {
      this.postLikeCount = this.item.likeCount.length;
    }
  },
  mounted() {
    console.log("post component start to being mounted");
    self = this;
    common_vendor.er.callFunction({
      name: "comment-get-by-topic",
      data: {
        "topicId": this.item._id,
        "topicType": "post"
      }
    }).then((res) => {
      console.log("successfully retrieved comment on post %s: %s", self.item._id, JSON.stringify(res.result.data));
      this.comments = res.result.data;
    }).catch((err) => {
      console.error("Error occur while retrieving comment on post %s", self.item._id);
    });
  },
  methods: {
    likePost() {
      const data = {
        "topicId": this.item._id,
        "topicType": "post",
        "fromUserId": this.openId
      };
      console.log("start liking post %s", JSON.stringify(data));
      common_vendor.er.callFunction({
        name: "like-update-by-topic",
        data
      }).then((res) => {
        console.log("Successfully like post %s", JSON.stringify(res));
        this.postLikeCount = res.result.data.likeCount.length;
        this.hasLikePost = true;
      }).catch((err) => {
        console.error("Error occurs while liking post");
      });
    },
    likeComment() {
      common_vendor.er.callFunction({
        name: "like-update-by-topic",
        data: {
          "topicId": this.item._id,
          "topicType": "comment",
          "fromUserId": this.openId
        }
      }).then((res) => {
        console.log("Successfully like comment %s", JSON.stringify(res));
      }).catch((err) => {
        console.error("Error occurs while liking comment");
      });
    },
    viewComment() {
      this.showComment = true;
    },
    inputTextArea(e) {
      this.textareaValue = e.detail.value;
    },
    sendCommentOnPost() {
      if (this.textareaValue !== "") {
        if (!this.sendOnComment) {
          common_vendor.er.callFunction({
            name: "comment-create",
            data: {
              "topicId": this.item._id,
              "topicType": "post",
              "fromUser": {
                "userId": this.openId,
                "gender": this.gender,
                "avatarUrl": this.avatarUrl,
                "name": this.userName
              },
              "content": this.textareaValue,
              "likeCount": [],
              "status": "ACTIVE"
            }
          }).then((res) => {
            console.log("successfully created comment on post %s", JSON.stringify(res.result));
          });
        } else {
          common_vendor.er.callFunction({
            name: "comment-create",
            data: {
              "topicId": this.commentId,
              "topicType": "comment",
              "fromUser": {
                "userId": this.openId,
                "gender": this.gender,
                "avatarUrl": this.avatarUrl,
                "name": this.userName
              },
              "toUser": {
                "userId": this.openId,
                "gender": this.gender,
                "avatarUrl": this.avatarUrl,
                "name": this.userName
              },
              "content": this.textareaValue,
              "likeCount": [],
              "status": "ACTIVE"
            }
          }).then((res) => {
            console.log("successfully created comment on post %s", JSON.stringify(res.result));
          });
        }
      }
    },
    sendCommentOnComment(e) {
      console.log("comment's id: %s", JSON.stringify(e.target.id));
      this.sendOnComment = true;
      this.commentId = e.target.id;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: `url(${$props.item.owner.avatarUrl})`,
    b: common_vendor.t($props.item.owner.name),
    c: common_vendor.t($data.createdAt),
    d: common_vendor.t($props.item.content),
    e: common_vendor.f($props.item.imgUrls, (img, k0, i0) => {
      return {
        a: img
      };
    }),
    f: common_vendor.n($data.imgCol),
    g: common_vendor.n($data.hasLikePost ? "text-red" : ""),
    h: common_vendor.t($data.postLikeCount),
    i: common_vendor.t($data.comments.length),
    j: common_vendor.o((...args) => $options.likePost && $options.likePost(...args)),
    k: common_vendor.o((...args) => $options.viewComment && $options.viewComment(...args)),
    l: $data.showComment
  }, $data.showComment ? {
    m: common_vendor.f($data.comments, (comment, index, i0) => {
      return common_vendor.e({
        a: `url(${comment.fromUser.avatarUrl})`,
        b: common_vendor.t(comment.fromUser.name),
        c: common_vendor.t(comment.content),
        d: comment.replies.length > 0
      }, comment.replies.length > 0 ? {
        e: common_vendor.f(comment.replies, (reply, index2, i1) => {
          return {
            a: common_vendor.t(reply.fromUser.name),
            b: common_vendor.t(reply.toUser.name),
            c: common_vendor.t(reply.content),
            d: index2
          };
        })
      } : {}, {
        f: common_vendor.t(comment.createdAt),
        g: common_vendor.o((...args) => $options.likeComment && $options.likeComment(...args), index),
        h: common_vendor.o((...args) => $options.sendCommentOnComment && $options.sendCommentOnComment(...args), index),
        i: comment._id,
        j: index
      });
    })
  } : {}, {
    n: common_vendor.o((...args) => $options.inputTextArea && $options.inputTextArea(...args)),
    o: common_vendor.o((...args) => $options.sendCommentOnPost && $options.sendCommentOnPost(...args)),
    p: common_vendor.n(_ctx.isCard ? "no-card" : "")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
