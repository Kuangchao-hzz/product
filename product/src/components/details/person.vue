<template>
  <div class="person-details">
    <div class="details-title">
      配送员详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="15" class="base-info">
            <el-row class="data-item">
              <el-col :span="4"><strong>姓名：</strong></el-col>
              <el-col :span="7">{{detailsData.realName?detailsData.realName:'- -'}}</el-col>
              <el-col :span="4"><strong>联系方式：</strong></el-col>
              <el-col :span="6">{{detailsData.phone?detailsData.phone:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>类别：</strong></el-col>
              <el-col :span="7">
                {{ detailsData.userType == '1'? '员工' : '' }}
                {{ detailsData.userType == '2'? '社会' : '' }}
              </el-col>
              <el-col :span="4"><strong>工号：</strong></el-col>
              <el-col :span="6">{{detailsData.employeeId?detailsData.employeeId : '- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>等级：</strong></el-col>
              <el-col :span="7">{{detailsData.level?detailsData.level + '级' : '- -'}}</el-col>
              <el-col :span="4"><strong>当前状态：</strong></el-col>
              <el-col :span="6">
                {{ detailsData.workStatus == '1'? '抢单中' : '' }}
                {{ detailsData.workStatus == '2'? '休息中' : '' }}
                {{ detailsData.workStatus == '3'? '配送中' : '' }}
              </el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>性别：</strong></el-col>
              <el-col :span="7">
                {{ detailsData.gender == '1'? '男' : '' }}
                {{ detailsData.gender == '2'? '女' : '' }}
              </el-col>
              <el-col :span="4"><strong>年龄：</strong></el-col>
              <el-col :span="6">{{detailsData.age?detailsData.age:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>配送方式：</strong></el-col>
              <el-col :span="7">
                {{ detailsData.deliveryMode == '1'? '骑行' : '' }}
                {{ detailsData.deliveryMode == '2'? '驾车' : '' }}
              </el-col>
              <el-col :span="4"><strong>常驻地区：</strong></el-col>
              <el-col :span="6">{{detailsData.city?detailsData.city:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>设备型号：</strong></el-col>
              <el-col :span="7">{{detailsData.device?detailsData.device:'- -'}}</el-col>
            </el-row5
            <el-row class="data-item">
              <el-col :span="4"><strong>注册时间：</strong></el-col>
              <el-col :span="7">{{detailsData.regTime?detailsData.regTime:'- -'}}</el-col>
              <el-col :span="4"><strong>工作年限：</strong></el-col>
              <el-col :span="6">{{detailsData.workStatus?detailsData.workStatus:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>注册ip：</strong></el-col>
              <el-col :span="7">{{detailsData.regIp?detailsData.regIp:'- -'}}</el-col>
              <el-col :span="4"><strong>ip地区：</strong></el-col>
              <el-col :span="6">{{detailsData.ipCity?detailsData.ipCity:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>最近送货门店：</strong></el-col>
              <el-col :span="7">{{detailsData.lastStoreName?detailsData.lastStoreName:'- -'}}</el-col>
              <el-col :span="4"><strong>最近抢单时间：</strong></el-col>
              <el-col :span="6">{{detailsData.lastOrderTime?detailsData.lastOrderTime:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4"><strong>身份证：</strong></el-col>
              <el-col :span="7">{{detailsData.idCard?detailsData.idCard:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-button type="info" @click="details_handlePersonUpDown(1)">升级</el-button>
              <el-button type="info" @click="details_handlePersonUpDown(0)">降级</el-button>
              <el-button type="info" @click="details_handlePersonEnabled(0)">账号冻结</el-button>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="details-notice" v-if="detailsData.userData">
              <el-row class="title">
                <el-col :span="24">数据统计:</el-col>
              </el-row>
              <el-row>
                <el-col :span="10"><strong>本月/历史订单量</strong></el-col>
                <el-col :span="14">
                  {{detailsData.userData.monthAmount?detailsData.userData.monthAmount + '%' :'- -'}}
                  /
                  {{detailsData.userData.monthAmount?detailsData.userData.totalAmount + '%' :'- -'}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10"><strong>本月/历史准达率:</strong></el-col>
                <el-col :span="14">
                  {{detailsData.userData.monthOntimeRate?detailsData.userData.monthOntimeRate + '%' :'- -'}}
                  /
                  {{detailsData.userData.totalOntimeRate?detailsData.userData.totalOntimeRate + '%' :'- -'}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10"><strong>本月/历史退单率:</strong></el-col>
                <el-col :span="14">
                  {{detailsData.userData.monthCancelRate?detailsData.userData.monthCancelRate + '%' :'- -'}}
                  /
                  {{detailsData.userData.totalCancelRate?detailsData.userData.totalCancelRate + '%' :'- -'}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10"><strong>本月佣金:</strong></el-col>
                <el-col :span="14">{{detailsData.userData.totalOntimeRate?'￥' + detailsData.userData.totalOntimeRate :'- -'}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="10"><strong>历史佣金:</strong></el-col>
                <el-col :span="14">{{detailsData.userData.totalCommission?'￥' + detailsData.userData.totalCommission :'- -'}}</el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="24" class="base-info" style="padding-top: 10px">
            <div class="search-table">
              <el-form :inline="true" ref="form">
                <el-row :gutter="10">
                  <el-col :span="3">
                    <el-form-item>
                      <el-select v-model="searchData.score" placeholder="等级">
                        <el-option
                          v-for="item in this.$store.state.select.orderLevel"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-select v-model="searchData.isAbnormal" placeholder="异常状态">
                        <el-option
                          v-for="item in this.$store.state.select.abnormalStart"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-select v-model="searchData.range" placeholder="时间范围">
                        <el-option
                          v-for="item in this.$store.state.select.timeBetween"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item>
                      <el-input v-model="searchData.orderNo" placeholder="订单号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-button type="primary" @click="details_personTableData">查询</el-button>
                      <el-button type="primary" @click="resetForm">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="person-manage-table">
              <el-table
                ref="multipleTable"
                :data="tableData.details"
                :height="tabHeight"
                :max-height="tabHeight"
                border
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  label="订单编号"
                  align="center"
                  width="210"
                  fixed>
                  <template scope="scope">{{ scope.row.orderNo }}</template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="100"
                  prop="orderType"
                  label="订单类别">
                </el-table-column>
                <el-table-column
                  prop="storeName"
                  align="center"
                  width="180"
                  label="提货门店"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="receiverAddress"
                  align="center"
                  width="180"
                  label="送货地点"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="name1"
                  align="center"
                  width="180"
                  label="常驻地区"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="orderTime"
                  label="订单时间"
                  align="center"
                  width="180"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="scheduledTime"
                  align="center"
                  width="180"
                  label="需要送达时间"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="订单状态"
                  align="center"
                  width="100"
                  show-overflow-tooltip>
                  <template scope="scope">
                    {{scope.row.orderStatus === 10 ? '待抢单': ''}}
                    {{scope.row.orderStatus === 20 ? '抢单中': ''}}
                    {{scope.row.orderStatus === 30 ? '待拣货': ''}}
                    {{scope.row.orderStatus === 40 ? '待验货': ''}}
                    {{scope.row.orderStatus === 50 ? '送货中': ''}}
                    {{scope.row.orderStatus === 60 ? '已送达': ''}}
                    {{scope.row.orderStatus === 90 ? '已退单': ''}}
                    {{scope.row.orderStatus === 91 ? '已拒单': ''}}
                    {{scope.row.orderStatus === 99 ? '已关闭': ''}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="是否异常"
                  align="center"
                  width="100"
                  show-overflow-tooltip>
                  <template scope="scope">
                    <p v-if="scope.row.isAbnormal === 0">无异常</p>
                    <p v-else>
                      {{scope.row.isAbnormal === 1 ? '无人抢单': ''}}
                      {{scope.row.isAbnormal === 2 ? '主动退出': ''}}
                      {{scope.row.isAbnormal === 3 ? '超时未送': ''}}
                      {{scope.row.isAbnormal === 4 ? '超时未达': ''}}
                      {{scope.row.isAbnormal === 5 ? '商城关闭': ''}}
                      {{scope.row.isAbnormal === 6 ? '客户拒单': ''}}
                      {{scope.row.isAbnormal === 7 ? '商城退换货': ''}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  align="center"
                  width="100"
                  label="评价"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作"
                                 align="center"
                                 width="100"
                                 fixed="right">
                  <template scope="scope">
                    <router-link to="/order/allDetails">查看详情</router-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="person-manage-pagination">
              <el-pagination
                :page-sizes="[20]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.rowsCount">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import apiDetails from '@/api/details'
  export default {
    data () {
      return {
        detailsData: {},
        searchData: {
          score: '',
          range: '',
          orderNo: '',
          isAbnormal: '',
          deliveryUserId: this.$route.query.id,
          personMobile: ''
        },
        tableData: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 250
      }
    },
    mounted () {
      this.details_personTableData()
    },
    methods: {
      resetForm () {
        this.searchData.score = ''
        this.searchData.range = ''
        this.searchData.isAbnormal = ''
        this.searchData.orderNo = ''
      },
      details_personData ($params) {
        let self = this
        apiDetails.details_personData({
          id: $params
        }).then((response) => {
          self.$nextTick(function () {
            self.detailsData = response.data.dat
          })
        })
      },
      details_personTableData ($page) {
        let self = this
        apiDetails.details_personTableData({
          page: $page - 1 || 0,
          score: self.searchData.score,
          range: self.searchData.range,
          orderNo: self.searchData.orderNo,
          isAbnormal: self.searchData.isAbnormal,
          deliveryUserId: self.searchData.deliveryUserId
        }).then((response) => {
          self.tableData = response.data.dat
        })
      },
      details_handlePersonUpDown ($params) {
        let self = this
        apiDetails.details_handlePersonUpDown({
          id: self.$route.query.id,
          direction: $params
        }).then((response) => {
          if (Number(response.data.code) !== 1) {
            this.$message(response.data.msg)
          } else {
            this.$message('操作成功！')
            this.$router.go('-1')
          }
        })
      },
      details_handlePersonEnabled ($params) {
        let self = this
        apiDetails.details_handlePersonEnabled({
          id: self.$route.query.id,
          direction: $params
        }).then((response) => {
          if (Number(response.data.code) !== 1) {
            this.$message(response.data.msg)
          } else {
            this.$message('操作成功！')
            this.$router.go('-1')
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query) {
        next(vm => {
          vm.details_personData(to.query.id)
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .person-details{
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
        padding-bottom: 0;
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
          >.el-col{
            &:nth-of-type(2){
              text-align: right;
            }
          }
        }
      }
      .person-manage-table{
        margin-bottom: 20px;
      }
      .person-manage-pagination{
        text-align: right;
        .el-pagination__total{
          color: #fff;
        }
        .el-pagination__jump{
          color: #fff;
          input{
            color: #666;
          }
        }
      }
    }
  }
</style>
