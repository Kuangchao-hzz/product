<template>
  <div class="delivery-personStore">
    <div class="search-table">
      <el-form>
        <el-row :gutter="10" style="margin-bottom: 15px">
          <el-col :span="5">
            <el-button :disabled="!btn_auth('b_mdry_xz')" @click="handlerData_edit" style="">新增用户</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  v-model="searchData.country"
                  :options="this.$store.state.select.country"
                  :props="this.$store.state.select.defaultCountryProps"
                  @change="fetchStoreData"
                  placeholder="请选择区域"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="searchData.storeId" placeholder="请选择门店">
                <el-option
                  v-for="($item, $index) in storeData"
                  :key="$index"
                  :label="$item.label"
                  :value="$item.val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="searchData.phone" placeholder="手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="data_table">查询</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-table">
      <el-table
        ref="multipleTable"
        :max-height="tabHeight"
        :height="tabHeight"
        :data="tableData.details"
        v-loading.body="loading"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          align="center"
          min-width="150"
          label="姓名">
          <template scope="scope">{{ scope.row.realName}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="storeName"
          label="门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
                       v-if="btn_auth('b_mdry_bj')"
                       @click="handlerData_edit(scope.row)"
            >编辑</el-button>
            <el-button type="text"
                       size="small"
                       v-if="btn_auth('b_mdry_sc')"
                       @click="handlerData_del(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-table-pagination">
      <el-pagination
        @current-change="data_table"
        :page-sizes="[20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.rowsCount">
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addUserForm.storeDialogIsShow"
      size="small"
      :before-close="handleClose">
      <el-form
        :model="addUserForm"
        ref="addUserForm"
        :rules="rules"
        label-width="80px">
        <el-form-item label="姓名: "
                      prop="realName">
          <el-input v-model="addUserForm.realName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号: "
                      prop="phone">
          <el-input v-model="addUserForm.phone"
                    placeholder="请输入手机号"
                    :disabled="disabledPhone"></el-input>
        </el-form-item>
        <el-form-item label="密码: "
                      prop="loginPwd">
          <el-input type="password" v-model="addUserForm.loginPwd" :placeholder="placeholderloginPwd"></el-input>
        </el-form-item>
        <el-form-item label="选择区域: "
                      prop="treeDialog.checkedValue"
                      class="area-box">
          <el-tree
            :data="this.treeCountry"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="defaultCheckedData"
            default-expand-all
            check-strictly>
          </el-tree>
        </el-form-item>
        <el-form-item style="margin: 0; text-align: right;">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="save_dataTable">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        validloginPwd: true,
        disabledPhone: false,
        dialogTitle: '新增门店人员',
        placeholderloginPwd: '请输入密码',
        loading: false,
        addUserForm: {
          id: '',
          realName: '',
          phone: '',
          loginPwd: '',
          storeId: [],
          storeDialogIsShow: false,
          treeDialog: {
            type: false,
            name: '',
            routerAuth: [],
            checkedValue: []
          }
        },
        searchData: {
          country: [],
          storeId: '',
          phone: ''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        storeData: [],
        tableData: [],
        rules: {
          realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          loginPwd: [
            { required: this.validloginPwd, message: '请输入密码', trigger: 'blur' }
          ],
          'treeDialog.checkedValue': [
            { type: 'array', required: true, message: '请选择区域', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      treeCountry () {
        return this.addUserForm.treeDialog.routerAuth
      },
      handlerCountryText () {
        return this.countryText.join('/')
      },
      defaultCheckedData () {
        return this.defaultCheckedKeys
      },
      tabHeight () {
        return this.$store.state.include.tableHeight - 355
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      handlerData_del ($row) {
        swal({
          title: '你确定要删除该员工?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定!',
          cancelButtonText: '取消'
        }).then(() => {
          apiTable.data_deliveryPersonStoreDel({
            id: $row.id
          }).then((response) => {
            this.data_table()
            this.$message({
              duration: 1500,
              message: '操作成功！'
            })
          })
        }, () => {

        })
      },
      handleClose (done) {
        this.addUserForm.id = ''
        this.addUserForm.realName = ''
        this.addUserForm.loginPwd = ''
        this.addUserForm.phone = ''
        this.addUserForm.storeDialogIsShow = false
        this.$refs['addUserForm'].resetFields()
        this.addUserForm.treeDialog = {
          type: false,
          name: '',
          routerAuth: this.$store.state.select.treeCountry
        }
        this.$refs.tree.setCheckedKeys([])
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
              if (roleIds.length > 1) {
                this.$message({
                  duration: 1500,
                  message: '只能选择一个门店'
                })
                return false
              }
              apiTable.data_deliveryPersonStoreSave({
                id: this.addUserForm.id,
                realName: this.addUserForm.realName,
                phone: this.addUserForm.phone,
                loginPwd: md5(this.addUserForm.loginPwd),
                storeId: roleIds.join('-')
              }).then((response) => {
                if (response.data.code === 1) {
                  this.data_table()
                  this.handleClose()
                  this.$message({
                    duration: 1500,
                    message: '操作成功！'
                  })
                }
              })
            } else {
              return false
            }
          })
        })
      },
      handlerData_edit ($row) {
        this.addUserForm.storeDialogIsShow = true
        this.get_allAreaAndStore()
        let self = this
        self.$nextTick(() => {
          if ($row.id) {
            self.dialogTitle = '编辑门店人员'
            let storeIdArr = $row.storeId.toString().split(',').map(($item) => {
              return parseInt($item)
            })
            this.disabledPhone = true
            this.validloginPwd = false
            this.placeholderloginPwd = '若不填写则不修改原始密码'
            this.$refs.tree.setCheckedKeys(storeIdArr)
            this.defaultCheckedKeys = storeIdArr
            this.addUserForm.id = $row.id
            this.addUserForm.loginPwd = ''
            this.addUserForm.realName = $row.realName
            this.addUserForm.phone = $row.phone
          } else {
            self.dialogTitle = '新增门店人员'
            this.placeholderloginPwd = '请输入密码'
            this.disabledPhone = false
            this.validloginPwd = true
            self.$refs.tree.setCheckedKeys([])
          }
        })
      },
      get_allAreaAndStore () {
        return new Promise(resolve => {
          apiTable.fetch_allAreaAndStore().then((response) => {
            let $data = response.data.dat
            this.iterationTree($data)
            this.addUserForm.treeDialog.routerAuth = $data
            resolve()
          })
        })
      },
      iterationTree ($data) {
        $data.forEach(($item, $index) => {
          if ($item.id < 20000) {
            Object.assign($item, {
              disabled: true
            })
          }
          if ($item.children && $item.children.length > 0) {
            this.iterationTree($item.children)
          }
        })
      },
      resetForm () {
        this.searchData.country = []
        this.searchData.storeId = ''
        this.searchData.phone = ''
      },
      fetchStoreData ($country) {
        this.get_storeOfArea($country[$country.length - 1])
      },
      get_storeOfArea ($district) {
        apiTable.fetch_storeOfArea({
          district: $district
        }).then((response) => {
          this.searchData.storeId = ''
          this.storeData = [{
            value: '',
            label: '请选择门店'
          }]
          this.storeData = this.storeData.concat(response.data.dat)
        })
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || 0,
          phone: self.searchData.phone,
          province: '',
          city: '',
          district: '',
          storeId: self.searchData.storeId
        }
        if (self.searchData.country.length > 0) {
          Object.assign($params, {
            province: self.searchData.country[0],
            city: self.searchData.country[1],
            district: self.searchData.country[2]
          })
        }
        self.loading = true
        apiTable.data_deliveryPersonStoreTable($params).then((response) => {
          self.loading = false
          if (response.data.code === 1) {
            self.tableData = response.data.dat
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .delivery-personStore{
    .content-table{
      margin-bottom: 20px;
    }
    .is-disabled .el-input__inner{
      color: #48576a !important;
    }
  }
</style>
