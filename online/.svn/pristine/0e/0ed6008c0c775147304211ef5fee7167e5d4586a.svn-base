<template>
  <div class="view-app">
    <div class="app-group">
      <el-button>添加新版本</el-button>
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
  .view-app{
    .app-group{
      margin-bottom: 20px;
    }
  }
</style>
