<template>
  <div class="person-manage">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchName.country" filterable placeholder="请选择">
                <el-option-group
                  v-for="group in searchOption.country"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchName.country" filterable placeholder="请选择">
                <el-option-group
                  v-for="group in searchOption.country"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchName.country" filterable placeholder="请选择">
                <el-option-group
                  v-for="group in searchOption.country"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchName.country" filterable placeholder="请选择">
                <el-option-group
                  v-for="group in searchOption.country"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchName.orderType" placeholder="类别">
                <el-option
                  v-for="item in searchOption.orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchName.level" placeholder="等级">
                <el-option
                  v-for="item in searchOption.level"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchName.workStatus" placeholder="工作状态">
                <el-option
                  v-for="item in searchOption.workStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchName.accountStatus" placeholder="账号状态">
                <el-option
                  v-for="item in searchOption.accountStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="searchName.personName" placeholder="配送员姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="searchName.personMobile" placeholder="配送员联系方式"></el-input>
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
            >查看详情</el-button>
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
  /*
   * ===================================
   * searchOption: 查询下拉菜单OPTIONS
   *      ├──country:       城市
   *      ├──orderType:     类别
   *      ├──level:         等级
   *      ├──workStatus:    工作状态
   *      ├──accountStatus: 账号管理
   * ─────────────────────────────────
   * searchName: 查询name字段
   *      ├──country:       城市
   *      ├──orderType:     类别
   *      ├──level:         等级
   *      ├──workStatus:    工作状态
   *      ├──accountStatus: 账号管理
   *      ├──personName:    配送员姓名
   *      ├──personMobile:  配送员联系方式
   * ─────────────────────────────────
   * tableData: 表格数据
   *      ├──person:       配送员
   *      ├──orderType:    订单时间
   *      ├──money:        佣金
   *      ├──person:       配送员
   *      ├──mobile:       联系方式
   *      ├──category:     类别
   *      ├──level:        等级
   *      ├──place:        门店
   *      ├──moneyMethod:  结算方式
   * ─────────────────────────────────
   * ===================================
   * */
  export default {
    data () {
      return {
        searchOption: {
          orderType: [{
            value: '',
            label: '类别'

          }, {
            value: '1',
            label: '员工'

          }, {
            value: '2',
            label: '社会人'

          }],
          level: [{
            value: '',
            label: '等级'
          }, {
            value: '1',
            label: '一级'
          }, {
            value: '2',
            label: '二级'
          }, {
            value: '3',
            label: '三级'
          }, {
            value: '4',
            label: '四级'
          }, {
            value: '5',
            label: '五级'
          }],
          workStatus: [{
            value: '',
            label: '工作状态'
          }, {
            value: '1',
            label: '抢单中'
          }, {
            value: '2',
            label: '休息中'
          }, {
            value: '3',
            label: '配送中'
          }],
          accountStatus: [{
            value: '',
            label: '账号状态'
          }, {
            value: '1',
            label: '正常'
          }, {
            value: '2',
            label: '冻结'
          }],
          country: [{
            label: '热门城市',
            options: [{
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Beijing',
              label: '北京'
            }]
          }, {
            label: '城市名',
            options: [{
              value: 'Chengdu',
              label: '成都'
            }, {
              value: 'Shenzhen',
              label: '深圳'
            }, {
              value: 'Guangzhou',
              label: '广州'
            }, {
              value: 'Dalian',
              label: '大连'
            }]
          }]
        },
        searchName: {
          country: '',
          orderType: '',
          level: '',
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
        alert(JSON.stringify(this.searchName))
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
