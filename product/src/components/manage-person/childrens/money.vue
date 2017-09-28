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
                  placeholder="请选择区域"
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
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="searchData.employeeId" placeholder="工号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
        v-loading.body="loading"
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
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="employeeId"
          label="工号"
          width="150"
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
          min-width="180"
          label="门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          width="150"
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
              <el-button :disabled="!btn_auth('b_cw_dc_excel')" :plain="true" type="info" @click="downloadExcel">导出excel</el-button>
              <el-button :disabled="!btn_auth('b_cw_dr_excel')" :plain="true"
                         type="info"
                         @click="exportDataIsShow = true">导入excel</el-button>
            </el-col>
          </div>
        </el-col>
        <el-col :lg="14" style="text-align: right">
          <el-pagination
            @current-change="data_table"
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
            :on-success="handleAvatarSuccess"
            action="/api/web/settlement/importExcel"
            :file-list="fileList"
            :auto-upload="false">
            <div slot="tip" class="el-upload__tip">只能上传xlsx、xls文件，且不超过10M</div>
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
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
        loading: false,
        fileList: [],
        exportDataIsShow: false,
        searchData: {
          employeeId: '',
          country: [],
          mallTime: [],
          settlement: '',
          realName: '',
          phone: '',
          orderNo: '',
          storeId: ''
        },
        exportData: {
          store: ''
        },
        storeData: [],
        tableData: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 365
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      fetchStoreData ($country) {
        this.get_storeOfArea($country[$country.length - 1])
      },
      get_storeOfArea ($district) {
        apiTable.fetch_storeOfArea({
          district: $district
        }).then((response) => {
          if (response.data.code === 1) {
            this.searchData.storeId = ''
            this.storeData = [{
              value: '',
              label: '请选择门店'
            }]
            this.storeData = this.storeData.concat(response.data.dat)
          }
        })
      },
      resetForm () {
        this.storeData = []
        this.searchData.country = []
        this.searchData.order = ''
        this.searchData.mallTime = []
        this.searchData.settlement = ''
        this.searchData.realName = ''
        this.searchData.phone = ''
        this.searchData.orderNo = ''
        this.searchData.storeId = ''
        this.searchData.employeeId = ''
      },
      data_table ($page) {
        let $params = {
          page: $page - 1 || 0,
          settlement: this.searchData.settlement,
          realName: this.searchData.realName,
          phone: this.searchData.phone,
          orderNo: this.searchData.orderNo,
          storeId: this.searchData.storeId,
          employeeId: this.searchData.employeeId,
          timeBegin: '',
          timeEnd: '',
          province: '',
          city: '',
          district: ''
        }
        if (this.searchData.mallTime.length > 0) {
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
        this.loading = true
        apiTable.data_personMoneyTable($params).then((response) => {
          this.loading = false
          if (response.data.code === 1) {
            this.tableData = response.data.dat
          }
        })
      },
      handleAvatarSuccess (response) {
        if (response.code === 1) {
          this.$message({
            duration: 1500,
            message: response.msg
          })
          this.handleClose()
        } else {
          this.$message({
            duration: 1500,
            message: response.msg,
            type: 'error'
          })
        }
      },
      downloadExcel () {
        window.location.href = '/api/web/settlement/exportData?'
      },
      submitUpload () {
        if (this.$refs.upload.uploadFiles.length > 0) {
          this.$refs.upload.submit()
        } else {
          this.$message({
            duration: 1500,
            message: '请添加财务结算文件'
          })
        }
      },
      handleClose (done) {
        this.exportDataIsShow = false
      }
    },
    watch: {
      exportDataIsShow () {
        if (!this.exportDataIsShow) {
          this.$nextTick(() => {
            this.$refs.upload.clearFiles()
          })
        }
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
