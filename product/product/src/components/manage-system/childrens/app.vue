<template>
  <div class="view-app">
    <div class="app-group">
      <el-button @click="createDialogForm.type = true">添加新版本</el-button>
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
          label="版本号">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="版本代号">
        </el-table-column>
        <el-table-column
          prop="money"
          label="类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="下载地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="是否强制升级"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="上传时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              type="text"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="发布新版本"
      :visible.sync="createDialogForm.type"
      size="small"
      :modal="false"
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
          <el-button type="primary" @click="onSubmit">确定</el-button>
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
        tableData: [{
          order: '48911891891',
          orderTime: '20170302',
          money: '￥1564',
          person: '007',
          mobile: '187*******',
          category: '已结算',
          level: '二级',
          place: '上海市-宝山区',
          moneyMethod: '已结算'
        }],
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
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
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
