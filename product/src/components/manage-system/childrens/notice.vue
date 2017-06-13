<template>
  <div class="view-notice">
    <div class="notice-group">
      <el-button>发布公告</el-button>
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
            >查看详情</el-button>
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
  .view-notice{
    .notice-group{
      margin-bottom: 20px;
    }
  }
</style>
