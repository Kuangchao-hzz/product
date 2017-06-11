<template>
  <div class="person-manage">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="formValue.value" filterable placeholder="请选择">
                <el-option-group
                  v-for="group in orderOption.country"
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
              <el-select v-model="formValue.value" filterable placeholder="请选择">
                <el-option-group
                  v-for="group in orderOption.country"
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
              <el-select v-model="formValue.value" filterable placeholder="请选择">
                <el-option-group
                  v-for="group in orderOption.country"
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
              <el-select v-model="formValue.value" filterable placeholder="请选择">
                <el-option-group
                  v-for="group in orderOption.country"
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
              <el-select v-model="formValue.selectedOrderType" placeholder="类别">
                <el-option
                  v-for="item in orderOption.orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="formValue.selectedLevel" placeholder="等级">
                <el-option
                  v-for="item in orderOption.level"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="formValue.workStatus" placeholder="工作状态">
                <el-option
                  v-for="item in orderOption.workStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="formValue.accountStatus" placeholder="账号状态">
                <el-option
                  v-for="item in orderOption.accountStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="formValue.personName" placeholder="配送员姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="formValue.personPhone" placeholder="配送员联系方式"></el-input>
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
  export default {
    data () {
      return {
        orderOption: {
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
        formValue: {
          value: '',
          selectedOrderType: '',
          selectedLevel: '',
          workStatus: '',
          accountStatus: '',
          personName: '',
          personPhone: ''
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
        alert(JSON.stringify(this.formValue))
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
