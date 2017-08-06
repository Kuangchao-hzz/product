<template>
  <div class="delivery">
    <div class="country-select">
      <span>区域 : {{handlerCountryText}}&nbsp;&nbsp;</span>
      <a href="javascript:;" @click="treeDialog.type = true">切换</a>
    </div>
    <div class="box-card-group">
      <el-row>
        <el-col :span="24">
          <strong>工作台</strong>
        </el-col>
        <el-col :span="24">
          <el-card class="box-card">
            <el-row>
              <el-col :span="5">
                <div class="card-item">
                  <label>待配送订单：</label>
                  <span>{{deliveryData.dpsAmount}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>配送中订单：</label>
                  <span>{{deliveryData.pszAmount}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>今日已送达订单：</label>
                  <span>{{deliveryData.ysdAmount}}</span>
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
                  <span>{{deliveryData.ycAmount}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>今日回退邮包：</label>
                  <span>{{deliveryData.htybAmount}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>今日超时未送：</label>
                  <span>{{deliveryData.cswsAmount}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="card-item">
                  <label>今日超时未达：</label>
                  <span>{{deliveryData.cswdAmount}}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-box">
      <el-row>
        <el-col :span="24">
          <strong>经营简报</strong>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="24">
          <el-row :gutter="20">
            <el-col :lg="6">
              <div class="statistics-list">
                <div class="statistics-content">
                  {{deliveryData.jrqdRate + '%'}}
                </div>
                <p>今天抢单率</p>
              </div>
            </el-col>
            <el-col :lg="6">
              <div class="statistics-list">
                <div class="statistics-content">
                  {{deliveryData.jrzdRate + '%'}}
                </div>
                <p>今天订单准达率</p>
              </div>
            </el-col>
            <el-col :lg="6">
              <div class="statistics-list">
                <div class="statistics-content">
                  {{deliveryData.lsqdRate + '%'}}
                </div>
                <p>历史抢单率</p>
              </div>
            </el-col>
            <el-col :lg="6">
              <div class="statistics-list">
                <div class="statistics-content">
                  {{deliveryData.lszdRate + '%'}}
                </div>
                <p>历史抢单准达率</p>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="选择区域"
      :visible.sync="treeDialog.type"
      size="small"
      :before-close="handleClose">
      <el-form
        :model="treeDialog"
        label-width="80px">
        <el-form-item label="选择区域: " class="area-box">
          <el-tree
            :data="treeDialog.routerAuth"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="getCheckedNodes">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        searchData: {
          country: []
        },
        deliveryData: {},
        treeDialog: {
          type: false,
          name: '',
          routerAuth: this.$store.state.select.treeCountry
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        countryText: []
      }
    },
    computed: {
      handlerCountryText () {
        return this.countryText.join('/')
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      getCheckedNodes () {
        let self = this
        let data = this.$refs.tree.getCheckedNodes()
        self.countryText = []
        data.forEach(function ($item, $index) {
          self.countryText.push($item.label)
          self.handleClose()
        })
      },
      handleClose (done) {
        this.treeDialog.type = false
      },
      data_table () {
        let self = this
        apiTable.data_dataDeliveryTable({
          city: self.searchData.country[1] || '1',
          province: self.searchData.country[0] || '1',
          district: self.searchData.country[2] || '1'
        }).then((response) => {
          self.deliveryData = response.data.dat
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
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
    .statistics-box{
      .el-row{
        >.el-col{
          .statistics-list{
            text-align: center;
            .statistics-content{
              background: #ddd;
              height: 150px;
              line-height: 150px;
              font-size: 30px;
              color: #fff;
            }
            p{
              width: 100%;
              padding: 20px 0;
              display: block;
            }
          }
          &:nth-child(1){
            .statistics-content{
              background: url("../../../assets/img/bg1.png") no-repeat center center;
              background-size: cover;
            }
          }
          &:nth-child(2){
            .statistics-content{
              background: url("../../../assets/img/bg2.png") no-repeat center center;
              background-size: cover;
            }
          }
          &:nth-child(3){
            .statistics-content{
              background: url("../../../assets/img/bg3.png") no-repeat center center;
              background-size: cover;
            }
          }
          &:nth-child(4){
            .statistics-content{
              background: url("../../../assets/img/bg4.png") no-repeat center center;
              background-size: cover;
            }
          }
        }
      }

    }
    strong{
      font-size: 18px;
    }
    .area-box{
      .el-tree{
        height: 200px;
        overflow-y: auto;
        border: 1px #ddd solid;
        border-radius: 4px;
      }
    }
  }
</style>
