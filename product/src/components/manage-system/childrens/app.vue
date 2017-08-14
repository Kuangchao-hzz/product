<template>
  <div class="view-app">
    <div class="app-group">
      <el-button :disabled="!btn_auth('b_app_tjxbb')" @click="handlerApp">添加新版本</el-button>
    </div>
    <div class="system-app-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="versionNo"
          align="center"
          label="版本号">
        </el-table-column>
        <el-table-column
          prop="versionSign"
          align="center"
          label="版本代号">
        </el-table-column>
        <el-table-column
          prop="clientType"
          align="center"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="downloadUrl"
          align="center"
          label="下载地址">
        </el-table-column>
        <el-table-column
          align="center"
          label="是否强制升级">
          <template scope="scope">
            {{scope.row.isForceUpgrade === 0? '否':'是'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="uploadTime"
          align="center"
          label="上传时间">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handlerApp(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="发布新版本"
      :visible.sync="dialogFormStatus"
      size="small"
      :before-close="handleClose">
      <el-form
        :model="dialogFormData"
        ref="dialogFormData"
        :rules="rules"
        label-width="80px">
        <el-form-item
          label="版本号: "
          prop="versionNo">
          <el-input v-model="dialogData.versionNo"></el-input>
        </el-form-item>
        <el-form-item
          label="版本代号: "
          prop="versionSign">
          <el-input v-model="dialogData.versionSign"></el-input>
        </el-form-item>
        <el-form-item label="类型: ">
          <el-select v-model="dialogData.clientType" placeholder="请选择类型">
            <el-option label="ios" value="ios"></el-option>
            <el-option label="android" value="android"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="下载地址: "
          prop="downloadUrl">
          <el-input v-model="dialogData.downloadUrl"></el-input>
        </el-form-item>
        <el-form-item label="是否强制: ">
          <el-select v-model="dialogData.isForceUpgrade" placeholder="请选择类型">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handle_appVersion">确定</el-button>
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
        tableData: [],
        dialogFormData: {
          versionNo: '',
          versionSign: '',
          clientType: 'ios',
          downloadUrl: '',
          isForceUpgrade: '1',
          id: null
        },
        dialogFormStatus: false,
        rules: {
          versionNo: [
            { required: true, message: '请输入版本号', trigger: 'blur' }
          ],
          versionSign: [
            { required: true, message: '请输入版本代号', trigger: 'blur' }
          ],
          downloadUrl: [
            { required: true, message: '请输入下载地址', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      dialogData () {
        return this.dialogFormData
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      data_table ($page) {
        let self = this
        apiTable.data_appVersionTable({
          page: $page - 1 || 0
        }).then((response) => {
          self.tableData = response.data.dat
        })
      },
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      handleClose (done) {
        this.dialogFormStatus = false
        this.dialogFormData.versionNo = ''
        this.dialogFormData.versionSign = ''
        this.dialogFormData.clientType = 'ios'
        this.dialogFormData.downloadUrl = ''
        this.dialogFormData.isForceUpgrade = '1'
        this.dialogFormData.id = null
      },
      handlerApp ($row) {
        this.dialogFormStatus = true
        if ($row.id) {
          let $data = Object.assign({}, $row)
          $data.isForceUpgrade = $data.isForceUpgrade.toString()
          delete $data.uploadTime
          this.dialogFormData = $data
        }
      },
      handle_appVersion () {
        this.$refs['dialogFormData'].validate((valid) => {
          if (valid) {
            let $params = this.dialogFormData
            apiTable.edit_systemVersionData($params).then((response) => {
              this.$message('操作成功！')
              this.handleClose()
              this.data_table()
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .view-app{
    .app-group{
      margin-bottom: 20px;
    }
  }
</style>
