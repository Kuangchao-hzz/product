<template>
  <div class="person-audit">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-form>
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
                <el-input v-model="searchName.personName" placeholder="配送员姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="searchName.personId" placeholder="配送员工号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="searchName.personIdNum" placeholder="配送员身份证号"></el-input>
              </el-form-item>
            </el-col>
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
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" @click="submitForm">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="id"
          label="工号"
          width="70"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="IDNumber"
          label="身份证号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="place"
          label="常驻地区"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="loginTime"
          label="注册时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ipPlace"
          label="ip地区"
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
   * ─────────────────────────────────
   * searchName: 查询name字段
   *      ├──country:       城市
   *      ├──orderType:     类别
   *      ├──personName:    配送员姓名
   *      ├──personId:      配送员工号
   *      ├──personIdNum:   配送员身份证号
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
          personName: '',
          personId: '',
          personIdNum: ''
        },
        tableData: [{
          name: '何周泽',
          mobile: '187****5171',
          type: '类别1',
          id: '007',
          IDNumber: '522123456678994561',
          place: '上海-宝山区',
          loginTime: '2017/6/11 15:15',
          ip: '192.168.1.1',
          ipPlace: '上海'
        }, {
          name: '何周泽',
          mobile: '187****5171',
          type: '类别1',
          id: '007',
          IDNumber: '522123456678994561',
          place: '上海-宝山区',
          loginTime: '2017/6/11 15:15',
          ip: '192.168.1.1',
          ipPlace: '上海'
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
