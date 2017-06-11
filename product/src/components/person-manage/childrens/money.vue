<template>
  <div class="person-money">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="formValue.value" filterable placeholder="请选择">
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
              <el-select v-model="formValue.value" filterable placeholder="请选择">
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
              <el-select v-model="formValue.value" filterable placeholder="请选择">
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
              <el-select v-model="formValue.value" filterable placeholder="请选择">
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
              <el-input v-model="formValue.name" placeholder="配送员姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="formValue.phone" placeholder="配送员联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-date-picker
                v-model="formValue.orderTimeBetween"
                type="datetimerange"
                placeholder="选择时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="formValue.personPhone" placeholder="订单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="formValue.selectedOrderType" placeholder="结算状态">
                <el-option
                  v-for="item in searchOption.moneyStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
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
          prop="order"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="订单时间">
        </el-table-column>
        <el-table-column
          prop="money"
          label="佣金"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="配送员"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式"
          width="200">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类别"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="level"
          label="等级"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="place"
          label="门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="moneyMethod"
          label="结算状态"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="person-manage-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info">导出excel</el-button>
        <el-button :plain="true" type="info">导入excel</el-button>
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
  *      ├──country:      城市
  *      ├──moneyStatus:  结算状态
  * ─────────────────────────────────
  * searchName: 查询name字段
  *      ├──country:      城市
  *      ├──personName:   配送员名字
  *      ├──mobile:       配送员联系方式
  *      ├──timeBetween:  查询时间段
  *      ├──orderNum:     订单号
  * ─────────────────────────────────
  * tableData: 表格数据
  *      ├──order:        订单号
  *      ├──orderTime:    订单时间
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
          moneyStatus: [{
            value: '',
            label: '结算状态'
          }, {
            value: '1',
            label: '已结算'
          }, {
            value: '2',
            label: '未结算'
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
          personPhone: '',
          orderTimeBetween: ''
        },
        tableData: [{
          order: '48911891891',
          orderTime: '20170302',
          money: '￥1564',
          person: '007',
          mobile: '187*******',
          category: '已结算',
          level: '二级',
          place: '上海市-宝山区',
          moneyMethod: '已结算'
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
