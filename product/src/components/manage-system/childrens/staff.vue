<template>
  <div class="system-staff">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-form>
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
                <el-input v-model="searchData.personNum" placeholder="配送员工号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="searchData.idStatus" placeholder="账号类型">
                  <el-option
                    v-for="item in this.$store.state.select.idStatus"
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
      </el-form>
    </div>
    <div class="content-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        :fit="false"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          fixed
          label="员工号">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="门店名称"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="所属门店"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name1"
          label="6/5 周一"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="6/6 周二"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="6/7 周三"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="6/8 周四"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="6/9 周五"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="6/10 周六"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="6/11 周日"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="注册状态"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="100"
          label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
                       @click="createDialogForm.type = true"
            >编辑</el-button>
            <el-button type="text"
                       size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-table-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info">导入员工排班</el-button>
        <el-button :plain="true" type="info">导入新增员工</el-button>
      </div>
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <el-dialog
      title="员工排版"
      :visible.sync="createDialogForm.type"
      size="small"
      :close-on-press-escape="false"
      :before-close="handleClose">
      <el-form
        :model="createDialogForm"
        label-width="80px">
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="门店: ">
              <el-input v-model="createDialogForm.store"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="工号: ">
              <el-input v-model="createDialogForm.jobNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="姓名: ">
              <el-input v-model="createDialogForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式: ">
              <el-input v-model="createDialogForm.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <hz-calendar></hz-calendar>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-button @click="createDialogForm.type = false">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        createDialogForm: {
          type: false,
          jobNumber: '',
          name: '',
          mobile: '',
          store: ''
        },
        searchData: {
          personNum: '',
          idStatus: ''
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
  .system-staff{
    .content-table{
      margin-bottom: 20px;
    }
  }
</style>
