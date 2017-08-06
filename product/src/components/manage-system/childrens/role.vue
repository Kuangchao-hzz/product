<template>
  <div class="view-role">
    <div class="role-group">
      <el-button @click="get_roleData">新增角色</el-button>
    </div>
    <div class="system-role-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        :height="tabHeight"
        :max-height="tabHeight"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="roleName"
          align="center"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="authNames"
          align="center"
          label="操作权限">
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template scope="scope">
            <el-button
              type="text"
              size="small"
              @click="get_roleData(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="del_roleData(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="roleDialogIsShow"
      size="small"
      :before-close="handleClose">
      <el-form
        :model="roleList"
        ref="roleList"
        :rules="rules"
        label-width="80px">
        <el-form-item
          label="角色名称: "
          prop="name">
          <el-input v-model="roleList.name"></el-input>
        </el-form-item>
        <el-form-item
          label="操作权限: "
          prop="checkedValue">
          <el-tree
            :data="roleList.routerAuth"
            ref="tree"
            show-checkbox
            node-key="id"
            :default-checked-keys="syncDefaultCheckedData"
            :default-expanded-keys="syncDefaultCheckedData"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit_roleData">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
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
        roleDialogIsShow: false,
        tableData: [],
        roleList: {
          type: false,
          name: '',
          routerAuth: [],
          checkedValue: []
        },
        roleId: '',
        defaultCheckedData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          checkedValue: [
            { type: 'array', required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      syncDefaultCheckedData () {
        return this.defaultCheckedData.map(($item) => {
          return parseInt($item)
        })
      },
      tabHeight () {
        return this.$store.state.include.tableHeight - 250
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      handleClose (done) {
        this.roleDialogIsShow = false
        this.roleList.routerAuth = []
        this.roleList.name = ''
        this.$refs['roleList'].resetFields()
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([])
        })
      },
      data_table () {
        let self = this
        apiTable.data_roleTable().then((response) => {
          self.tableData = response.data.dat
        })
      },
      // 添加角色
      get_roleData ($item) {
        let self = this
        self.roleDialogIsShow = true
        self.treeType = '0'
        self.$nextTick(() => {
          if ($item.id) {
            self.dialogTitle = '编辑角色'
            self.defaultCheckedData = $item.authIds.split(',')
            self.roleList.name = $item.roleName
            self.treeType = $item.id
          } else {
            self.dialogTitle = '新增角色'
            self.$refs.tree.setCheckedKeys([])
          }
          apiTable.data_systemRoleDate().then((response) => {
            self.roleList.routerAuth = response.data.dat
          })
        })
      },
      edit_roleData () {
        new Promise(resolve => {
          this.roleList.checkedValue = this.$refs.tree.getCheckedNodes()
          resolve()
        }).then((resolve) => {
          this.$refs['roleList'].validate((valid) => {
            if (valid) {
              let checkData = this.$refs['tree'].getCheckedNodes()
              let authIdsArr = []
              checkData.forEach(function ($item, $index) {
                authIdsArr.push($item.id)
              })
              apiTable.data_systemRoleSave({
                id: this.treeType,
                roleName: this.roleList.name,
                authIds: authIdsArr.join(',')
              }).then((response) => {
                this.$message('保存成功！')
                this.handleClose()
                this.data_table()
              })
            } else {
              console.log(this.roleList.checkedValue)
              return false
            }
          })
        })
      },
      del_roleData ($userId) {
        swal({
          title: '你确定要删除该角色?',
          type: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定!',
          cancelButtonText: '取消'
        }).then(() => {
          apiTable.data_systemUserDel({
            userId: $userId
          }).then((response) => {
            if (response.data.code === 1) {
              this.data_table()
              this.$message('删除成功！')
            } else {
              swal(response.data.code)
            }
          })
        }, () => {

        })
      }
    },
    watch: {
      roleDialogIsShow () {
        if (this.roleDialogIsShow) {

        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .view-role{
    .role-group{
      margin-bottom: 20px;
    }
  }
</style>
