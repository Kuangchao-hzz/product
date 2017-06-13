<template>
  <div class="delivery-level">
    <div class="delivery-level-tag">
      <el-tag>配送等级接单规则</el-tag>
    </div>
    <div class="delivery-level-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="等级">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="订单类别">
        </el-table-column>
        <el-table-column
          prop="money"
          label="订单价格上限"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="订单每日上限"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="delivery-level-tag">
      <el-tag>配送等级自动升级规则</el-tag>
    </div>
    <div class="delivery-level-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="等级">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="工作年限(月)">
        </el-table-column>
        <el-table-column
          prop="money"
          label="接单量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="准达率"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="退单率"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            >编辑</el-button>
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
  .delivery-level{
    .delivery-level-tag{
      .el-tag{
        padding:15px;
        line-height: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        background: #dfe6ec;
        color: #1f2d3d;
        font-weight: 600;
      }
    }
    .delivery-level-table{
      margin-bottom: 20px;
    }
  }
</style>
