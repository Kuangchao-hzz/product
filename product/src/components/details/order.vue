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
              <el-col :span="18">{{detailsData.orderNo?detailsData.orderNo : '- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">订单类型：</el-col>
              <el-col :span="6">{{detailsData.orderType?detailsData.orderType : '- -'}}</el-col>
              <el-col :span="6">订单状态：</el-col>
              <el-col :span="6">{{detailsData.orderStatus?detailsData.orderStatus : '- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">订单时间：</el-col>
              <el-col :span="6">{{detailsData.mallTime?detailsData.mallTime:'- -'}}</el-col>
              <el-col :span="6">期望送达时间：</el-col>
              <el-col :span="6">{{detailsData.scheduledTime?detailsData.scheduledTime:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">收货人：</el-col>
              <el-col :span="6">{{detailsData.receiverName?detailsData.receiverName:'- -'}}</el-col>
              <el-col :span="6">联系方式：</el-col>
              <el-col :span="6">{{detailsData.receiverPhone?detailsData.receiverPhone:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">收货地址：</el-col>
              <el-col :span="18">{{detailsData.receiverAddress?detailsData.receiverAddress:'--'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">商品明细：</el-col>
              <el-col :span="20" class="check-item">
                <el-row class="check-item-row"
                        type="flex"
                        align="middle"
                v-for="($item, $index) in detailsData.details">
                  <el-col :lg="8">
                    <barcode :value="$item.barcode" :text="$item.barcode" ></barcode>
                  </el-col>
                  <el-col :lg="6" class="text-center">{{$item.name}}</el-col>
                  <el-col :lg="4" class="text-center">{{$item.volume}}</el-col>
                  <el-col :lg="2" class="text-center">x{{$item.amount}}</el-col>
                  <el-col :lg="4" class="text-center">￥{{$item.price}}</el-col>
                  <el-col :lg="4" class="text-right">￥{{$item.amount * $item.price}}</el-col>
                </el-row>
                <el-row class="check-item-row total-row"
                type="flex"
                align="middle">
                  <el-col :lg="14"><strong>合计</strong></el-col>
                  <el-col :lg="4" class="text-center">{{detailsData.weight}}KG</el-col>
                  <el-col :lg="2" class="text-center">x2</el-col>
                  <el-col :lg="4" class="text-center">￥60.00</el-col>
                  <el-col :lg="4" class="text-right">￥60.00</el-col>
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
                <el-col :span="16">{{detailsData.storeInfo.area}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">门店:</el-col>
                <el-col :span="16">{{detailsData.storeInfo.name?detailsData.storeInfo.name:'- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">地址:</el-col>
                <el-col :span="16">{{detailsData.storeInfo.address?detailsData.storeInfo.address:'- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">客服:</el-col>
                <el-col :span="16">{{detailsData.storeInfo.contactPerson?detailsData.storeInfo.contactPerson:'- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">电话:</el-col>
                <el-col :span="16">{{detailsData.storeInfo.contact?detailsData.storeInfo.contact:'- -'}}</el-col>
              </el-row>
            </el-row>
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24">推送记录:</el-col>
              </el-row>
              <el-row v-for="($item, $index) in detailsData.pushInfo">
                <el-col :span="16">{{$item.pushTime?$item.pushTime:'- -'}}</el-col>
                <el-col :span="8">{{$item.pushUsers?$item.pushUsers:'- -'}}</el-col>
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
          orderId: $params
        }
        apiDetails.details_tableSendTable(params).then((response) => {
          if (response.data.code === 1) {
            self.detailsData = response.data.dat
          } else {
            alert(response.data.msg)
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(to)
      if (to.query) {
        next(vm => {
          vm.details_tableSendTable(to.query.orderId)
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
