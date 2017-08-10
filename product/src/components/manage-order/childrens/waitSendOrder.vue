<template>
  <div class="wait-send-order">
    <div class="search-table">
      <el-form :inline="true" :model="searchData" ref="searchData">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  v-model="searchData.country"
                  :options="this.$store.state.select.country"
                  :props="this.$store.state.select.defaultCountryProps"
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
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="data_table">查询</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="wait-send-table">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        :height="tabHeight"
        :max-height="tabHeight"
        v-loading.body="loading"
        border
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          fixed
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="200"
          label="订单编号">
          <template scope="scope">
            {{ scope.row.order_no }}
          </template>
        </el-table-column>
        <el-table-column
          prop="order_type"
          align="center"
          min-width="80"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="提货门店"
          min-width="210"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="receiver_address"
          align="center"
          label="送货地点"
          min-width="210"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mall_time"
          align="center"
          min-width="180"
          label="订单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="scheduled_time"
          align="center"
          min-width="180"
          label="预计推送时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="scheduled_push_time"
          align="center"
          min-width="180"
          label="需要送达时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          fixed="right"
          label="操作">
          <template scope="scope">
            <router-link :to="{path: '/order/orderDetails', query: { orderId: scope.row.id, detailsType: 1 }}">查看详情</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wait-send-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info" @click="handleOrderBackToYb">回退邮包</el-button>
        <el-button v-if="btn_auth('b_qt_qbdc_excel')" :plain="true" type="info" @click="downloadExcel">全部导出excel</el-button>
      </div>
      <el-pagination
        @current-change="data_table"
        :page-sizes="[20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.rowsCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  import apiDetails from '@/api/details'
  export default {
    data () {
      return {
        loading: false,
        searchData: {
          country: [],
          orderType: ''
        },
        tableData: [],
        multipleSelection: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 305
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      handleOrderBackToYb () {
        let $params = {}
        if (this.multipleSelection.length < 1) {
          this.$message('请勾选需要处理的列表！')
          return false
        }
        if (this.multipleSelection.length === 1) {
          $params = Object.assign({}, $params, {
            id: this.multipleSelection[0].id
          })
        } else {
          let ids = this.multipleSelection.map(($item) => {
            return $item.id
          })
          $params = Object.assign({}, $params, {
            ids: ids
          })
        }
        apiDetails.details_handleOrderBackToYb($params).then((response) => {
          this.$message('操作成功！')
          this.data_table()
        })
      },
      handleSelectionChange ($row) {
        this.multipleSelection = $row
      },
      resetForm () {
        this.searchData.country = []
        this.searchData.orderType = ''
      },
      downloadExcel () {
        if (this.tableData.details.length < 1) {
          this.$message('无数据可导出！')
          return false
        }
        window.location.href = '/api/web/orderManage/exportDtOrder?'
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || 0,
          city: '',
          province: '',
          district: '',
          orderType: this.searchData.orderType
        }
        if (self.searchData.country.length > 0) {
          Object.assign($params, {
            province: self.searchData.country[0],
            city: self.searchData.country[1],
            district: self.searchData.country[2]
          })
        }
        self.loading = true
        apiTable.data_orderSendTable($params).then((response) => {
          self.loading = false
          self.tableData = response.data.dat
        })
      }
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
  }
</style>
