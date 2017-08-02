<template>
  <div class="abnormal-details">
    <div class="details-title">
      异常订单详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="15" class="base-info">
            <el-row class="data-item">
              <el-col :span="3"><strong>订单编号：</strong></el-col>
              <el-col :span="6">20170522000001</el-col>
              <el-col :span="4"><strong>异常类型：</strong></el-col>
              <el-col :span="6">超时未送</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>订单类型：</strong></el-col>
              <el-col :span="6">普通</el-col>
              <el-col :span="4"><strong>订单状态：</strong></el-col>
              <el-col :span="6">2017/05/22 16:00:00</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>订单时间：</strong></el-col>
              <el-col :span="6">2017/05/22 15:00:00</el-col>
              <el-col :span="4"><strong>期望送达时间：</strong></el-col>
              <el-col :span="6">2017/05/22 16:00:00</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>拣货时间：</strong></el-col>
              <el-col :span="6">2017/05/22 15:12:00</el-col>
              <el-col :span="4"><strong>验货时间：</strong></el-col>
              <el-col :span="6">--</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>送达时间：</strong></el-col>
              <el-col :span="18">--</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>收货人：</strong></el-col>
              <el-col :span="6">张女士</el-col>
              <el-col :span="4"><strong>联系方式：</strong></el-col>
              <el-col :span="6">13917186565</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>收货地址：</strong></el-col>
              <el-col :span="18">上海市普陀区真南路166号101室</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>订单内容：</strong></el-col>
              <el-col :span="21" class="item-details check-item">
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
              <el-col :span="4"><strong>异常时间：</strong></el-col>
              <el-col :span="6">2017/05/22 15:00:00</el-col>
              <el-col :span="6"><strong>异常原因：</strong></el-col>
              <el-col :span="6">2017/05/22 16:00:00</el-col>
            </el-row>
            <el-row class="data-item abnormal-row">
              <el-col :span="4"><strong>处理时间：</strong></el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"><strong>处理结果：</strong></el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="data-item abnormal-row-last">
              <el-col :span="4"></el-col>
              <el-col :span="20">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <el-button type="info">退单</el-button>
                  </el-col>
                  <el-col :span="5">
                    <el-button type="info">关闭订单</el-button>
                  </el-col>
                  <el-col :span="5">
                    <el-button type="info">人工处理</el-button>
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
                <el-col :span="3"><strong>地区:</strong></el-col>
                <el-col :span="16">上海-上海-普陀区</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>门店:</strong></el-col>
                <el-col :span="16">新村门店</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>地址:</strong></el-col>
                <el-col :span="16">上海市普陀区新村路1500号1层</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>客服:</strong></el-col>
                <el-col :span="16">张张</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>电话:</strong></el-col>
                <el-col :span="16">66123421-1109</el-col>
              </el-row>
            </el-row>
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24"><strong>配送员信息:</strong></el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>配送:</strong></el-col>
                <el-col :span="16">张三</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>手机:</strong></el-col>
                <el-col :span="16">13918181212</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>等级:</strong></el-col>
                <el-col :span="16">3星</el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><strong>佣金:</strong></el-col>
                <el-col :span="16">8元</el-col>
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

<style lang="scss" type="text/scss" scoped>
  .abnormal-details{
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
          &.item-details{
            background: #e1e1e1;
            padding: 10px 10px 0 10px
          }
          .check-item-row{
            padding-bottom: 10px;
            &.total-row{
              border-top: 1px #666 solid;
              padding-top: 20px;
            }
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
