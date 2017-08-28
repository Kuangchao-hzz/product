<template>
  <div class="delivery-store">
    <div class="search-table">
      <el-form>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  v-model="searchData.country"
                  :options="this.$store.state.select.country"
                  :props="this.$store.state.select.defaultCountryProps"
                  @change="fetchStoreData"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="searchData.storeId" placeholder="请选择门店">
                <el-option
                  v-for="($item, $index) in storeData"
                  :key="$index"
                  :label="$item.label"
                  :value="$item.val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="data_table">查询</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-table">
      <el-table
        ref="multipleTable"
        :max-height="tabHeight"
        :height="tabHeight"
        :data="tableData.details"
        v-loading.body="loading"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          align="center"
          min-width="150"
          label="地区">
          <template scope="scope">{{ scope.row.area}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="storeNo"
          label="门店号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="门店名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="contactPerson"
          label="联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="150"
          prop="contact"
          label="联系方式"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="备注"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
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
        :total="tableData.rowsCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        loading: false,
        searchData: {
          country: [],
          storeId: ''
        },
        storeData: [],
        tableData: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 305
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      resetForm () {
        this.searchData.country = []
        this.searchData.store = ''
      },
      fetchStoreData ($country) {
        this.get_storeOfArea($country[$country.length - 1])
      },
      get_storeOfArea ($district) {
        apiTable.fetch_storeOfArea({
          district: $district
        }).then((response) => {
          this.searchData.storeId = ''
          this.storeData = [{
            value: '',
            label: '请选择门店'
          }]
          this.storeData = this.storeData.concat(response.data.dat)
        })
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || 0,
          province: '',
          city: '',
          district: '',
          storeId: self.searchData.storeId
        }
        if (self.searchData.country.length > 0) {
          Object.assign($params, {
            province: self.searchData.country[0],
            city: self.searchData.country[1],
            district: self.searchData.country[2]
          })
        }
        self.loading = true
        apiTable.data_deliveryStoreTable($params).then((response) => {
          self.loading = false
          self.tableData = response.data.dat
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .delivery-store{
    .content-table{
      margin-bottom: 20px;
    }
  }
</style>
