webpackJsonp([20],{1760:function(t,a,e){function n(t){e(1905)}var s=e(113)(e(1810),e(1955),n,"data-v-a959349c",null);t.exports=s.exports},1785:function(t,a,e){"use strict";var n=e(149);a.a={details_tableSendTable:function(t){return n.a.get("/web/orderManage/orderDetail",{params:t})},details_tableStoreTable:function(t){return n.a.get("/web/storeManage/detail",{params:t})},details_personData:function(t){return n.a.get("/web/deliveryUserManage/detail",{params:t})},details_personTableData:function(t){return n.a.get("/web/deliveryUserManage/orderList",{params:t})},details_personViewIdCardData:function(t){return n.a.get("/web/deliveryUserManage/viewIdCard",{params:t})},details_handlePersonUpDown:function(t){return n.b.post("/web/deliveryUserManage/changeLevel",t,{responseType:"json"})},details_handlePersonEnabled:function(t){return n.b.post("/web/deliveryUserManage/enable",t)},details_handleOrderBackToYb:function(t){return n.b.post("/web/orderManage/backToYb",t)},details_handleOrderClose:function(t){return n.a.post("/web/orderManage/close",t)},details_handleOrderRePush:function(t){return n.b.post("/web/orderManage/rePush",t)},details_handleOrderManualHandle:function(t){return n.b.post("/web/orderManage/manualHandle",t)},details_submitStore:function(t){return n.a.post("/web/storeManage/edit",t)},details_submitAudit:function(t){return n.a.post("/web/deliveryUserManage/audit",t)}}},1810:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e(1785);a.default={data:function(){return{detailsData:{},searchData:{score:"",range:"",orderNo:"",isAbnormal:"",deliveryUserId:this.$route.query.id,personMobile:""},tableData:[]}},computed:{tabHeight:function(){return this.$store.state.include.tableHeight-750}},mounted:function(){this.details_personTableData()},methods:{resetForm:function(){this.searchData.score="",this.searchData.range="",this.searchData.isAbnormal="",this.searchData.orderNo=""},details_personData:function(t){var a=this;n.a.details_personData({id:t}).then(function(t){a.$nextTick(function(){a.detailsData=t.data.dat})})},details_personTableData:function(t){var a=this;n.a.details_personTableData({page:t-1||0,score:a.searchData.score,range:a.searchData.range,orderNo:a.searchData.orderNo,isAbnormal:a.searchData.isAbnormal,deliveryUserId:a.searchData.deliveryUserId}).then(function(t){a.tableData=t.data.dat}).catch(function(){swal("服务器错误")})},details_handlePersonUpDown:function(t){var a=this,e=this;n.a.details_handlePersonUpDown({id:e.$route.query.id,direction:t}).then(function(t){1!==Number(t.data.code)?a.$message(t.data.msg):(a.$message("操作成功！"),a.$router.go("-1"))})},details_handlePersonEnabled:function(t){var a=this,e=this;n.a.details_handlePersonEnabled({id:e.$route.query.id,direction:t}).then(function(t){1!==Number(t.data.code)?a.$message(t.data.msg):(a.$message("操作成功！"),a.$router.go("-1"))})}},beforeRouteEnter:function(t,a,e){t.query&&e(function(a){a.details_personData(t.query.id)})}}},1868:function(t,a,e){a=t.exports=e(1752)(!0),a.push([t.i,'.person-details[data-v-a959349c]{color:#666;font-size:12px}.person-details .details-title[data-v-a959349c]{border-bottom:1px solid #ddd;padding:10px;font-size:18px}.person-details .content-body .base-info[data-v-a959349c]{background:#fff;color:#666;border-radius:5px;padding:20px;padding-bottom:0}.person-details .content-body .data-item>.el-col[data-v-a959349c]{padding:10px 0}.person-details .content-body .data-item>.el-col .check-item-row[data-v-a959349c]{padding-bottom:20px}.person-details .content-body .data-item>.el-col .check-item-row.total-row[data-v-a959349c]{border-top:1px solid #666;padding-top:20px}.person-details .content-body .details-notice[data-v-a959349c]{margin-top:20px;border:1px solid #ddd;padding:10px 0;background:#c2e1f7;color:#012b6b}.person-details .content-body .details-notice>.el-row[data-v-a959349c]{padding:10px 20px}.person-details .content-body .details-notice>.el-row.title[data-v-a959349c]{padding:10px 0 10px 20px;font-size:18px;position:relative;font-weight:400;margin-bottom:10px}.person-details .content-body .details-notice>.el-row.title[data-v-a959349c]:before{content:"";display:block;width:4px;height:30px;background:#012b6b;position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.person-details .content-body .details-notice>.el-row>.el-col[data-v-a959349c]:nth-of-type(2){text-align:right}.person-details .content-body .person-manage-table[data-v-a959349c]{margin-bottom:20px}.person-details .content-body .person-manage-pagination[data-v-a959349c]{text-align:right}.person-details .content-body .person-manage-pagination .el-pagination__jump[data-v-a959349c],.person-details .content-body .person-manage-pagination .el-pagination__total[data-v-a959349c]{color:#fff}.person-details .content-body .person-manage-pagination .el-pagination__jump input[data-v-a959349c]{color:#666}',"",{version:3,sources:["D:/www.github.com/project/product/src/components/details/person.vue"],names:[],mappings:"AACA,iCACE,WAAY,AACZ,cAAgB,CACjB,AACD,gDACI,6BAA8B,AAC9B,aAAc,AACd,cAAgB,CACnB,AACD,0DACI,gBAAiB,AACjB,WAAY,AACZ,kBAAmB,AACnB,aAAc,AACd,gBAAkB,CACrB,AACD,kEACI,cAAgB,CACnB,AACD,kFACM,mBAAqB,CAC1B,AACD,4FACQ,0BAA2B,AAC3B,gBAAkB,CACzB,AACD,+DACI,gBAAiB,AACjB,sBAAuB,AACvB,eAAgB,AAChB,mBAAoB,AACpB,aAAe,CAClB,AACD,uEACM,iBAAmB,CACxB,AACD,6EACQ,yBAA0B,AAC1B,eAAgB,AAChB,kBAAmB,AACnB,gBAAoB,AACpB,kBAAoB,CAC3B,AACD,oFACU,WAAY,AACZ,cAAe,AACf,UAAW,AACX,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,OAAQ,AACR,QAAS,AACT,mCAAoC,AAC5B,0BAA4B,CAC7C,AACD,8FACQ,gBAAkB,CACzB,AACD,oEACI,kBAAoB,CACvB,AACD,yEACI,gBAAkB,CACrB,AAID,6LACM,UAAY,CACjB,AACD,oGACQ,UAAY,CACnB",file:"person.vue",sourcesContent:["\n.person-details[data-v-a959349c] {\n  color: #666;\n  font-size: 12px;\n}\n.person-details .details-title[data-v-a959349c] {\n    border-bottom: 1px #ddd solid;\n    padding: 10px;\n    font-size: 18px;\n}\n.person-details .content-body .base-info[data-v-a959349c] {\n    background: #fff;\n    color: #666;\n    border-radius: 5px;\n    padding: 20px;\n    padding-bottom: 0;\n}\n.person-details .content-body .data-item > .el-col[data-v-a959349c] {\n    padding: 10px 0;\n}\n.person-details .content-body .data-item > .el-col .check-item-row[data-v-a959349c] {\n      padding-bottom: 20px;\n}\n.person-details .content-body .data-item > .el-col .check-item-row.total-row[data-v-a959349c] {\n        border-top: 1px #666 solid;\n        padding-top: 20px;\n}\n.person-details .content-body .details-notice[data-v-a959349c] {\n    margin-top: 20px;\n    border: 1px #ddd solid;\n    padding: 10px 0;\n    background: #c2e1f7;\n    color: #012b6b;\n}\n.person-details .content-body .details-notice > .el-row[data-v-a959349c] {\n      padding: 10px 20px;\n}\n.person-details .content-body .details-notice > .el-row.title[data-v-a959349c] {\n        padding: 10px 0 10px 20px;\n        font-size: 18px;\n        position: relative;\n        font-weight: normal;\n        margin-bottom: 10px;\n}\n.person-details .content-body .details-notice > .el-row.title[data-v-a959349c]::before {\n          content: '';\n          display: block;\n          width: 4px;\n          height: 30px;\n          background: #012b6b;\n          position: absolute;\n          left: 0;\n          top: 50%;\n          -webkit-transform: translateY(-50%);\n                  transform: translateY(-50%);\n}\n.person-details .content-body .details-notice > .el-row > .el-col[data-v-a959349c]:nth-of-type(2) {\n        text-align: right;\n}\n.person-details .content-body .person-manage-table[data-v-a959349c] {\n    margin-bottom: 20px;\n}\n.person-details .content-body .person-manage-pagination[data-v-a959349c] {\n    text-align: right;\n}\n.person-details .content-body .person-manage-pagination .el-pagination__total[data-v-a959349c] {\n      color: #fff;\n}\n.person-details .content-body .person-manage-pagination .el-pagination__jump[data-v-a959349c] {\n      color: #fff;\n}\n.person-details .content-body .person-manage-pagination .el-pagination__jump input[data-v-a959349c] {\n        color: #666;\n}\n"],sourceRoot:""}])},1905:function(t,a,e){var n=e(1868);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(1753)("6fafb046",n,!0)},1955:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"person-details"},[e("div",{staticClass:"details-title"},[t._v("\n    配送员详情\n  ")]),t._v(" "),e("div",{staticClass:"details-content"},[e("div",{staticClass:"content-body"},[e("el-row",{attrs:{type:"flex",justify:"space-between"}},[e("el-col",{staticClass:"base-info",attrs:{span:15}},[e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("姓名：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v(t._s(t.detailsData.realName?t.detailsData.realName:"- -"))]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("联系方式：")])]),t._v(" "),e("el-col",{attrs:{span:6}},[t._v(t._s(t.detailsData.phone?t.detailsData.phone:"- -"))])],1),t._v(" "),e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("类别：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v("\n              "+t._s("1"==t.detailsData.userType?"员工":"")+"\n              "+t._s("2"==t.detailsData.userType?"社会":"")+"\n            ")]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("工号：")])]),t._v(" "),e("el-col",{attrs:{span:6}},[t._v(t._s(t.detailsData.employeeId?t.detailsData.employeeId:"- -"))])],1),t._v(" "),e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("等级：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v(t._s(t.detailsData.level?t.detailsData.level+"级":"- -"))]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("当前状态：")])]),t._v(" "),e("el-col",{attrs:{span:6}},[t._v("\n              "+t._s("1"==t.detailsData.workStatus?"抢单中":"")+"\n              "+t._s("2"==t.detailsData.workStatus?"休息中":"")+"\n              "+t._s("3"==t.detailsData.workStatus?"配送中":"")+"\n            ")])],1),t._v(" "),e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("性别：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v("\n              "+t._s("1"==t.detailsData.gender?"男":"")+"\n              "+t._s("2"==t.detailsData.gender?"女":"")+"\n            ")]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("年龄：")])]),t._v(" "),e("el-col",{attrs:{span:6}},[t._v(t._s(t.detailsData.age?t.detailsData.age:"- -"))])],1),t._v(" "),e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("配送方式：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v("\n              "+t._s("1"==t.detailsData.deliveryMode?"骑行":"")+"\n              "+t._s("2"==t.detailsData.deliveryMode?"驾车":"")+"\n            ")]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("常驻地区：")])]),t._v(" "),e("el-col",{attrs:{span:6}},[t._v(t._s(t.detailsData.city?t.detailsData.city:"- -"))])],1),t._v(" "),e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("设备型号：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v(t._s(t.detailsData.device?t.detailsData.device:"- -"))]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("注册时间：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v(t._s(t.detailsData.regTime?t.detailsData.regTime:"- -"))]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("工作年限：")])]),t._v(" "),e("el-col",{attrs:{span:6}},[t._v(t._s(t.detailsData.workStatus?t.detailsData.workStatus:"- -"))])],1),t._v(" "),e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("注册ip：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v(t._s(t.detailsData.regIp?t.detailsData.regIp:"- -"))]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("ip地区：")])]),t._v(" "),e("el-col",{attrs:{span:6}},[t._v(t._s(t.detailsData.ipCity?t.detailsData.ipCity:"- -"))])],1),t._v(" "),e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("最近送货门店：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v(t._s(t.detailsData.lastStoreName?t.detailsData.lastStoreName:"- -"))]),t._v(" "),e("el-col",{attrs:{span:4}},[e("strong",[t._v("最近抢单时间：")])]),t._v(" "),e("el-col",{attrs:{span:6}},[t._v(t._s(t.detailsData.lastOrderTime?t.detailsData.lastOrderTime:"- -"))])],1),t._v(" "),e("el-row",{staticClass:"data-item"},[e("el-col",{attrs:{span:4}},[e("strong",[t._v("身份证：")])]),t._v(" "),e("el-col",{attrs:{span:7}},[t._v(t._s(t.detailsData.idCard?t.detailsData.idCard:"- -"))])],1),t._v(" "),e("el-row",{staticClass:"data-item",attrs:{gutter:10}},[e("el-col",{attrs:{span:3}},[e("el-button",{attrs:{type:"info"},on:{click:function(a){t.details_handlePersonUpDown(1)}}},[t._v("升级")])],1),t._v(" "),e("el-col",{attrs:{span:3}},[e("el-button",{attrs:{type:"info"},on:{click:function(a){t.details_handlePersonUpDown(0)}}},[t._v("降级")])],1),t._v(" "),e("el-col",{attrs:{span:4}},[e("el-button",{attrs:{type:"info"},on:{click:function(a){t.details_handlePersonEnabled(0)}}},[t._v("账号冻结")])],1)],1)],1),t._v(" "),e("el-col",{attrs:{span:8}},[t.detailsData.userData?e("el-row",{staticClass:"details-notice"},[e("el-row",{staticClass:"title"},[e("el-col",{attrs:{span:24}},[t._v("数据统计:")])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:10}},[e("strong",[t._v("本月/历史订单量")])]),t._v(" "),e("el-col",{attrs:{span:14}},[t._v("\n                "+t._s(t.detailsData.userData.monthAmount?t.detailsData.userData.monthAmount+"%":"- -")+"\n                /\n                "+t._s(t.detailsData.userData.monthAmount?t.detailsData.userData.totalAmount+"%":"- -")+"\n              ")])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:10}},[e("strong",[t._v("本月/历史准达率:")])]),t._v(" "),e("el-col",{attrs:{span:14}},[t._v("\n                "+t._s(t.detailsData.userData.monthOntimeRate?t.detailsData.userData.monthOntimeRate+"%":"- -")+"\n                /\n                "+t._s(t.detailsData.userData.totalOntimeRate?t.detailsData.userData.totalOntimeRate+"%":"- -")+"\n              ")])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:10}},[e("strong",[t._v("本月/历史退单率:")])]),t._v(" "),e("el-col",{attrs:{span:14}},[t._v("\n                "+t._s(t.detailsData.userData.monthCancelRate?t.detailsData.userData.monthCancelRate+"%":"- -")+"\n                /\n                "+t._s(t.detailsData.userData.totalCancelRate?t.detailsData.userData.totalCancelRate+"%":"- -")+"\n              ")])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:10}},[e("strong",[t._v("本月佣金:")])]),t._v(" "),e("el-col",{attrs:{span:14}},[t._v(t._s(t.detailsData.userData.totalOntimeRate?"￥"+t.detailsData.userData.totalOntimeRate:"- -"))])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:10}},[e("strong",[t._v("历史佣金:")])]),t._v(" "),e("el-col",{attrs:{span:14}},[t._v(t._s(t.detailsData.userData.totalCommission?"￥"+t.detailsData.userData.totalCommission:"- -"))])],1)],1):t._e()],1)],1),t._v(" "),e("el-row",{attrs:{type:"flex",justify:"space-between"}},[e("el-col",{staticClass:"base-info",staticStyle:{"padding-top":"10px"},attrs:{span:24}},[e("div",{staticClass:"search-table"},[e("el-form",{ref:"form",attrs:{inline:!0}},[e("el-row",{attrs:{gutter:10}},[e("el-col",{attrs:{span:3}},[e("el-form-item",[e("el-select",{attrs:{placeholder:"等级"},model:{value:t.searchData.score,callback:function(a){t.searchData.score=a},expression:"searchData.score"}},t._l(this.$store.state.select.orderLevel,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),e("el-col",{attrs:{span:3}},[e("el-form-item",[e("el-select",{attrs:{placeholder:"异常状态"},model:{value:t.searchData.isAbnormal,callback:function(a){t.searchData.isAbnormal=a},expression:"searchData.isAbnormal"}},t._l(this.$store.state.select.abnormalStart,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),e("el-col",{attrs:{span:3}},[e("el-form-item",[e("el-select",{attrs:{placeholder:"时间范围"},model:{value:t.searchData.range,callback:function(a){t.searchData.range=a},expression:"searchData.range"}},t._l(this.$store.state.select.timeBetween,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),e("el-col",{attrs:{span:6}},[e("el-form-item",[e("el-input",{attrs:{placeholder:"订单号"},model:{value:t.searchData.orderNo,callback:function(a){t.searchData.orderNo=a},expression:"searchData.orderNo"}})],1)],1),t._v(" "),e("el-col",{attrs:{span:3}},[e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:t.details_personTableData}},[t._v("查询")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.resetForm}},[t._v("重置")])],1)],1)],1)],1)],1),t._v(" "),e("div",{staticClass:"person-manage-table"},[e("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData.details,height:t.tabHeight,"max-height":t.tabHeight,border:"","tooltip-effect":"dark"}},[e("el-table-column",{attrs:{label:"订单编号",align:"center",width:"210",fixed:""},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v(t._s(a.row.orderNo))]}}])}),t._v(" "),e("el-table-column",{attrs:{align:"center",width:"100",prop:"orderType",label:"订单类别"}}),t._v(" "),e("el-table-column",{attrs:{prop:"storeName",align:"center",width:"180",label:"提货门店","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"receiverAddress",align:"center",width:"180",label:"送货地点","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"name1",align:"center",width:"180",label:"常驻地区","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"orderTime",label:"订单时间",align:"center",width:"180","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"scheduledTime",align:"center",width:"180",label:"需要送达时间","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{label:"订单状态",align:"center",width:"100","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n                  "+t._s(10===a.row.orderStatus?"待抢单":"")+"\n                  "+t._s(20===a.row.orderStatus?"抢单中":"")+"\n                  "+t._s(30===a.row.orderStatus?"待拣货":"")+"\n                  "+t._s(40===a.row.orderStatus?"待验货":"")+"\n                  "+t._s(50===a.row.orderStatus?"送货中":"")+"\n                  "+t._s(60===a.row.orderStatus?"已送达":"")+"\n                  "+t._s(90===a.row.orderStatus?"已退单":"")+"\n                  "+t._s(91===a.row.orderStatus?"已拒单":"")+"\n                  "+t._s(99===a.row.orderStatus?"已关闭":"")+"\n                ")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"是否异常",align:"center",width:"100","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){return[0===a.row.isAbnormal?e("p",[t._v("无异常")]):e("p",[t._v("\n                    "+t._s(1===a.row.isAbnormal?"无人抢单":"")+"\n                    "+t._s(2===a.row.isAbnormal?"主动退出":"")+"\n                    "+t._s(3===a.row.isAbnormal?"超时未送":"")+"\n                    "+t._s(4===a.row.isAbnormal?"超时未达":"")+"\n                    "+t._s(5===a.row.isAbnormal?"商城关闭":"")+"\n                    "+t._s(6===a.row.isAbnormal?"客户拒单":"")+"\n                    "+t._s(7===a.row.isAbnormal?"商城退换货":"")+"\n                  ")])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"address",align:"center",width:"100",label:"评价","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center",width:"100",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("router-link",{attrs:{to:"/order/allDetails"}},[t._v("查看详情")])]}}])})],1)],1),t._v(" "),e("div",{staticClass:"person-manage-pagination"},[e("el-pagination",{attrs:{"page-sizes":[20],layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.rowsCount}})],1)])],1)],1)])])},staticRenderFns:[]}}});
//# sourceMappingURL=20.17b0360ad8914cf847ac.js.map