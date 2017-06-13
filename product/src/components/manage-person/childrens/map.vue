<template>
  <div class="person-map">
    <div class="country-select">
      <span>区域 : </span>
      <el-cascader
        :options="this.$store.state.select.country"
        change-on-select
      ></el-cascader>
    </div>
    <div class="content-map">
      <div class="map-box-card">
        <el-card class="box-card">
          <div class="card-content">
            <div class="card-item">
              <label>待配送订单：</label>
              <span>1</span>
            </div>
            <div class="card-item">
              <label>配送中订单：</label>
              <span>2</span>
            </div>
            <div class="card-item">
              <label>今日已送达订单：</label>
              <span>3</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="map-box-content">
        <div class="box-content-win"></div>
        <div class="box-content-info">
          <h5>配送员信息</h5>
          <hr>
          <div class="info-item">
            <label>配送:</label>
            <span>张三</span>
          </div>
          <div class="info-item">
            <label>手机:</label>
            <span>18701******</span>
          </div>
          <div class="info-item">
            <label>等级:</label>
            <span>3星</span>
          </div>
          <div class="info-item">
            <label>当前状态:</label>
            <span>配送中</span>
          </div>
          <div class="info-item">
            <label>当前订单:</label>
            <span><router-link to="/person/map/detailsOrder">201705220001</router-link></span>
            <span><router-link to="/person/map/detailsOrder">201705220001</router-link></span>
            <span><router-link to="/person/map/detailsOrder">201705220001</router-link></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" type="text/scss">
  .person-map{
    .country-select{
      margin-bottom: 20px;
    }
    .map-box-card{
      width: 800px;
      margin-bottom: 20px;
      .card-content{
        display: flex;
        .card-item{
          width: 200px;
          display: table;
          box-sizing: border-box;
          padding: 5px 20px;
          label{
            display: table-cell;
            vertical-align: middle;
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
    }
    .map-box-content{
      width: 1100px;
      height: 500px;
      display: flex;
      justify-content: space-between;
      border-radius: 5px;
      .box-content-win{
        width: 800px;
        background: #fff;
        border-radius: 5px;
      }
      .box-content-info{
        width: 280px;
        height: 300px;
        background: #fff;
        border-radius: 5px;
        h5{
          padding: 10px;
          text-align: center;
          font-size: 24px;
        }
        .info-item{
          display: table;
          padding: 0 10px;
          overflow: hidden;
          vertical-align: middle;
          label{
            width: 100px;
            display: table-cell;
          }
          span{
            display: block;
            padding: 5px 0;
          }
        }
      }
    }
  }
</style>
