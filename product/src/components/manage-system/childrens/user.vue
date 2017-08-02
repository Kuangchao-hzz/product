<template>
  <div class="view-user">
    <div class="user-group">
      <el-button @click="handlerUserData_edit">新增用户</el-button>
    </div>
    <div class="system-user-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="employeeId"
          align="center"
          label="员工号">
        </el-table-column>
        <el-table-column
          prop="realName"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          label="联系方式"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="roleNames"
          align="center"
          label="角色"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          label="备注"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handlerUserData_edit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              v-if="scope.row.isEnabled === 1"
              @click="handler_dataTableLock(scope.row, 0)"
            >冻结</el-button>
            <el-button
              type="text"
              size="small"
              v-if="scope.row.isEnabled === 0"
              @click="handler_dataTableLock(scope.row, 1)"
            >解冻</el-button>
            <el-button
              type="text"
              size="small"
              @click="handlerUserData_del(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addUserForm.addUserIsShow"
      size="small"
      :before-close="handleClose">
      <el-form
        :model="addUserForm"
        ref="addUserForm"
        :rules="rules"
        label-width="80px">
        <el-form-item
          label="工号: "
          prop="employeeId">
          <el-input v-model="addUserForm.employeeId"></el-input>
        </el-form-item>
        <el-form-item label="姓名: "
                      prop="realName">
          <el-input v-model="addUserForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号: "
                      prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="remark">
          <el-input type="textarea" v-model="addUserForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="角色: "
                      prop="roleIds">
          <el-checkbox-group v-model="addUserForm.roleIds">
            <el-checkbox v-for="($item, $index) in roleList"
                         :key="$index"
                         :label="$item.val"
                         name="roleList">{{$item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择区域: "
                      prop="treeDialog.checkedValue"
                      class="area-box">
          <el-tree
            :data="addUserForm.treeDialog.routerAuth"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="defaultCheckedData"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item style="margin: 0; text-align: right;">
          <el-button @click="addUserForm.addUserIsShow = false">取消</el-button>
          <el-button type="primary" @click="save_dataTable">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        dialogTitle: '新增用户',
        tableData: [],
        roleList: [],
        defaultCheckedKeys: [],
        addUserForm: {
          id: '0',
          employeeId: '',
          realName: '',
          phone: '',
          remark: '',
          areaIds: [],
          roleIds: [],
          addUserIsShow: false,
          treeDialog: {
            type: false,
            name: '',
            routerAuth: this.$store.state.select.treeCountry,
            checkedValue: []
          }
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        countryText: [],
        rules: {
          employeeId: [
            { required: true, message: '请输入工号', trigger: 'blur' }
          ],
          realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入备注', trigger: 'blur' }
          ],
          roleIds: [
            { type: 'array', required: true, message: '请选择角色', trigger: 'blur' }
          ],
          'treeDialog.checkedValue': [
            { type: 'array', required: true, message: '请选择区域', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      handlerCountryText () {
        return this.countryText.join('/')
      },
      defaultCheckedData () {
        return this.defaultCheckedKeys
      }
    },
    mounted () {
      this.data_table()
      this.data_systemUserRoleList()
    },
    methods: {
      handleClose (done) {
        this.addUserForm.employeeId = ''
        this.addUserForm.realName = ''
        this.addUserForm.phone = ''
        this.addUserForm.remark = ''
        this.addUserForm.roleIds = []
        this.addUserForm.addUserIsShow = false
        this.$refs['addUserForm'].resetFields()
        this.addUserForm.treeDialog = {
          type: false,
          name: '',
          routerAuth: this.$store.state.select.treeCountry
        }
        this.$refs.tree.setCheckedKeys([])
      },
      submitForm () {
        let self = this
        let data = this.$refs.tree.getCheckedNodes()
        data.forEach(function ($item, $index) {
          self.addUserForm.area.push($item.id)
        })
      },
      data_table () {
        let self = this
        apiTable.data_systemUserAll().then((response) => {
          if (response.data.code === 1) {
            self.tableData = response.data.dat
          } else {
            swal(response.data.msg)
          }
        })
      },
      handler_dataTableLock ($row, $sta) {
        apiTable.edit_systemUserHandlerLock({
          userId: $row.id,
          lock: $sta
        }).then((response) => {
          if (response.data.code === 1) {
            let str = $sta === 1 ? '你确定解冻该用户?' : '你确定冻结该用户?'
            swal({
              title: str,
              type: 'warning',
              showCancelButton: true,
              reverseButtons: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '确定!',
              cancelButtonText: '取消'
            }).then(() => {
              this.data_table()
              swal('操作成功！')
            }, () => {

            })
          } else {
            swal(response.data.msg)
          }
        })
      },
      handlerUserData_edit ($row) {
        this.addUserForm.addUserIsShow = true
        let self = this
        self.$nextTick(function () {
          if ($row.id) {
            self.dialogTitle = '编辑用户'
            let roleIdsArr = $row.roleIds.split(',').map(($item) => {
              return parseInt($item)
            })
            let areaIdsArr = $row.areaIds.split('-').map(($item) => {
              return parseInt($item)
            })
            this.$refs.tree.setCheckedKeys(areaIdsArr)
            this.defaultCheckedKeys = areaIdsArr
            this.addUserForm.id = $row.id
            this.addUserForm.employeeId = $row.employeeId
            this.addUserForm.realName = $row.realName
            this.addUserForm.phone = $row.phone
            this.addUserForm.remark = $row.remark
            this.addUserForm.roleIds = roleIdsArr
          } else {
            self.dialogTitle = '新增用户'
            self.$refs.tree.setCheckedKeys([])
          }
        })
      },
      handlerUserData_del ($id) {
        swal({
          title: '你确定要删除该用户?',
          type: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定!',
          cancelButtonText: '取消'
        }).then(() => {
          apiTable.data_systemUserDel({
            userId: $id
          }).then((response) => {
            if (response.data.code === 1) {
              this.data_table()
              swal('操作成功！')
            } else {
              swal(response.data.msg)
            }
          })
        }, () => {

        })
      },
      save_dataTable () {
        new Promise(resolve => {
          this.addUserForm.treeDialog.checkedValue = this.$refs.tree.getCheckedNodes()
          resolve()
        }).then((resolve) => {
          this.$refs['addUserForm'].validate((valid) => {
            if (valid) {
              let roleIds = this.$refs.tree.getCheckedKeys().sort((a, b) => {
                return a - b
              })
              apiTable.data_systemUserSave({
                id: this.addUserForm.id,
                employeeId: this.addUserForm.employeeId,
                realName: this.addUserForm.realName,
                phone: this.addUserForm.phone,
                remark: this.addUserForm.remark,
                areaIds: roleIds.join('-'),
                roleIds: this.addUserForm.roleIds.join(',')
              }).then((response) => {
                if (response.data.code === 1) {
                  this.data_table()
                  this.handleClose()
                  swal('操作成功！')
                } else {
                  swal(response.data.msg)
                }
              })
            } else {
              return false
            }
          })
        })
      },
      // 递归区域
      recursiveArea ($keys, $checks) {
        let allarr = []
        $keys.forEach(($key) => {
          $checks.forEach(($check) => {
            let arr = ''
            console.log($check)
            arr += $check.id + '-'
            if ($check.children && $check.children.length > 0) {
              $check.children.forEach((_$check) => {
                arr += _$check.id + '-'
              })
            } else {
              allarr.push(arr)
            }
          })
        })
        console.log(allarr)
      },
      data_systemUserRoleList () {
        apiTable.data_systemUserRoleList().then((response) => {
          if (response.data.code === 1) {
            this.roleList = response.data.dat
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .view-user{
    .user-group{
      margin-bottom: 20px;
    }
    .area-box{
      .el-tree{
        height: 200px;
        overflow-y: auto;
        border: 1px #ddd solid;
        border-radius: 4px;
      }
    }
  }
</style>
