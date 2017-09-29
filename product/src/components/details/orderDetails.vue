<template>
  <div class="order-details-box" v-loading.body="loading">
    <div class="details-title">
      订单详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="16" class="base-info">
            <el-row class="data-item">
              <el-col :span="3"><strong>订单编号：</strong></el-col>
              <el-col :span="6">{{detailsData.orderNo?detailsData.orderNo : '- -'}}</el-col>
              <el-col :span="4"><strong>用户下单时间：</strong></el-col>
              <el-col :span="6">{{detailsData.orderTime?detailsData.orderTime : '- -'}}</el-col>
              <!--<el-col :span="4"  v-if="detailsData.abnormalInfo"><strong>异常类型：</strong></el-col>-->
              <!--<el-col :span="6"  v-if="detailsData.abnormalInfo">-->
                <!--{{detailsData.abnormalInfo.abnormalStatus === 1 ? '无人抢单': ''}}-->
                <!--{{detailsData.abnormalInfo.abnormalStatus === 2 ? '主动退单': ''}}-->
                <!--{{detailsData.abnormalInfo.abnormalStatus === 3 ? '超时未送': ''}}-->
                <!--{{detailsData.abnormalInfo.abnormalStatus === 4 ? '超时未达': ''}}-->
                <!--{{detailsData.abnormalInfo.abnormalStatus === 5 ? '商城关闭': ''}}-->
                <!--{{detailsData.abnormalInfo.abnormalStatus === 6 ? '客户拒单': ''}}-->
                <!--{{detailsData.abnormalInfo.abnormalStatus === 7 ? '商城退换货': ''}}-->
              <!--</el-col>-->
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>订单类型：</strong></el-col>
              <el-col :span="6">{{detailsData.orderType?detailsData.orderType : '- -'}}</el-col>
              <el-col :span="4"><strong>订单状态：</strong></el-col>
              <el-col :span="6">
                {{detailsData.orderStatus === 10 ? '待抢单': ''}}
                {{detailsData.orderStatus === 20 ? '抢单中': ''}}
                {{detailsData.orderStatus === 30 ? '待拣货': ''}}
                {{detailsData.orderStatus === 40 ? '待提货': ''}}
                {{detailsData.orderStatus === 50 ? '送货中': ''}}
                {{detailsData.orderStatus === 60 ? '已送达': ''}}
                {{detailsData.orderStatus === 85 ? '退单中': ''}}
                {{detailsData.orderStatus === 90 ? '已退单': ''}}
                {{detailsData.orderStatus === 91 ? '已拒单': ''}}
                {{detailsData.orderStatus === 99 ? '已关闭': ''}}
                {{detailsData.isBack === 1 ? '(回退邮包)': ''}}
              </el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>邮包推送时间：</strong></el-col>
              <el-col :span="6">{{detailsData.mallTime?detailsData.mallTime:'- -'}}</el-col>
              <el-col :span="4"><strong>期望送达时间：</strong></el-col>
              <el-col :span="6">{{detailsData.scheduledTime?detailsData.scheduledTime:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>提货时间：</strong></el-col>
              <el-col :span="6">{{detailsData.checkTime ? detailsData.checkTime : '- -'}}</el-col>
              <el-col :span="4"><strong>送达时间：</strong></el-col>
              <el-col :span="6">{{detailsData.arriveTime ? detailsData.arriveTime : '- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>收货人：</strong></el-col>
              <el-col :span="6">{{detailsData.receiverName?detailsData.receiverName:'- -'}}</el-col>
              <el-col :span="4"><strong>联系方式：</strong></el-col>
              <el-col :span="6">{{detailsData.receiverPhone?detailsData.receiverPhone:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>收货地址：</strong></el-col>
              <el-col :span="18">{{detailsData.receiverAddress?detailsData.receiverAddress:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="24"><strong>订单内容：</strong></el-col>
              <el-col :span="24" class="check-item">
                <el-table
                  :data="detailsData.details"
                  :resizable=false
                  :height="250"
                  :max-height="250"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="条码/内部唯一码"
                    min-width="180"
                    align="center">
                    <template scope="scope">
                      <p>{{ scope.row.barcode}}</p>
                      <p>{{ scope.row.idcode}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="品名"
                    min-width="120"
                    align="center">
                    <template scope="scope">
                      {{ scope.row.name }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="重量"
                    align="center">
                    <template scope="scope">
                      {{ scope.row.volume }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数量"
                    align="center">
                    <template scope="scope">
                      {{ scope.row.amount }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单价"
                    align="center">
                    <template scope="scope">
                      {{ scope.row.price }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="总价"
                    align="center">
                    <template scope="scope">
                      {{ scope.row.amount * scope.row.price }}
                    </template>
                  </el-table-column>
                </el-table>
                <el-row class="check-item-row total-row"
                        type="flex"
                        align="middle">
                  <el-col :lg="8"><strong style="padding-left: 20px">合计</strong></el-col>
                  <el-col :lg="4" class="text-center">{{detailsData.weight}}KG</el-col>
                  <el-col :lg="4" class="text-center">{{calculateGoodAmount}}</el-col>
                  <el-col :lg="4" class="text-center">{{calculateSingleGoodTotalPrice}}</el-col>
                  <el-col :lg="4" class="text-center">{{calculateAllGoodTotalPrice}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="abnormal-row" v-if="detailsData.abnormalInfo">
              <el-row class="data-item">
                <el-col :span="3"><strong>异常时间：</strong></el-col>
                <el-col :span="6">{{detailsData.abnormalInfo.abnormalTime}}</el-col>
                <el-col :span="4"><strong>异常原因：</strong></el-col>
                <el-col :span="6">
                  {{detailsData.abnormalInfo.abnormalStatus === 1 ? '无人抢单': ''}}
                  {{detailsData.abnormalInfo.abnormalStatus === 2 ? '主动退单': ''}}
                  {{detailsData.abnormalInfo.abnormalStatus === 3 ? '超时未送': ''}}
                  {{detailsData.abnormalInfo.abnormalStatus === 4 ? '超时未达': ''}}
                  {{detailsData.abnormalInfo.abnormalStatus === 5 ? '商城关闭': ''}}
                  {{detailsData.abnormalInfo.abnormalStatus === 6 ? '客户拒单': ''}}
                  {{detailsData.abnormalInfo.abnormalStatus === 7 ? '商城退换货': ''}}
                </el-col>
              </el-row>
              <el-row class="data-item">
                <el-col :span="3"><strong>处理时间：</strong></el-col>
                <el-col :span="6">{{detailsData.abnormalInfo.handleTime ? detailsData.abnormalInfo.handleTime : '- -'}}</el-col>
                <el-col :span="4"><strong>处理结果：</strong></el-col>
                <el-col :span="6">
                  {{detailsData.abnormalInfo.handleResultText}}
                  <!--{{detailsData.abnormalInfo.handleResult === 0 ? '未处理': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 10 ? '待抢单': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 20 ? '抢单中': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 30 ? '待拣货': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 40 ? '待提货': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 50 ? '送货中': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 60 ? '已送达': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 90 ? '已退单': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 91 ? '已拒单': ''}}-->
                  <!--{{detailsData.abnormalInfo.handleResult === 99 ? '已关闭': ''}}-->
                </el-col>
              </el-row>
            </div>
            <div class="closeOrder-row" v-if="detailsData.cancelInfo">
              <el-row class="data-item">
                <el-col :span="3"><strong>退单时间：</strong></el-col>
                <el-col :span="6">{{detailsData.cancelInfo.cancelTime}}</el-col>
              </el-row>
              <el-row class="data-item">
                <el-col :span="3"><strong>退单人：</strong></el-col>
                <el-col :span="6">{{detailsData.cancelInfo.realName}}</el-col>
                <el-col :span="4"><strong>联系方式：</strong></el-col>
                <el-col :span="6">{{detailsData.cancelInfo.phone}}</el-col>
              </el-row>
              <el-row class="data-item">
                <el-col :span="3"><strong>退单原因：</strong></el-col>
                <el-col :span="6">{{detailsData.cancelInfo.cancelReason}}</el-col>
              </el-row>
            </div>
            <el-row class="data-item">
              <el-row :gutter="10">
                <div style="float: left;margin-right: 5px;">
                  <el-button type="info"
                             :disabled="!btn_auth('b_xq_htyb')"
                             v-if="detailsData.orderStatus < 60 || detailsData.abnormalInfo && !detailsData.abnormalInfo.handleResult" @click="handleOrderBackToYb">回退邮包</el-button>
                  <!-- 手工推送,只显示在待抢单状态 -->
                  <el-button type="info" :disabled="!btn_auth('b_xq_sgts')"
                             v-if="detailsData.orderStatus　=== 10" @click="handleOrderRePush">手工推送</el-button>
                  <!--<el-button type="info" :disabled="!btn_auth('b_xq_td')" v-if="detailsData.orderStatus < 90" @click="outOrderDialog = true">退单</el-button>-->

                  <el-button type="info" :disabled="!btn_auth('b_xq_gbdd')"
                             v-if=" detailsData.orderStatus < 60 || detailsData.abnormalInfo && !detailsData.abnormalInfo.handleResult" @click="closeOrderDialog = true">关闭订单</el-button>
                  <!-- 人工处理只有异常类型是3或4 并且未处理 -->
                  <span v-if="detailsData.abnormalInfo" style="margin-left: 10px;">
                    <el-button type="info" :disabled="!btn_auth('b_xq_rgcl')" v-if="detailsData.abnormalInfo.abnormalStatus === 3 || detailsData.abnormalInfo.abnormalStatus === 4">
                      <span v-if="!detailsData.abnormalInfo.handleResult" @click="manualHandle(detailsData.id)">人工处理</span>
                    </el-button>
                  </span>
                </div>
                <el-button type="info" @click="$router.go(-1)">返回</el-button>
              </el-row>
            </el-row>
          </el-col>
          <el-col :span="8">
            <!-- 门店信息 -->
            <el-row class="details-notice" v-if="detailsData.storeInfo">
              <el-row class="title">
                <el-col :span="24">门店信息:</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>地区:</strong></el-col>
                <el-col :span="16">{{detailsData.storeInfo.area ? detailsData.storeInfo.area : '- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>门店:</strong></el-col>
                <el-col :span="16">{{detailsData.storeInfo.name ? detailsData.storeInfo.name : '- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>地址:</strong></el-col>
                <el-col :span="16">{{detailsData.storeInfo.address ? detailsData.storeInfo.address : '- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>客服:</strong></el-col>
                <el-col :span="16">{{detailsData.storeInfo.contactPerson ? detailsData.storeInfo.contactPerson : '- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>电话:</strong></el-col>
                <el-col :span="16">{{detailsData.storeInfo.contact ? detailsData.storeInfo.contact : '- -'}}</el-col>
              </el-row>
            </el-row>
            <!-- 配送员管理 -->
            <el-row class="details-notice" v-if="detailsData.deliveryUserInfo">
              <el-row class="title">
                <el-col :span="24"><strong>配送员信息:</strong></el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>配送:</strong></el-col>
                <el-col :span="16">{{detailsData.deliveryUserInfo.realName?detailsData.deliveryUserInfo.realName:'- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>手机:</strong></el-col>
                <el-col :span="16">{{detailsData.deliveryUserInfo.phone?detailsData.deliveryUserInfo.phone:'- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>等级:</strong></el-col>
                <el-col :span="16">{{detailsData.deliveryUserInfo.level?detailsData.deliveryUserInfo.level + '星':'- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>佣金:</strong></el-col>
                <el-col :span="16">{{detailsData.deliveryUserInfo.commission?detailsData.deliveryUserInfo.commission  + '元':'- -'}}</el-col>
              </el-row>
            </el-row>
            <!-- 推送记录 -->
            <el-row class="details-notice" v-if="detailsData.pushInfo">
              <el-row class="title">
                <el-col :span="24">推送记录:</el-col>
              </el-row>
              <el-row v-for="($item, $index) in detailsData.pushInfo" :key="$index">
                <el-col :span="16">{{$item.pushTime?$item.pushTime:'- -'}}</el-col>
                <el-col :span="8">{{$item.pushUsers?$item.pushUsers:'- -'}}</el-col>
              </el-row>
            </el-row>
            <!-- 订单轨迹 -->
            <el-row class="details-notice" v-if="detailsDataRoutle" style="margin-bottom: 20px">
              <el-row class="title">
                <el-col :span="24">订单轨迹:</el-col>
              </el-row>

              <el-row justify="center">
                <el-col :span="12" style="text-align: center;color: #666;"><strong>时间</strong></el-col>
                <el-col :span="12" style="text-align: center;color: #666;"><strong>状态</strong></el-col>
              </el-row>
              <el-row v-for="($routle, $index) in detailsDataRoutle" justify="center" :key="$index">
                <el-col :span="12" style="text-align: center">{{$routle.time}}</el-col>
                <el-col :span="12" style="text-align: center">{{$routle.status}}</el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      title="退单"
      :visible.sync="outOrderDialog"
      size="small"
      :before-close="handleClose">
      <el-form ref="form" :model="outOrderForm" label-width="100px">
        <el-form-item label="推送目标至">
          <el-radio-group v-model="outOrderForm.send">
            <el-radio label="1">第三方物流</el-radio>
            <el-radio label="2">抢单系统</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退单备注">
          <el-input type="textarea" v-model="outOrderForm.remake"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
          <el-button @click="outOrderDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
          <el-button type="primary" @click="closeOrder(detailsData.id)">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  /*
  * =======================================
  *
  * detailsData: 详情数据
  * detailsType:     详情页类型 1 => 推送、待抢订单详情。 2 => 异常订单详情。 3 => 全部订单详情
  *
  * =======================================
  * */
  import apiDetails from '@/api/details'
  import moment from 'moment'
  export default {
    data () {
      return {
        loading: false,
        detailsData: {},
        detailsDataRoutle: {},
        detailsType: 1,
        outOrderDialog: false,
        closeOrderDialog: false,
        outOrderForm: {
          send: '1',
          remake: ''
        },
        closeOrderForm: {
          reason: '1',
          isSettle: '0',
          remake: ''
        },
        rules: {
          remake: [
            { required: true, message: '请输入关闭备注', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      tableRowClassName () {
        if (this.detailsData) {
          let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          if (moment(now).diff(moment(this.detailsData.scheduledTime)) > 3600000) {
            return true
          }
        }
      },
      // 判断详情来源
      detailsSource () {
        return this.$route.query.detailsType.toString()
      },
      // 计算商品个数
      calculateGoodAmount () {
        let goodAmount = 0
        if (this.detailsData.details) {
          this.detailsData.details.forEach(function ($item, $index) {
            goodAmount += $item.amount
          })
        }
        return goodAmount
      },
      // 计算单个商品总价格
      calculateSingleGoodTotalPrice () {
        let singlePrice = 0
        if (this.detailsData.details) {
          this.detailsData.details.forEach(function ($item, $index) {
            singlePrice += $item.price
          })
        }
        return singlePrice
      },
      // 计算所有商品总价格
      calculateAllGoodTotalPrice () {
        let allPrice = 0
        if (this.detailsData.details) {
          this.detailsData.details.forEach(function ($item, $index) {
            allPrice += ($item.price * $item.amount)
          })
        }
        return allPrice
      }
    },
    methods: {
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      handleOrderRePush () {
        swal({
          title: '你确定要手工推送?',
          type: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          apiDetails.details_handleOrderRePush({
            id: this.detailsData.id
          }).then((response) => {
            if (response.data.code === 1) {
              this.$message('操作成功！')
              this.$router.go(-1)
            }
          })
        }, () => {

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
          apiDetails.details_handleOrderBackToYb({
            id: this.detailsData.id
          }).then((response) => {
            if (response.data.code === 1) {
              this.$message('操作成功！')
              this.$router.go(-1)
            }
          })
        }, () => {

        })
      },
      closeOrder ($id) {
        this.$refs['closeOrderForm'].validate((valid) => {
          if (valid) {
            apiDetails.details_handleOrderClose({
              id: $id,
              reason: this.closeOrderForm.reason,
              remake: this.closeOrderForm.remake,
              isSettle: this.closeOrderForm.isSettle
            }).then((response) => {
              if (response.data.code === 1) {
                this.$message({
                  duration: 1500,
                  message: '操作成功！'
                })
                this.$router.go('-1')
              }
            })
          } else {
            return false
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
              this.$router.go('-1')
            }
          })
        }, () => {

        })
      },
      details_tableSendTable ($params) {
        let self = this
        this.loading = true
        apiDetails.details_tableSendTable({
          orderId: $params
        }).then((response) => {
          this.loading = false
          if (response.data.code === 1) {
            self.$nextTick(function () {
              if (response.data.code === 1) {
                self.detailsData = response.data.dat
              } else {
                this.$message(response.data.msg)
              }
            })
          }
        })
      },
      details_orderRoutle ($params) {
        let self = this
        apiDetails.details_orderRoutle({
          orderId: $params
        }).then((response) => {
          if (response.data.code === 1) {
            self.$nextTick(function () {
              if (response.data.code === 1) {
                self.detailsDataRoutle = response.data.dat
              } else {
                this.$message(response.data.msg)
              }
            })
          }
        })
      },
      handleClose (done) {
        this.closeOrderDialog = false
        this.closeOrderForm.reason = '1'
        this.closeOrderForm.remake = ''
        this.closeOrderForm.isSettle = '0'
        this.closeOrderForm.id = ''
        this.$refs['closeOrderForm'].resetFields()
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query) {
        next(vm => {
          vm.details_tableSendTable(to.query.orderId)
          vm.details_orderRoutle(to.query.orderId)
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .order-details-box{
    color: #666;
    font-size: 12px;
    .details-title{
      border-bottom: 1px #ddd solid;
      padding: 10px;
      font-size: 18px;
    }
    .details-content{
      .content-body{
        .base-info{
          background: #fff;
          color: #666;
          border-radius: 5px;
          padding: 20px;
        }
        .data-item{
          >.el-col{
            padding: 10px 0;
            .check-item-row{
              padding-bottom: 10px;
              background: #f1f1f1;
              &.total-row{
                border-top: 1px #ccc solid;
                padding: 10px 0;
                margin-bottom: 20px;
              }
            }
          }
        }
        .details-notice{
          margin-top: 20px;
          border: 1px #ddd solid;
          padding: 10px 0;
          background: #c2e1f7;
          color: #012b6b;
          >.el-row{
            padding: 10px 20px;
            &.title{
              padding: 10px 0 10px 20px;
              font-size: 18px;
              position: relative;
              font-weight: normal;
              margin-bottom: 10px;
              &::before{
                content: '';
                display: block;
                width: 4px;
                height: 30px;
                background: #012b6b;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
    }
  }
</style>
