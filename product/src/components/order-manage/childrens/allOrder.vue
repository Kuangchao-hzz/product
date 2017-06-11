<template>
  <div class="wait-all-order">
    <el-form :inline="true" class="search-form">
      <el-row>
        <el-col :span="3">
          <el-select v-model="value" filterable placeholder="请选择">
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
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" filterable placeholder="请选择">
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
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" filterable placeholder="请选择">
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
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" filterable placeholder="请选择">
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
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-input placeholder="订单编号"></el-input>
        </el-col>
        <el-col :span="3">
          <el-date-picker
            v-model="orderTimeStart"
            type="datetime"
            placeholder="订单时间">
        </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-date-picker
            v-model="orderTimeEnd"
            type="datetime"
            placeholder="送达时间">
        </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="配送员联系方式"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select v-model="selectedOrderType" placeholder="订单类型">
            <el-option
              v-for="item in orderOption.orderType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="selectedStatus" placeholder="订单状态">
            <el-option
              v-for="item in orderOption.status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="selectedPush" placeholder="抢单状态">
            <el-option
              v-for="item in orderOption.push"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="selectedComment" placeholder="订单评论">
            <el-option
              v-for="item in orderOption.comment"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="wait-send-table">
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
          label="订单编号">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单类别">
        </el-table-column>
        <el-table-column
          prop="address"
          label="提货门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="送货地点"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name1"
          label="订单时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="需要送达时间"
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
    <div class="wait-send-pagination">
      <div class="other-btn">
        <el-button :plain="true" type="info">导出excel</el-button>
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
            value: '0',
            label: '订单类型'

          }, {
            value: '1',
            label: '普通'

          }, {
            value: '2',
            label: '生鲜'

          }],
          status: [{
            value: '0',
            label: '请选择'

          }, {
            value: '1',
            label: '待验货'

          }, {
            value: '2',
            label: '待验货'

          }, {
            value: '3',
            label: '送货中'

          }, {
            value: '4',
            label: '送货中'

          }, {
            value: '5',
            label: '回退邮包'

          }, {
            value: '6',
            label: '订单关闭'
          }],
          push: [{
            value: '0',
            label: '请选择'

          }, {
            value: '1',
            label: '已抢单'
          }, {
            value: '2',
            label: '未抢单'
          }],
          comment: [{
            value: '0',
            label: '请选择'

          }, {
            value: '1',
            label: '1星'

          }, {
            value: '2',
            label: '2星'

          }, {
            value: '3',
            label: '3星'

          }, {
            value: '4',
            label: '4星'
          }, {
            value: '5',
            label: '5星'
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
        value: '',
        selectedComment: '',
        selectedPush: '',
        selectedStatus: '',
        selectedOrderType: '',
        orderTimeStart: '',
        orderTimeEnd: '',
        tableData: [{
          date: '201705220001',
          name: '普通',
          address: '上海-新村门店',
          date1: '201705220001',
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
    }
  }
</script>

<style lang="scss" type="text/scss">
  .wait-all-order{
    margin-bottom: 20px;
  }
  .search-form{
    margin-bottom: 20px;
    >div{
      padding: 5px 0;
      &:nth-child(1){
        >div{
          margin-right: 16px;
          >div{
            width: 100%;
          }
        }
      }
      &:nth-child(2){
        >div{
          margin-right: 16px;
          >div{
            width: 100%;
          }
        }
      }
    }
  }
  .wait-send-pagination{
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
</style>
