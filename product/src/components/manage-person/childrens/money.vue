<template>
  <div class="person-money">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  v-model="searchData.country"
                  :options="this.$store.state.select.country"
                  :props="this.$store.state.select.defaultCountryProps"
                  change-on-select
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="searchData.storeId" placeholder="请选择门店">
                <el-option
                  v-for="($item, $index) in this.$store.state.select.store"
                  :key="$index"
                  :label="$item.label"
                  :value="$item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-date-picker
                v-model="searchData.mallTime"
                type="daterange"
                placeholder="选择时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="searchData.settlement" placeholder="结算状态">
                <el-option
                  v-for="item in this.$store.state.select.payStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="searchData.realName" placeholder="配送员姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="searchData.phone" placeholder="配送员联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="searchData.orderNo" placeholder="订单编号"></el-input>
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
    <div class="person-money-table">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        :max-height="tabHeight"
        :height="tabHeight"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          align="center"
          min-width="180"
          prop="orderNo"
          label="订单号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderTime"
          min-width="180"
          label="订单时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="commission"
          label="佣金"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="deliveryName"
          label="配送员"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="联系方式"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderType"
          label="类别"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="level"
          label="等级"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="storeName"
          label="门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="结算状态"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="person-manage-pagination">
      <el-row>
        <el-col :lg="10">
          <div class="other-btn">
            <el-col :lg="24">
              <el-button :plain="true" type="info">导出excel</el-button>
              <el-button :plain="true"
                         type="info"
                         @click="exportDataIsShow = true">导入excel</el-button>
              <el-button :plain="true" type="info" @click="downloadExcel">下载模板</el-button>
            </el-col>
          </div>
        </el-col>
        <el-col :lg="14" style="text-align: right">
          <el-pagination
            :page-sizes="[20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.rowsCount">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <div class="export-data-component">
      <el-dialog
        title="导入数据"
        size="tiny"
        :visible.sync="exportDataIsShow">
        <el-form ref="exportData" :model="exportData" label-width="80px">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exportDataIsShow = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">导 入</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        fileList: [],
        exportDataIsShow: false,
        searchData: {
          country: [],
          mallTime: '',
          settlement: '',
          realName: '',
          phone: '',
          orderNo: '',
          storeId: ''
        },
        exportData: {
          store: ''
        },
        tableData: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 345
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      resetForm () {
        this.searchData.order = ''
        this.searchData.payStatus = ''
        this.searchData.personName = ''
        this.searchData.orderTimeBetween = ''
        this.searchData.personMobile = ''
      },
      data_table ($page) {
        let $params = {
          page: $page - 1 || 0,
          settlement: this.searchData.settlement,
          realName: this.searchData.realName,
          phone: this.searchData.phone,
          orderNo: this.searchData.orderNo,
          storeId: this.searchData.storeId,
          timeBegin: '',
          timeEnd: '',
          city: '',
          province: '',
          district: ''
        }
        if (this.searchData.mallTime !== '') {
          Object.assign($params, {
            timeBegin: new Date(this.searchData.mallTime[1]).Format('yyyy-MM-dd'),
            timeEnd: new Date(this.searchData.mallTime[0]).Format('yyyy-MM-dd')
          })
        }
        if (this.searchData.country.length > 0) {
          Object.assign($params, {
            city: this.searchData.country[0],
            province: this.searchData.country[1],
            district: this.searchData.country[2]
          })
        }
        apiTable.data_personMoneyTable($params).then((response) => {
          this.tableData = response.data.dat
        })
      },
      downloadExcel () {
        if (this.tableData.details.length < 1) {
          this.$message('无数据可导出！')
          return false
        }
        window.location.href = '/api/web/settlement/exportData?'
      },
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .person-money{
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
    .person-money-table{
      margin-bottom: 20px;
    }
    .person-manage-pagination{
    }
  }

</style>
