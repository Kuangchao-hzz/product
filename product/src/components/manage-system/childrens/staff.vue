<template>
  <div class="system-staff">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-form>
          <el-row :gutter="10">
            <el-col :span="4">
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
            <el-col :span="4">
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
                <el-input v-model="searchData.employeeNo" placeholder="配送员工号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                v-model="searchData.workDayBegin"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" @click="data_table">查询</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-form>
    </div>
    <div class="content-table">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        :height="tabHeight"
        :max-height="tabHeight"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          fixed
          align="center"
          min-width="100"
          label="员工号">
          <template scope="scope">{{ scope.row.employeeNo }}</template>
        </el-table-column>
        <el-table-column
          min-width="180"
          align="center"
          label="姓名">
          <template scope="scope">
            <p>{{scope.row.realName}}</p>
            <p>{{scope.row.phone}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="storeName"
          min-width="100"
          label="所属门店"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          v-for="($item, $index) in handleTableHeaderList"
          :label="($item.month + 1) + '/' + $item.day + ' ' + $item.week"
          min-width="150"
          align="center"
          :key="$index"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.schedulingList[$index] ? scope.row.schedulingList[$index].timeBegin : ''}}
            {{scope.row.schedulingList[$index] ? '-' : ''}}
            {{scope.row.schedulingList[$index] ? scope.row.schedulingList[$index].timeEnd : ''}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          min-width="100"
          align="center"
          label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
                       @click="editStaff(scope.row)">编辑</el-button>
            <el-button type="text"
                       size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-table-pagination">
      <div class="other-btn">
        <el-button :plain="true"
                   type="info"
                   @click="exportDataIsShow = true">导入员工排班</el-button>
        <el-button type="info" @click="downloadExcel">下载模板</el-button>
      </div>
      <el-pagination
        @current-change="data_table"
        :page-sizes="[20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.rowsCount">
      </el-pagination>
    </div>
    <div class="export-data-component">
      <el-dialog
        title="导入数据"
        size="tiny"
        :visible.sync="exportDataIsShow">
        <el-form ref="exportData" :model="exportData" label-width="80px">
          <el-form-item
            label="选择城市"
            prop="country"
            :rules="{ type: 'array', required: true, message: '请选择城市', trigger: 'change'}">
            <div class="country-select">
              <el-cascader
                v-model="exportData.country"
                :options="this.$store.state.select.country"
                :props="this.$store.state.select.defaultCountryProps"
                change-on-select
              ></el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="选择门店"
                        prop="storeId"
                        :rules="{required: true, message: '请选择门店', trigger: 'change'}">
            <el-select v-model="exportData.storeId"
                       placeholder="请选择活动区域"
                       style="width: 100%">
              <el-option
                v-for="($item, $index) in this.$store.state.select.store"
                :key="$index"
                :label="$item.label"
                :value="$item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            :data="exportData"
            action="/api/web/employeeManage/importScheduling"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitUpload">导 入</el-button>
        </div>
      </el-dialog>
    </div>
    <editStaffDialog :editStaffIsShow.sync="editStaffIsShow" :editStaffData="editStaffData"></editStaffDialog>
  </div>

</template>

<script>
  import apiTable from '@/api/table'
  import editStaffDialog from '@/common/edit-staff-dialog/editStaffDialog'
  export default {
    data () {
      return {
        exportDataIsShow: false,
        editStaffIsShow: false,
        editStaffData: {},
        exportData: {
          country: [],
          storeId: ''
        },
        searchData: {
          country: [],
          workDayBegin: new Date(),
          storeId: '',
          employeeNo: ''
        },
        storeData: [],
        tableData: [],
        handleTableHeaderArr: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 305
      },
      handleTableHeaderList () {
        return this.handleTableHeaderArr
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
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
      resetForm () {
        this.storeData = []
        this.searchData.country = []
        this.searchData.workDayBegin = new Date()
        this.searchData.storeId = ''
        this.searchData.employeeNo = ''
      },
      data_table ($page) {
        let self = this
        let $params = {
          page: $page - 1 || 0,
          province: '',
          city: '',
          district: '',
          workDayBegin: new Date(this.searchData.workDayBegin).Format('yyyy-MM-dd'),
          employeeNo: this.searchData.employeeNo,
          storeId: this.searchData.storeId
        }
        if (self.searchData.country.length > 0) {
          Object.assign($params, {
            city: self.searchData.country[1],
            province: self.searchData.country[0],
            district: self.searchData.country[2]
          })
        }
        apiTable.data_staffTable($params).then((response) => {
          self.tableData = response.data.dat
          self.handleTableHeader()
        })
      },
      handleTableHeader () {
        if (this.tableData.details) {
          let schedulingList = []
          let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
          let startDate = this.searchData.workDayBegin.Format('yyyy-MM-dd')
          let dateAddDays = function (dataStr, dayCount) {
            let strdate = dataStr
            let isdate = new Date(strdate.replace(/-/g, '/'))
            isdate = new Date((isdate / 1000 + (86400 * dayCount)) * 1000)
            let pdate = isdate.getFullYear() + '-' + (isdate.getMonth() + 1) + '-' + (isdate.getDate())
            return pdate
          }
          weeks.forEach(function ($item, $index) {
            let dateList = dateAddDays(startDate, $index)
            schedulingList.push({
              month: new Date(dateList).getMonth(),
              day: new Date(dateList).getDate(),
              week: weeks[new Date(dateList).getDay()]
            })
          })
          this.handleTableHeaderArr = schedulingList
        }
      },
      handleClose () {
        this.exportDataIsShow = false
        this.exportData.storeId = ''
        this.exportData.country = []
        this.$refs.upload.clearFiles()
      },
      editStaff ($data) {
        this.editStaffData = $data
        this.editStaffIsShow = true
      },
      submitUpload () {
        this.$refs['exportData'].validate((valid) => {
          if (valid) {
            if (this.$refs.upload.uploadFiles.length > 0) {
              this.$refs.upload.submit()
            } else {
              this.$message('请添加员工排班文件')
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      upDataSuccess (response) {
        if (response.code === 1) {
          this.$message('上传成功！')
          this.handleClose()
        }
      },
      downloadExcel () {
        window.location.href = '/api/web/employeeManage/downloadTemplete?'
      }
    },
    components: {
      editStaffDialog
    }
  }
</script>

<style lang="scss" type="text/scss">
  .system-staff{
    .edit-staff{
      width: 725px;
    }
    .content-table{
      margin-bottom: 20px;
    }
    .person-manage-table{
      margin-bottom: 20px;
    }
    .content-table-pagination{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
