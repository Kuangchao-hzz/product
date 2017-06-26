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
        :data="tableData.details"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="地区">
          <template scope="scope">{{ scope.row.area}}</template>
        </el-table-column>
        <el-table-column
          prop="storeNo"
          label="门店号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="门店名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="contactPerson"
          label="联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系方式"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            ><router-link :to="{path: '/delivery/storeDetails',  query: { id: scope.row.id }}">编辑</router-link></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-table-pagination">
      <el-pagination
        :page-sizes="[20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        searchData: {
          store: ''
        },
        tableData: []
      }
    },
    mounted () {
      this.data_tableStore()
    },
    methods: {
      submitForm () {
        alert(JSON.stringify(this.searchData))
      },
      data_tableStore ($page) {
        let self = this
        let params = {
          page: $page - 1 || 0,
          name: self.store,
          province: '',
          city: '',
          district: '',
          orderType: this.searchData.orderType || '普通',
          area: '1' || 1
        }
        apiTable.data_tableStoreTable(params).then((response) => {
          self.tableData = response.data.dat
        })
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
