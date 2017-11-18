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
                  placeholder="请选择区域"
                  @change="fetchStoreData"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-cascader
                v-model="searchData.storeId"
                :props="defaultProps"
                :options="storeData"
                placeholder="请选择区域"
                style="width: 100%;"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input
                v-model="searchData.orderNo"
                placeholder="订单编号"></el-input>
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
        :row-class-name="tableRowClassName"
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
          prop="orderTime"
          align="center"
          min-width="180"
          label="用户下单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mall_time"
          align="center"
          min-width="180"
          label="邮包推送时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="scheduled_push_time"
          min-width="180"
          label="预计推送时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="scheduled_time"
          align="center"
          min-width="180"
          label="期望送达时间"
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
        <el-button :disabled="!btn_auth('b_qt_qbdc_excel')" :plain="true" type="info" @click="downloadExcel">全部导出excel</el-button>
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
  import moment from 'moment'
  import qs from 'qs'
  export default {
    data () {
      return {
        loading: false,
        storeData: [],
        searchData: {
          page: 0,
          storeId: [],
          country: [],
          orderType: '',
          orderNo: '',
          localStorage: true
        },
        defaultProps: {
          value: 'val',
          label: 'label',
          children: 'children'
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
      var $data = JSON.parse(localStorage.getItem('sendOrder_search'))
      if ($data && $data.localStorage) {
        this.searchData = $data
        this.storeData = JSON.parse(localStorage.getItem('ms_storeIds'))
      }
      this.data_table()
    },
    methods: {
      tableRowClassName ($row) {
        let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        if (moment(now).diff(moment($row.scheduled_time)) > 0) {
          return 'order-abnormal'
        }
      },
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      fetchStoreData ($country) {
        this.get_storeOfArea($country[$country.length - 1])
      },
      get_storeOfArea ($district) {
        apiTable.fetch_storeOfArea({
          district: $district
        }).then((response) => {
          if (response.data.code === 1) {
            this.searchData.storeId = []
            this.storeData = [{
              value: '',
              label: '请选择门店'
            }]
            this.storeData = this.storeData.concat(response.data.dat)
          }
        })
      },
      handleOrderBackToYb () {
        swal({
          title: '你确定要回退邮包?',
          type: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          let $params = {}
          if (this.multipleSelection.length < 1) {
            this.$message({
              duration: 1500,
              message: '请勾选需要处理的列表！'
            })
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
            if (response.data.code === 1) {
              this.$message({
                duration: 1500,
                message: '操作成功！'
              })
              this.data_table()
            }
          })
        }, () => {

        })
      },
      handleSelectionChange ($row) {
        this.multipleSelection = $row
      },
      resetForm () {
        this.searchData.country = []
        this.searchData.orderType = ''
        this.searchData.orderNo = ''
        this.searchData.storeId = []
        this.data_table()
      },
      downloadExcel () {
        if (this.tableData.details.length < 1) {
          this.$message({
            duration: 1500,
            message: '无数据可导出！'
          })
          return false
        }
        let $params = Object.assign({}, this.searchData, {
          city: '',
          province: '',
          district: ''
        })
        if (this.searchData.country.length > 0) {
          Object.assign($params, {
            province: this.searchData.country[0],
            city: this.searchData.country[1],
            district: this.searchData.country[2]
          })
        }
        window.location.href = '/api/web/orderManage/exportDtOrder?' + qs.stringify($params)
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || this.searchData.page,
          city: '',
          province: '',
          storeId: self.searchData.storeId.join(','),
          district: '',
          orderNo: this.searchData.orderNo,
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
          if (response.data.code === 1) {
            localStorage.setItem('sendOrder_search', JSON.stringify(self.searchData))
            localStorage.setItem('ms_storeIds', JSON.stringify(self.storeData))
            self.tableData = response.data.dat
          }
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.path !== '/order/orderDetails') {
        localStorage.setItem('sendOrder_search', null)
      }
      next()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .wait-send-table{
    margin-bottom: 20px;
    .order-abnormal{
      background: red;
    }
  }
  .wait-send-pagination{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
