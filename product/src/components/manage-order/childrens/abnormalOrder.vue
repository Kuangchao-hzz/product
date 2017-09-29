<template>
  <div class="wait-abnormal-order">
    <div class="search-table">
      <el-form :inline="true">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item>
              <el-input
                v-model="searchData.orderNo"
                placeholder="订单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
          <el-col :span="6">
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
          <el-col :span="6">
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
          <el-col :span="6">
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
          <el-col :span="6">
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
        v-loading.body="loading"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          type="expand">
          <template scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <router-link :to="{path: '/order/orderDetails', query: { orderId: scope.row.orderId, detailsType: 2 }}" tag="span">
                <el-button type="primary">查看详情</el-button>
              </router-link>
              <!--<el-button :disabled="!btn_auth('b_xq_td')" v-if="scope.row.orderStatus !== 60 && scope.row.orderStatus < 90" type="primary">退单</el-button>-->
              <!-- 人工处理只有异常类型是3或4 并且未处理 -->
              <el-button :disabled="!btn_auth('b_xq_gbdd')" v-if="scope.row.orderStatus === 85 || scope.row.orderStatus < 60 && scope.row.handlerStatus === 0" type="primary" @click="HandleCloseOrder(scope.row.id)">关闭订单</el-button>
              <!-- 人工处理只有异常类型是3或4 并且未处理 -->
              <span v-if="scope.row.handlerStatus === 0">
                <el-button :disabled="!btn_auth('b_xq_rgcl')" v-if="scope.row.abnormalStatus === 3 || scope.row.abnormalStatus === 4" type="primary" @click="manualHandle(scope.row.id)">人工处理</el-button>
              </span>
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
          prop="orderTime"
          align="center"
          min-width="180"
          label="用户下单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="mallTime"
          min-width="180"
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
          align="center"
          prop="abnormalTime"
          min-width="180"
          label="异常时间"
          show-overflow-tooltip>
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
      </el-table>
    </div>
    <el-dialog
      title="关闭订单"
      :visible.sync="closeOrderDialog"
      size="small"
      :before-close="handleClose">
      <el-form ref="closeOrderForm" :rules="rules" :model="closeOrderForm" label-width="80px">
        <el-form-item label="关闭原因">
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
        <el-form-item prop="remake" label="关闭备注">
          <el-input type="textarea" v-model="closeOrderForm.remake"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="closeOrder">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="wait-send-pagination">
      <div class="other-btn">
        <el-button :disabled="!btn_auth('b_yc_dc_excel')" :plain="true" type="info" @click="downloadExcel">导出excel</el-button>
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
  var setTime
  export default {
    data () {
      return {
        loading: false,
        closeOrderDialog: false,
        searchData: {
          page: 0,
          country: [],
          storeId: '',
          orderNo: '',
          abnormalStatus: '',
          handlerStatus: '0',
          phone: '',
          localStorage: true
        },
        storeData: [],
        tableData: [],
        closeOrderForm: {
          reason: '1',
          isSettle: '0',
          remake: '',
          id: ''
        },
        rules: {
          remake: [
            { required: true, message: '请输入关闭备注', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 305
      }
    },
    mounted () {
      var $data = JSON.parse(localStorage.getItem('abnormalOrder_search'))
      if ($data && $data.localStorage) {
        this.searchData = $data
      }
      this.data_table()
      setTime = setInterval(() => {
        this.data_table()
      }, 60 * 1000)
    },
    methods: {
      tableRowClassName ($row) {
        let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        if (moment(now).diff(moment($row.scheduledTime)) > 3600000 && $row.handlerStatus === 0) {
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
            this.searchData.storeId = ''
            this.storeData = [{
              value: '',
              label: '请选择门店'
            }]
            this.storeData = this.storeData.concat(response.data.dat)
          }
        })
      },
      manualHandle ($id) {
        swal({
          title: '你确定要人工处理?',
          type: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          apiDetails.details_handleOrderManualHandle({
            id: $id
          }).then((response) => {
            if (response.data.code === 1) {
              this.$message({
                duration: 1500,
                message: '操作成功！'
              })
            }
          })
        }, () => {

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
      resetForm () {
        this.storeData = []
        this.searchData.country = []
        this.searchData.abnormalStatus = ''
        this.searchData.handlerStatus = '0'
        this.searchData.phone = ''
        this.searchData.storeId = ''
        this.searchData.orderNo = ''
        this.data_table()
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
      downloadExcel () {
        if (this.tableData.details.length < 1) {
          this.$message({
            duration: 1500,
            message: '无数据可导出！'
          })
          return false
        }
        window.location.href = '/api/web/orderManage/exportAbnormal?'
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || self.searchData.page,
          storeId: self.searchData.storeId,
          orderNo: self.searchData.orderNo,
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
        self.loading = true
        apiTable.data_orderAbnormalTable($params).then((response) => {
          self.loading = false
          if (response.data.code === 1) {
            localStorage.setItem('abnormalOrder_search', JSON.stringify(self.searchData))
            self.tableData = response.data.dat
          }
        })
      },
      lookDetails ($item) {
        this.$router.push('/order/abnormalDetails')
      }
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(setTime)
      if (to.path !== '/order/orderDetails') {
        localStorage.setItem('abnormalOrder_search', null)
      }
      next()
    }
  }
</script>

<style lang="scss" type="text/scss">
  /*异常标签*/
  .wait-abnormal-tag{
    .el-tag{
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .wait-abnormal-table{
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
