<template>
  <div class="delivery-store">
    <div class="search-table">
      <el-form>
        <el-row :gutter="10">
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
              <el-input v-model="searchData.store" placeholder="店铺"></el-input>
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
    <div class="content-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="配送员">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="门店号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="门店名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name1"
          label="联系方式"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            ><router-link to="/delivery/storeDetails">编辑</router-link></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-table-pagination">
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
          store: ''
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
  .delivery-store{
    .content-table{
      margin-bottom: 20px;
    }
  }
</style>
