(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"3bbe":function(n,e,o){"use strict";var t,c=function(){var n=this,e=n.$createElement;n._self._c},a=[];o.d(e,"b",(function(){return c})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return t}))},"4d1d":function(n,e,o){"use strict";o.r(e);var t=o("d6b2"),c=o.n(t);for(var a in t)"default"!==a&&function(n){o.d(e,n,(function(){return t[n]}))}(a);e["default"]=c.a},"4d9b":function(n,e,o){"use strict";o.r(e);var t=o("3bbe"),c=o("4d1d");for(var a in c)"default"!==a&&function(n){o.d(e,n,(function(){return c[n]}))}(a);o("8b94");var i,l=o("f0c5"),r=Object(l["a"])(c["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],i);e["default"]=r.exports},8792:function(n,e,o){},"8b94":function(n,e,o){"use strict";var t=o("8792"),c=o.n(t);c.a},d6b2:function(n,e,o){"use strict";(function(n,o){function t(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.push.apply(o,t)}return o}function c(n){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?t(Object(o),!0).forEach((function(e){a(n,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(o,e))}))}return n}function a(n,e,o){return e in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{}},methods:{add:function(){n.showLoading({title:"处理中..."}),o.callFunction({name:"add",data:{name:"DCloud",subType:"uniCloud",createTime:Date.now()}}).then((function(e){n.hideLoading(),n.showModal({content:"成功添加一条数据，文档id为：".concat(e.result.id),showCancel:!1}),console.log(e)})).catch((function(e){n.hideLoading(),n.showModal({content:"添加数据失败，错误信息为：".concat(e.message),showCancel:!1}),console.error(e)}))},remove:function(){n.showLoading({title:"处理中..."}),o.callFunction({name:"remove"}).then((function(e){n.hideLoading(),n.showModal({content:e.result.msg,showCancel:!1}),console.log(e)})).catch((function(e){n.hideLoading(),n.showModal({content:"删除失败，错误信息为：".concat(e.message),showCancel:!1}),console.error(e)}))},update:function(){n.showLoading({title:"处理中..."}),o.callFunction({name:"update",data:{name:"DCloud",subType:"html 5+",createTime:Date.now()}}).then((function(e){n.hideLoading(),n.showModal({content:e.result.msg,showCancel:!1}),console.log(e)})).catch((function(e){n.hideLoading(),n.showModal({content:"更新操作执行失败，错误信息为：".concat(e.message),showCancel:!1}),console.error(e)}))},get:function(){n.showLoading({title:"处理中..."}),o.callFunction({name:"get"}).then((function(e){n.hideLoading(),n.showModal({content:"查询成功，获取数据列表为：".concat(JSON.stringify(e.result.data)),showCancel:!1}),console.log(e)})).catch((function(e){n.hideLoading(),n.showModal({content:"查询失败，错误信息为：".concat(e.message),showCancel:!1}),console.error(e)}))},useCommon:function(){console.log("请确保自己已经阅读并按照公用模块文档操作 https://uniapp.dcloud.io/uniCloud/cf-common"),o.callFunction({name:"useCommon"}).then((function(e){n.hideLoading(),n.showModal({content:"云函数useCommon返回结果："+JSON.stringify(e.result),showCancel:!1}),console.log(e)})).catch((function(e){n.hideLoading(),n.showModal({content:"云函数useCommon执行失败，错误信息为：".concat(e.message),showCancel:!1}),console.error(e)}))},upload:function(){new Promise((function(e,o){n.chooseImage({chooseImage:1,success:function(n){var o,t=n.tempFilePaths[0];o=n.tempFilePaths[0].split(".").pop();var c={filePath:t,cloudPath:Date.now()+"."+o};e(c)},fail:function(){o(new Error("Fail_Cancel"))}})})).then((function(e){return n.showLoading({title:"文件上传中..."}),o.uploadFile(c({},e,{onUploadProgress:function(n){console.log(n)}}))})).then((function(e){n.hideLoading(),console.log(e),n.showModal({content:"图片上传成功，fileId为："+e.fileID,showCancel:!1})})).catch((function(e){n.hideLoading(),console.log(e),"Fail_Cancel"!==e.message&&n.showModal({content:"图片上传失败，错误信息为：".concat(e.message),showCancel:!1})}))}}};e.default=i}).call(this,o("543d")["default"],o("a9ff")["default"])},fa84:function(n,e,o){"use strict";(function(n){o("f562"),o("921b");t(o("66fd"));var e=t(o("4d9b"));function t(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,o("543d")["createPage"])}},[["fa84","common/runtime","common/vendor"]]]);