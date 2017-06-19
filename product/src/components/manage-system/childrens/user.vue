<template>
  <div class="view-user">
    <div class="user-group">
      <el-button @click="createDialogForm.type = true">新增用户</el-button>
    </div>
    <div class="system-user-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="员工号">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="money"
          label="联系方式"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="区域"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="角色"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="备注"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
            >冻结</el-button>
            <el-button
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="createDialogForm.type"
      size="small"
      :modal="false"
      :before-close="handleClose">
      <el-form
        :model="createDialogForm"
        label-width="80px">
        <el-form-item label="工号: ">
          <el-input v-model="createDialogForm.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名: ">
          <el-input v-model="createDialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号: ">
          <el-input v-model="createDialogForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="createDialogForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="角色: ">
          <el-checkbox-group v-model="createDialogForm.type">
            <el-checkbox label="1" name="type">业务经理</el-checkbox>
            <el-checkbox label="2" name="type">地推活动</el-checkbox>
            <el-checkbox label="3" name="type">客户经理</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="区域">
          <div class="country-select">
            <el-cascader
              :options="this.$store.state.select.country"
              change-on-select
            ></el-cascader>
          </div>
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
        createDialogForm: {
          type: false,
          name: ''
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
  .view-user{
    .user-group{
      margin-bottom: 20px;
    }
  }
</style>
