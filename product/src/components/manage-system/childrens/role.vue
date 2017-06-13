<template>
  <div class="view-role">
    <div class="role-group">
      <el-button>新增用户</el-button>
    </div>
    <div class="system-role-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="操作权限">
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
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
        }]
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
