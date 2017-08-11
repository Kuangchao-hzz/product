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
          prop="order"
          align="center"
          label="版本号">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          align="center"
          label="版本代号">
        </el-table-column>
        <el-table-column
          prop="money"
          align="center"
          label="类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          align="center"
          label="下载地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          align="center"
          label="是否强制升级"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          align="center"
          label="上传时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作"
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
      :visible.sync="createDialogForm.type"
      size="small"
      :before-close="handleClose">
      <el-form
        :model="createDialogForm"
        label-width="80px">
        <el-form-item label="版本号: ">
          <el-input v-model="createDialogForm.version"></el-input>
        </el-form-item>
        <el-form-item label="版本代号: ">
          <el-input v-model="createDialogForm.exVersion"></el-input>
        </el-form-item>
        <el-form-item label="类型: ">
          <el-select v-model="createDialogForm.facility" placeholder="请选择类型">
            <el-option label="ios" value="ios"></el-option>
            <el-option label="android" value="android"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下载地址: ">
          <el-input v-model="createDialogForm.address"></el-input>
        </el-form-item>
        <el-form-item label="是否强制: ">
          <el-select v-model="createDialogForm.constraint" placeholder="请选择类型">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
          <el-button @click="createDialogForm.type = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        createDialogForm: {
          type: false,
          version: '',
          exVersion: '',
          facility: '',
          address: '',
          constraint: ''
        }
      }
    },
    methods: {
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      handlerApp ($row) {
        this.createDialogForm.type = true
        if ($row) {
          console.log($row)
        }
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
