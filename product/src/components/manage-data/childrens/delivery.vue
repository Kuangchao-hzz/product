<template>
  <div class="delivery">
    <div class="country-select">
      <span>区域 : </span>
      <el-cascader
        :options="this.$store.state.select.country"
        change-on-select
      ></el-cascader>
    </div>
    <div class="box-card-group">
      <el-row>
        <el-col :span="24">
          工作台
        </el-col>
        <el-col :span="24">
          <el-card class="box-card">
            <el-row>
              <el-col :span="5">
                <div class="card-item">
                  <label>待配送订单：</label>
                  <span>{{cardData.success.wait}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>配送中订单：</label>
                  <span>{{cardData.success.ongoing}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>今日已送达订单：</label>
                  <span>{{cardData.success.totalTotal}}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card class="box-card">
            <el-row>
              <el-col :span="5">
                <div class="card-item">
                  <label>异常订单：</label>
                  <span>{{cardData.error.wait}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>今日回退邮包：</label>
                  <span>{{cardData.error.ongoing}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>今日超时未送：</label>
                  <span>{{cardData.error.totalTotal}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>今日超时未达：</label>
                  <span>{{cardData.error.totalTotal}}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="echart-group">
      <echart></echart>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        cardData: {
          success: {
            wait: '20',
            ongoing: '30',
            totalTotal: '100'
          },
          error: {
            wait: '10',
            ongoing: '20',
            totalTotal: '80',
            outTotalTotal: '100'
          }
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .delivery{
    .country-select{
      margin-bottom: 20px;
      span{
        color: #666;
      }
    }
    .box-card-group{
      height: 170px;
      >.el-row{
        >.el-col{
          &:first-child{
            margin-bottom: 20px;
          }
        }
      }
      .box-card{
        height: 100%;
        border: 0;
        box-shadow: none;
        .el-card__body{
          padding: 0 20px;
          .card-item{
            display: table;
            box-sizing: border-box;
            width: 100%;
            padding: 5px 20px;
            &:hover{
              background: #ddd;
            }
            label{
              display: table-cell;
              text-align: left;
              vertical-align: middle;
            }
            span{
              display: table-cell;
              position: relative;
              float: left;
              width: 100%;
              text-align: right;
              margin-bottom: 0;
            }
          }
        }
        &:nth-of-type(1){
          .card-item{
            padding: 12px 20px;
          }
        }
        &:nth-of-type(2){
          .card-item{
            &:hover{
              background: red;
              color: #fff;
            }
          }
        }
      }
    }
    .echart-group{
      width: 100%;
      height: 500px;
      display: inline-table;
      margin-right: 20px;
      margin-top: 20px;
      overflow: hidden;
    }
  }
</style>
