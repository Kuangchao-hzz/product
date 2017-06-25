<template>
  <div class="wait-send-order">
    <div class="search-table">
      <el-form :inline="true">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  :options="this.$store.state.select.country"
                  change-on-select
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
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
    <div class="wait-send-table">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        :height="600"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          label="订单编号">
          <template scope="scope">
            {{ scope.row.order_no }}
          </template>
        </el-table-column>
        <el-table-column
          prop="order_type"
          align="center"
          label="订单类别">
        </el-table-column>
        <el-table-column
          prop="name"
          label="提货门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="receiver_address"
          align="center"
          label="送货地点"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mall_time"
          align="center"
          label="订单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="scheduled_time"
          align="center"
          label="预计推送时间"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="scheduled_push_time"
          align="center"
          label="需要送达时间"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="操作">
          <template scope="scope">
            <el-button type="text"
              size="small"><router-link :to="{path: '/order/details', query: { orderNo: scope.row.order_no }}">查看详情</router-link></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wait-send-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info">回退邮包</el-button>
        <el-button :plain="true" type="info">全部导出excel</el-button>
      </div>
      <el-pagination
        @current-change="data_tableSendTable"
        :page-sizes="[20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        searchData: {
          orderType: ''
        },
        tableData: []
      }
    },
    mounted () {
      this.data_tableSendTable()
    },
    methods: {
      data_tableSendTable ($page) {
        let self = this
        let params = {
          page: $page - 1 || 0,
          orderType: this.searchData.orderType || '普通',
          area: '1' || 1
        }
        apiTable.data_tableSendTable(params).then((response) => {
          self.tableData = response.data.dat
        })
      },
      submitForm () {
        alert(JSON.stringify(this.searchData))
      }
    },
    filters: {

    }
  }
</script>

<style lang="scss" type="text/scss">
  .wait-send-table{
    margin-bottom: 20px;
  }
  .wait-send-pagination{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-pagination__total{
      color: #fff;
    }
    .el-pagination__jump{
      input{
        color: #666;
      }
    }
  }
</style>
