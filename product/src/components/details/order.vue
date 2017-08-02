<template>
  <div class="order-details">
    <div class="details-title">
      订单详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="16" class="base-info">
            <el-row class="data-item">
              <el-col :span="3"><strong>订单编号：</strong></el-col>
              <el-col :span="18">{{detailsData.orderNo?detailsData.orderNo : '- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>订单类型：</strong></el-col>
              <el-col :span="6">{{detailsData.orderType?detailsData.orderType : '- -'}}</el-col>
              <el-col :span="4"><strong>订单状态：</strong></el-col>
              <el-col :span="6">{{detailsData.orderStatus?detailsData.orderStatus : '- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>订单时间：</strong></el-col>
              <el-col :span="6">{{detailsData.mallTime?detailsData.mallTime:'- -'}}</el-col>
              <el-col :span="4"><strong>期望送达时间：</strong></el-col>
              <el-col :span="6">{{detailsData.scheduledTime?detailsData.scheduledTime:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>收货人：</strong></el-col>
              <el-col :span="6">{{detailsData.receiverName?detailsData.receiverName:'- -'}}</el-col>
              <el-col :span="4"><strong>联系方式：</strong></el-col>
              <el-col :span="6">{{detailsData.receiverPhone?detailsData.receiverPhone:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>收货地址：</strong></el-col>
              <el-col :span="18">{{detailsData.receiverAddress?detailsData.receiverAddress:'--'}}</el-col>
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
                <el-row :gutter="10">
                  <el-col :span="10">
                    <el-button type="info">回退邮包</el-button>
                  </el-col>
                  <el-col :span="10">
                    <el-button type="info">手工推送</el-button>
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
  </div>
</template>

<script>
  import apiDetails from '@/api/details'
  export default {
    data () {
      return {
        detailsData: {},
        storeInfo: {},
        goodAmount: 0
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
    mounted () {

    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      details_tableSendTable ($params) {
        let self = this
        apiDetails.details_tableSendTable({
          orderId: $params
        }).then((response) => {
          self.$nextTick(function () {
            if (response.data.code === 1) {
              self.detailsData = response.data.dat
              self.storeInfo = response.data.dat.storeInfo
            } else {
              swal(response.data.msg)
            }
          })
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query) {
        next(vm => {
          vm.details_tableSendTable(to.query.orderId)
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet" type="text/scss" scoped>
  .order-details{
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
  }
</style>
