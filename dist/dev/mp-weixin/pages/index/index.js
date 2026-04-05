"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const add = () => {
      common_vendor.index.showLoading({ title: "处理中..." });
      common_vendor.er.callFunction({
        name: "add",
        data: { name: "DCloud", subType: "uniCloud", createTime: Date.now() }
      }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: `成功添加一条数据，文档id为：${res.result.id}`, showCancel: false });
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: `添加数据失败，错误信息为：${err.message}`, showCancel: false });
      });
    };
    const remove = () => {
      common_vendor.index.showLoading({ title: "处理中..." });
      common_vendor.er.callFunction({ name: "remove" }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: res.result.msg, showCancel: false });
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: `删除失败，错误信息为：${err.message}`, showCancel: false });
      });
    };
    const update = () => {
      common_vendor.index.showLoading({ title: "处理中..." });
      common_vendor.er.callFunction({
        name: "update",
        data: { name: "DCloud", subType: "html 5+", createTime: Date.now() }
      }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: res.result.msg, showCancel: false });
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: `更新操作执行失败，错误信息为：${err.message}`, showCancel: false });
      });
    };
    const get = () => {
      common_vendor.index.showLoading({ title: "处理中..." });
      common_vendor.er.callFunction({ name: "get" }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: `查询成功，获取数据列表为：${JSON.stringify(res.result.data)}`, showCancel: false });
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: `查询失败，错误信息为：${err.message}`, showCancel: false });
      });
    };
    const useCommon = () => {
      common_vendor.er.callFunction({ name: "useCommon" }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: "云函数useCommon返回结果：" + JSON.stringify(res.result), showCancel: false });
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: `云函数useCommon执行失败，错误信息为：${err.message}`, showCancel: false });
      });
    };
    const upload = () => {
      new Promise((resolve, reject) => {
        common_vendor.index.chooseImage({
          chooseImage: 1,
          success: (res) => {
            const path = res.tempFilePaths[0];
            let ext;
            ext = res.tempFilePaths[0].split(".").pop();
            resolve({ filePath: path, cloudPath: Date.now() + "." + ext });
          },
          fail: () => reject(new Error("Fail_Cancel"))
        });
      }).then((options) => {
        common_vendor.index.showLoading({ title: "文件上传中..." });
        return common_vendor.er.uploadFile({ ...options, onUploadProgress(e) {
          console.log(e);
        } });
      }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({ content: "图片上传成功，fileId为：" + res.fileID, showCancel: false });
      }).catch((err) => {
        common_vendor.index.hideLoading();
        if (err.message !== "Fail_Cancel") {
          common_vendor.index.showModal({ content: `图片上传失败，错误信息为：${err.message}`, showCancel: false });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(add),
        b: common_vendor.o(remove),
        c: common_vendor.o(update),
        d: common_vendor.o(get),
        e: common_vendor.o(useCommon),
        f: common_vendor.o(upload)
      };
    };
  }
};
wx.createPage(_sfc_main);
