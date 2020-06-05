(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-dialog"],{"0cd1":function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{show:!0}},computed:{},props:{showModal:{type:Boolean,default:!1},modalDetail:{type:Object,default:{modalName:"",modalTitle:"",modalContent:""}},confirmAction:Function},methods:{hideModal:function(t){this.show=!1},doAction:function(){console.log("do action"+this.confirmAction),this.confirmAction()}},onLoad:function(){}};n.default=e},"9cdb":function(t,n,o){"use strict";o.r(n);var e=o("d0b3"),c=o("b6fb");for(var u in c)"default"!==u&&function(t){o.d(n,t,(function(){return c[t]}))}(u);var i,a=o("f0c5"),r=Object(a["a"])(c["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);n["default"]=r.exports},b6fb:function(t,n,o){"use strict";o.r(n);var e=o("0cd1"),c=o.n(e);for(var u in e)"default"!==u&&function(t){o.d(n,t,(function(){return e[t]}))}(u);n["default"]=c.a},d0b3:function(t,n,o){"use strict";var e,c=function(){var t=this,n=t.$createElement;t._self._c},u=[];o.d(n,"b",(function(){return c})),o.d(n,"c",(function(){return u})),o.d(n,"a",(function(){return e}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-dialog-create-component',
    {
        'colorui/components/cu-dialog-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9cdb"))
        })
    },
    [['colorui/components/cu-dialog-create-component']]
]);
