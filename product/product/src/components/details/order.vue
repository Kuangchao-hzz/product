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
              <el-col :span="18">20170522000001</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">订单类型：</el-col>
              <el-col :span="6">普通</el-col>
              <el-col :span="6">订单状态：</el-col>
              <el-col :span="6">2017/05/22 16:00:00</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">订单时间：</el-col>
              <el-col :span="6">2017/05/22 15:00:00</el-col>
              <el-col :span="6">期望送达时间：</el-col>
              <el-col :span="6">2017/05/22 16:00:00</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">收货人：</el-col>
              <el-col :span="6">张女士</el-col>
              <el-col :span="6">联系方式：</el-col>
              <el-col :span="6">13917186565</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">收货地址：</el-col>
              <el-col :span="18">上海市普陀区真南路166号101室</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">收货人：</el-col>
              <el-col :span="20" class="check-item">
                <el-row class="check-item-row">
                  <el-col :span="6">海天酱油</el-col>
                  <el-col :span="6" class="text-center">400ML</el-col>
                  <el-col :span="4" class="text-center">x1</el-col>
                  <el-col :span="4" class="text-center">￥30.00</el-col>
                  <el-col :span="4" class="text-right">￥30.00</el-col>
                </el-row>
                <el-row class="check-item-row">
                  <el-col :span="6">海天酱油</el-col>
                  <el-col :span="6" class="text-center">400ML</el-col>
                  <el-col :span="4" class="text-center">x1</el-col>
                  <el-col :span="4" class="text-center">￥30.00</el-col>
                  <el-col :span="4" class="text-right">￥30.00</el-col>
                </el-row>
                <el-row class="check-item-row total-row">
                  <el-col :span="6"><strong>合计</strong></el-col>
                  <el-col :span="6" class="text-center">2.5KG</el-col>
                  <el-col :span="4" class="text-center">x2</el-col>
                  <el-col :span="4" class="text-center">￥60.00</el-col>
                  <el-col :span="4" class="text-right">￥60.00</el-col>
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
                <el-col :span="16">上海-上海-普陀区</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">门店:</el-col>
                <el-col :span="16">新村门店</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">地址:</el-col>
                <el-col :span="16">上海市普陀区新村路1500号1层</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">客服:</el-col>
                <el-col :span="16">张张</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">电话:</el-col>
                <el-col :span="16">66123421-1109</el-col>
              </el-row>
            </el-row>
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24">门店信息:</el-col>
              </el-row>
              <el-row>
                <el-col :span="16">5/22 18:00:00</el-col>
                <el-col :span="8">5人</el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
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
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
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
              border-top: 1px #666 solid;
              padding-top: 20px;
            }
            .el-button{
              width: 100%;
            }
          }
        }

      }
      .details-notice{
        margin-bottom: 20px;
        border: 1px #ddd solid;
        padding: 10px 0;
        border-radius: 5px;
        color: #666;
        .title{
          font-size: 20px;
          border-bottom: 1px #666 solid;
        }
        >.el-row{
          padding: 10px 20px;
        }
      }
    }
  }
</style>
