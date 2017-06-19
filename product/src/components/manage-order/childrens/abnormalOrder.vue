<template>
  <div class="wait-abnormal-order">
    <div class="search-table">
      <el-form :inline="true">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  :options="this.$store.state.select.country"
                  change-on-select
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.abnormalType" placeholder="订单类型">
                <el-option
                  v-for="item in this.$store.state.select.abnormalType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.disposeType" placeholder="处理状态">
                <el-option
                  v-for="item in this.$store.state.select.disposeType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="searchData.personMobile" placeholder="配送员联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="wait-abnormal-tag">
      <el-tag class="info-row-abnormal">异常状态一</el-tag>
      <el-tag class="info-row-error">异常状态二</el-tag>
    </div>
    <div class="wait-abnormal-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-button type="primary">订单详情</el-button>
              <el-button type="primary">退单</el-button>
              <el-button type="primary">关闭退单</el-button>
              <el-button type="primary">人工处理</el-button>
            </el-form>
          </template>

        </el-table-column>
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
          label="订单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="需要送达时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
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
          orderType: '',
          abnormalType: '',
          disposeType: '',
          personMobile: ''
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
        }, {
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
      tableRowClassName (row, index) {
        if (index === 0) {
          return 'info-row-abnormal'
        } else if (index === 1) {
          return 'info-row-error'
        }
        return ''
      },
      submitForm () {
        alert(JSON.stringify(this.searchData))
      },
      lookDetails ($item) {
        this.$router.push('/order/abnormalDetails')
      }
    }
  }
</script>

<style lang="scss" type="text/scss">

  /*异常标签*/
  .wait-abnormal-tag{
    .el-tag{
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .wait-abnormal-table{
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

  .info-row-abnormal {
    background: #f60 !important;
    color: #fff !important;
    .el-table__expand-icon{
      color: #fff !important;
    }
    &:hover{
      background: #f60;
      >td, .el-table__expand-icon {
        background: #f60 !important;
      }
    }
  }
  .info-row-error {
    background: red !important;
    color: #fff;
    .el-table__expand-icon{
      color: #fff !important;
    }
    &:hover{
      background: red !important;
      >td, .el-table__expand-icon {
        background: red !important;
      }
    }
  }
</style>
