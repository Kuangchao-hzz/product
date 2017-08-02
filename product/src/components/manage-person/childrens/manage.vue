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
              <el-select v-model="searchData.userType" placeholder="类别">
                <el-option
                  v-for="item in this.$store.state.select.category"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-select v-model="searchData.level" placeholder="等级">
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
              <el-input v-model="searchData.realName" placeholder="配送员姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="searchData.phone" placeholder="配送员联系方式"></el-input>
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
    <div class="person-manage-table">
      <el-table
        ref="multipleTable"
        :data="tableData.details"
        :height="tabHeight"
        :max-height="tabHeight"
        border
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          fixed
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="120"
          label="配送员">
          <template scope="scope">{{ scope.row.realName }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="类别">
          <template scope="scope">
            {{ scope.row.userType == '1'? '员工' : '' }}
            {{ scope.row.userType == '2'? '社会' : '' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="等级">
          <template scope="scope">
            {{ scope.row.level + '级' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          label="工作状态"
          >
          <template scope="scope">
            {{ scope.row.workStatus == '1'? '抢单中' : '' }}
            {{ scope.row.workStatus == '2'? '休息中' : '' }}
            {{ scope.row.workStatus == '3'? '配送中' : '' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          prop="city"
          label="常驻地区"
          >
        </el-table-column>
        <el-table-column
          align="center"
          min-width="200"
          prop="address"
          label="最近送货门店"
          >
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          prop="orderAmount"
          label="总抢单量"
          >
        </el-table-column>
        <el-table-column
          align="center"
          label="准达率">
          <template scope="scope">{{scope.row.ontimeRate + '%'}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退单率">
          <template scope="scope">{{scope.row.cancelRate + '%'}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          label="账号状态">
          <template scope="scope">
            {{ scope.row.accountStatus == '1'? '正常' : '' }}
            {{ scope.row.accountStatus == '0'? '冻结' : '' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            ><router-link :to="{ path: '/person/personDetails', query: { id: scope.row.id }}" >查看详情</router-link></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="person-manage-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info" @click="handlePersonUpDown(1)">升级</el-button>
        <el-button :plain="true" type="info" @click="handlePersonUpDown(0)">降级</el-button>
        <el-button :plain="true" type="info" @click="handlePersonEnabled(0)">冻结账号</el-button>
        <el-button :plain="true" type="info" @click="handlePersonEnabled(1)">账号解冻</el-button>
      </div>
      <el-pagination
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
          userType: '',
          level: '',
          workStatus: '',
          accountStatus: '',
          realName: '',
          phone: ''
        },
        tableData: [],
        multipleSelection: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 285
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      resetForm () {
        this.searchData.userType = ''
        this.searchData.level = ''
        this.searchData.workStatus = ''
        this.searchData.accountStatus = ''
        this.searchData.realName = ''
        this.searchData.phone = ''
      },
      data_table ($page) {
        let self = this
        apiTable.data_personManageTable({
          page: $page - 1 || 0,
          level: self.searchData.level,
          userType: self.searchData.userType,
          workStatus: self.searchData.workStatus,
          accountStatus: self.searchData.accountStatus,
          realName: self.searchData.realName,
          phone: self.searchData.phone
        }).then((response) => {
          if (response.data.code === 1) {
            self.tableData = response.data.dat
          } else {
            self.swal(response.data.msg)
          }
        }).catch(() => {
          swal('服务器错误')
        })
      },
      handlePersonUpDown ($type) {
        let $params = {
          direction: $type
        }
        if (this.multipleSelection.length < 1) {
          swal('请勾选需要处理的列表！')
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
        apiDetails.details_handlePersonUpDown($params).then((response) => {
          if (response.data.code !== 1) {
            swal(response.data.msg)
          } else {
            swal('操作成功！')
            this.data_table()
          }
        })
      },
      handlePersonEnabled ($type) {
        let $params = {
          direction: $type
        }
        if (this.multipleSelection.length < 1) {
          swal('请勾选需要处理的列表！')
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
        apiDetails.details_handlePersonEnabled($params).then((response) => {
          if (response.data.code !== 1) {
            swal(response.data.msg)
          } else {
            swal('操作成功！')
            this.data_table()
          }
        })
      },
      handleSelectionChange ($row) {
        this.multipleSelection = $row
      },
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
    }
  }

</style>
