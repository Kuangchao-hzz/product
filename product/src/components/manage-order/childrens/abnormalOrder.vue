<template>
  <div class="wait-abnormal-order">
    <div class="search-table">
      <el-form :inline="true">
        <el-row :gutter="10">
          <el-col :span="4">
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
          <el-col :span="4">
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
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="searchData.abnormalStatus" placeholder="异常类型">
                <el-option
                  v-for="item in this.$store.state.select.abnormalType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="searchData.handlerStatus" placeholder="处理状态">
                <el-option
                  v-for="item in this.$store.state.select.disposeType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="searchData.phone" placeholder="配送员联系方式"></el-input>
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
    <div class="wait-abnormal-table">
      <el-table
        :data="tableData.details"
        :height="tabHeight"
        :max-height="tabHeight"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          fixed
          type="expand">
          <template scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-button type="primary">
                <router-link :to="{path: '/order/orderDetails', query: { orderId: scope.row.orderId, detailsType: 2 }}" tag="span">查看详情</router-link>
              </el-button>
              <el-button v-if="scope.row.handlerStatus === 0 && scope.row.orderStatus !== 99" type="primary">退单</el-button>
              <el-button v-if="scope.row.handlerStatus === 0 && scope.row.orderStatus !== 99" type="primary" @click="HandleCloseOrder(scope.row.id)">关闭订单</el-button>
              <el-button v-if="scope.row.handlerStatus === 0 && scope.row.orderStatus !== 99" type="primary" @click="manualHandle(scope.row.id)">人工处理</el-button>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          min-width="200"
          align="center"
          label="订单编号">
          <template scope="scope">{{ scope.row.orderNo }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="80"
          prop="orderType"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="storeName"
          min-width="210"
          align="center"
          label="提货门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="mallTime"
          min-width="180"
          label="订单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="180"
          prop="scheduledTime"
          label="需要送达时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="订单状态"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.orderStatus === 10 ? '待抢单': ''}}
            {{scope.row.orderStatus === 20 ? '抢单中': ''}}
            {{scope.row.orderStatus === 30 ? '待拣货': ''}}
            {{scope.row.orderStatus === 40 ? '待验货': ''}}
            {{scope.row.orderStatus === 50 ? '送货中': ''}}
            {{scope.row.orderStatus === 60 ? '已送达': ''}}
            {{scope.row.orderStatus === 90 ? '已退单': ''}}
            {{scope.row.orderStatus === 91 ? '已拒单': ''}}
            {{scope.row.orderStatus === 99 ? '已关闭': ''}}
          </template>
        </el-table-column>
        <el-table-column
          label="异常类型"
          min-width="100"
          align="center"
          show-overflow-tooltip>
          <template scope="scope">
            <p v-if="scope.row.isAbnormal === 0">无异常</p>
            <p v-else>
              {{scope.row.abnormalStatus === 1 ? '无人抢单': ''}}
              {{scope.row.abnormalStatus === 2 ? '主动退单': ''}}
              {{scope.row.abnormalStatus === 3 ? '超时未送': ''}}
              {{scope.row.abnormalStatus === 4 ? '超时未达': ''}}
              {{scope.row.abnormalStatus === 5 ? '商城关闭': ''}}
              {{scope.row.abnormalStatus === 6 ? '客户拒单': ''}}
              {{scope.row.abnormalStatus === 7 ? '商城退换货': ''}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="处理状态"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template scope="scope">
            <p v-if="scope.row.isAbnormal === 0">无异常</p>
            <p v-else>
              {{scope.row.handlerStatus === 0 ? '未处理': ''}}
              {{scope.row.handlerStatus === -1 ? '自动处理': ''}}
              {{scope.row.handlerStatus === 1 ? '已处理': ''}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="配送员"
          min-width="150"
          align="center"
          show-overflow-tooltip>
          <template scope="scope">
            <p>{{scope.row.realName}}</p>
            <p>{{scope.row.phone}}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          fixed="right"
          label="操作">
          <template scope="scope">
            <router-link :to="{path: '/order/orderDetails', query: { orderId: scope.row.orderId, detailsType: 2 }}">查看详情</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="关闭订单"
      :visible.sync="closeOrderDialog"
      size="small"
      :before-close="handleClose">
      <el-form ref="form" :model="closeOrderForm" label-width="80px">
        <el-form-item label="关闭原因">
          <el-select v-model="closeOrderForm.reason" placeholder="请选择活动区域">
            <el-option label="客户拒单" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关闭备注">
          <el-input type="textarea" v-model="closeOrderForm.remake"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="closeOrder">确定</el-button>
          <el-button @click="closeOrderDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="wait-send-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info" @click="downloadExcel">导出excel</el-button>
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
        closeOrderDialog: false,
        searchData: {
          country: [],
          storeId: '',
          abnormalStatus: '',
          handlerStatus: '',
          phone: ''
        },
        storeData: [],
        tableData: [],
        closeOrderForm: {
          reason: '1',
          remake: '',
          id: ''
        }
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
      manualHandle ($id) {
        apiDetails.details_handleOrderManualHandle({
          id: $id
        }).then((response) => {
          this.$message('操作成功！')
        })
      },
      HandleCloseOrder ($id) {
        this.closeOrderDialog = true
        this.closeOrderForm.id = $id
      },
      handleClose (done) {
        this.closeOrderDialog = false
        this.closeOrderForm.reason = '1'
        this.closeOrderForm.remake = ''
        this.closeOrderForm.id = ''
      },
      resetForm () {
        this.storeData = []
        this.searchData.country = []
        this.searchData.abnormalStatus = ''
        this.searchData.handlerStatus = ''
        this.searchData.phone = ''
        this.searchData.storeId = ''
      },
      tableRowClassName (row, index) {
        if (index === 0) {
          return 'info-row-abnormal'
        } else if (index === 1) {
          return 'info-row-error'
        }
        return ''
      },
      closeOrder () {
        apiDetails.details_handleOrderClose(this.closeOrderForm).then((response) => {
          this.$message('操作成功！')
          this.data_table()
          this.handleClose()
        })
      },
      downloadExcel () {
        if (this.tableData.details.length < 1) {
          this.$message('无数据可导出！')
          return false
        }
        window.location.href = '/api/web/orderManage/exportAbnormal?'
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || 0,
          storeId: self.searchData.storeId,
          abnormalStatus: self.searchData.abnormalStatus,
          handlerStatus: self.searchData.handlerStatus,
          phone: self.searchData.phone,
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
        apiTable.data_orderAbnormalTable($params).then((response) => {
          self.tableData = response.data.dat
        })
      },
      lookDetails ($item) {
        this.$router.push('/order/abnormalDetails')
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  /*异常标签*/
  .wait-abnormal-tag{
    .el-tag{
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .wait-abnormal-table{
    margin-bottom: 20px;

  }
  .wait-send-pagination{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info-row-abnormal {
    background: #f60 !important;
    color: #fff !important;
    .el-table__expand-icon{
      color: #fff !important;
    }
    &:hover{
      background: #f60;
      >td, .el-table__expand-icon {
        background: #f60 !important;
      }
    }
  }
  .info-row-error {
    background: red !important;
    color: #fff;
    .el-table__expand-icon{
      color: #fff !important;
    }
    &:hover{
      background: red !important;
      >td, .el-table__expand-icon {
        background: red !important;
      }
    }
  }
</style>
