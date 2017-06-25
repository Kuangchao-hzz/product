<template>
  <div class="wait-all-order">
    <div class="search-table">
      <el-form :inline="true" class="search-form">
        <el-row>
          <el-col :span="5">
            <el-form-item>
              <el-input placeholder="订单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="searchData.personMobile" placeholder="配送员联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-date-picker
                v-model="searchData.orderTime"
                type="datetime"
                placeholder="订单时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-date-picker
                v-model="searchData.orderSendTime"
                type="datetime"
                placeholder="送达时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  :options="this.$store.state.select.country"
                  change-on-select
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="searchData.orderType" placeholder="订单类型">
                <el-option
                  v-for="item in this.$store.state.select.orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.orderStatus" placeholder="订单状态">
                <el-option
                  v-for="item in this.$store.state.select.orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.pushOrderType" placeholder="抢单状态">
                <el-option
                  v-for="item in this.$store.state.select.pushOrderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.orderLevel" placeholder="订单评价">
                <el-option
                  v-for="item in this.$store.state.select.orderLevel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
    <div class="wait-send-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          label="订单编号">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="订单类别">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="提货门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="送货地点"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name1"
          label="订单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="需要送达时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
                       @click="lookDetails(scope.row.id)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wait-send-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info">导出excel</el-button>
      </div>
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchData: {
          personMobile: '',
          orderType: '',
          orderStatus: '',
          pushOrderType: '',
          orderTime: '',
          orderSendTime: '',
          orderLevel: ''
        },
        tableData: [{
          date: '201705220001',
          name: '普通',
          address: '上海-新村门店',
          date1: '201705220001',
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
      },
      lookDetails ($item) {
        this.$router.push('/order/allDetails')
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .search-form{
    >div{
      &:nth-child(1){
        >div{
          margin-right: 16px;
          >div{
            width: 100%;
          }
        }
      }
      &:nth-child(2){
        >div{
          margin-right: 16px;
          >div{
            width: 100%;
          }
        }
      }
    }
  }
  .wait-send-table{
    margin-bottom: 20px;
  }
  .wait-send-pagination{
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>
