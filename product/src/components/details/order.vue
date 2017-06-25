<template>
  <div class="order-details">
    <div class="details-title">
      订单详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="15" class="base-info">
            <el-row class="data-item">
              <el-col :span="4">订单编号：</el-col>
              <el-col :span="18">{{detailsData.orderNo}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">订单类型：</el-col>
              <el-col :span="6">{{detailsData.orderType}}</el-col>
              <el-col :span="6">订单状态：</el-col>
              <el-col :span="6">{{detailsData.orderStatus}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">订单时间：</el-col>
              <el-col :span="6">{{detailsData.mall_time}}</el-col>
              <el-col :span="6">期望送达时间：</el-col>
              <el-col :span="6">{{detailsData.scheduled_time}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">收货人：</el-col>
              <el-col :span="6">{{detailsData.receiverName}}</el-col>
              <el-col :span="6">联系方式：</el-col>
              <el-col :span="6">{{detailsData.receiverPhone}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">收货地址：</el-col>
              <el-col :span="18">{{detailsData.receiverAddress}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">商品明细：</el-col>
              <el-col :span="20" class="check-item">
                <el-row class="check-item-row"
                        type="flex"
                        align="middle"
                v-for="($item, $index) in detailsData.details">
                  <el-col :span="12" class="text-center">
                    <barcode value="$item.barcode" :text="$item.barcode"></barcode>
                  </el-col>
                  <el-col :span="4" class="text-center">{{$item.name}}</el-col>
                  <el-col :span="2" class="text-center">{{}}</el-col>
                  <el-col :span="2" class="text-center">x{{$item.amount}}</el-col>
                  <el-col :span="2" class="text-center">￥{{$item.price}}</el-col>
                  <el-col :span="2" class="text-right">￥{{$item.amount * $item.price}}</el-col>
                </el-row>
                <el-row class="check-item-row total-row">
                  <el-col :span="16"><strong>合计</strong></el-col>
                  <el-col :span="2" class="text-center">2.5KG</el-col>
                  <el-col :span="2" class="text-center">x2</el-col>
                  <el-col :span="2" class="text-center">￥60.00</el-col>
                  <el-col :span="2" class="text-right">￥60.00</el-col>
                </el-row>
                <el-row class="check-item-row" :gutter="10">
                  <el-col :span="5">
                    <el-button type="info">回退邮包</el-button>
                  </el-col>
                  <el-col :span="5">
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
                <el-col :span="8">地区</el-col>
                <el-col :span="16">{{detailsData.storeArea}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">门店:</el-col>
                <el-col :span="16">{{detailsData.storeName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">地址:</el-col>
                <el-col :span="16">{{detailsData.storeRemark}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">客服:</el-col>
                <el-col :span="16">{{detailsData.storeContactPerson}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">电话:</el-col>
                <el-col :span="16">{{detailsData.storeContact}}</el-col>
              </el-row>
            </el-row>
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24">推送记录:</el-col>
              </el-row>
              <el-row>
                <el-col :span="16">{{}}</el-col>
                <el-col :span="8">{{}}</el-col>
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
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        detailsData: {}
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
        let params = {
          orderNo: $params
        }
        apiDetails.details_tableSendTable(params).then((response) => {
          self.detailsData = response.data.dat
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(to)
      if (to.query) {
        next(vm => {
          vm.details_tableSendTable(to.query.orderNo)
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .order-details{
    color: #666;
    .details-title{
      border-bottom: 1px #ddd solid;
      padding: 10px;
      font-size: 24px;
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
          padding: 20px 0;
          .check-item-row{
            padding-bottom: 20px;
            &.total-row{
              border-top: 1px #ddd solid;
              padding-top: 20px;
            }
            .el-button{
              width: 100%;
            }
          }
        }

      }
      .details-notice{
        margin-top: 20px;
        border: 1px #ddd solid;
        padding: 10px 0;
        border-radius: 5px;
        color: #666;
        .title{
          font-size: 20px;
          border-bottom: 1px #ddd solid;
        }
        >.el-row{
          padding: 10px 20px;
        }
      }
    }
  }
</style>
