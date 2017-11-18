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
                placeholder="用户下单时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-date-picker
                v-model="searchData.arriveTime"
                type="daterange"
                placeholder="送达时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
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
          <el-col :span="5">
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
          <!--<el-col :span="4">-->
            <!--<el-form-item>-->
              <!--<el-select v-model="searchData.grabStatus" placeholder="抢单状态">-->
                <!--<el-option-->
                  <!--v-for="item in this.$store.state.select.pushOrderType"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="3">
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
          </el-col>-->
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="data_table">查询</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="wait-all-table">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        :height="tabHeight"
        :max-height="tabHeight"
        v-loading.body="loading"
        border
        tooltip-effect="dark"
        :row-class-name="tableRowClassName"
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <router-link :to="{path: '/order/orderDetails', query: { orderId: scope.row.id, detailsType: 3 }}" tag="span">
                <el-button type="primary">订单详情</el-button>
              </router-link>
              <!--异常订单下面的订单状态返回85,显示退单中,按钮显示关闭订单和回退邮包-->
              <el-button :disabled="!btn_auth('b_xq_td')" v-if="scope.row.orderStatus === 85 || scope.row.orderStatus < 60" @click="handleOrderBackToYb(scope.row.id)" type="primary">回退邮包</el-button>
              <!--异常订单下面的订单状态返回85,显示退单中,按钮显示关闭订单和回退邮包-->
              <el-button :disabled="!btn_auth('b_xq_gbdd')" v-if="scope.row.orderStatus === 85 || scope.row.orderStatus < 60" type="primary" @click="HandleCloseOrder(scope.row.id)">关闭订单</el-button>
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
          prop="orderTime"
          align="center"
          min-width="180"
          label="用户下单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="180"
          prop="orderTime"
          label="邮包推送时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="180"
          prop="scheduledTime"
          label="期望送达时间"
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
            {{scope.row.orderStatus === 40 ? '待提货': ''}}
            {{scope.row.orderStatus === 50 ? '送货中': ''}}
            {{scope.row.orderStatus === 60 ? '已送达': ''}}
            {{scope.row.orderStatus === 85 ? '退单中': ''}}
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
            <p v-else>异常</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wait-send-pagination">
      <div class="other-btn">
        <el-button :disabled="!btn_auth('b_qb_dc_excel')" :plain="true" type="info" @click="downloadExcel">导出excel</el-button>
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
      <el-form ref="closeOrderForm"
               :rules="rules"
               :model="closeOrderForm" label-width="80px">
        <el-form-item
          label="关闭原因">
          <el-select v-model="closeOrderForm.reason" placeholder="请选择活动区域">
            <el-option label="客户拒单" value="1"></el-option>
            <el-option label="其他原因" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算佣金">
          <el-radio-group v-model="closeOrderForm.isSettle">
            <el-radio label="0">不接算</el-radio>
            <el-radio label="1">结算</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="remake"
          label="关闭备注">
          <el-input type="textarea" v-model="closeOrderForm.remake"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="closeOrder">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  import apiDetails from '@/api/details'
  import qs from 'qs'
  export default {
    data () {
      return {
        loading: false,
        storeData: [],
        searchData: {
          page: 0,
          country: [],
          orderNo: '',
          orderType: '',
          storeId: [],
          mallTime: [],
          arriveTime: [],
          orderStatus: '',
          phone: '',
          localStorage: true
        },
        defaultProps: {
          value: 'val',
          label: 'label',
          children: 'children'
        },
        tableData: [],
        closeOrderForm: {
          reason: '1',
          isSettle: '0',
          remake: '',
          id: ''
        },
        closeOrderDialog: false,
        rules: {
          remake: [
            { required: true, message: '请输入关闭备注', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 365
      }
    },
    mounted () {
      var $data = JSON.parse(localStorage.getItem('allOrder_search'))
      if ($data && $data.localStorage) {
        this.searchData = $data
        this.storeData = JSON.parse(localStorage.getItem('ms_storeIds'))
      }
      this.data_table()
    },
    methods: {
      handleOrderBackToYb ($id) {
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
          apiDetails.details_handleOrderBackToYb({
            id: $id
          }).then((response) => {
            if (response.data.code === 1) {
              this.$message('操作成功！')
              this.data_table()
            }
          })
        }, () => {

        })
      },
      tableRowClassName ($row) {
        if ($row.isAbnormal === 1) {
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
      HandleCloseOrder ($id) {
        this.closeOrderDialog = true
        this.closeOrderForm.id = $id
      },
      handleClose (done) {
        this.closeOrderDialog = false
        this.closeOrderForm.reason = '1'
        this.closeOrderForm.remake = ''
        this.closeOrderForm.isSettle = '0'
        this.closeOrderForm.id = ''
        this.$refs['closeOrderForm'].resetFields()
      },
      closeOrder () {
        this.$refs['closeOrderForm'].validate((valid) => {
          if (valid) {
            apiDetails.details_handleOrderClose(this.closeOrderForm).then((response) => {
              if (response.data.code === 1) {
                this.$message({
                  duration: 1500,
                  message: '操作成功！'
                })
                this.data_table()
                this.handleClose()
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm () {
        this.searchData.country = []
        this.searchData.orderType = ''
        this.searchData.orderNo = ''
        this.searchData.storeId = []
        this.searchData.mallTime = []
        this.searchData.arriveTime = []
        this.searchData.orderStatus = ''
        // this.searchData.markScore = ''
        this.searchData.phone = ''
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
          district: '',
          arriveTimeBegin: '',
          arriveTimeEnd: '',
          mallTimeBegin: '',
          mallTimeEnd: ''
        })
        if (this.searchData.arriveTime.length > 0) {
          Object.assign($params, {
            arriveTimeBegin: new Date(this.searchData.arriveTime[1]).Format('yyyy-MM-dd'),
            arriveTimeEnd: new Date(this.searchData.arriveTime[0]).Format('yyyy-MM-dd')
          })
        }
        if (this.searchData.mallTime.length > 0) {
          Object.assign($params, {
            mallTimeBegin: new Date(this.searchData.mallTime[1]).Format('yyyy-MM-dd'),
            mallTimeEnd: new Date(this.searchData.mallTime[0]).Format('yyyy-MM-dd')
          })
        }
        if (this.searchData.country.length > 0) {
          Object.assign($params, {
            city: this.searchData.country[1],
            province: this.searchData.country[0],
            district: this.searchData.country[2]
          })
        }
        window.location.href = '/api/web/orderManage/exportAllOrder?' + qs.stringify($params)
      },
      lookDetails ($item) {
        this.$router.push('/order/allDetails')
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || self.searchData.page,
          orderNo: self.searchData.orderNo,
          orderType: self.searchData.orderType,
          storeId: self.searchData.storeId.join(','),
          orderStatus: self.searchData.orderStatus,
          arriveTimeBegin: '',
          arriveTimeEnd: '',
          mallTimeBegin: '',
          mallTimeEnd: '',
          city: '',
          province: '',
          district: '',
          // markScore: self.searchData.markScore,
          phone: self.searchData.phone
        }
        if (self.searchData.arriveTime.length > 0) {
          Object.assign($params, {
            arriveTimeBegin: new Date(self.searchData.arriveTime[1]).Format('yyyy-MM-dd'),
            arriveTimeEnd: new Date(self.searchData.arriveTime[0]).Format('yyyy-MM-dd')
          })
        }
        if (self.searchData.mallTime.length > 0) {
          Object.assign($params, {
            mallTimeBegin: new Date(self.searchData.mallTime[1]).Format('yyyy-MM-dd'),
            mallTimeEnd: new Date(self.searchData.mallTime[0]).Format('yyyy-MM-dd')
          })
        }
        if (self.searchData.country.length > 0) {
          Object.assign($params, {
            city: self.searchData.country[1],
            province: self.searchData.country[0],
            district: self.searchData.country[2]
          })
        }
        self.loading = true
        apiTable.data_orderAllTable($params).then((response) => {
          self.loading = false
          if (response.data.code === 1) {
            localStorage.setItem('allOrder_search', JSON.stringify(self.searchData))
            localStorage.setItem('ms_storeIds', JSON.stringify(self.storeData))
            self.tableData = response.data.dat
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
    },
    beforeRouteLeave (to, from, next) {
      if (to.path !== '/order/orderDetails') {
        localStorage.setItem('allOrder_search', null)
      }
      next()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .search-form{
  }
  .wait-all-table{
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
