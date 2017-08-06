<template>
  <div class="person-audit">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-form>
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item>
                <div class="country-select">
                  <el-cascader
                    :options="this.$store.state.select.country"
                    :props="this.$store.state.select.defaultCountryProps"
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
                <el-input v-model="searchData.personName" placeholder="配送员姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-input v-model="searchData.personNum" placeholder="配送员工号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item>
                <el-input v-model="searchData.personIdCard" placeholder="配送员身份证"></el-input>
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
      </el-form>
    </div>
    <div class="person-manage-table">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        border
        :max-height="tabHeight"
        :height="tabHeight"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          align="center"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="realName"
          fixed
          width="150"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          width="150"
          label="联系方式">
        </el-table-column>
        <el-table-column
          align="center"
          label="类别"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.userType == '1'? '员工' : '' }}
            {{ scope.row.userType == '2'? '社会' : '' }}
          </template>
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
          prop="idCard"
          label="身份证号"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="district"
          label="常驻地区"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="regTime"
          label="注册时间"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="regIp"
          label="ip"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="regArea"
          label="ip地区"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作">
          <template scope="scope">
            <el-button
              type="text"
              size="small"
              @click="localStorage_details(scope.row)"
            >
              查看详情
              <!--<router-link :to="{path: '/person/auditDetails', query: {details: scope.row}}">查看详情</router-link>-->
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="person-manage-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info" @click="handlePersonUpDown(1)">审核通过</el-button>
        <el-button :plain="true" type="info" @click="handlePersonUpDown(2)">审核不通过</el-button>
        <el-button :plain="true" type="info">全部导出excel</el-button>
      </div>
      <el-pagination
        @current-change="data_table"
        :page-sizes="[20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.rowsCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  import apiDetails from '@/api/details'
  export default {
    data () {
      return {
        searchData: {
          personName: '',
          personNum: '',
          category: '',
          personIdCard: ''
        },
        tableData: [],
        multipleSelection: []
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
        this.searchData.personName = ''
        this.searchData.personNum = ''
        this.searchData.category = ''
        this.searchData.personIdCard = ''
      },
      handleSelectionChange ($row) {
        this.multipleSelection = $row
      },
      handlePersonUpDown ($type) {
        let $params = {
          result: $type
        }
        if (this.multipleSelection.length < 1) {
          this.$message('请勾选需要处理的列表！')
          return false
        }
        if (this.multipleSelection.length === 1) {
          $params = Object.assign({}, $params, {
            id: this.multipleSelection[0].id
          })
        } else {
          let ids = this.multipleSelection.map(($item) => {
            return $item.id
          })
          $params = Object.assign({}, $params, {
            ids: ids
          })
        }
        apiDetails.details_submitAudit($params).then((response) => {
          this.$message('操作成功！')
          this.data_table()
        })
      },
      localStorage_details ($item) {
        this.$router.push('/person/auditDetails')
        localStorage.setItem('details_audit', JSON.stringify($item))
      },
      data_table ($page) {
        let self = this
        apiTable.data_tableAuditTable({
          page: $page - 1 || 0
        }).then((response) => {
          if (response.data.code === 1) {
            self.tableData = response.data.dat
          } else {
            alert(response.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">

  .person-audit{
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
    }
  }

</style>
