webpackJsonp([25],{1801:function(e,t,a){function o(e){a(1912)}var l=a(118)(a(1849),a(1962),o,null,null);e.exports=l.exports},1849:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(121),l=a.n(o),r=a(359);t.default={data:function(){return{loading:!1,dialogTitle:"新增用户",roleDialogIsShow:!1,tableData:[],roleList:{type:!1,name:"",routerAuth:[],checkedValue:[]},roleId:"",defaultCheckedData:[],defaultProps:{children:"children",label:"label"},rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"}],checkedValue:[{type:"array",required:!0,message:"请选择活动区域",trigger:"change"}]}}},computed:{syncDefaultCheckedData:function(){return this.defaultCheckedData.map(function(e){return parseInt(e)})},tabHeight:function(){return this.$store.state.include.tableHeight-250}},mounted:function(){this.data_table()},methods:{btn_auth:function(e){return this.$store.state.user.AUTHIDS.split(",").some(function(t){return t===e})},handleClose:function(e){var t=this;this.roleDialogIsShow=!1,this.roleList.routerAuth=[],this.roleList.name="",this.$refs.roleList.resetFields(),this.$nextTick(function(){t.$refs.tree.setCheckedKeys([])})},data_table:function(){var e=this;e.loading=!0,r.a.data_roleTable().then(function(t){e.loading=!1,e.tableData=t.data.dat})},get_roleData:function(e){var t=this;t.roleDialogIsShow=!0,t.treeType="0",t.$nextTick(function(){e.id?(t.dialogTitle="编辑角色",t.defaultCheckedData=e.authIds.split(","),t.roleList.name=e.roleName,t.treeType=e.id):(t.dialogTitle="新增角色",t.$refs.tree.setCheckedKeys([])),r.a.data_systemRoleDate().then(function(e){t.roleList.routerAuth=e.data.dat})})},edit_roleData:function(){var e=this;new l.a(function(t){e.roleList.checkedValue=e.$refs.tree.getCheckedNodes(),t()}).then(function(t){e.$refs.roleList.validate(function(t){if(!t)return console.log(e.roleList.checkedValue),!1;var a=e.$refs.tree.getCheckedNodes(),o=[];a.forEach(function(e,t){o.push(e.id)}),r.a.data_systemRoleSave({id:e.treeType,roleName:e.roleList.name,authIds:o.join(",")}).then(function(t){e.$message("保存成功！"),e.handleClose(),e.data_table()})})})},del_roleData:function(e){var t=this;swal({title:"你确定要删除该角色?",type:"warning",showCancelButton:!0,reverseButtons:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"确定!",cancelButtonText:"取消"}).then(function(){r.a.data_systemUserDel({userId:e}).then(function(e){1===e.data.code?(t.data_table(),t.$message("删除成功！")):swal(e.data.code)})},function(){})}},watch:{roleDialogIsShow:function(){this.roleDialogIsShow}}}},1875:function(e,t,a){t=e.exports=a(1772)(!0),t.push([e.i,".view-role .role-group{margin-bottom:20px}","",{version:3,sources:["D:/www.github.com/project/product/src/components/manage-system/childrens/role.vue"],names:[],mappings:"AACA,uBACE,kBAAoB,CACrB",file:"role.vue",sourcesContent:["\n.view-role .role-group {\n  margin-bottom: 20px;\n}\n"],sourceRoot:""}])},1912:function(e,t,a){var o=a(1875);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a(1773)("a4ddb93e",o,!0)},1962:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"view-role"},[a("div",{staticClass:"role-group"},[e.btn_auth("b_jz_xzyh")?a("el-button",{on:{click:e.get_roleData}},[e._v("新增角色")]):e._e()],1),e._v(" "),a("div",{staticClass:"system-role-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loading,expression:"loading",modifiers:{body:!0}}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,height:e.tabHeight,"max-height":e.tabHeight,border:"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"roleName",align:"center",label:"角色"}}),e._v(" "),a("el-table-column",{attrs:{prop:"authNames",align:"center",label:"操作权限"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.get_roleData(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.del_roleData(t.row.id)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.roleDialogIsShow,size:"small","before-close":e.handleClose},on:{"update:visible":function(t){e.roleDialogIsShow=t}}},[a("el-form",{ref:"roleList",attrs:{model:e.roleList,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"角色名称: ",prop:"name"}},[a("el-input",{model:{value:e.roleList.name,callback:function(t){e.roleList.name=t},expression:"roleList.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"操作权限: ",prop:"checkedValue"}},[a("el-tree",{ref:"tree",attrs:{data:e.roleList.routerAuth,"show-checkbox":"","node-key":"id","default-checked-keys":e.syncDefaultCheckedData,"default-expanded-keys":e.syncDefaultCheckedData,props:e.defaultProps}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.edit_roleData}},[e._v("确定")]),e._v(" "),a("el-button",{on:{click:e.handleClose}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=25.c92afc67015cdccf791b.js.map