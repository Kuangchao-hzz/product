<template>
  <div class="person-audit">
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
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="searchData.personNum" placeholder="配送员工号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="searchData.personIdCard" placeholder="配送员身份证"></el-input>
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

  export default {
    data () {
      return {
        searchData: {
          personName: '',
          personNum: '',
          category: '',
          personIdCard: ''
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
        alert(JSON.stringify(this.searchData))
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
