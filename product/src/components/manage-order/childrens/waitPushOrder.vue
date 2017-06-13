<template>
  <div class="wait-push-order">
    <div class="search-table">
      <el-form :inline="true">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  :options="this.$store.state.select.country"
                  change-on-select
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.orderType" placeholder="订单类型">
                <el-option
                  v-for="item in this.$store.state.select.orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="wait-push-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="订单编号">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单类别">
        </el-table-column>
        <el-table-column
          prop="address"
          label="提货门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="送货地点"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name1"
          label="订单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="需要送达时间"
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
    <div class="wait-push-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info">回退邮包</el-button>
        <el-button :plain="true" type="info">手工推送</el-button>
        <el-button :plain="true" type="info">全部导出excel</el-button>
      </div>
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchData: {
          orderType: ''
        },
        tableData: [{
          date: '201705220001',
          name: '普通',
          address: '上海-新村门店',
          date1: '201705220001',
          address1: '上海-新村门店',
          date2: '201705220001'
        }, {
          date: '201705220001',
          name: '普通',
          address: '上海-新村门店',
          date1: '201705220001',
          name1: '普通',
          address1: '上海-新村门店',
          date2: '201705220001'
        }]
      }
    },
    methods: {
      submitForm () {
        alert(JSON.stringify(this.searchData))
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .wait-push-order{
    margin-bottom: 20px;
  }
  .wait-push-table{
    margin-bottom: 20px;
  }
  .wait-push-pagination{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-pagination__total{
      color: #fff;
    }
    .el-pagination__jump{
      color: #fff;
      input{
        color: #666;
      }
    }
  }
</style>
