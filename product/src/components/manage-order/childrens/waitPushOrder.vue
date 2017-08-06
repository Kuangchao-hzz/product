<template>
  <div class="wait-push-order">
    <div class="search-table">
      <el-form :inline="true">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  v-model="searchData.country"
                  :options="this.$store.state.select.country"
                  :props="this.$store.state.select.defaultCountryProps"
                  @change="fetchStoreData"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="searchData.storeId" placeholder="请选择门店">
                <el-option
                  v-for="($item, $index) in storeData"
                  :key="$index"
                  :label="$item.label"
                  :value="$item.val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="searchData.orderType" placeholder="订单类型">
                <el-option
                  v-for="($item, $index) in this.$store.state.select.orderType"
                  :label="$item.label"
                  :value="$item.value"
                  :key="$index"></el-option>
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
    <div class="wait-push-table">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        :height="tabHeight"
        :max-height="tabHeight"
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
            {{ scope.row.orderNo }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderType"
          min-width="80"
          label="类型">
        </el-table-column>
        <el-table-column
          align="center"
          prop="storeName"
          min-width="210"
          label="提货门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="receiverAddress"
          label="送货地点"
          min-width="210"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderTime"
          label="订单时间"
          min-width="180"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="scheduledTime"
          label="需要送达时间"
          min-width="180"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          fixed="right"
          label="操作">
          <template scope="scope">
            <router-link :to="{path: '/order/orderDetails', query: { orderId: scope.row.orderId, detailsType: 1 }}">查看详情</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wait-push-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info" @click="handleOrderBackToYb">回退邮包</el-button>
        <el-button :plain="true" type="info" @click="handleOrderRePush">手工推送</el-button>
        <el-button :plain="true" type="info" @click="downloadExcel">全部导出excel</el-button>
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
        searchData: {
          orderType: '',
          country: [],
          storeId: ''
        },
        storeData: [],
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
      fetchStoreData ($country) {
        this.get_storeOfArea($country[$country.length - 1])
      },
      get_storeOfArea ($district) {
        apiTable.fetch_storeOfArea({
          district: $district
        }).then((response) => {
          this.searchData.storeId = ''
          this.storeData = [{
            value: '',
            label: '请选择门店'
          }]
          this.storeData = this.storeData.concat(response.data.dat)
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
            id: this.multipleSelection[0].orderId
          })
        } else {
          let ids = this.multipleSelection.map(($item) => {
            return $item.orderId
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
      handleOrderRePush () {
        let $params = {}
        if (this.multipleSelection.length < 1) {
          this.$message('请勾选需要处理的列表！')
          return false
        }
        if (this.multipleSelection.length === 1) {
          $params = Object.assign({}, $params, {
            id: this.multipleSelection[0].orderId
          })
        } else {
          let ids = this.multipleSelection.map(($item) => {
            return $item.orderId
          })
          $params = Object.assign({}, $params, {
            ids: ids
          })
        }
        apiDetails.details_handleOrderRePush($params).then((response) => {
          this.$message('操作成功！')
          this.data_table()
        })
      },
      handleSelectionChange ($row) {
        this.multipleSelection = $row
      },
      resetForm () {
        this.storeData = []
        this.searchData.country = []
        this.searchData.orderType = ''
        this.searchData.storeId = ''
      },
      downloadExcel () {
        if (this.tableData.details.length < 1) {
          this.$message('无数据可导出！')
          return false
        }
        window.location.href = '/api/web/orderManage/exportDqOrder?'
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || 0,
          orderType: this.searchData.orderType,
          storeId: this.searchData.storeId,
          city: '',
          province: '',
          district: ''
        }
        if (self.searchData.country.length > 0) {
          Object.assign($params, {
            city: self.searchData.country[1],
            province: self.searchData.country[0],
            district: self.searchData.country[2]
          })
        }
        apiTable.data_orderPushTable($params).then((response) => {
          self.tableData = response.data.dat
        })
      },
      lookDetails ($item) {
        this.$router.push('/order/details')
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .wait-push-table{
    margin-bottom: 20px;
  }
  .wait-push-pagination{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
