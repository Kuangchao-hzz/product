<template>
  <div class="all-details">
    <div class="details-title">
      全部订单详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="15" class="base-info">
            <el-row class="data-item">
              <el-col :span="4"><strong>订单编号：</strong></el-col>
              <el-col :span="6">{{detailsData.orderNo}}</el-col>
              <el-col :span="5"><strong>异常类型：</strong></el-col>
              <el-col :span="6">
                {{detailsData.abnormalInfo === 1 ? '无人抢单': ''}}
                {{detailsData.abnormalInfo === 2 ? '主动退出': ''}}
                {{detailsData.abnormalInfo === 3 ? '超时未送': ''}}
                {{detailsData.abnormalInfo === 4 ? '超时未达': ''}}
                {{detailsData.abnormalInfo === 5 ? '商城关闭': ''}}
                {{detailsData.abnormalInfo === 6 ? '客户拒单': ''}}
                {{detailsData.abnormalInfo === 7 ? '商城退换货': ''}}
              </el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>订单类型：</strong></el-col>
              <el-col :span="6">{{detailsData.orderType}}</el-col>
              <el-col :span="5"><strong>订单状态：</strong></el-col>
              <el-col :span="6">
                {{detailsData.orderStatus === 10 ? '待抢单': ''}}
                {{detailsData.orderStatus === 20 ? '抢单中': ''}}
                {{detailsData.orderStatus === 30 ? '待拣货': ''}}
                {{detailsData.orderStatus === 40 ? '待提货': ''}}
                {{detailsData.orderStatus === 50 ? '送货中': ''}}
                {{detailsData.orderStatus === 60 ? '已送达': ''}}
                {{detailsData.orderStatus === 90 ? '已退单': ''}}
                {{detailsData.orderStatus === 91 ? '已拒单': ''}}
                {{detailsData.orderStatus === 99 ? '已关闭': ''}}
              </el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>订单时间：</strong></el-col>
              <el-col :span="6">{{detailsData.mallTime}}</el-col>
              <el-col :span="5"><strong>期望送达时间：</strong></el-col>
              <el-col :span="6">{{detailsData.arriveTime}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>拣货时间：</strong></el-col>
              <el-col :span="6">{{detailsData.checkTime}}</el-col>
              <el-col :span="5"><strong>验货时间：</strong></el-col>
              <el-col :span="6">{{detailsData.checkTime}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>送达时间：</strong></el-col>
              <el-col :span="18">{{detailsData.scheduledTime}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>收货人：</strong></el-col>
              <el-col :span="6">{{detailsData.receiverName}}</el-col>
              <el-col :span="5"><strong>联系方式：</strong></el-col>
              <el-col :span="6">{{detailsData.receiverPhone}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>收货地址：</strong></el-col>
              <el-col :span="18">{{detailsData.receiverAddress}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="24"><strong>订单内容：</strong></el-col>
              <el-col :span="24" class="check-item">
                <el-row class="check-item-row"
                        type="flex"
                        align="middle"
                        v-for="($item, $index) in detailsData.details"
                        :key="$index">
                  <el-col :lg="8">
                    <barcode :value="$item.barcode" :text="$item.barcode" ></barcode>
                  </el-col>
                  <el-col :lg="6" class="text-center">{{$item.name}}</el-col>
                  <el-col :lg="4" class="text-center">{{$item.volume}}</el-col>
                  <el-col :lg="2" class="text-center">x{{$item.amount}}</el-col>
                  <el-col :lg="4" class="text-center">￥{{$item.price}}</el-col>
                  <el-col :lg="4" class="text-center">￥{{$item.amount * $item.price}}</el-col>
                </el-row>
                <el-row class="check-item-row total-row"
                        type="flex"
                        align="middle">
                  <el-col :lg="14"><strong style="padding-left: 20px">合计</strong></el-col>
                  <el-col :lg="4" class="text-center">{{detailsData.weight}}KG</el-col>
                  <el-col :lg="2" class="text-center">x{{calculateGoodAmount}}</el-col>
                  <el-col :lg="4" class="text-center">￥{{calculateSingleGoodTotalPrice}}</el-col>
                  <el-col :lg="4" class="text-center">￥{{calculateAllGoodTotalPrice}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <hr>
            <el-row class="data-item abnormal-row">
              <el-col :span="4"><strong>异常时间：</strong></el-col>
              <el-col :span="6">2017/05/22 15:00:00</el-col>
            </el-row>
            <el-row class="data-item abnormal-row">
              <el-col :span="4"><strong>退单人：</strong></el-col>
              <el-col :span="6">李四</el-col>
              <el-col :span="5"><strong>联系方式：</strong></el-col>
              <el-col :span="6">13918181212</el-col>
            </el-row>
            <el-row class="data-item abnormal-row">
              <el-col :span="4"><strong>退单原因：</strong></el-col>
              <el-col :span="6">任性</el-col>
            </el-row>
            <el-row class="data-item abnormal-row-last">
              <el-col :span="4"></el-col>
              <el-col :span="20">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <el-button type="info" @click="outOrderDialog = true">退单</el-button>
                  </el-col>
                  <el-col :span="5">
                    <el-button type="info" @click="closeOrderDialog = true">关闭订单</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24">门店信息:</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>地区:</strong></el-col>
                <el-col :span="16">{{storeInfo.area ? storeInfo.area : '- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>门店:</strong></el-col>
                <el-col :span="16">{{storeInfo.name ? storeInfo.name : '- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>地址:</strong></el-col>
                <el-col :span="16">{{storeInfo.address ? storeInfo.address : '- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>客服:</strong></el-col>
                <el-col :span="16">{{storeInfo.contactPerson ? storeInfo.contactPerson : '- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>电话:</strong></el-col>
                <el-col :span="16">{{storeInfo.contact ? storeInfo.contact : '- -'}}</el-col>
              </el-row>
            </el-row>
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
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24">推送记录:</el-col>
              </el-row>
              <el-row v-for="($item, $index) in detailsData.pushInfo" :key="$index">
                <el-col :span="16">{{$item.pushInfo.pushTime?$item.pushInfo.pushTime:'- -'}}</el-col>
                <el-col :span="8">{{$item.pushInfo.pushUsers?$item.pushInfo.pushUsers:'- -'}}</el-col>
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
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="outOrderDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="关闭订单"
      :visible.sync="closeOrderDialog"
      size="small"
      :before-close="handleClose">
      <el-form ref="form" :model="closeOrderForm" label-width="80px">
        <el-form-item label="关闭原因">
          <el-select v-model="closeOrderForm.send" placeholder="请选择活动区域">
            <el-option label="客户拒单" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关闭备注">
          <el-input type="textarea" v-model="closeOrderForm.remake"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="closeOrderDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import apiDetails from '@/api/details'
  export default {
    data () {
      return {
        detailsData: {},
        storeInfo: {},
        outOrderDialog: false,
        closeOrderDialog: false,
        outOrderForm: {
          send: '1',
          remake: ''
        },
        closeOrderForm: {
          send: '1',
          remake: ''
        }
      }
    },
    computed: {
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
      onSubmit () {

      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      details_data ($params) {
        let self = this
        apiDetails.details_tableSendTable({
          orderId: $params
        }).then((response) => {
          self.$nextTick(function () {
            if (response.data.code === 1) {
              self.detailsData = response.data.dat
              self.storeInfo = response.data.dat.storeInfo
            } else {
              this.$message(response.data.msg)
            }
          })
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query) {
        next(vm => {
          vm.details_data(to.query.orderId)
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .all-details{
    color: #666;
    font-size: 12px;
    .details-title{
      border-bottom: 1px #ddd solid;
      padding: 10px;
      font-size: 18px;
    }
    .content-body{
      .base-info{
        background: #fff;
        color: #666;
        border-radius: 5px;
        padding: 20px;
        .abnormal-row-last{
          .el-button{
            width: 100%;
          }
        }
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
          .el-button{
            width: 100%;
            border-radius: 0;
            background: #e1e1e1;
            border: none;
            color: #666;
            transition: all 0.5s;
            &:hover{
              background: #bdbdbd;
            }
            &:focus{
              background: #0006f0;
              color: #fff;
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
    .line-halving{
      border-top: 1px #666 solid;
    }
    .abnormal-row:nth-child(1){
      border-top: 1px #666 solid;
    }
  }
</style>
