(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/group/group-create"],{"79b4":function(e,t,i){"use strict";var o=i("9ce2"),n=i.n(o);n.a},"9ce2":function(e,t,i){},a79b:function(e,t,i){"use strict";i.r(t);var o=i("f2dd"),n=i.n(o);for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);t["default"]=n.a},a7ac:function(e,t,i){"use strict";var o,n=function(){var e=this,t=e.$createElement;e._self._c},a=[];i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return o}))},ccb2:function(e,t,i){"use strict";i.r(t);var o=i("a7ac"),n=i("a79b");for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);i("79b4");var c,s=i("f0c5"),r=Object(s["a"])(n["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=r.exports},e921:function(e,t,i){"use strict";(function(e){i("f562"),i("921b");o(i("66fd"));var t=o(i("ccb2"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("543d")["createPage"])},f2dd:function(e,t,i){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,a=i("2f62"),c=i("8fbc"),s={components:{},props:{showForm:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!1}},data:function(){return{pickPic:"选择照片",imgList:[],region:["广东省","广州市","海珠区"],joinMethod:"",visibility:"",description:"",showDialog:!1}},computed:(0,a.mapState)(["openId","gender","avatarUrl"]),onLoad:function(e){console.log("landed on create-group page")},methods:{createGroup:function(t){var i=[{name:"name",checkType:"string",checkRule:"1,10",errorMsg:"姓名应为1-10个字符"},{name:"description",checkType:"string",checkRule:"1,50",errorMsg:"请控制为1-50个字符"}],n=t.detail.value;console.log("form data:"+JSON.stringify(n));var a=c.check(n,i);if(a&&void 0!==this.visibility&&void 0!==this.joinMethod){e.showToast({title:"验证通过!",icon:"none"}),this.showForm=!1,this.showLoading=!0;var s=t.detail.value;s.createdAt=new Date,s.createdBy=1,s.visibility=this.visibility,s.joinMethod=this.joinMethod,s.type="游戏",s.region=this.region,s.read=0,s.vote=0,s.comment=0;var r={openId:this.openId,gender:this.gender,avatarUrl:this.avatarUrl};s.owner=r,s.members=[r],s.admins=[r],console.log("create group for data: "+JSON.stringify(s)),o.uploadFile({filePath:this.imgList[0],onUploadProgress:function(e){Math.round(100*e.loaded/e.total)},success:function(t){console.log("successfully upload img "+t.fileID),s.imgUrl=t.fileID,o.callFunction({name:"group-create",data:s}).then((function(t){console.log("success with"+JSON.stringify(t)),e.redirectTo({url:"group-view?id="+t.result.id})}))},fail:function(e){console.error(e)},complete:function(){console.log("completed")}})}else e.showToast({title:c.error,icon:"none"})},upload:function(){this,e.chooseImage({count:1,success:function(e){n=e.tempFilePaths,console.log("Have chose image in path:"+n)}})},clickVisibilityCard:function(t){visibility=t,e.showToast({title:"点击卡片",icon:"none"})},clickJoinCard:function(t){joinMethod=t,e.showToast({title:"点击卡片",icon:"none"})},ChooseImage:function(){var t=this;e.chooseImage({count:4,sizeType:["original","compressed"],sourceType:["album"],success:function(e){0!=t.imgList.length?t.imgList=t.imgList.concat(e.tempFilePaths):t.imgList=e.tempFilePaths}})},ViewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},DelImg:function(t){var i=this;e.showModal({title:"召唤师",content:"确定要删除这段回忆吗？",cancelText:"再看看",confirmText:"再见",success:function(e){e.confirm&&i.imgList.splice(t.currentTarget.dataset.index,1)}})},RegionChange:function(e){this.region=e.detail.value},onVisibilityChange:function(e){this.visibility=e.detail.value},onJoinMethodChange:function(e){this.joinMethod=e.detail.value},onDescriptionInput:function(e){this.description=e.detail.value}}};t.default=s}).call(this,i("543d")["default"],i("a9ff")["default"])}},[["e921","common/runtime","common/vendor"]]]);