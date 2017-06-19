<template>
  <div class="delivery-people">
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
          <h5>本地新增</h5>
          <div class="card-item">
            <label>本地注册配送员：</label>
            <span>{{cardData.success.wait}}</span>
          </div>
          <div class="card-item">
            <label>本地社会配送员：</label>
            <span>{{cardData.success.ongoing}}</span>
          </div>
          <div class="card-item">
            <label>本地员工您配送员：</label>
            <span>{{cardData.success.totalTotal}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-content">
          <h5>当日新增</h5>
          <div class="card-item">
            <label>本日新增注册：</label>
            <span>{{cardData.error.wait}}</span>
          </div>
          <div class="card-item">
            <label>本日新增社会注册：</label>
            <span>{{cardData.error.ongoing}}</span>
          </div>
          <div class="card-item">
            <label>本日新增员工注册：</label>
            <span>{{cardData.error.totalTotal}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-content">
          <h5>本月新增</h5>
          <div class="card-item">
            <label>本月新增注册：</label>
            <span>{{cardData.error.wait}}</span>
          </div>
          <div class="card-item">
            <label>本月新增社会注册：</label>
            <span>{{cardData.error.ongoing}}</span>
          </div>
          <div class="card-item">
            <label>本月新增员工注册：</label>
            <span>{{cardData.error.totalTotal}}</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="box-table-group">
      <div class="box-table-item">
        <h5>本月接单配送员TOP5</h5>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="类别"
            width="80">
          </el-table-column>
          <el-table-column
            prop="address"
            label="接单">
          </el-table-column>
          <el-table-column
            prop="address"
            label="准达率">
          </el-table-column>
        </el-table>
      </div>
      <div class="box-table-item">
        <h5>本月准达配送员TOP5</h5>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="类别"
            width="80">
          </el-table-column>
          <el-table-column
            prop="address"
            label="接单">
          </el-table-column>
          <el-table-column
            prop="address"
            label="准达率">
          </el-table-column>
        </el-table>
      </div>
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
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
.delivery-people{
  .country-select{
    margin-bottom: 20px;
  }
  .box-card-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box-card{
      width: 33%;
      .el-card__body {
        padding: 0 0 20px 0;
        h5{
          text-align: center;
          width: 100%;
          font-size: 24px;
          padding: 20px;
          background: #ddd;
          margin-bottom: 10px;
        }
        .card-item {
          display: table;
          box-sizing: border-box;
          width: 100%;
          padding: 5px 20px;
          &:hover {
            background: #ddd;
          }
          label {
            display: table-cell;
            text-align: left;
          }
          span {
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
  }
  .box-table-group{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .box-table-item{
      width: 48%;
      border-radius: 5px;
      overflow: hidden;
      h5 {
        width: 100%;
        background: #ddd;
        text-align: center;
        font-size: 28px;
        padding: 10px 0;
      }
    }
  }
}
</style>
