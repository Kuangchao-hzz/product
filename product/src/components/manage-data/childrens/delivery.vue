<template>
  <div class="delivery" v-if="btn_auth('m_pstj')">
    <div class="country-select">
      <span>请选择区域 : {{handlerCountryText}}&nbsp;&nbsp;</span>
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
                  {{deliveryData.jrqdRate ? deliveryData.jrqdRate : '0'}}%
                </div>
                <p>今天抢单率</p>
              </div>
            </el-col>
            <el-col :lg="6">
              <div class="statistics-list">
                <div class="statistics-content">
                  {{deliveryData.jrzdRate ? deliveryData.jrzdRate : '0' }}%
                </div>
                <p>今天订单准达率</p>
              </div>
            </el-col>
            <el-col :lg="6">
              <div class="statistics-list">
                <div class="statistics-content">
                  {{deliveryData.lsqdRate ? deliveryData.lsqdRate : '0' }}%
                </div>
                <p>历史抢单率</p>
              </div>
            </el-col>
            <el-col :lg="6">
              <div class="statistics-list">
                <div class="statistics-content">
                  {{deliveryData.lszdRate ? deliveryData.lszdRate : '0' }}%
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
            :data="this.treeCountry"
            show-checkbox
            node-key="id"
            ref="tree"
            check-strictly
            default-expand-all
            show-checkbox
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
  <div v-else>没有权限查看该页面</div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        checkedNodesData: [],
        searchData: {
          country: []
        },
        deliveryData: {},
        treeDialog: {
          type: false,
          name: '',
          routerAuth: []
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeDefaultChecked: [],
        defaultTreeData: [],
        countryText: []
      }
    },
    computed: {
      treeCountry () {
        let $data = this.$store.state.select.treeCountry
        this.defaultTreeData = $data
        return $data
      },
      handlerCountryText () {
        return this.countryText.join('/')
      }
    },
    mounted () {
      this.data_table({
        provinces: [],
        cities: [],
        districts: [],
        storeIds: []
      })
      this.defaultCountryText(this.defaultTreeData)
    },
    methods: {
      defaultCountryText ($data) {
        let self = this
        $data.forEach(($item, $index) => {
          this.countryText.push($item.label)
          this.treeDefaultChecked.push($item.id)
          if ($item.children) {
            self.defaultCountryText($item.children)
          }
        })
      },
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      getCheckedNodes () {
        this.handleClose()
        this.checkedNodesData = this.$refs.tree.getCheckedNodes()
        this.fetch_mapData()
      },
      fetch_mapData () {
        let self = this
        let $params = {
          provinces: [],
          cities: [],
          districts: [],
          storeIds: []
        }
        self.countryText = []
        self.treeDefaultChecked = []
        self.checkedNodesData.forEach(function ($item, $index) {
          self.countryText.push($item.label)
          self.treeDefaultChecked.push($item.id)
          if ($item.id <= 200) {
            $params.provinces.push($item.id)
          } else if ($item.id <= 2000 && $item.id > 200) {
            $params.cities.push($item.id)
          } else if ($item.id <= 20000 && $item.id > 2000) {
            $params.districts.push($item.id)
          } else {
            $params.storeIds.push($item.id)
          }
        })
        self.data_table($params)
      },
      handleClose (done) {
        this.treeDialog.type = false
      },
      data_table ($params) {
        let self = this
        apiTable.data_dataDeliveryTable($params).then((response) => {
          if (response.data.code === 1) {
            self.deliveryData = response.data.dat
          }
        })
      }
    },
    watch: {
      'treeDialog.type' () {
        if (this.treeDialog.type) {
          this.$nextTick(() => {
            this.$refs['tree'].setCheckedKeys(this.treeDefaultChecked)
          })
        } else {
          this.$refs['tree'].setCheckedKeys([])
        }
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
