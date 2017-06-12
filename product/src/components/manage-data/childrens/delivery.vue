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
      <el-card class="box-card">
        <div class="card-content">
          <div class="card-item">
            <label>待配送订单：</label>
            <span>{{cardData.success.wait}}</span>
          </div>
          <div class="card-item">
            <label>配送中订单：</label>
            <span>{{cardData.success.ongoing}}</span>
          </div>
          <div class="card-item">
            <label>今日已送达订单：</label>
            <span>{{cardData.success.totalTotal}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-content">
          <div class="card-item">
            <label>异常订单：</label>
            <span>{{cardData.error.wait}}</span>
          </div>
          <div class="card-item">
            <label>今日回退邮包：</label>
            <span>{{cardData.error.ongoing}}</span>
          </div>
          <div class="card-item">
            <label>今日超时未送：</label>
            <span>{{cardData.error.totalTotal}}</span>
          </div>
          <div class="card-item">
            <label>今日超时未达：</label>
            <span>{{cardData.error.totalTotal}}</span>
          </div>
        </div>
      </el-card>
    </div>
    <echart></echart>
  </div>
</template>

<script>
  import echart from '@/common/echart/demo'
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
    },
    components: {
      echart
    }
  }
</script>

<style lang="scss" type="text/scss">
  .delivery{
    .country-select{
      margin-bottom: 20px;
    }
    .box-card-group{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 170px;
      .box-card{
        width: 48%;
        height: 100%;
        .el-card__body{
          padding: 20px 0;
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
  }
</style>
