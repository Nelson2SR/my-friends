(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/profile/profile"],{"0360":function(e,n,t){"use strict";t.r(n);var o=t("f4eb"),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},ae25:function(e,n,t){"use strict";var o,r=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return o}))},d77a:function(e,n,t){"use strict";t.r(n);var o=t("ae25"),r=t("0360");for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);var s,c=t("f0c5"),a=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=a.exports},ebb5:function(e,n,t){"use strict";(function(e){t("f562"),t("921b");o(t("66fd"));var n=o(t("d77a"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},f4eb:function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t("2f62");function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var a=function(){t.e("colorui/components/cu-swiper").then(function(){return resolve(t("7004"))}.bind(null,t)).catch(t.oe)},u={data:function(){return{avatar:["https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"],provider:"",myGroups:[]}},components:{cuSwiper:a},computed:(0,r.mapState)(["forcedLogin","hasLogin","userName","avatarUrl","gender","openId"]),methods:s({},(0,r.mapActions)(["login"]),{login_weixin:function(){console.log("login as wechat");var n=this;wx.login({success:function(t){console.log("login response: %s",JSON.stringify(t)),t.code?e.callFunction({name:"oauth-login",data:{code:t.code,appId:"wx95bd5dc2182e3ad4",appSecret:"f51b12f21d601c68fb1fbc3bb1aea1ac"}}).then((function(e){console.log("OAuth Response: %s",JSON.stringify(e));var t=e.result.open_id;o.setStorage({sessionId:e.result.session_id,openId:e.result.open_id});n.getUser(t);o.getUserInfo({provider:"weixin",success:function(e){console.log("User Info: %s",JSON.stringify(e)),e.userInfo.openId=t,n.toMain(e.userInfo)},fail:function(){o.showToast({icon:"none",position:"bottom",title:"登陆失败"})}})})):console.log("登录失败！"+t.errMsg)}})},toMain:function(e){this.login(e),this.forcedLogin?o.reLaunch({url:"/pages/tabBar/home/home"}):o.redirectTo({url:"/pages/profile/profile"})},getUser:function(n){var t=this;console.log("Check if user registered"),e.callFunction({name:"user-get-by-openId",data:{open_id:n}}).then((function(e){if(console.log("get user successfully: %s",JSON.stringify(e)),0===e.result.data.length){console.log("User not found");var o=t.createUser(n);return o}return console.log("User is retrieved: %s",JSON.stringify(e.result.data[0])),e.result.data[0]}))},createUser:function(n){var t={};t.name=this.userName,t.provider=this.provider,t.gender=this.gender,t.open_id=n,e.callFunction({name:"user-create",data:t}).then((function(e){return console.log("create user successully: %s",JSON.stringify(e)),e.result.id}))}}),onLoad:function(){var n=this;console.log("Page onLoad"+this.openId),""!==this.openId&&e.callFunction({name:"group-get-by-openId",data:{openId:this.openId}}).then((function(e){console.log("My Groups: %s",JSON.stringify(e)),n.myGroups=e.result.data}))}};n.default=u}).call(this,t("a9ff")["default"],t("543d")["default"])}},[["ebb5","common/runtime","common/vendor"]]]);