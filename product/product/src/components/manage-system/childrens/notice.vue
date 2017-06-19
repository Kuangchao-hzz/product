<template>
  <div class="view-notice">
    <div class="notice-group">
      <el-button @click="createDialogForm.type = true">发布公告</el-button>
    </div>
    <div class="system-notice-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="内容">
        </el-table-column>
        <el-table-column
          prop="money"
          label="目标人群"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="发送时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            ><router-link to="/system/noticeDetails">查看详情</router-link></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="发布公告"
        :visible.sync="createDialogForm.type"
        size="small"
        :modal="false"
        :before-close="handleClose">
        <el-form
          :model="createDialogForm"
          label-width="80px">
          <el-form-item label="公告标题: ">
            <el-input v-model="createDialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="目标人群">
            <el-radio-group v-model="createDialogForm.resource">
              <el-radio label="1">所有人</el-radio>
              <el-radio label="2">员工</el-radio>
              <el-radio label="3">社会人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input type="textarea" v-model="createDialogForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="createDialogForm.type = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        createDialogForm: {
          type: false,
          resource: '1',
          desc: ''
        },
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
        }]
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
  .view-notice{
    .notice-group{
      margin-bottom: 20px;
    }
  }
</style>
