webpackJsonp([14],{1837:function(t,e,a){function o(t){a(2073)}var r=a(121)(a(2003),a(2122),o,"data-v-31f42c73",null);t.exports=r.exports},1853:function(t,e,a){t.exports={default:a(1854),__esModule:!0}},1854:function(t,e,a){a(1856),t.exports=a(61).Object.assign},1855:function(t,e,a){"use strict";var o=a(123),r=a(237),n=a(167),s=a(381),l=a(382),c=Object.assign;t.exports=!c||a(122)(function(){var t={},e={},a=Symbol(),o="abcdefghijklmnopqrst";return t[a]=7,o.split("").forEach(function(t){e[t]=t}),7!=c({},t)[a]||Object.keys(c({},e)).join("")!=o})?function(t,e){for(var a=s(t),c=arguments.length,i=1,u=r.f,d=n.f;c>i;)for(var p,f=l(arguments[i++]),v=u?o(f).concat(u(f)):o(f),h=v.length,b=0;h>b;)d.call(f,p=v[b++])&&(a[p]=f[p]);return a}:c},1856:function(t,e,a){var o=a(105);o(o.S+o.F,"Object",{assign:a(1855)})},2003:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(1853),r=a.n(o),n=a(380);e.default={data:function(){return{loading:!1,searchData:{country:[],storeId:""},storeData:[],tableData:[]}},computed:{tabHeight:function(){return this.$store.state.include.tableHeight-305}},mounted:function(){this.data_table()},methods:{resetForm:function(){this.searchData.country=[],this.searchData.store=""},fetchStoreData:function(t){this.get_storeOfArea(t[t.length-1])},get_storeOfArea:function(t){var e=this;n.a.fetch_storeOfArea({district:t}).then(function(t){e.searchData.storeId="",e.storeData=[{value:"",label:"请选择门店"}],e.storeData=e.storeData.concat(t.data.dat)})},data_table:function(t){var e=this,a={page:t-1||0,province:"",city:"",district:"",storeId:e.searchData.storeId};e.searchData.country.length>0&&r()(a,{province:e.searchData.country[0],city:e.searchData.country[1],district:e.searchData.country[2]}),e.loading=!0,n.a.data_deliveryStoreTable(a).then(function(t){e.loading=!1,e.tableData=t.data.dat})}}}},2036:function(t,e,a){e=t.exports=a(1819)(!0),e.push([t.i,".delivery-store .content-table[data-v-31f42c73]{margin-bottom:20px}","",{version:3,sources:["D:/www.github.com/project/product/src/components/manage-delivery/childrens/store.vue"],names:[],mappings:"AACA,gDACE,kBAAoB,CACrB",file:"store.vue",sourcesContent:["\n.delivery-store .content-table[data-v-31f42c73] {\n  margin-bottom: 20px;\n}\n"],sourceRoot:""}])},2073:function(t,e,a){var o=a(2036);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(1820)("7638faff",o,!0)},2122:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"delivery-store"},[a("div",{staticClass:"search-table"},[a("el-form",[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:5}},[a("el-form-item",[a("div",{staticClass:"country-select"},[a("el-cascader",{attrs:{options:this.$store.state.select.country,props:this.$store.state.select.defaultCountryProps},on:{change:t.fetchStoreData},model:{value:t.searchData.country,callback:function(e){t.searchData.country=e},expression:"searchData.country"}})],1)])],1),t._v(" "),a("el-col",{attrs:{span:5}},[a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择门店"},model:{value:t.searchData.storeId,callback:function(e){t.searchData.storeId=e},expression:"searchData.storeId"}},t._l(t.storeData,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.val}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.data_table}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.resetForm}},[t._v("重置")])],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"content-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:t.loading,expression:"loading",modifiers:{body:!0}}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{"max-height":t.tabHeight,height:t.tabHeight,data:t.tableData.details,border:"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{align:"center","min-width":"150",label:"地区"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.area))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"storeNo",label:"门店号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"name",label:"门店名称","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"contactPerson",label:"联系人","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"150",prop:"contact",label:"联系方式","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"address",label:"地址","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"remark",label:"备注","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"}},[a("router-link",{attrs:{to:{path:"/delivery/storeDetails",query:{id:e.row.id}}}},[t._v("编辑")])],1)]}}])})],1)],1),t._v(" "),a("div",{staticClass:"content-table-pagination"},[a("el-pagination",{attrs:{"page-sizes":[20],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.rowsCount}})],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=14.17c2f1def150968325b2.js.map