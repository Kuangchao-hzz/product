<template>
  <div class="person-manage">
    <div class="search-table">
      <el-form :inline="true" ref="form">
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
              <el-select v-model="searchData.category" placeholder="类别">
                <el-option
                  v-for="item in this.$store.state.select.category"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
              <el-select v-model="searchData.workStatus" placeholder="工作状态">
                <el-option
                  v-for="item in this.$store.state.select.workStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchData.accountStatus" placeholder="账号状态">
                <el-option
                  v-for="item in this.$store.state.select.accountStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="searchData.personName" placeholder="配送员姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="searchData.personMobile" placeholder="配送员联系方式"></el-input>
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
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="配送员">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="address"
          label="等级"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="工作状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name1"
          label="常驻地区"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="最近送货门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="总抢单量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="准达率"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="退单率"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="账号状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            ><router-link to="/person/personDetails">查看详情</router-link></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="person-manage-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info">升级</el-button>
        <el-button :plain="true" type="info">降级</el-button>
        <el-button :plain="true" type="info">冻结账号</el-button>
        <el-button :plain="true" type="info">账号解冻</el-button>
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
  .person-manage{
    .search-table{
      .el-col{
        >div{
          width: 100%;
          >div{
            width: 100%;
            >div{
              width: 100%;
            }
          }
        }
      }
    }
    .person-manage-table{
      margin-bottom: 20px;
    }
    .person-manage-pagination{
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
  }

</style>
