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
              <el-col :span="6">20170522000001</el-col>
              <el-col :span="6">异常类型：</el-col>
              <el-col :span="6">超时未送</el-col>
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
              <el-col :span="4">拣货时间：</el-col>
              <el-col :span="6">2017/05/22 15:12:00</el-col>
              <el-col :span="6">验货时间：</el-col>
              <el-col :span="6">--</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">送达时间：</el-col>
              <el-col :span="18">--</el-col>
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
              <el-col :span="4">订单内容：</el-col>
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
              </el-col>
            </el-row>
            <hr>
            <el-row class="data-item abnormal-row">
              <el-col :span="4">异常时间：</el-col>
              <el-col :span="6">2017/05/22 15:00:00</el-col>
            </el-row>
            <el-row class="data-item abnormal-row">
              <el-col :span="4">退单人：</el-col>
              <el-col :span="6">李四</el-col>
              <el-col :span="6">联系方式：</el-col>
              <el-col :span="6">13918181212</el-col>
            </el-row>
            <el-row class="data-item abnormal-row">
              <el-col :span="4">退单原因：</el-col>
              <el-col :span="6">任性</el-col>
            </el-row>
            <el-row class="data-item abnormal-row-last">
              <el-col :span="4"></el-col>
              <el-col :span="20">
                <el-row :gutter="20">
                  <el-col :span="3">
                    <el-button type="info" @click="outOrderDialog = true">退单</el-button>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="info" @click="closeOrderDialog = true">关闭订单</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24"><strong>门店信息:</strong></el-col>
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
                <el-col :span="24"><strong>配送员信息:</strong></el-col>
              </el-row>
              <el-row>
                <el-col :span="8">配送:</el-col>
                <el-col :span="16">张三</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">手机:</el-col>
                <el-col :span="16">13918181212</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">等级:</el-col>
                <el-col :span="16">3星</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">佣金:</el-col>
                <el-col :span="16">8元</el-col>
              </el-row>
            </el-row>
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24"><strong>推送记录:</strong></el-col>
              </el-row>
              <el-row>
                <el-col :span="8">5/22 18:00:00</el-col>
                <el-col :span="16">5人</el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      title="退单"
      :visible.sync="outOrderDialog"
      size="tiny"
      :before-close="handleClose">
      <el-form ref="form" :model="outOrderForm" label-width="80px">
        <el-form-item label="特殊资源">
          <el-radio-group v-model="outOrderForm.send">
            <el-radio label="1">线上品牌商赞助</el-radio>
            <el-radio label="2">线下场地免费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
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
      size="tiny"
      :before-close="handleClose">
      <el-form ref="form" :model="closeOrderForm" label-width="80px">
        <el-form-item label="关闭原因">
          <el-select v-model="closeOrderForm.region" placeholder="请选择活动区域">
            <el-option label="" value="1">客户拒单</el-option>
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
  export default {
    data () {
      return {
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
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .order-details{
    color: #fff;
    .details-title{
      border-bottom: 1px #fff solid;
      padding: 10px;
      font-size: 24px;
    }
    .content-body{
      padding: 20px 0;
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
        background: #fff;
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
    .line-halving{
      border-top: 1px #666 solid;
    }
    .abnormal-row:nth-child(1){
      border-top: 1px #666 solid;
    }
  }
</style>
