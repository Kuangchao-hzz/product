<template>
  <div class="wait-all-order">
    <div class="search-table">
      <el-form :inline="true" class="search-form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <el-input
                v-model="searchData.orderNo"
                placeholder="订单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="searchData.phone" placeholder="配送员联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-date-picker
                v-model="searchData.mallTime"
                type="daterange"
                placeholder="订单时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-date-picker
                v-model="searchData.arriveTime"
                type="daterange"
                placeholder="订单时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  v-model="searchData.country"
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
              <el-select v-model="searchData.orderStatus" placeholder="订单状态">
                <el-option
                  v-for="item in this.$store.state.select.orderStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.grabStatus" placeholder="抢单状态">
                <el-option
                  v-for="item in this.$store.state.select.pushOrderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.markScore" placeholder="订单评价">
                <el-option
                  v-for="item in this.$store.state.select.orderLevel"
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
    <div class="wait-all-order">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        :height="tabHeight"
        :max-height="tabHeight"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-button type="primary">
                <router-link :to="{path: '/order/orderDetails', query: { orderId: scope.row.id, detailsType: 3 }}" tag="span">订单详情</router-link>
              </el-button>
              <el-button v-if="scope.row.orderStatus !== 99" type="primary">退单</el-button>
              <el-button v-if="scope.row.orderStatus !== 99" type="primary" @click="HandleCloseOrder(scope.row.id)">关闭订单</el-button>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="200"
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
          align="center"
          min-width="210"
          prop="storeName"
          label="提货门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="210"
          prop="receiverAddress"
          label="送货地点"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="180"
          prop="orderTime"
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
          label="推送状态"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.isPushed === 0 ? '未推送': ''}}
            {{scope.row.isPushed === 1 ? '已推送': ''}}
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
          label="是否异常"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template scope="scope">
            <p v-if="scope.row.isAbnormal === 0">无异常</p>
            <p v-else>
              {{scope.row.isAbnormal === 1 ? '无人抢单': ''}}
              {{scope.row.isAbnormal === 2 ? '主动退出': ''}}
              {{scope.row.isAbnormal === 3 ? '超时未送': ''}}
              {{scope.row.isAbnormal === 4 ? '超时未达': ''}}
              {{scope.row.isAbnormal === 5 ? '商城关闭': ''}}
              {{scope.row.isAbnormal === 6 ? '客户拒单': ''}}
              {{scope.row.isAbnormal === 7 ? '商城退换货': ''}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          fixed="right"
          label="操作">
          <template scope="scope">
            <router-link :to="{path: '/order/orderDetails', query: { orderId: scope.row.id, detailsType: 3 }}">查看详情</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  import apiDetails from '@/api/details'
  export default {
    data () {
      return {
        searchData: {
          country: [],
          orderNo: '',
          orderType: '',
          storeId: '',
          mallTime: '',
          arriveTime: '',
          grabStatus: '',
          orderStatus: '',
          markScore: '',
          phone: ''
        },
        tableData: [],
        closeOrderForm: {
          reason: '1',
          remake: '',
          id: ''
        },
        closeOrderDialog: false
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 345
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
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
      closeOrder () {
        apiDetails.details_handleOrderClose(this.closeOrderForm).then((response) => {
          if (response.data.code !== 1) {
            swal(response.data.msg)
          } else {
            swal('操作成功！')
            this.data_table()
            this.handleClose()
          }
        })
      },
      resetForm () {
        this.searchData.country = []
        this.searchData.orderType = ''
        this.searchData.orderNo = ''
        this.searchData.storeId = ''
        this.searchData.mallTime = ''
        this.searchData.arriveTime = ''
        this.searchData.grabStatus = ''
        this.searchData.orderStatus = ''
        this.searchData.markScore = ''
        this.searchData.phone = ''
        this.data_table()
      },
      downloadExcel () {
        if (this.tableData.details.length < 1) {
          swal('无数据可导出！')
          return false
        }
        window.location.href = '/api/web/orderManage/exportAllOrder?'
      },
      lookDetails ($item) {
        this.$router.push('/order/allDetails')
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || 0,
          district: self.searchData.district,
          orderNo: self.searchData.orderNo,
          orderType: self.searchData.orderType,
          storeId: self.searchData.storeId,
          grabStatus: self.searchData.grabStatus,
          orderStatus: self.searchData.orderStatus,
          markScore: self.searchData.markScore,
          phone: self.searchData.phone
        }
        if (self.searchData.arriveTime !== '') {
          Object.assign($params, {
            arriveTimeBegin: new Date(self.searchData.arriveTime[1]).Format('yyyy-MM-dd'),
            arriveTimeEnd: new Date(self.searchData.arriveTime[0]).Format('yyyy-MM-dd')
          })
        }
        if (self.searchData.mallTime !== '') {
          Object.assign($params, {
            mallTimeBegin: new Date(self.searchData.mallTime[1]).Format('yyyy-MM-dd'),
            mallTimeEnd: new Date(self.searchData.mallTime[0]).Format('yyyy-MM-dd')
          })
        }
        if (self.searchData.country.length > 0) {
          Object.assign($params, {
            city: self.searchData.country[0],
            province: self.searchData.country[1],
            district: self.searchData.country[2]
          })
        }
        apiTable.data_orderAllTable($params).then((response) => {
          if (response.data.code === 1) {
            self.tableData = response.data.dat
          } else {
            swal(response.data.msg)
          }
        })
      },
      Format (date, fmt) {
        let $date = new Date(date)
        let o = {
          'M+': $date.getMonth() + 1,
          'd+': $date.getDate(),
          'h+': $date.getHours(),
          'm+': $date.getMinutes(),
          's+': $date.getSeconds(),
          'q+': Math.floor(($date.getMonth() + 3) / 3),
          'S': $date.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ($date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 2) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .search-form{
  }
  .wait-all-order{
    margin-bottom: 20px;
  }
  .wait-send-pagination{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
