<template>
  <div class="delivery" v-if="btn_auth('m_pstj')">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="country-select">
          <span>请选择区域 : {{handlerCountryText}}&nbsp;&nbsp;</span>
        </div>
        <div>
          <el-form
            :model="treeDialog"
            label-width="0">
            <el-form-item class="area-box">
              <el-tree
                :data="this.treeCountry"
                node-key="id"
                ref="tree"
                default-expand-all
                show-checkbox
                :props="defaultProps">
              </el-tree>
            </el-form-item>
            <el-form-item style="text-align: right">
              <el-button @click="resetCheckedNodes">重置</el-button>
              <el-button @click="setAllCheckedNodes">全选</el-button>
              <el-button type="primary" @click="getCheckedNodes">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="box-card-group">
          <el-row>
            <el-col :span="24">
              <strong>工作台</strong>
            </el-col>
            <el-col :span="24">
              <el-card class="box-card">
                <el-row>
                  <el-col :span="6">
                    <div class="card-item">
                      <label>今日订单总数：</label>
                      <span>{{deliveryData.jrAmount}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="card-item">
                      <label>待配送订单：</label>
                      <span>{{deliveryData.dpsAmount}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="card-item">
                      <label>配送中订单：</label>
                      <span>{{deliveryData.pszAmount}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
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
                  <el-col :span="6">
                    <div class="card-item">
                      <label>已关闭订单：</label>
                      <span>{{deliveryData.ygbAmount}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="card-item">
                      <label>今日回退邮包：</label>
                      <span>{{deliveryData.htybAmount}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="card-item">
                      <label>今日超时未送：</label>
                      <span>{{deliveryData.cswsAmount}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
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
            <el-col :span="3" style="width: 100px">
              <strong>经营简报</strong>
            </el-col>
            <el-col :span="4" style="width: 200px">
              <el-date-picker
                v-model="day"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-button type="primary" @click="setAllCheckedNodes()">查询</el-button>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col :span="24">
              <el-row :gutter="20">
                <el-col :lg="12">
                  <div class="statistics-list">
                    <div class="statistics-content">
                      {{deliveryData.jrqdRate ? deliveryData.jrqdRate : '0'}}%
                    </div>
                    <p>抢单率</p>
                  </div>
                </el-col>
                <el-col :lg="12">
                  <div class="statistics-list">
                    <div class="statistics-content">
                      {{deliveryData.jrzdRate ? deliveryData.jrzdRate : '0' }}%
                    </div>
                    <p>准达率</p>
                  </div>
                </el-col>
                <el-col :lg="12">
                  <div class="statistics-list">
                    <div class="statistics-content">
                      {{deliveryData.lsqdRate ? deliveryData.lsqdRate : '0' }}%
                    </div>
                    <p>历史抢单率</p>
                  </div>
                </el-col>
                <el-col :lg="12">
                  <div class="statistics-list">
                    <div class="statistics-content">
                      {{deliveryData.lszdRate ? deliveryData.lszdRate : '0' }}%
                    </div>
                    <p>历史准达率</p>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="explain">
            <el-col :span="12">
              <h4>工作台说明:</h4>
              <p>1.今日订单总数:邮包推送过来的订单数.</p>
              <p>2.待配送订单:状态待抢单,未提货的订单数.</p>
              <p>3.配送中订单数:送货中的订单数.</p>
              <p>4.已送达订单:已签收的订单数.</p>
              <p>5.已关闭订单:已关闭的订单数.</p>
              <p>6.回退邮包:回退邮包的订单数.</p>
              <p>7.超时未送:今日接单后未提货的订单数.</p>
              <p>8.超时未达:超过期望送达时间10分钟后还未送达的订单数.</p>
            </el-col>
            <el-col :span="12">
              <h4>经营简报说明:</h4>
              <p>1.抢单率:除去待抢单的订单占订单总数的百分比.</p>
              <p>2.准达率:准时送达的订单数占送达订单总数的百分比.</p>
              <p>3.历史抢单率/历史准达率:7天内的统计数据.</p>
            </el-col>

          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-else>没有权限查看该页面</div>
</template>

<script>
  import apiTable from '@/api/table'
  import moment from 'moment'
  export default {
    data () {
      return {
        pids: [],
        day: new Date(),
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
      searchDate () {
        if (this.day) {
          return moment(this.day).format('YYYY-MM-DD')
        } else {
          return ''
        }
      },
      treeCountry () {
        let $data = this.$store.state.select.treeCountry
        this.defaultTreeData = $data
        return $data
      },
      handlerCountryText () {
        return this.countryText.join(',')
      }
    },
    mounted () {
      this.setAllCheckedNodes()
    },
    methods: {
      setAllCheckedNodes () {
        this.$nextTick(() => {
          this.$refs['tree'].setCheckedNodes(this.$store.state.select.treeCountry)
          this.getCheckedNodes()
        })
      },
      resetCheckedNodes () {
        this.$refs.tree.setCheckedKeys([])
        this.getCheckedNodes()
      },
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      getCheckedNodes () {
        this.checkedNodesData = this.$refs.tree.getCheckedNodes()
        this.countryText = []
        var ids = []
        this.checkedNodesData.forEach(($item, $index) => {
          ids.push($item.id)
        })
        this.checkedNodesData.forEach(($item, $index) => {
          if (ids.indexOf($item.pid) === -1) {
            this.countryText.push($item.label)
          }
        })
        this.fetch_mapData()
      },
      fetch_mapData (mynode) {
        let self = this
        let $params = {
          provinces: [],
          cities: [],
          districts: [],
          storeIds: []
        }
        self.treeDefaultChecked = []
        self.checkedNodesData.forEach(function ($item, $index) {
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
        Object.assign($params, {
          day: moment(this.day).format('YYYY-MM-DD')
        })
        self.data_table($params)
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
    .explain{
      padding-bottom: 20px;
      color: gray;
      h4{
        line-height: 24px;
        color: #666;
      }
      p{
        line-height: 22px;
      }
    }
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
          margin-bottom: 20px;
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
      line-height: 36px;
    }
    .area-box{
      .el-tree{
        height: 600px;
        overflow-y: auto;
        border: 1px #ddd solid;
        border-radius: 4px;
      }
    }
  }
</style>
