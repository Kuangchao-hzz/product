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
              <el-col :span="4">姓名：</el-col>
              <el-col :span="6">张三</el-col>
              <el-col :span="6">联系方式：</el-col>
              <el-col :span="6">13918181818</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">类别：</el-col>
              <el-col :span="6">员工</el-col>
              <el-col :span="6">工号：</el-col>
              <el-col :span="6">00001</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">等级：</el-col>
              <el-col :span="6">二级</el-col>
              <el-col :span="6">当前状态：</el-col>
              <el-col :span="6">配送中</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">性别：</el-col>
              <el-col :span="6">男</el-col>
              <el-col :span="6">年龄：</el-col>
              <el-col :span="6">27</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">配送方式：</el-col>
              <el-col :span="6">骑行</el-col>
              <el-col :span="6">常驻地区：</el-col>
              <el-col :span="6">上海-上海-普陀区</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">设备型号：</el-col>
              <el-col :span="6">苹果</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">注册时间：</el-col>
              <el-col :span="6">2017/05/22 15:00:00</el-col>
              <el-col :span="6">工作年限：</el-col>
              <el-col :span="6">1年</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">注册ip：</el-col>
              <el-col :span="6">123.123.123.123</el-col>
              <el-col :span="6">ip地区：</el-col>
              <el-col :span="6">上海</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">最近送货门店：</el-col>
              <el-col :span="6">上海-新村门店</el-col>
              <el-col :span="6">最近抢单时间：</el-col>
              <el-col :span="6">2017/05/22 15:00:00</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">身份证：</el-col>
              <el-col :span="6">显示身份证</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3">
                <el-button type="info" @click="outOrderDialog = true">升级</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="info" @click="closeOrderDialog = true">降级</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="info" @click="closeOrderDialog = true">账号冻结</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="details-notice">
              <el-row class="title">
                <el-col :span="24">数据统计:</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">本月/历史订单量</el-col>
                <el-col :span="16">20/20</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">本月/历史准达率:</el-col>
                <el-col :span="16">90%/90%</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">本月/历史退单率:</el-col>
                <el-col :span="16">20%/20%</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">本月佣金:</el-col>
                <el-col :span="16">￥100.0</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">历史佣金:</el-col>
                <el-col :span="16">￥1,100.0</el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" style="margin-top: 20px">
          <el-col :span="24" class="base-info">
            <div class="search-table">
              <el-form :inline="true" ref="form">
                <el-row :gutter="10">
                  <el-col :span="3">
                    <el-form-item>
                      <el-select v-model="searchData.personLevel" placeholder="等级">
                        <el-option
                          v-for="item in this.$store.state.select.personLevel"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-select v-model="searchData.workStatus" placeholder="异常状态">
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
                      <el-select v-model="searchData.accountStatus" placeholder="时间范围">
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
                      <el-input v-model="searchData.personName" placeholder="订单号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item>
                      <el-button type="primary" @click="submitForm">查询</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="person-manage-table">
              <el-table
                ref="multipleTable"
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  label="订单编号">
                  <template scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="订单类别">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="提货门店"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="送货地点"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="name1"
                  label="常驻地区"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="订单时间"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="需要送达时间"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="订单状态"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="是否异常"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="评价"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                  <template scope="scope">
                    <el-button type="text"
                               size="small"
                    ><router-link to="/order/allDetails">查看详情</router-link></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="person-manage-pagination">
              <el-pagination
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
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
        searchData: {
          category: '',
          personLevel: '',
          workStatus: '',
          accountStatus: '',
          personName: '',
          personMobile: ''
        },
        tableData: [{
          date: '201705220001',
          name: '普通',
          address: '上海-新村门店',
          date1: '201705220001',
          name1: '普通',
          address1: '上海-新村门店',
          date2: '201705220001'
        }, {
          date: '201705220001',
          name: '普通',
          address: '上海-新村门店',
          date1: '201705220001',
          name1: '普通',
          address1: '上海-新村门店',
          date2: '201705220001'
        }]
      }
    },
    methods: {
      submitForm () {
        alert(JSON.stringify(this.searchData))
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .order-details{
    color: #666;
    .details-title{
      border-bottom: 1px #ddd solid;
      padding: 10px;
      font-size: 24px;
    }
    .content-body{
      .base-info{
        background: #fff;
        color: #666;
        border-radius: 5px;
        padding: 20px;
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
