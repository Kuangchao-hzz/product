webpackJsonp([36],{122:function(e,t,n){"use strict";var a=n(280),l=n.n(a),i=l.a.create({baseURL:"/api",headers:{"X-Custom-Header":"foobar"}});t.a=i},219:function(e,t,n){"use strict";var a=n(602),l=n.n(a),i=n(601),o=n.n(i),r=n(600),u=n.n(r),c=function e(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.installed||(t.component(l.a.name,l.a),t.component(o.a.name,o.a),t.component(u.a.name,u.a))};"undefined"!=typeof window&&window.Vue&&c(window.Vue),t.a={install:c}},220:function(e,t,n){"use strict";var a=n(18),l=n(607);a.default.use(l.a),t.a=new l.a({routes:[{path:"/",redirect:"/login"},{path:"/",component:function(e){return n.e(0).then(function(){var t=[n(645)];e.apply(null,t)}.bind(this)).catch(n.oe)},children:[{path:"/delivery",name:"数据统计",component:function(e){return n.e(27).then(function(){var t=[n(656)];e.apply(null,t)}.bind(this)).catch(n.oe)},children:[{path:"delivery",name:"配送统计",component:function(e){return n.e(29).then(function(){var t=[n(654)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"people",name:"配送员统计",component:function(e){return n.e(28).then(function(){var t=[n(655)];e.apply(null,t)}.bind(this)).catch(n.oe)}}]},{path:"/order",component:function(e){return n.e(22).then(function(){var t=[n(666)];e.apply(null,t)}.bind(this)).catch(n.oe)},name:"订单管理",children:[{path:"waitSendOrder",name:"待推订单",component:function(e){return n.e(3).then(function(){var t=[n(665)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"waitPushOrder",name:"待抢订单",component:function(e){return n.e(7).then(function(){var t=[n(664)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"abnormalOrder",name:"异常订单",component:function(e){return n.e(9).then(function(){var t=[n(662)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"allOrder",name:"全部订单",component:function(e){return n.e(8).then(function(){var t=[n(663)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"details",name:"订单详情",component:function(e){return n.e(14).then(function(){var t=[n(650)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"abnormalDetails",name:"异常订单详情",component:function(e){return n.e(34).then(function(){var t=[n(646)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"allDetails",name:"全部订单详情",component:function(e){return n.e(33).then(function(){var t=[n(647)];e.apply(null,t)}.bind(this)).catch(n.oe)}}]},{path:"/person",component:function(e){return n.e(21).then(function(){var t=[n(671)];e.apply(null,t)}.bind(this)).catch(n.oe)},children:[{path:"map",name:"配送地图",component:function(e){return n.e(13).then(function(){var t=[n(669)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"manage",name:"配送员管理",component:function(e){return n.e(6).then(function(){var t=[n(668)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"audit",name:"资格审核",component:function(e){return n.e(2).then(function(){var t=[n(667)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"money",name:"财务结算",component:function(e){return n.e(5).then(function(){var t=[n(670)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"personDetails",name:"配送员详情",component:function(e){return n.e(11).then(function(){var t=[n(651)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"auditDetails",name:"审核详情",component:function(e){return n.e(12).then(function(){var t=[n(648)];e.apply(null,t)}.bind(this)).catch(n.oe)}}]},{path:"/delivery",name:"配送管理",component:function(e){return n.e(23).then(function(){var t=[n(661)];e.apply(null,t)}.bind(this)).catch(n.oe)},children:[{path:"store",name:"门店管理",component:function(e){return n.e(10).then(function(){var t=[n(660)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"money",name:"费用设置",component:function(e){return n.e(25).then(function(){var t=[n(658)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"level",name:"配送等级设置",component:function(e){return n.e(26).then(function(){var t=[n(657)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"rule",name:"推送规则设置",component:function(e){return n.e(24).then(function(){var t=[n(659)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"storeDetails",name:"门店详情",component:function(e){return n.e(31).then(function(){var t=[n(652)];e.apply(null,t)}.bind(this)).catch(n.oe)}}]},{path:"/system",name:"系统设置",component:function(e){return n.e(15).then(function(){var t=[n(679)];e.apply(null,t)}.bind(this)).catch(n.oe)},children:[{path:"notice",name:"公告管理",component:function(e){return n.e(19).then(function(){var t=[n(674)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"user",name:"用户管理",component:function(e){return n.e(16).then(function(){var t=[n(678)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"role",name:"角色管理",component:function(e){return n.e(18).then(function(){var t=[n(675)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"staff",name:"员工排班管理",component:function(e){return n.e(4).then(function(){var t=[n(677)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"service",name:"客服管理",component:function(e){return n.e(17).then(function(){var t=[n(676)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"app",name:"APP版本管理",component:function(e){return n.e(20).then(function(){var t=[n(672)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"help",name:"使用帮助",component:function(e){return n.e(1).then(function(){var t=[n(673)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"noticeDetails",name:"公告详情",component:function(e){return n.e(32).then(function(){var t=[n(649)];e.apply(null,t)}.bind(this)).catch(n.oe)}}]}]},{path:"/login",component:function(e){return n.e(30).then(function(){var t=[n(653)];e.apply(null,t)}.bind(this)).catch(n.oe)}}]})},221:function(e,t,n){"use strict";var a=n(18),l=n(609),i=n(300);a.default.use(l.a);var o=new l.a.Store({modules:{select:i.a}});t.a=o},223:function(e,t){},224:function(e,t,n){function a(e){n(595)}var l=n(58)(n(301),n(604),a,null,null);e.exports=l.exports},299:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(18),l=n(224),i=n.n(l),o=n(220),r=n(221),u=n(122),c=n(219),s=n(222),h=n.n(s),p=n(223);n.n(p);a.default.config.productionTip=!1,a.default.use(h.a),a.default.use(c.a),new a.default({el:"#app",charts:[],store:r.a,router:o.a,axios:u.a,template:"<App/>",components:{App:i.a}})},300:function(e,t,n){"use strict";var a={state:{country:[{value:"zhinan",label:"上海",children:[{value:"baoshan",label:"宝山区",children:[{value:"yizhi",label:"XXXX"},{value:"fankui",label:"XXXX"},{value:"xiaolv",label:"XXXX"},{value:"kekong",label:"XXXX"}]},{value:"daohang",label:"黄埔区",children:[{value:"cexiangdaohang",label:"XXX"},{value:"dingbudaohang",label:"XXX"}]}]}],orderType:[{value:"",label:"订单类型"},{value:"1",label:"普通"},{value:"2",label:"生鲜"}],abnormalType:[{value:"",label:"异常类型"},{value:"1",label:"主动退单"},{value:"2",label:"无人抢单"},{value:"3",label:"超时未送"},{value:"4",label:"超时未达"},{value:"5",label:"商城关闭订单"},{value:"6",label:"客户拒单"},{value:"7",label:"商城退换货"}],abnormalStart:[{value:"",label:"异常状态"},{value:"1",label:"异常订单"},{value:"2",label:"正常订单"}],disposeType:[{value:"",label:"处理状态"},{value:"1",label:"全部"},{value:"2",label:"未处理"},{value:"3",label:"已处理"},{value:"4",label:"自动处理"}],orderStatus:[{value:"",label:"订单状态"},{value:"1",label:"待拣货"},{value:"2",label:"待验货"},{value:"3",label:"送货中"},{value:"3",label:"已送达"},{value:"4",label:"回退邮包"},{value:"5",label:"订单关闭"}],pushOrderType:[{value:"",label:"抢单状态"},{value:"1",label:"已抢单"},{value:"2",label:"未抢单"}],orderLevel:[{value:"",label:"订单评价"},{value:"1",label:"1星"},{value:"2",label:"2星"},{value:"3",label:"3星"},{value:"4",label:"4星"},{value:"5",label:"5星"}],personLevel:[{value:"",label:"等级"},{value:"1",label:"1星"},{value:"2",label:"2星"},{value:"3",label:"3星"},{value:"4",label:"4星"},{value:"5",label:"5星"}],category:[{value:"",label:"类别"},{value:"1",label:"员工"},{value:"2",label:"社会人"}],workStatus:[{value:"",label:"工作状态"},{value:"1",label:"抢单中"},{value:"2",label:"休息中"},{value:"3",label:"配送中"}],payStatus:[{value:"",label:"结算状态"},{value:"1",label:"未结算"},{value:"2",label:"已结算"}],accountStatus:[{value:"",label:"账号状态"},{value:"1",label:"正常"},{value:"2",label:"冻结"}],idStatus:[{value:"",label:"账号状态"},{value:"1",label:"已注册"},{value:"2",label:"未注册"}],timeBetween:[{value:"",label:"时间范围"},{value:"1",label:"最近7天"},{value:"2",label:"最近730天"},{value:"3",label:"全部"}]},mutations:{},actions:{}};t.a=a},301:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},302:function(e,t,n){"use strict";function a(){var e=this;i()(this.$el.querySelector(".vue-barcode-element"),this.value,{height:this.height||"50",font:this.font||"16",text:this.text||"",valid:function(t){e.valid=t}})}Object.defineProperty(t,"__esModule",{value:!0});var l=n(225),i=n.n(l);t.default={name:"barcode",data:function(){return{valid:!0}},props:{value:[String,Number],format:[String],width:[String,Number],height:[String,Number],text:[String,Number],fontOptions:[String],font:[String],textAlign:[String],textPosition:[String],textMargin:[String,Number],fontSize:[String,Number],background:[String],lineColor:[String],margin:[String,Number],marginTop:[String,Number],marginBottom:[String,Number],marginLeft:[String,Number],marginRight:[String,Number]},mounted:function(){this.$watch("$props",a,{deep:!0,immediate:!0}),a.call(this)}}},303:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(305),l=n.n(a);t.default={name:"hz-calendar",data:function(){var e=new Date;return{timeStart:"",timeEnd:"",editCalendarShow:!1,year:e.getFullYear(),tmpYear:e.getFullYear(),tmpMonth:e.getMonth()+1,disposeTime:{}}},mounted:function(){},methods:{selectDate:function(e){console.log(e),this.editCalendarShow=!0},editCalendarBtn:function(e){this.editCalendarShow=!1},prevMonth:function(){0===--this.tmpMonth&&(this.tmpMonth=12,this.tmpYear--)},nextMonth:function(){13===++this.tmpMonth&&(this.tmpMonth=1,this.tmpYear++)}},computed:{calendarData:function(){for(var e=new Date(this.tmpYear,this.tmpMonth,0).getDate(),t=l()({length:e},function(e,t){return{currentMonth:!0,value:t+1}}),n=new Date(this.tmpYear,this.tmpMonth-1,1).getDay(),a=new Date(this.tmpYear,this.tmpMonth-1,0).getDate(),i=0,o=n;i<o;i++)t=[{prevMonth:!0,value:a-i}].concat(t);for(var r=t.length,u=1;r<42;r++,u++)t[t.length]={nextMonth:!0,value:u};return console.log(t),t}}}},304:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(333),l=n.n(a);t.default={name:"echart",data:function(){return{legendArr:[],styleArr:[],myChart:{},name:"复杂柱状图"}},methods:{_init:function(){this.legendArr=this.myChart.getOption().series,this.legendArr.forEach(function(e){e.selected=!0}),window.addEventListener("resize",function(){this.myChart.resize()}.bind(this))}},mounted:function(){this.myChart=l.a.init(document.querySelector(".multipleColumn .main")),this.myChart.setOption({title:{x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",x:"left",data:["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"]},toolbox:{show:!0,feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["pie","funnel"],option:{funnel:{x:"25%",width:"50%",funnelAlign:"left",max:1548}}},restore:{show:!0},saveAsImage:{show:!0}}},calculable:!0,series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1548,name:"搜索引擎"}]}]}),this._init()}}},594:function(e,t){},595:function(e,t){},596:function(e,t){},597:function(e,t){},600:function(e,t,n){function a(e){n(597)}var l=n(58)(n(302),n(606),a,null,null);e.exports=l.exports},601:function(e,t,n){function a(e){n(594)}var l=n(58)(n(303),n(603),a,null,null);e.exports=l.exports},602:function(e,t,n){function a(e){n(596)}var l=n(58)(n(304),n(605),a,null,null);e.exports=l.exports},603:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hz-calendar"},[n("div",{staticClass:"calendar-select"},[n("div",{staticClass:"box-year"},[n("i",{staticClass:"el-icon-d-arrow-left",on:{click:e.prevMonth}}),e._v(" "),n("span",{domProps:{textContent:e._s(e.tmpYear)}}),e._v(" "),n("i",[e._v("-")]),e._v(" "),n("span",{domProps:{textContent:e._s(e.tmpMonth)}}),e._v(" "),n("i",{staticClass:"el-icon-d-arrow-right",on:{click:e.nextMonth}})])]),e._v(" "),e._m(0),e._v(" "),n("div",{staticClass:"calendar-day"},e._l(e.calendarData,function(t){return n("div",{staticClass:"calendar-data-item",class:{prevMonthDay:t.prevMonth,nextMonthDay:t.nextMonth},on:{click:function(n){e.selectDate(t.value)}}},[n("span",{domProps:{textContent:e._s(t.value)}}),e._v(" "),e._m(1,!0)])})),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.editCalendarShow,expression:"editCalendarShow"}],staticClass:"edit-calendar-win"},[n("el-form",[n("el-form-item",[n("el-time-select",{attrs:{"picker-options":{start:"08:30",step:"00:15",end:"18:30"},placeholder:"选择时间"},model:{value:e.timeStart,callback:function(t){e.timeStart=t},expression:"timeStart"}}),e._v(" "),n("el-time-select",{attrs:{"picker-options":{start:"10:00",step:"00:10",end:"18:30"},placeholder:"选择时间"},model:{value:e.timeEnd,callback:function(t){e.timeEnd=t},expression:"timeEnd"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"info"},on:{click:e.editCalendarBtn}},[e._v("确定")]),e._v(" "),n("el-button",{attrs:{type:"info"},on:{click:e.editCalendarBtn}},[e._v("取消")])],1)],1)],1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"calendar-week"},[n("div",{staticClass:"calendar-data-item"},[e._v("星期天")]),e._v(" "),n("div",{staticClass:"calendar-data-item"},[e._v("星期一")]),e._v(" "),n("div",{staticClass:"calendar-data-item"},[e._v("星期二")]),e._v(" "),n("div",{staticClass:"calendar-data-item"},[e._v("星期三")]),e._v(" "),n("div",{staticClass:"calendar-data-item"},[e._v("星期四")]),e._v(" "),n("div",{staticClass:"calendar-data-item"},[e._v("星期五")]),e._v(" "),n("div",{staticClass:"calendar-data-item"},[e._v("星期六")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("span",[e._v("8:00")]),e._v(":"),n("span",[e._v("12:00")])])}]}},604:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},605:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"multipleColumn"},[n("div",{staticClass:"main"})])}]}},606:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"barcode-group"},[n("svg",{directives:[{name:"show",rawName:"v-show",value:e.valid,expression:"valid"}],staticClass:"vue-barcode-element"})])},staticRenderFns:[]}}},[299]);
//# sourceMappingURL=app.26ba692d13557b6af2b3.js.map